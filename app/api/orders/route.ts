import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"
import getServerSession from "next-auth"
import { authOptions } from "@/lib/authoptions"
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        shippingDetails: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            address: true,
            city: true,
            state: true,
            zipCode: true,
            country: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                title: true,
                imageUrl: true,
                price: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const transformedOrders = orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      user: {
        name: order.user.name || `${order.shippingDetails.firstName} ${order.shippingDetails.lastName}`,
        email: order.user.email,
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
        },
      })),
    }))

    return NextResponse.json(transformedOrders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
