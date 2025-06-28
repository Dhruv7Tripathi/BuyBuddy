import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import getServerSession from "next-auth"
import { authOptions } from "@/lib/authoptions"
export async function GET() {
  try {
    // Add authentication check here
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get order statistics
    const [
      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
      recentOrders,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: "PENDING" } }),
      prisma.order.count({ where: { status: "PROCESSING" } }),
      prisma.order.count({ where: { status: "SHIPPED" } }),
      prisma.order.count({ where: { status: "DELIVERED" } }),
      prisma.order.count({ where: { status: "CANCELLED" } }),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { status: { not: "CANCELLED" } },
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { name: true, email: true },
          },
        },
      }),
    ])

    const stats = {
      totalOrders,
      ordersByStatus: {
        pending: pendingOrders,
        processing: processingOrders,
        shipped: shippedOrders,
        delivered: deliveredOrders,
        cancelled: cancelledOrders,
      },
      totalRevenue: Number(totalRevenue._sum.totalAmount || 0),
      recentOrders: recentOrders.map((order) => ({
        id: order.id,
        orderNumber: order.orderNumber,
        user: order.user,
        status: order.status.toLowerCase(),
        total: Number(order.totalAmount),
        createdAt: order.createdAt.toISOString(),
      })),
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching order stats:", error)
    return NextResponse.json({ error: "Failed to fetch order statistics" }, { status: 500 })
  }
}
