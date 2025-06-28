import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";
import prisma from "@/lib/db";
interface Params {
  params: Promise<{ id: string }>
}
export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id: productId } = await params;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { cart: true },
  });

  if (!user?.cart) {
    return NextResponse.json({ message: "Cart not found" }, { status: 404 });
  }

  await prisma.cartItem.deleteMany({
    where: {
      cartId: user.cart.id,
      productId,
    },
  });

  return NextResponse.json({ message: "Item removed from cart" });
}
