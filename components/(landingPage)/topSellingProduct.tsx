"use client";

import Image from "next/image";

const products = [
  {
    title: "Noice",
    description: ["Built-In Microphone", "3rd generation", "Water Resistant"],
    price: "129.99€",
    image: "/buds.webp",
    originalPrice: null,
  },
  {
    title: "Apple Watch Ultra 2",
    description: ["GPS + Cellular", "Titanium", "49mm"],
    price: "799.00€",
    image: "/watch.webp",
    originalPrice: null,
  },
  {
    title: "ASUS ROG Laptop",
    description: ["32GB RAM", "17inch display", "OLED Display"],
    price: "2,149.99€",
    originalPrice: "2,499.99€",
    image: "/laptop.png",
  },
  {
    title: "PS5 Controller",
    description: ["Bluetooth", "Version 2"],
    price: "69.00€",
    image: "/controller.jpg",
    originalPrice: null,
  },
  {
    title: "Sony Alpha 7RV",
    description: ["Full Frame", "Body", "40MP"],
    price: "3,699.00€",
    originalPrice: "4,499.00€",
    image: "/sony.jpg",
  },
];

export default function TopSellingProducts() {
  return (
    <section className="bg-gray-50 py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Top Selling Products</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition"
          >
            <div className="w-full h-48 flex justify-center items-center">
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="object-contain h-full"
              />
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="text-md font-semibold text-gray-900">{product.title}</h3>
              {product.description.map((line, i) => (
                <p key={i} className="text-sm text-gray-500">
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-end">
              <p className="text-lg font-semibold text-gray-800">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
