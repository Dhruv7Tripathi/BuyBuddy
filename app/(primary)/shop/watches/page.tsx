"use client"
import React from 'react'
import Image from 'next/image'
// import { watches } from "@/content/shop"
import { ProductFilters } from "@/components/sideFilter"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import { useState } from 'react'
import { useToast } from "@/hooks/use-toast"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'


interface watches {
  id: number
  title: string
  image: string
  description: string[]
  price: number
  inStock?: boolean
}
interface CartItem extends watches {
  quantity: number
}
export default function Watches() {
  const [cart, setCart] = useState<CartItem[]>([])
  const { toast } = useToast()

  const addToCart = (product: watches) => {
    if (!product.inStock) {
      toast({
        title: "Out of Stock",
        description: "This item is currently out of stock.",
        variant: "destructive",
      })
      return
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        const updatedCart = prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
        localStorage.setItem("cart", JSON.stringify(updatedCart))
        return updatedCart
      } else {
        const newCart = [...prevCart, { ...product, quantity: 1 }]
        localStorage.setItem("cart", JSON.stringify(newCart))
        return newCart
      }
    })

    toast({
      title: "Added to Cart",
      description: `${product.title} has been added to your cart.`,
    })
  }

  // const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)
  const watches = [
    {
      id: 1,
      title: "Rolex Submariner",
      image: "/watches/rolex-submariner.jpg",
      description: [
        "Classic diving watch",
        "Automatic movement",
        "Water-resistant up to 300m"
      ],
      price: 8500,
      inStock: true
    },
    {
      id: 2,
      title: "Omega Speedmaster",
      image: "/watches/omega_speedmaster.webp",
      description: [
        "Iconic chronograph",
        "Manual winding movement",
        "Moonwatch heritage"
      ],
      price: 5200,
      inStock: true
    },
    {
      id: 3,
      title: "Tag Heuer Carrera",
      image: "/watches/tag_heuer_carrera.avif",
      description: [
        "Sporty design",
        "Automatic movement",
        "Water-resistant up to 100m"
      ],
      price: 3500,
      inStock: true
    },
    {
      id: 4,
      title: "Breitling Navitimer",
      image: "/watches/breitling_navitimer.jpg",
      description: [
        "Aviator's watch",
        "Chronograph function",
        "Slide rule bezel"
      ],
      price: 7800,
      inStock: true
    },
    {
      id: 5,
      title: "Patek Philippe Nautilus",
      image: "/watches/patek_philippe_nautilus.webp",
      description: [
        "Luxury sports watch",
        "Automatic movement",
        "Iconic design"
      ],
      price: 30000,
      inStock: true
    },
    {
      id: 6,
      title: "Cartier Tank",
      image: "/watches/cartier_tank.webp",
      description: [
        "Elegant dress watch",
        "Quartz movement",
        "Timeless design"
      ],
      price: 4000,
      inStock: true
    },
    // {
    //   title: "IWC Pilot's Watch",
    //   image: "/watches/iwc_pilots_watch.webp",
    //   description: [
    //     "Aviator's watch",
    //     "Automatic movement",
    //     "Large legible dial"
    //   ],
    //   price: "$6,500"
    // },
    {
      id: 7,
      title: "Seiko Prospex Diver",
      image: "/watches/seiko_prospex_diver.webp",
      description: [
        "Affordable diving watch",
        "Automatic movement",
        "Water-resistant up to 200m"
      ],
      price: 500,
      inStock: true
    }
  ]


  return (
    <div>
      <section className="py-6 bg-gray-300 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Watches</h2>
        <Link href={"/"} className='text-gray-600'>
          Home
        </Link>
        <span className="mx-2 text-gray-600">/</span>
        <a className="text-black hover:underline">Watches</a>
        <p className="text-gray-600 mt-2">Explore our collection of smart watches</p>
      </section>
      <section className="bg-gray-50 py-10 px-4">
        <div className="flex gap-6">
          <div className="w-80 flex-shrink-0">
            <ProductFilters />
          </div>
          <Separator orientation="vertical" className="h-auto border-gray-600" />
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {watches.map((watch, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition"
                >
                  <div className="w-full h-48 flex justify-center items-center">
                    <Image
                      src={watch.image}
                      alt={watch.title}
                      width={200}
                      height={200}
                      className="object-contain h-full"
                    />
                  </div>
                  <div className="mt-4 space-y-1">
                    <h3 className="text-md font-semibold text-gray-900">{watch.title}</h3>
                    {watch.description.map((line, i) => (
                      <p key={i} className="text-sm text-gray-500">
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between items-end">
                    <p className="text-lg font-semibold text-gray-800">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(watch.price)}
                    </p>

                  </div>
                  <Button
                    onClick={() => addToCart(watch)}
                    disabled={watch.inStock === false}
                    className="w-full"
                    variant={watch.inStock ? "default" : "secondary"}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {watch.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}