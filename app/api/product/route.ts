import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, price, imageUrl } = body;

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof imageUrl !== "string" ||
      typeof price !== "number"
    ) {
      return NextResponse.json({ message: "Missing or invalid fields." }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        price,
        imageUrl,
      },
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ message: "Error creating product." }, { status: 500 });
  }
}
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Error fetching products." }, { status: 500 });
  }
}