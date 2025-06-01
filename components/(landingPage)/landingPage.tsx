"use client";
import { Button } from "@/components/ui/button";
import Navbar from "./navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import Sidebar from "@/components/(landingPage)/sidebar";
import TopSellingProducts from "./topSellingProduct";
const heroImages = [
  {
    src: "/ps5.webp",
    alt: "PlayStation 5 Console and Controller",
    title: "PLAY STATION 5",
  },
  {
    src: "/laptop.jpg",
    alt: "Laptop",
    title: "High Performance Laptops",
  },
  {
    src: "/robo.jpg",
    alt: "DJI Drone",
    title: "DJI Smart Drones",
  },
]
export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const currentImage = heroImages[currentIndex]
  return (
    <div className="bg-gray-50  min-h-screen">
      <Navbar />

      <div className=" container mx-auto px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-80 bg-white rounded-lg p-4 shadow-sm">
            <Sidebar />
          </aside>
          <main className="flex-1">
            <div className="mx-4 lg:mx-8 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg overflow-hidden relative h-96 shadow-md">
              <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between px-8 py-6">
                <div className="text-white max-w-md">
                  <h2 className="text-4xl font-bold mb-6">{currentImage.title}</h2>
                  <Button className="bg-black hover:bg-gray-900 text-white px-8 py-3">
                    Shop now!
                  </Button>
                </div>
                <div className="relative hidden md:block">
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    width={400}
                    height={300}
                    className="object-contain transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </main>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Smart Watches",
              bg: "bg-black",
              img: "/boat.webp",
            },
            {
              title: "Laptops",
              bg: "bg-gradient-to-r from-orange-400 to-pink-500",
              img: "/laptop.jpg",
            },
            {
              title: "DJI Products",
              bg: "bg-black",
              img: "/robo.jpg",
            },
          ].map((product, index) => (
            <div
              key={index}
              className={`${product.bg} rounded-lg p-6 text-white relative overflow-hidden h-32`}
            >
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <div className="absolute right-4 top-4">
                <Image
                  src={product.img}
                  alt={product.title}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
        <TopSellingProducts />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Smart Watches",
              bg: "bg-black",
              img: "/boat.webp",
            },
            {
              title: "Laptops",
              bg: "bg-gradient-to-r from-orange-400 to-pink-500",
              img: "/laptop.jpg",
            },
          ].map((product, index) => (
            <div
              key={index}
              className={`${product.bg} rounded-lg p-6 text-white relative overflow-hidden h-32`}
            >
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <div className="absolute right-4 top-4">
                <Image
                  src={product.img}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
