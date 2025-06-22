import prisma from "@/lib/db";


async function main() {
  const user = await prisma.user.upsert({
    where: { email: "testuser@gmail.com" },
    update: {},
    create: {
      email: "testuser@gmail.com",
      name: "Test Google User",
      provider: "Google",
      image: "https://via.placeholder.com/100",
    },
  });

  const product = await prisma.product.upsert({
    where: { id: "test-product-id" },
    update: {},
    create: {
      id: "test-product-id",
      title: "Test Product",
      description: "This is a test product for wishlist testing.",
      price: 999.99,
      imageUrl: "https://via.placeholder.com/300",
      category: "Electronics",
    },
  });

  // 3. Optionally create a Wishlist item to link user and product
  // await prisma.wishlist.create({
  //   data: {
  //     userId: user.id,
  //     productId: product.id,
  //   },
  // });

  console.log("✅ Google User ID:", user.id);
  console.log("✅ Product ID:", product.id);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
