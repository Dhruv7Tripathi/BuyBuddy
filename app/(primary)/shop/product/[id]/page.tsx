"use client"
import { notFound } from "next/navigation"
import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingCart, Heart, ArrowLeft, Share2, Star } from "lucide-react"
import axios from "axios"
import { useEffect, useState, use } from "react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import CollectionsPage from "@/components/(landingPage)/collections"
import { useToast } from "@/hooks/use-toast"
import Loader from "@/components/(landingPage)/loading"

interface Product {
  id: string
  title: string
  imageUrl: string
  description: string
  price: number
  category?: string
  inStock?: boolean
  images?: string[]
  rating?: number
  reviewCount?: number
}

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage(props: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addingToCart, setAddingToCart] = useState(false)
  const [addingToWishlist, setAddingToWishlist] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const { toast } = useToast()
  const { id } = use(props.params)

  const minSwipeDistance = 50

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`)
        const productData = {
          ...response.data,
          inStock: response.data.inStock ?? true,
          rating: response.data.rating ?? 4.5,
          reviewCount: response.data.reviewCount ?? 128,
          images: response.data.images ?? [response.data.imageUrl],
        }

        setProduct(productData)
        checkWishlistStatus(productData.id)
      } catch (error) {
        console.error("Failed to fetch product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const checkWishlistStatus = async (productId: string) => {
    try {
      const response = await axios.get(`/api/wishlist/check/${productId}`)
      setIsWishlisted(response.data.isWishlisted)
    } catch (error) {
      console.error("Failed to check wishlist status:", error)
    }
  }

  const handleAddToWishlist = async () => {
    if (!product) return

    setAddingToWishlist(true)
    try {
      if (isWishlisted) {
        await axios.delete(`/api/wishlist/remove/${product.id}`)
        setIsWishlisted(false)
        toast({
          title: "Removed from Wishlist",
          description: `${product.title} has been removed from your wishlist.`,
        })
      } else {
        await axios.post("/api/wishlist/add", { productId: product.id })
        setIsWishlisted(true)
        toast({
          title: "Added to Wishlist",
          description: `${product.title} has been added to your wishlist.`,
        })
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error)
      toast({
        title: "Error",
        description: "Failed to update wishlist. Please try again.",
        variant: "destructive",
      })
    } finally {
      setAddingToWishlist(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Failed to share:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Product link copied to clipboard.",
      })
    }
  }

  const updateQuantity = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change))
  }

  const addToCart = async () => {
    if (!product?.inStock) {
      toast({
        title: "Out of Stock",
        description: "This item is currently out of stock.",
        variant: "destructive",
      })
      return
    }

    setAddingToCart(true)
    try {
      await axios.post("/api/cart/add", {
        productId: product.id,
        quantity,
      })

      toast({
        title: "Added to Cart",
        description: `${quantity} ${product.title}${quantity > 1 ? "s" : ""} added to your cart.`,
      })

      setQuantity(1)
    } catch (error) {
      console.error("Failed to add to cart:", error)
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setAddingToCart(false)
    }
  }



  if (loading) {
    return <Loader />
  }

  if (!product) return notFound()

  const productImages = product.images || [product.imageUrl]

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-6xl mx-auto">
        <nav className="hidden lg:block mb-6 text-sm text-gray-600 px-6">
          <div className="flex items-center  space-x-2">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href={`/list/${product.category}`} className="hover:text-black transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-black">{product.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 lg:px-6">
          <div className="space-y-3 sm:space-y-4">
            <div
              className="relative aspect-square overflow-hidden bg-gray-100 lg:rounded-lg"

            >
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-black"></div>
                </div>
              )}
              <Image
                src={productImages[selectedImageIndex] || "/placeholder.svg?height=600&width=600"}
                alt={product.title}
                width={600}
                height={600}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                priority
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />
              {productImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 lg:hidden">
                  <div className="flex space-x-2">
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors touch-manipulation ${selectedImageIndex === index ? "bg-white" : "bg-white/50"
                          }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {productImages.length > 1 && (
                <div className="absolute top-4 right-4 lg:hidden">
                  <div className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {selectedImageIndex + 1}/{productImages.length}
                  </div>
                </div>
              )}
            </div>

            {productImages.length > 1 && (
              <div className="hidden lg:flex space-x-2 overflow-x-auto pb-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 transition-colors touch-manipulation ${selectedImageIndex === index ? "border-black" : "border-gray-200"
                      }`}
                  >
                    <Image
                      src={image || "/placeholder.svg?height=80&width=80"}
                      alt={`${product.title} ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}

            {productImages.length > 1 && (
              <div className="flex lg:hidden space-x-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors touch-manipulation ${selectedImageIndex === index ? "border-black" : "border-gray-200"
                      }`}
                  >
                    <Image
                      src={image || "/placeholder.svg?height=64&width=64"}
                      alt={`${product.title} ${index + 1}`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4 sm:space-y-6 px-4 lg:px-0 pb-4">
            <div className="hidden lg:block">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">{product.title}</h1>
                  <div className="flex items-center gap-2 mb-3">
                    {product.category && (
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                    )}
                    {product.inStock ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>
                    ) : (
                      <Badge variant="destructive">Out of Stock</Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="touch-manipulation min-h-[44px] min-w-[44px]"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleAddToWishlist}
                    disabled={addingToWishlist}
                    className="touch-manipulation min-h-[44px] min-w-[44px]"
                    aria-pressed={isWishlisted}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:hidden pt-2">
              <h1 className="text-xl sm:text-2xl font-bold mb-4 leading-tight">{product.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                {product.category && (
                  <Badge variant="secondary" className="text-xs px-2 py-1">
                    {product.category}
                  </Badge>
                )}
                {product.inStock ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs px-2 py-1">In Stock</Badge>
                ) : (
                  <Badge variant="destructive" className="text-xs px-2 py-1">
                    Out of Stock
                  </Badge>
                )}
              </div>
            </div>

            {product.rating && (
              <div className="flex items-center gap-2 py-1">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= Math.floor(product.rating!) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            <Separator className="my-4" />

            <div className="text-3xl sm:text-4xl font-bold text-black py-2">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.price)}
            </div>

            <div className="space-y-2 py-2">
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">{product.description}</p>
            </div>

            <Separator className="my-4" />

            <div className="hidden lg:block space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium text-base">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(-1)}
                    disabled={quantity <= 1}
                    className="h-12 w-12 p-0 touch-manipulation"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center font-medium text-lg">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(1)}
                    className="h-12 w-12 p-0 touch-manipulation"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={addToCart}
                disabled={!product.inStock || addingToCart}
                className="w-full bg-black text-white hover:bg-gray-800 h-14 text-lg touch-manipulation font-medium"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {addingToCart ? "Adding..." : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden px-4 py-6 bg-gray-50 border-t">
        <div className="flex items-center justify-between">
          <span className="font-medium text-lg">Quantity:</span>
          <div className="flex items-center border rounded-lg bg-white shadow-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateQuantity(-1)}
              disabled={quantity <= 1}
              className="h-12 w-12 p-0 touch-manipulation"
            >
              <Minus className="w-5 h-5" />
            </Button>
            <span className="px-6 py-2 min-w-[4rem] text-center font-medium text-lg">{quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateQuantity(1)}
              className="h-12 w-12 p-0 touch-manipulation"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-10 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Button
              onClick={addToCart}
              disabled={!product.inStock || addingToCart}
              className="w-full bg-black text-white hover:bg-gray-800 h-14 text-lg touch-manipulation font-medium rounded-lg"
              size="lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {addingToCart ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
          <div className="text-right min-w-[120px]">
            <div className="text-xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.price * quantity)}
            </div>
            {quantity > 1 && (
              <div className="text-sm text-gray-600">
                {quantity} × ${product.price}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="h-28 lg:h-0"></div>

      <div className="mt-8 lg:mt-16">
        <CollectionsPage />
      </div>
    </div>
  )
}
