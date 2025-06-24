import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authoptions"
import prisma from "@/lib/db"

interface Params {
  params: Promise<{ id: string }>
}
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params;

    await prisma.wishlist.delete({
      where: {
        id: id,
        userId: session.user.id,
      },
    })

    return NextResponse.json({ message: "Item removed from wishlist" })
  } catch (error) {
    console.error("Error removing from wishlist:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
