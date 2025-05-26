"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Star, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  inStock: boolean
}

interface CartItem extends Product {
  quantity: number
}

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 128,
    category: "Electronics",
    inStock: true,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 89,
    category: "Wearables",
    inStock: true,
  },
  {
    id: 3,
    name: "Premium Coffee Maker",
    price: 149.99,
    originalPrice: 179.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.3,
    reviews: 67,
    category: "Kitchen",
    inStock: true,
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: 299.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 156,
    category: "Furniture",
    inStock: true,
  },
  {
    id: 5,
    name: "4K Webcam",
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.4,
    reviews: 92,
    category: "Electronics",
    inStock: false,
  },
  {
    id: 6,
    name: "Wireless Charging Pad",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.2,
    reviews: 203,
    category: "Electronics",
    inStock: true,
  },
  {
    id: 7,
    name: "Gaming Mechanical Keyboard",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 145,
    category: "Gaming",
    inStock: true,
  },
  {
    id: 8,
    name: "Portable Bluetooth Speaker",
    price: 59.99,
    originalPrice: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 178,
    category: "Audio",
    inStock: true,
  },
]

export default function ShoppingPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const { toast } = useToast()

  const addToCart = (product: Product) => {
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
      description: `${product.name} has been added to your cart.`,
    })
  }

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : i < rating
              ? "fill-yellow-400/50 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">ShopHub</h1>
            </div>
            <Link href="/cart">
              <Button variant="outline" className="relative">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
          <p className="text-gray-600">Discover our best-selling items and latest arrivals</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  {product.originalPrice && <Badge className="absolute top-2 left-2 bg-red-500">Sale</Badge>}
                  {!product.inStock && (
                    <Badge variant="secondary" className="absolute top-2 right-2">
                      Out of Stock
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>

                  <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center space-x-1">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                  className="w-full"
                  variant={product.inStock ? "default" : "secondary"}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
