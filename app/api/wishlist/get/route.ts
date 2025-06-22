import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authoptions"
import prisma from "@/lib/db"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const wishlistItems = await prisma.wishlist.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({
      items: wishlistItems,
      count: wishlistItems.length,
    })
  } catch (error) {
    console.error("Error fetching wishlist:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}