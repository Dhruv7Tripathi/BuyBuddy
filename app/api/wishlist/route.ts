import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await req.json();

  try {
    const wishlist = await prisma.wishlist.create({
      data: {
        userId: session.user.id,
        productId,
      },
    });

    return NextResponse.json(wishlist, { status: 201 });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json({ message: "Error adding to wishlist" }, { status: 500 });
  }
}
// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/db";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authoptions";

// export async function POST(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.id) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();
//     console.log("Received body:", body);

//     const { productId } = body;
//     const { productId } = await req.json();
//     if (!productId) {
//       return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
//     }
//     const testUserId = "a926171a-567e-4d9d-a702-922092e86e15"

//     const wishlist = await prisma.wishlist.create({
//       data: {
//         // userId: session.user.id,
//         userId: testUserId, // For testing purposes, using a hardcoded user ID
//         productId,
//       },
//     });

//     console.log("Created wishlist:", wishlist);

//     return NextResponse.json({ wishlist: JSON.parse(JSON.stringify(wishlist)) }, { status: 201 });

//   } catch (error) {
//     console.error("Error adding to wishlist:", error);

//     return NextResponse.json(
//       {
//         message: "Internal Server Error",
//         error: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }
// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/db";

// export async function POST(req: NextRequest) {
//   try {
//     const { productId } = await req.json();

//     if (!productId) {
//       return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
//     }

//     // 🔧 Replace with an existing user ID from your DB for testing
//     const testUserId = "a926171a-567e-4d9d-a702-922092e86e15";

//     const wishlist = await prisma.wishlist.create({
//       data: {
//         userId: testUserId,
//         productId,
//       },
//     });

//     // ✅ Safely serialize the result
//     return NextResponse.json(JSON.parse(JSON.stringify(wishlist)), { status: 201 });

//   } catch (error) {
//     console.error("Error adding to wishlist:", error instanceof Error ? error.message : error);

//     return NextResponse.json(
//       {
//         message: "Internal Server Error",
//         error: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }
