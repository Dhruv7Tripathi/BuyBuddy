"use client";
import { Button } from "@/components/ui/button";
import Navbar from "./navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import Sidebar from "@/components/(landingPage)/sidebar";
import TopSellingProducts from "./topSellingProduct";
import SelectedBrands from "./selectedBrands";
import Collections from "./collections";
import Footer from "./footer";
import Link from "next/link";
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
  // const [cart, setCart] = useState();
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

        <div className="grid pt-10 ml-6 mr-4 grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 to-gray-700 p-8 text-white">
            <div className="relative z-10 space-y-4">
              <h2 className="text-2xl font-bold">Watches</h2>
              <p className="text-xl font-bold">Save Up to 99€</p>
              <Link href="/shop/watches">
                <Button variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                  Show Deals
                </Button>
              </Link>
            </div>
            <div className="absolute right-0 top-0 h-full w-full">
              <Image
                src="/watch.webp"
                alt="Camera lens"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 p-8 text-white">
            <div className="relative z-10 space-y-4">
              <h2 className="text-2xl font-bold">Laptops</h2>
              <p className="text-xl font-bold">Save Up to 99€</p>
              <Link href="/shop/laptops">

                <Button variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                  Show Deals
                </Button>
              </Link>
            </div>
            <div className="absolute right-0 top-0 h-full w-full">
              <Image
                src="/laptop.jpg"
                alt="laptop"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 p-8 text-white">
            <div className="relative z-10 space-y-4">
              <h2 className="text-2xl font-bold">Accessories</h2>
              <p className="text-xl font-bold">Save Up to 99€</p>
              <Link href="/shop/accessories">

                <Button variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                  Show Deals
                </Button>
              </Link>
            </div>
            <div className="absolute right-0 top-0 h-full w-full">
              <Image
                src="/ps5II.webp"
                alt="buds"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        <TopSellingProducts />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 to-gray-700 p-8 text-white">
            <div className="relative z-10 space-y-4">
              <h2 className="text-2xl font-bold">Watches</h2>
              <p className="text-3xl font-bold">Save Up to 99€</p>
              <Link href={"/shop/list/watches"}>
                <Button variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                  Show Deals
                </Button>
              </Link>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2">
              <Image
                src="/watch.webp"
                alt="Camera lens"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 p-8 text-white">
            <div className="relative z-10 space-y-4">
              <h2 className="text-2xl font-bold">Laptops</h2>
              <p className="text-3xl font-bold">Save Up to 99€</p>
              <Link href={"/shop/list/laptops"}>
                <Button variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                  Show Deals
                </Button>
              </Link>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2">
              <Image
                src="/laptop.jpg"
                alt="Drone"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
      <Collections />
      <SelectedBrands />
      <Footer />
    </div>
  );
}
