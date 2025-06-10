"use client"
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { use } from 'react'
import { Separator } from '@/components/ui/separator'
import CollectionsPage from '@/components/(landingPage)/collections'
import { useToast } from "@/hooks/use-toast"
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
  const { toast } = useToast()
  useEffect(() => {
    const fetchProduct = async () => {
      try {
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
  const addToCart = (product: Product) => {
    //   if (!product.inStock) {
    //     toast({
    //       title: "Out of Stock",
    //       description: "This item is currently out of stock.",
    //       variant: "destructive",
    //     })
    //     return
    //   }

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
  if (loading) return <div className="bg-white text-black justify-center min-h-screen text-center">Loading...</div>
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
            <div className="p-4">
              <Image
                src={product.imageUrl}
                alt={product.title}
                width={500}
                height={500}
                className="object-contain w-full h-auto"
              />
            </div>
          </div>

          <div className='ml-20'>
            <h1 className="text-4xl font-bold mb-1">{product.title}</h1>
            <Separator className="my-2" />
            <p className="text-gray-800 pt-6 text-sm mb-4">{product.description}</p>

            <div className="text-4xl pt-6 font-semibold text-black mb-6">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(product.price)}
            </div>
            <Separator className="my-2" />
            <div className="flex pt-6 items-center gap-8">
              <div className="flex text-3xl items-center gap-4 px-2 py-1 rounded-md">
                <Minus className="w-4 h-4 cursor-pointer" />
                <span>1</span>
                <Plus className="w-4 h-4 cursor-pointer" />
              </div>

              {/* <Button className="bg-red-500 hover:bg-red-600"> */}
              <Button
                onClick={() => addToCart(product)}
                // disabled={product.inStock === false}
                className="w-1/2 bg-black text-white hover:bg-gray-800 transition-colors"
                variant={"default"}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              {/* </Button> */}
            </div>
          </div>
        </div>
      </div>
      <CollectionsPage />
    </div>
  )
}
