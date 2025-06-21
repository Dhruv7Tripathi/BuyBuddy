import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { cart: true },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  let cart = user.cart;

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        user: {
          connect: { id: user.id },
        },
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { cartId: cart.id },
    });
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId,
    },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: { increment: 1 },
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });
  }

  return NextResponse.json({ message: "Product added to cart" }, { status: 200 });
}
// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authoptions";
// import prisma from "@/lib/db";

// export async function POST(req: NextRequest) {
//   let session = await getServerSession(authOptions);

//   // ✅ TEMP: fallback email for testing with Postman (without login)
//   const TEST_EMAIL = "johnsnow072004@gmail.com"; // make sure this email exists in your DB

//   if (!session?.user?.email) {
//     console.warn("⚠️ No session found, using test email for development/testing.");
//     session = {
//       user: {
//         email: TEST_EMAIL,
//       },
//     } as any;
//   }

//   const { productId } = await req.json();

//   if (!productId) {
//     return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
//   }

//   const user = await prisma.user.findUnique({
//     where: { email: session?.user?.email as string },
//     include: { cart: true },
//   }) as (typeof prisma.user extends { findUnique: (...args: any) => Promise<infer U> } ? U & { cart: any | null } : never);

//   if (!user) {
//     return NextResponse.json({ message: "User not found" }, { status: 404 });
//   }

//   let cart = user.cart;

//   if (!cart) {
//     cart = await prisma.cart.create({
//       data: {
//         user: {
//           connect: { id: user.id },
//         },
//       },
//     });

//     await prisma.user.update({
//       where: { id: user.id },
//       data: { cartId: cart.id },
//     });
//   }

//   const existingItem = await prisma.cartItem.findFirst({
//     where: {
//       cartId: cart.id,
//       productId,
//     },
//   });

//   if (existingItem) {
//     await prisma.cartItem.update({
//       where: { id: existingItem.id },
//       data: {
//         quantity: { increment: 1 },
//       },
//     });
//   } else {
//     await prisma.cartItem.create({
//       data: {
//         cartId: cart.id,
//         productId,
//         quantity: 1,
//       },
//     });
//   }

//   return NextResponse.json({ message: "Product added to cart" }, { status: 200 });
// }
