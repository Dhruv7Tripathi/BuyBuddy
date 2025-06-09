"use client"
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Star, ShoppingCart, Minus, Plus } from 'lucide-react'
import axios from 'axios'

interface Product {
  id: string
  title: string
  imageUrl: string
  description: string
  price: number
  inStock?: boolean
  rating?: number
  reviews?: number
  category?: string
  focalLength?: string
  aperture?: string
}

interface ProductPageProps {
  params: { id: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${params.id}`)
    const product: Product = response.data

    if (!product) return notFound()

    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-4 text-sm text-gray-500">
          <Link href="/">Home</Link> / <Link href={`/list/${product.category}`}>{product.category}</Link> / {product.title}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="border rounded-lg p-4">
              <Image
                src={product.imageUrl}
                alt={product.title}
                width={500}
                height={500}
                className="object-contain w-full h-auto"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center mb-2">
              <div className="flex items-center text-yellow-400 mr-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4" fill="currentColor" />
                ))}
              </div>
              <span className="text-blue-600 text-sm">{product.reviews || 880} User Reviews</span>
            </div>

            <h1 className="text-2xl font-bold mb-1">{product.title}</h1>
            <p className="text-gray-500 text-sm mb-4">{product.description}</p>

            <div className="mb-4 space-y-1">
              {product.aperture && <p className="text-gray-700">f./{product.aperture}</p>}
              {product.focalLength && <p className="text-gray-700">{product.focalLength}</p>}
            </div>

            <div className="text-2xl font-semibold text-gray-800 mb-6">
              {new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'EUR',
              }).format(product.price)}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 border px-2 py-1 rounded-md">
                <Minus className="w-4 h-4 cursor-pointer" />
                <span>1</span>
                <Plus className="w-4 h-4 cursor-pointer" />
              </div>

              <Button className="bg-red-500 hover:bg-red-600">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Failed to fetch product:", error)
    return notFound()
  }
}
