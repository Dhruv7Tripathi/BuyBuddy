import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"
import getServerSession from "next-auth"
import { authOptions } from "@/lib/authoptions"
interface Params {
  params: Promise<{ id: string }>
}
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params

    // Add authentication check here
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
        shippingDetails: true,
        orderItems: {
          include: {
            product: {
              select: {
                title: true,
                imageUrl: true,
                price: true,
                description: true,
              },
            },
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Transform the data to match frontend expectations
    const transformedOrder = {
      id: order.id,
      orderNumber: order.orderNumber,
      user: {
        name: order.user.name || `${order.shippingDetails.firstName} ${order.shippingDetails.lastName}`,
        email: order.user.email,
        image: order.user.image,
      },
      status: order.status.toLowerCase() as
        | "pending"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
        | "refunded",
      total: Number(order.totalAmount),
      currency: order.currency,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
      shippingDetails: order.shippingDetails,
      orderItems: order.orderItems.map((item) => ({
        id: item.id,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice),
        product: {
          title: item.product.title,
          imageUrl: item.product.imageUrl,
          price: Number(item.product.price),
          description: item.product.description,
        },
      })),
    }

    return NextResponse.json(transformedOrder)
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params

    // Add authentication check here
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id },
    })

    if (!existingOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Delete the order (OrderItems will be deleted automatically due to onDelete: Cascade)
    await prisma.order.delete({
      where: { id },
    })

    return NextResponse.json(
      {
        message: "Order deleted successfully",
        deletedOrderId: id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error deleting order:", error)

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof (error as { code?: unknown }).code === "string" &&
      (error as { code: string }).code === "P2025"
    ) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const body = await request.json()

    // Add authentication check here
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    const { status } = body

    // Validate status if provided
    const validStatuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"]
    if (status && !validStatuses.includes(status.toUpperCase())) {
      return NextResponse.json({ error: "Invalid order status" }, { status: 400 })
    }

    // Update the order
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        ...(status && { status: status.toUpperCase() }),
        updatedAt: new Date(),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        shippingDetails: true,
      },
    })

    // Transform the response
    const transformedOrder = {
      id: updatedOrder.id,
      orderNumber: updatedOrder.orderNumber,
      user: {
        name:
          updatedOrder.user.name ||
          `${updatedOrder.shippingDetails.firstName} ${updatedOrder.shippingDetails.lastName}`,
        email: updatedOrder.user.email,
      },
      status: updatedOrder.status.toLowerCase(),
      total: Number(updatedOrder.totalAmount),
      currency: updatedOrder.currency,
      createdAt: updatedOrder.createdAt.toISOString(),
      updatedAt: updatedOrder.updatedAt.toISOString(),
    }

    return NextResponse.json(transformedOrder)
  } catch (error) {
    console.error("Error updating order:", error)

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof (error as { code?: unknown }).code === "string" &&
      (error as { code: string }).code === "P2025"
    ) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
