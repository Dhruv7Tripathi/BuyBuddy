"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "./navbar"
import Image from "next/image"
import { useEffect, useState } from "react"
import TopSellingProducts from "./topSellingProduct"
import SelectedBrands from "./selectedBrands"
import Collections from "./collections"
import Footer from "./footer"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const heroImages = [
  {
    src: "/(landingpage)/ps5.webp",
    alt: "PlayStation 5 Console and Controller",
    title: "PLAY STATION 5",
    subtitle: "Next-Gen Gaming Experience",
  },
  {
    src: "/(landingpage)/laptop.jpg",
    alt: "Laptop",
    title: "High Performance Laptops",
    subtitle: "Power Your Productivity",
  },
  {
    src: "/(landingpage)/watch.webp",
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
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 lg:mt-12">
        <div
          className="relative bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl sm:rounded-2xl overflow-hidden h-[400px] sm:h-[450px] lg:h-[500px] shadow-xl lg:shadow-2xl group"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </button>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-8 sm:py-12 z-10">
            <div className="text-white max-w-full md:max-w-lg z-20 relative">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4 leading-tight drop-shadow-lg">
                {currentImage.title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 lg:mb-8 text-white/90 drop-shadow-md">
                {currentImage.subtitle}
              </p>
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold shadow-lg"
              >
                Shop Now
              </Button>
            </div>
          </div>

          <div className="absolute inset-0 md:right-0 md:top-0 md:w-1/2 lg:w-full h-full">
            <Image
              src={currentImage.src || "/placeholder.svg"}
              alt={currentImage.alt}
              fill
              className="object-cover transition-all duration-700 transform hover:scale-105 opacity-30 md:opacity-100"
            />
            <div className="absolute inset-0 bg-black/40 md:bg-transparent"></div>
          </div>

          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8 lg:mt-10">
          <div className="relative group overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-gray-900 to-gray-700 p-4 sm:p-6 lg:p-8 text-white">
            <div className="relative z-10 space-y-2 sm:space-y-4">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Watches</h2>
              <p className="text-base sm:text-lg lg:text-xl font-bold">Save Up to $99</p>
              <Link href="/shop/list/watches">
                <Button
                  variant="default"
                  className="bg-white mt-2 sm:mt-4 text-gray-900 hover:bg-gray-100 text-sm sm:text-base"
                >
                  Show Deals
                </Button>
              </Link>
            </div>
            <div className="absolute opacity-30 sm:opacity-50 right-0 top-0 h-full w-full">
              <Image
                src="/(landingpage)/watch.webp"
                alt="Watch"
                fill
                className="object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 p-4 sm:p-6 lg:p-8 text-white">
            <div className="relative z-10 space-y-2 sm:space-y-4">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Laptops</h2>
              <p className="text-base sm:text-lg lg:text-xl font-bold">Save Up to $99</p>
              <Link href="/shop/list/laptops">
                <Button
                  variant="default"
                  className="bg-white mt-2 sm:mt-4 text-gray-900 hover:bg-gray-100 text-sm sm:text-base"
                >
                  Show Deals
                </Button>
              </Link>
            </div>
            <div className="absolute opacity-30 sm:opacity-50 right-0 top-0 h-full w-full">
              <Image
                src="/(landingpage)/laptop.jpg"
                alt="Laptop"
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 p-4 sm:p-6 lg:p-8 text-white sm:col-span-2 lg:col-span-1">
            <div className="relative z-10 space-y-2 sm:space-y-4">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Accessories</h2>
              <p className="text-base sm:text-lg lg:text-xl font-bold">Save Up to $99</p>
              <Link href="/shop/list/accessories">
                <Button
                  variant="default"
                  className="bg-white mt-2 sm:mt-4 text-gray-900 hover:bg-gray-100 text-sm sm:text-base"
                >
                  Show Deals
                </Button>
              </Link>
            </div>
            <div className="absolute opacity-30 sm:opacity-50 right-0 top-0 h-full w-full">
              <Image
                src="/(landingpage)/ps5II.webp"
                alt="Accessories"
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="mt-8 sm:mt-10 lg:mt-12">
          <TopSellingProducts />
        </div>

        {/* Featured Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-10 lg:mt-12">
          <Card className="group relative overflow-hidden rounded-xl sm:rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-[#1f1f1f]">
            <div className="relative p-4 sm:p-6 lg:p-8 xl:p-10 text-gray-900 dark:text-white h-48 sm:h-56 lg:h-64">
              <div className="relative z-10 space-y-2 sm:space-y-3 lg:space-y-5">
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold">Premium Watches</h2>
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 dark:text-gray-300 mt-1 sm:mt-2">
                    Luxury Timepieces
                  </p>
                </div>
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">Save Up to $199</p>
                <Link href="/shop/list/watches">
                  <Button
                    size="lg"
                    className="bg-gray-200 hover:bg-gray-200 mt-2 sm:mt-3 text-gray-900 hover:scale-105 transition-transform duration-300 dark:bg-gray-100 dark:text-black text-sm sm:text-base"
                  >
                    Explore Collection
                  </Button>
                </Link>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/3 sm:w-1/2 pointer-events-none">
                <Image
                  src="/(landingpage)/watch.webp"
                  alt="Premium Watch"
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </Card>

          <Card className="group relative overflow-hidden rounded-xl sm:rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-[#1f1f1f]">
            <div className="relative p-4 sm:p-6 lg:p-8 xl:p-10 text-gray-900 dark:text-white h-48 sm:h-56 lg:h-64">
              <div className="relative z-10 space-y-2 sm:space-y-3 lg:space-y-5">
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold">Gaming Laptops</h2>
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 dark:text-gray-300 mt-1 sm:mt-2">
                    Ultimate Performance
                  </p>
                </div>
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">Save Up to $399</p>
                <Link href="/shop/list/laptops">
                  <Button
                    size="lg"
                    className="bg-gray-200 hover:bg-gray-200 mt-2 sm:mt-3 text-gray-900 hover:scale-105 transition-transform duration-300 dark:bg-gray-100 dark:text-black text-sm sm:text-base"
                  >
                    Shop Gaming
                  </Button>
                </Link>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/3 sm:w-1/2 pointer-events-none">
                <Image
                  src="/(landingpage)/laptop.jpg"
                  alt="Gaming Laptop"
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
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
  )
}
