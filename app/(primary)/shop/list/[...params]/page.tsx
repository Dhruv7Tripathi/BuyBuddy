'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ProductFilters } from "@/components/sideFilter"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import { useToast } from "@/hooks/use-toast"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import axios from 'axios'
import { notFound } from 'next/navigation'
import { use } from 'react'

interface Product {
  id: string
  title: string
  imageUrl: string
  description: string
  price: number
  inStock?: boolean
  category?: string
}

// interface CartItem extends Product {
//   quantity: number
// }

interface Props {
  params: Promise<{ params: string[] }>
}

export default function ListPage({ params }: Props) {
  const { params: dynamicParams } = use(params)
  const category = dynamicParams?.[0]

  const [products, setProducts] = useState<Product[]>([])
  // const [cart, setCart] = useState<CartItem[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/product")
        const filtered = response.data.filter((p: Product) =>
          p.category?.toLowerCase().includes(category?.toLowerCase())
        )
        setProducts(filtered)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      }
    }

    if (category) {
      fetchProducts()
    }
  }, [category])

  const addToCart = (product: Product) => {
    if (!product.inStock) {
      toast({
        title: "Out of Stock",
        description: "This item is currently out of stock.",
        variant: "destructive",
      })
      return
    }

    // setCart((prevCart) => {
    //   const existingItem = prevCart.find((item) => item.id === product.id)
    //   if (existingItem) {
    //     const updatedCart = prevCart.map((item) =>
    //       item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
    //     )
    //     localStorage.setItem("cart", JSON.stringify(updatedCart))
    //     return updatedCart
    //   } else {
    //     const newCart = [...prevCart, { ...product, quantity: 1 }]
    //     localStorage.setItem("cart", JSON.stringify(newCart))
    //     return newCart
    //   }
    // })


    toast({
      title: "Added to Cart",
      description: `${product.title} has been added to your cart.`,
    })
  }
  // const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)


  if (!category) return notFound()

  return (
    <div>
      <section className="py-6 bg-gray-300 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 capitalize">
          {category}
        </h2>
        <Link href="/" className="text-gray-600">Home</Link>
        <span className="mx-2 text-gray-600">/</span>
        <span className="text-black capitalize">{category}</span>
        <p className="text-gray-600 mt-2">Explore our collection of {category}</p>
      </section>

      <section className="bg-gray-50 py-10 px-4">
        <div className="flex gap-6">
          <div className="w-80 flex-shrink-0">
            <ProductFilters />
          </div>
          <Separator orientation="vertical" className="h-auto border-gray-600" />
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition"
                >
                  <div className="w-full h-48 flex justify-center items-center">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      width={200}
                      height={200}
                      className="object-contain h-full"
                    />
                  </div>
                  <div className="mt-4 space-y-1">
                    <h3 className="text-md font-semibold text-gray-900">{product.title}</h3>
                    <p className="text-sm text-gray-500">{product.description}</p>
                  </div>
                  <div className="mt-4 flex justify-between items-end">
                    <p className="text-lg font-semibold text-gray-800">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(product.price)}
                    </p>
                  </div>
                  <Button
                    onClick={() => addToCart(product)}
                    disabled={product.inStock === false}
                    className="w-full"
                    variant={product.inStock ? "default" : "secondary"}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
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
