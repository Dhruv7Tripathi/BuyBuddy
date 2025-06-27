import { NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function GET() {
  try {
    const topProducts = await prisma.product.findMany({
      where: {
        isTopProduct: true,
      },
      // take: 4,
      orderBy: {
        updatedAt: "desc",
      },
    })

    return NextResponse.json(topProducts)
  } catch (error) {
    console.error("Error fetching top products:", error)
    return NextResponse.json({ error: "Failed to fetch top products" }, { status: 500 })
  }
}
