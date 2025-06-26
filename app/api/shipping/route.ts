import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { firstName, lastName, email, phone, address, apartment, city, state, zipCode, country, shippingMethod } =
      body

    if (!firstName || !lastName || !email || !address || !city || !state || !zipCode) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const shippingDetails = await prisma.shippingDetails.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        address,
        apartment: apartment || null,
        city,
        state,
        zipCode,
        country: country || "US",
        shippingMethod: shippingMethod || null,
        userEmail: session.user.email,
      },
    })

    return NextResponse.json({
      success: true,
      shippingDetails: {
        id: shippingDetails.id,
        firstName: shippingDetails.firstName,
        lastName: shippingDetails.lastName,
        email: shippingDetails.email,
      },
    })
  } catch (error) {
    console.error("Error saving shipping details:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const shippingDetails = await prisma.shippingDetails.findMany({
      where: {
        userEmail: session.user.email,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ shippingDetails })
  } catch (error) {
    console.error("Error fetching shipping details:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
