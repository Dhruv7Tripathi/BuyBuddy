import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authoptions"
import prisma from "@/lib/db"

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const deletedItems = await prisma.cartItem.deleteMany({
      where: {
        cart: {
          userId: session.user.id,
        }
      },
    })

    return NextResponse.json({
      message: "Cart cleared successfully",
      deletedCount: deletedItems.count,
    })
  } catch (error) {
    console.error("Error clearing cart:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
