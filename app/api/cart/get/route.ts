// import { NextResponse } from "next/server"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/authoptions"
// import prisma from "@/lib/db"

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions)
//     if (!session?.user?.email) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
//     }

//     const user = await prisma.user.findUnique({
//       where: { email: session.user.email },
//       include: {
//         cart: {
//           include: {
//             items: {
//               include: {
//                 product: true,
//               },
//             },
//           },
//         },
//       },
//     })

//     if (!user?.cart) {
//       await prisma.cart.create({
//         data: {
//           userId: user?.id,
//           items: {
//             create: [],
//           },
//         },
//         include: {
//           items: {
//             include: {
//               product: true,
//             },
//           },
//         },
//       })

//       return NextResponse.json({
//         items: [],
//         subtotal: 0,
//         total: 0,
//         itemCount: 0,
//       })
//     }

//     const subtotal = user.cart.items.reduce((total, item) => {
//       return total + item.product.price * item.quantity
//     }, 0)

//     const shipping = subtotal > 100 ? 0 : subtotal > 0 ? 9.99 : 0
//     const total = subtotal + shipping
//     const itemCount = user.cart.items.reduce((count, item) => count + item.quantity, 0)

//     return NextResponse.json({
//       items: user.cart.items,
//       subtotal,
//       shipping,
//       total,
//       itemCount,
//     })
//   } catch (error) {
//     console.error("Error fetching cart:", error)
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 })
//   }
// }
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authoptions";
// import prisma from "@/lib/db";

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.email) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const user = await prisma.user.findUnique({
//       where: { email: session.user.email },
//       include: {
//         cart: {
//           include: {
//             items: {
//               include: {
//                 product: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     if (!user.cart) {
//       await prisma.cart.create({
//         data: {
//           userId: user.id,
//         },
//       });

//       return NextResponse.json({
//         items: [],
//         subtotal: 0,
//         total: 0,
//         shipping: 0,
//         itemCount: 0,
//       });
//     }

//     const cartItems = user.cart.items;

//     const subtotal = cartItems.reduce((total, item) => {
//       const price = Number(item.product.price); // Convert Prisma Decimal to native number
//       return total + price * item.quantity;
//     }, 0);

//     const shipping = subtotal > 100 ? 0 : subtotal > 0 ? 9.99 : 0;
//     const total = subtotal + shipping;
//     const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

//     return NextResponse.json({
//       items: cartItems,
//       subtotal: Number(subtotal.toFixed(2)),
//       shipping: Number(shipping.toFixed(2)),
//       total: Number(total.toFixed(2)),
//       itemCount,
//     });
//   } catch (error) {
//     console.error("Error fetching cart:", error);
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Find the user's cart first
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        cart: true,
      },
    })

    if (!user || !user.cart) {
      return NextResponse.json({
        items: [],
        subtotal: 0,
        shipping: 0,
        total: 0,
        itemCount: 0,
      })
    }

    const cartItems = await prisma.cartItem.findMany({
      where: {
        cartId: user.cart.id,
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Convert Decimal to number for JSON serialization
    const serializedItems = cartItems.map((item) => ({
      ...item,
      product: item.product
        ? {
          ...item.product,
          price: typeof item.product.price === "object" && "toNumber" in item.product.price
            ? item.product.price.toNumber()
            : Number(item.product.price),
        }
        : null,
    }))

    const subtotal = serializedItems.reduce((total, item) => {
      if (item.product) {
        return total + item.product.price * item.quantity
      }
      return total
    }, 0)
    const itemCount = serializedItems.reduce((count, item) => count + item.quantity, 0)
    const shipping = subtotal > 100 ? 0 : subtotal > 0 ? 9.99 : 0
    const total = subtotal + shipping

    return NextResponse.json({
      items: serializedItems,
      subtotal,
      shipping,
      total,
      itemCount,
    })
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
