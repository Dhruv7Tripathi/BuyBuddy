// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/db";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authoptions";

// export async function POST(req: NextRequest) {
//   const session = await getServerSession(authOptions);
//   if (!session?.user) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const { productId } = await req.json();

//   try {
//     const wishlist = await prisma.wishlist.create({
//       data: {
//         userId: session.user.id,
//         productId,
//       },
//     });

//     return NextResponse.json(wishlist, { status: 201 });
//   } catch (error) {
//     console.error("Error adding to wishlist:", error);
//     return NextResponse.json({ message: "Error adding to wishlist" }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const wishlist = await prisma.wishlist.create({
      data: {
        userId: session.user.id,
        productId,
      },
    });

    return NextResponse.json(wishlist, { status: 201 });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json(
      { message: "Error adding to wishlist", error: error instanceof Error ? error.message : null },
      { status: 500 }
    );
  }
}
