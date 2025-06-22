import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authoptions"
import prisma from "@/lib/db"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        cart: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    })

    if (!user?.cart) {
      await prisma.cart.create({
        data: {
          userId: user?.id,
          items: {
            create: [],
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      })

      return NextResponse.json({
        items: [],
        subtotal: 0,
        total: 0,
        itemCount: 0,
      })
    }

    const subtotal = user.cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0)

    const shipping = subtotal > 100 ? 0 : subtotal > 0 ? 9.99 : 0
    const total = subtotal + shipping
    const itemCount = user.cart.items.reduce((count, item) => count + item.quantity, 0)

    return NextResponse.json({
      items: user.cart.items,
      subtotal,
      shipping,
      total,
      itemCount,
    })
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
