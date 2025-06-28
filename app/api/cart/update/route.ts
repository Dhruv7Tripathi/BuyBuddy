import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authoptions"
import prisma from "@/lib/db"

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { cartItemId, quantity } = await request.json()

    if (!cartItemId || quantity < 0) {
      return NextResponse.json({ error: "Invalid cart item ID or quantity" }, { status: 400 })
    }

    // If quantity is 0, delete the item
    if (quantity === 0) {
      await prisma.cartItem.delete({
        where: {
          id: cartItemId,
          cart: {

            userId: session.user.id,
          } // Ensure user owns this cart item
        },
      })

      return NextResponse.json({ message: "Item removed from cart" })
    }

    // Update the quantity
    const updatedCartItem = await prisma.cartItem.update({
      where: {
        id: cartItemId,
        cart: {
          userId: session.user.id,
        }// Ensure user owns this cart item
      },
      data: {
        quantity: quantity,
      },
      include: {
        product: true,
      },
    })

    return NextResponse.json(updatedCartItem)
  } catch (error) {
    console.error("Error updating cart item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
