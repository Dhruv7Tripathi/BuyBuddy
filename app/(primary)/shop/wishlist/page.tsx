"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2, ArrowLeft, Loader2, Package, Sparkles } from "lucide-react"
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

const EnhancedProductCard = ({
  wishlistItem,
  onRemove,
  onAddToCart,
  onMoveToCart,
  isRemoving,
  isMoving,
}: {
  wishlistItem: WishlistItem
  onRemove: (id: string) => void
  onAddToCart: (product: Product) => void
  onMoveToCart: (item: WishlistItem) => void
  isRemoving: boolean
  isMoving: boolean
}) => {
  const { product } = wishlistItem
  const isDisabled = isRemoving || isMoving

  return (
    <Card
      className={`group relative overflow-hidden border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2 ${isDisabled ? "opacity-50" : ""}`}
    >
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg overflow-hidden">
        <Link href={`/shop/product/${product.id}`}>
          <div className="relative overflow-hidden">
            <Image
              src={product.imageUrl || "/placeholder.svg?height=320&width=320"}
              alt={product.title}
              width={320}
              height={320}
              className="w-full h-56 sm:h-64 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

          </div>
        </Link>

        {product.inStock === false && (
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 text-xs font-medium bg-red-500 text-white border-0 shadow-lg animate-pulse"
          >
            Out of Stock
          </Badge>
        )}
        <Button
          size="icon"
          variant="default"
          className="absolute top-3 right-3 bg-white/95 hover:bg-red-50 hover:border-red-200 shadow-lg border-0 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0"
          onClick={() => onRemove(wishlistItem.id)}
          disabled={isDisabled}
        >
          {isRemoving ? (
            <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
          ) : (
            <Trash2 className="h-4 w-4 text-gray-600 hover:text-red-600 transition-colors duration-300" />
          )}
        </Button>

      </div>
      <CardContent className="p-5 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-b-lg" />

        <div className="relative z-10 space-y-4">
          {product.category && (
            <Badge
              variant="outline"
              className="text-xs font-medium bg-gradient-to-r from-gray-50 to-gray-100 text-green-700 border-emerald-200 group-hover:from-gray-100 group-hover:to-gray-100 transition-all duration-300"
            >
              {product.category}
            </Badge>
          )}

          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-base line-clamp-2 text-gray-900 hover:text-gray-600 transition-colors duration-300 leading-tight group-hover:text-gray-700">
              {product.title}
            </h3>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col gap-3 pt-2 transform group-hover:translate-y-0 transition-transform duration-300">
            <Button
              className="w-full text-sm font-medium text-white bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              onClick={() => onAddToCart(product)}
              disabled={product.inStock === false || isDisabled}
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>

            <Button
              variant="outline"
              onClick={() => onMoveToCart(wishlistItem)}
              disabled={product.inStock === false || isDisabled}
              size="sm"
              className="w-full text-sm font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              {isMoving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Heart className="h-4 w-4 mr-2" />}
              Move to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function EnhancedWishlistPage() {
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
      await axios.post("/api/cart", {
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
      await axios.post("/api/wishlist/move-to-cart", {
        wishlistItemId: wishlistItem.id,
        quantity: 1,
      })

      toast({
        title: "Moved to Cart",
        description: `${wishlistItem.product.title} has been moved to your cart.`,
      })
    } catch (error) {
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b sticky top-0 z-10 lg:hidden">
          <div className="px-4 py-4">
            <div className="flex items-center">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="mr-3 p-2 hover:bg-gray-50 hover:text-gray-600 transition-colors duration-300"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Wishlist
                </h1>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 lg:py-16">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto">
            <div className="relative mb-8 group">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-red-100 via-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <Heart className="h-12 w-12 sm:h-16 sm:w-16 text-red-500 group-hover:text-red-600 transition-colors duration-300" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Your wishlist is waiting
            </h1>
            <p className="text-gray-600 mb-8 text-sm sm:text-base leading-relaxed">
              Save items you love by clicking the heart icon on any product. Create your perfect collection of favorites
              and never lose track of what catches your eye.
            </p>

            <div className="space-y-4 w-full">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <Link href="/">
                  <Package className="w-4 h-4 mr-2" />
                  Start Shopping
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b sticky top-0 z-10 lg:hidden">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="mr-3 p-2 hover:bg-gray-50 hover:text-gray-600 transition-colors duration-300"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Wishlist
                  </h1>
                  <p className="text-xs text-gray-600 font-medium">{wishlistItems.length} items saved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container  px-12 py-8 lg:py-12">
        <div className="hidden lg:flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-4 mb-3">

              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                My Wishlist
              </h1>
            </div>
            <p className="text-gray-600 text-lg font-medium">
              {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((wishlistItem, index) => (
            <div
              key={wishlistItem.id}
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <EnhancedProductCard
                wishlistItem={wishlistItem}
                onRemove={removeFromWishlist}
                onAddToCart={addToCart}
                onMoveToCart={moveToCart}
                isRemoving={removingItems.has(wishlistItem.id)}
                isMoving={movingItems.has(wishlistItem.id)}
              />
            </div>
          ))}
        </div>

        {/* <div className="mt-16 text-center bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl p-8 lg:p-12 shadow-lg border border-blue-100/50">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg hover:scale-110 transition-transform duration-500">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Looking for more?
            </h2>
            <p className="text-gray-600 mb-8 text-base leading-relaxed">
              Discover more amazing products and add them to your wishlist. Your perfect finds are just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="min-w-[160px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/">
                  <Package className="w-4 h-4 mr-2" />
                  Browse All Products
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="min-w-[160px] hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/categories">View Categories</Link>
              </Button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
