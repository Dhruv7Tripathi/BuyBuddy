"use client";
import { Button } from "@/components/ui/button";
import Navbar from "./navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import TopSellingProducts from "./topSellingProduct";
import SelectedBrands from "./selectedBrands";
import Collections from "./collections";
import Footer from "./footer";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card } from "../ui/card";

const heroImages = [
  {
    src: "/ps5.webp",
    alt: "PlayStation 5 Console and Controller",
    title: "PLAY STATION 5",
    subtitle: "Next-Gen Gaming Experience",
  },
  {
    src: "/laptop.jpg",
    alt: "Laptop",
    title: "High Performance Laptops",
    subtitle: "Power Your Productivity",
  },
  {
    src: "/watch.webp",
    alt: "Smart Watch",
    title: "Smart Watches",
    subtitle: "Stay Connected in Style",
  },
]
export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const currentImage = heroImages[currentIndex]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }
  return (
    <div className="bg-gray-50  min-h-screen">
      <Navbar />
      <div className=" container mx-auto px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-6">
          <main className="flex-1">
            <div
              className={`relative mx-4 lg:mx-8  bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl overflow-hidden h-[500px] shadow-2xl group`}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between px-8 py-12">
                <div className="text-white max-w-lg z-10">

                  <h1 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight">{currentImage.title}</h1>
                  <p className="text-xl mb-8 text-white/90">{currentImage.subtitle}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg"
                    >
                      Shop Now
                    </Button>
                  </div>
                </div>
                <div className="hidden lg:block w-full h-full">
                  <Image
                    src={currentImage.src || "/placeholder.svg"}
                    alt={currentImage.alt}
                    fill
                    className="object-cover transition-all duration-700 transform hover:scale-105"
                  />
                </div>
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                      }`}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
        <div className="grid pt-10 ml-6 mr-4 grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 to-gray-700 p-8 text-white">
            <div className="relative z-10 space-y-4">
              <h2 className="text-2xl font-bold">Watches</h2>
              <p className="text-xl mb-2 font-bold">Save Up to 99$</p>
              <Link href="/shop/list/watches">
                <Button variant="default" className="bg-white mt-4 text-gray-900 hover:bg-gray-100">
                  Show Deals
                </Button>
              </Link>
            </div>
            <div className="absolute opacity-50  right-0 top-0 h-full w-full">
              <Image
                src="/watch.webp"
                alt="Camera lens"
                fill
                className="object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
            </div>
          </div>


          <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 p-8 text-white">
            <div className="relative z-10 space-y-4">
              <h2 className="text-2xl font-bold">Laptops</h2>
              <p className="text-xl font-bold">Save Up to 99$</p>
              <Link href="/shop/list/laptops">
                <Button variant="default" className="bg-white mt-4 text-gray-900 hover:bg-gray-100">
                  Show Deals
                </Button>
              </Link>
            </div>
            <div className="absolute opacity-50 right-0 top-0 h-full w-full">
              <Image
                src="/laptop.jpg"
                alt="laptop"
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>


          <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 p-8 text-white">
            <div className="relative z-10 space-y-4">
              <h2 className="text-2xl font-bold">Accessories</h2>
              <p className="text-xl font-bold">Save Up to 99$</p>
              <Link href="/shop/list/accessories">
                <Button variant="default" className="bg-white mt-4 text-gray-900 hover:bg-gray-100">
                  Show Deals
                </Button>
              </Link>
            </div>
            <div className="absolute opacity-50 right-0 top-0 h-full w-full">
              <Image
                src="/ps5II.webp"
                alt="buds"
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

        </div>
        <div className="mt-10">
          <TopSellingProducts />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="group relative overflow-hidden rounded-2xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white dark:bg-[#1f1f1f]">
            <div className="relative p-10 text-gray-900 dark:text-white h-64">
              <div className="relative z-10 space-y-6">
                <div>
                  <h2 className="text-4xl font-bold">Premium Watches</h2>
                  <p className="text-xl text-gray-700 dark:text-white/90 mt-2">Luxury Timepieces</p>
                </div>
                <p className="text-3xl font-bold">Save Up to $199</p>
                <Link href="/shop/list/watches">
                  <Button
                    size="lg"
                    className="bg-white mt-4 text-gray-900 hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-gray-200 group-hover:scale-105 transition-transform duration-300"
                  >
                    Explore Collection
                  </Button>
                </Link>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2 transition-opacity duration-500">
                <Image
                  src="/watch.webp"
                  alt="Premium Watch"
                  fill
                  className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </Card>

          <Card className="group relative overflow-hidden rounded-2xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white dark:bg-[#1f1f1f]">
            <div className="relative p-10 text-gray-900 dark:text-white h-64">
              <div className="relative z-10 space-y-6">
                <div>
                  <h2 className="text-4xl font-bold">Gaming Laptops</h2>
                  <p className="text-xl text-gray-700 dark:text-white/90 mt-2">Ultimate Performance</p>
                </div>
                <p className="text-3xl font-bold">Save Up to $399</p>
                <Link href="/shop/list/laptops">
                  <Button
                    size="lg"
                    className="bg-white mt-4 text-gray-900 hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-gray-200 group-hover:scale-105 transition-transform duration-300"
                  >
                    Shop Gaming
                  </Button>
                </Link>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2 transition-opacity duration-500">
                <Image
                  src="/laptop.jpg"
                  alt="Gaming Laptop"
                  fill
                  className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </Card>
        </div>

      </div>
      <Collections />
      <SelectedBrands />
      <Footer />
    </div>
  );
}
