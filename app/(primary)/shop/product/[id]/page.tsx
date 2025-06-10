"use client"

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Star, ShoppingCart, Minus, Plus } from 'lucide-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { use } from 'react'
interface Product {
  id: string
  title: string
  imageUrl: string
  description: string
  price: number
  category?: string
}

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage(props: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const { id } = use(props.params)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching:", `${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`)
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`
        )

        setProduct(response.data)
      } catch (error) {
        console.error("Failed to fetch product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) return <div className="p-20 text-center">Loading...</div>
  if (!product) return notFound()

  return (
    <div className='bg-white text-black min-h-screen '>
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-4 text-sm text-black">
          <Link href="/">Home</Link> /{" "}
          <Link href={`/list/${product.category}`}>{product.category}</Link> /{" "}
          {product.title}
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
            </div>

            <h1 className="text-2xl font-bold mb-1">{product.title}</h1>
            <p className="text-gray-500 text-sm mb-4">{product.description}</p>

            <div className="text-2xl font-semibold text-white mb-6">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
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
    </div>
  )
}
