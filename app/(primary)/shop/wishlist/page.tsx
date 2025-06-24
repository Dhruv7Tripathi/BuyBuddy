"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import axios from "axios"
import Loader from "@/components/(landingPage)/loading"

interface Product {
  id: string
  title: string
  price: number
  imageUrl: string
  description?: string
  category?: string
  inStock?: boolean
  rating?: number
  reviewCount?: number
}

interface WishlistItem {
  id: string
  userId: string
  productId: string
  product: Product
  createdAt: string
}

interface WishlistResponse {
  items: WishlistItem[]
  count: number
}

export default function WishlistPage() {
  const { status } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set())
  const [movingItems, setMovingItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    } else if (status === "authenticated") {
      fetchWishlist()
    }
  }, [status, router])

  const fetchWishlist = async () => {
    try {
      setLoading(true)
      const response = await axios.get<WishlistResponse>("/api/wishlist/get")
      setWishlistItems(response.data.items || [])
    } catch (error: unknown) {
      console.error("Error fetching wishlist:", error)
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast({
          title: "Please Sign In",
          description: "You need to be signed in to view your wishlist.",
          variant: "destructive",
        })
        router.push("/signin")
      } else {
        toast({
          title: "Error Loading Wishlist",
          description: "Failed to load your wishlist. Please refresh the page.",
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = async (wishlistItemId: string) => {
    const originalItems = [...wishlistItems]
    const updatedItems = wishlistItems.filter((item) => item.id !== wishlistItemId)
    setWishlistItems(updatedItems)
    setRemovingItems((prev) => new Set(prev).add(wishlistItemId))

    try {
      await axios.delete(`/api/wishlist/remove/${wishlistItemId}`)
      toast({
        title: "Removed from Wishlist",
        description: "Item has been removed from your wishlist.",
      })
    } catch (error) {
      setWishlistItems(originalItems)
      console.error("Error removing from wishlist:", error)
      toast({
        title: "Remove Failed",
        description: "Failed to remove item. Please try again.",
        variant: "destructive",
      })
    } finally {
      setRemovingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(wishlistItemId)
        return newSet
      })
    }
  }

  const addToCart = async (product: Product) => {
    if (product.inStock === false) {
      toast({
        title: "Out of Stock",
        description: "This item is currently out of stock.",
        variant: "destructive",
      })
      return
    }

    try {
      await axios.post("/api/cart/add", {
        productId: product.id,
        quantity: 1,
      })

      toast({
        title: "Added to Cart",
        description: `${product.title} has been added to your cart.`,
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast({
        title: "Add to Cart Failed",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    }
  }

  const moveToCart = async (wishlistItem: WishlistItem) => {
    if (wishlistItem.product.inStock === false) {
      toast({
        title: "Out of Stock",
        description: "This item is currently out of stock.",
        variant: "destructive",
      })
      return
    }

    const originalItems = [...wishlistItems]
    const updatedItems = wishlistItems.filter((item) => item.id !== wishlistItem.id)
    setWishlistItems(updatedItems)
    setMovingItems((prev) => new Set(prev).add(wishlistItem.id))

    try {
      await axios.post("/api/cart", {
        wishlistItemId: wishlistItem.id,
        quantity: 1,
      })

      toast({
        title: "Moved to Cart",
        description: `${wishlistItem.product.title} has been moved to your cart.`,
      })
    } catch (error) {
      // Revert on error
      setWishlistItems(originalItems)
      console.error("Error moving to cart:", error)
      toast({
        title: "Move Failed",
        description: "Failed to move item to cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setMovingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(wishlistItem.id)
        return newSet
      })
    }
  }

  if (loading) {
    return (

      <Loader />

    )
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-10 lg:hidden">
          <div className="px-4 py-3">
            <div className="flex items-center">
              <Link href="/">
                <Button variant="ghost" size="sm" className="mr-3 p-2">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <h1 className="text-lg font-bold text-gray-900">Wishlist</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 lg:py-16">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <Heart className="h-16 w-16 sm:h-24 sm:w-24 text-gray-300 mb-6" />
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Your wishlist is empty</h1>
            <p className="text-gray-600 mb-8 max-w-md text-sm sm:text-base">
              Save items you love by clicking the heart icon on any product. They&apos;ll appear here for easy access
              later.
            </p>
            <Button asChild className="w-full max-w-xs" size="lg">
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10 lg:hidden">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <Button variant="ghost" size="sm" className="mr-3 p-2">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Wishlist</h1>
                <p className="text-xs text-gray-600">{wishlistItems.length} items saved</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-2">
              {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {wishlistItems.map((wishlistItem) => {
            const { product } = wishlistItem
            const isRemoving = removingItems.has(wishlistItem.id)
            const isMoving = movingItems.has(wishlistItem.id)
            const isDisabled = isRemoving || isMoving

            return (
              <Card
                key={wishlistItem.id}
                className={`group relative overflow-hidden ${isDisabled ? "opacity-50" : ""}`}
              >
                <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
                  <Link href={`/product/${product.id}`}>
                    <Image
                      src={product.imageUrl || "/placeholder.svg?height=300&width=300"}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="w-full h-48 sm:h-64 object-cover transition-transform group-hover:scale-105"
                    />
                  </Link>

                  {product.inStock === false && (
                    <Badge variant="secondary" className="absolute top-2 left-2 text-xs">
                      Out of Stock
                    </Badge>
                  )}

                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute top-2 right-2 bg-black/90 hover:bg-black shadow-sm"
                    onClick={() => removeFromWishlist(wishlistItem.id)}
                    disabled={isDisabled}
                  >
                    {isRemoving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  </Button>
                </div>

                <CardContent className="p-3 sm:p-4">
                  <div className="space-y-2 sm:space-y-3">
                    {product.category && (
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    )}

                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-sm sm:text-base line-clamp-2 hover:text-blue-600 transition-colors">
                        {product.title}
                      </h3>
                    </Link>



                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl font-bold text-white">${product.price.toFixed(2)}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <Button
                        className="flex-1 text-sm"
                        onClick={() => addToCart(product)}
                        disabled={product.inStock === false || isDisabled}
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => moveToCart(wishlistItem)}
                        disabled={product.inStock === false || isDisabled}
                        size="sm"
                        className="text-sm"
                      >
                        {isMoving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        Move to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Continue Shopping Section */}
        <div className="mt-12 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900">Looking for more?</h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">Discover more products you might love</p>
          <Button asChild size="lg">
            <Link href="/">Browse All Products</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
