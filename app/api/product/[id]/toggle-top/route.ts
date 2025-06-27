import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"
interface Params {
  params: Promise<{ id: string }>
}
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const { isTopProduct } = await request.json()

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    })

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // If setting as top product, check if we already have 4 top products
    // if (isTopProduct) {
    //   const topProductsCount = await prisma.product.count({
    //     where: { isTopProduct: true },
    //   })

    //   if (topProductsCount >= 4) {
    //     return NextResponse.json({ error: "Maximum 4 top products allowed. Please remove one first." }, { status: 400 })
    //   }
    // }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { isTopProduct },
    })

    return NextResponse.json({
      product: updatedProduct,
      message: `Product ${isTopProduct ? "added to" : "removed from"} top products`,
    })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}
