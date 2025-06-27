"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface Product {
  id: string
  title: string
  imageUrl: string | null
  description: string
  price: number
  category: string | null
  isTopProduct: boolean
}

export default function TopSellingProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch("/api/products/top")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Failed to fetch top products:", error)
        setError("Failed to load top products. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchTopProducts()
  }, [])

  if (loading) {
    return (
      <section className="bg-white py-10 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Top Selling Products</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl p-4 animate-pulse">
              <div className="w-full h-48 bg-gray-300 rounded"></div>
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-white py-10 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Top Selling Products</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="bg-white py-10 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Top Selling Products</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-600">No top products available at the moment.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Top Selling Products</h2>
        <Link href="/shop" className="text-blue-600 hover:text-blue-800 font-medium">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/shop/product/${product.id}`}
            className="bg-white rounded-xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition hover:ring-2 hover:ring-blue-100 focus:outline-none group"
          >
            <div className="relative">
              <div className="w-full h-48 flex justify-center items-center bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src={product.imageUrl || "/placeholder.svg?height=200&width=200"}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="object-contain h-full group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Top Pick
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="text-md font-semibold text-gray-900 line-clamp-2">{product.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
              {product.category && (
                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                  {product.category}
                </span>
              )}
            </div>
            <div className="mt-4 flex justify-between items-end">
              <p className="text-lg font-semibold text-gray-800">${product.price.toFixed(2)}</p>
              <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition">
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
