import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";
import prisma from "@/lib/db";
interface Params {
  params: Promise<{ id: string }>
}
// export async function DELETE(req: NextRequest, { params }: Params) {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const { id: productId } = await params;

//   const user = await prisma.user.findUnique({
//     where: { email: session.user.email },
//     include: { cart: true },
//   });

//   if (!user?.cart) {
//     return NextResponse.json({ message: "Cart not found" }, { status: 404 });
//   }

//   await prisma.cartItem.deleteMany({
//     where: {
//       cartId: user.cart.id,
//       productId,
//     },
//   });

//   return NextResponse.json({ message: "Item removed from cart" });
// }
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id: cartItemId } = await params

    if (!cartItemId) {
      return NextResponse.json({ error: "Cart item ID is required" }, { status: 400 })
    }

    // First check if the cart item exists and belongs to the user
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        cart: {
          userId: session.user.id,
        },
      },
    })

    if (!existingCartItem) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
    }

    // Delete the cart item
    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    })

    return NextResponse.json({
      message: "Item removed from cart successfully",
      deletedItemId: cartItemId,
    })
  } catch (error) {
    console.error("Error removing cart item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}