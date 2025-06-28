import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query || query.trim().length < 1) {
      return NextResponse.json([])
    }

    const searchTerm = query.trim()

    // Search products by title, description, or category
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            category: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        price: true,
        imageUrl: true,
        category: true,
        description: true,
        isTopProduct: true,
      },
      orderBy: [
        { isTopProduct: "desc" }, // Show top products first
        { createdAt: "desc" },
      ],
      take: 20, // Limit results
    })

    // Transform the data
    const transformedProducts = products.map((product) => ({
      id: product.id,
      title: product.title,
      price: Number(product.price),
      imageUrl: product.imageUrl,
      category: product.category || "Uncategorized",
      description: product.description,
      isTopProduct: product.isTopProduct,
    }))

    return NextResponse.json(transformedProducts)
  } catch (error) {
    console.error("Error searching products:", error)
    return NextResponse.json({ error: "Failed to search products" }, { status: 500 })
  }
}
