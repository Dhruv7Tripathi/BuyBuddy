'use client'

import React, { useEffect, useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { notFound } from 'next/navigation'
import { Heart } from 'lucide-react'
import Loader from '@/components/(landingPage)/loading'
interface Product {
  id: string
  title: string
  imageUrl: string
  description: string
  price: number
  category?: string
}

interface Props {
  params: Promise<{ params: string[] }>
}

export default function ListPage({ params }: Props) {
  const { params: dynamicParams } = use(params)
  const category = dynamicParams?.[0]
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/product")
        const filtered = response.data.filter((p: Product) =>
          p.category?.toLowerCase().includes(category?.toLowerCase())
        )
        setProducts(filtered)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }

    if (category) {
      fetchProducts()
    }
  }, [category])

  if (loading) {
    return <Loader />
  }
  if (!category) return notFound()

  const handleAddToWishlist = async (productId: string) => {
    try {
      await axios.post("/api/wishlist/", { productId })
      console.log("Added to wishlist:", productId)
    } catch (error) {
      console.error("Failed to add to wishlist:", error)
    }
  }

  return (
    <div >
      <section className="py-6  bg-gray-300 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 capitalize">
          {category}
        </h2>
        <Link href="/" className="text-gray-600">Home</Link>
        <span className="mx-2 text-gray-600">/</span>
        <span className="text-black capitalize">{category}</span>
        <p className="text-gray-600 mt-2">Explore our collection of {category}</p>
      </section>

      <section className="bg-gray-50 py-10 px-4">
        <div className="flex gap-6 ml-8 mr-8">
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="relative  bg-white  rounded-xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition"
                >
                  <Link href={`/shop/product/${product.id}`} className="block">
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
                    <div className="mt-4 pt-4 flex justify-between items-end">
                      <p className="text-lg bottom-2 absolute  font-semibold text-gray-800">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(product.price)}
                      </p>
                    </div>
                  </Link>

                  <button
                    onClick={() => handleAddToWishlist(product.id)}
                    className="absolute bottom-2 right-2 p-1 rounded-full hover:bg-gray-200 transition"
                  >
                    <Heart className="w-6 h-6 text-gray-500 hover:text-red-500 transition" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
