"use client"
import { notFound } from "next/navigation"
import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingCart, Heart, Share2 } from "lucide-react"
import axios from "axios"
import { useEffect, useState, use } from "react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import TopSellingProducts from "@/components/(landingPage)/topSellingProduct"
import { useToast } from "@/hooks/use-toast"
import Loader from "@/components/(landingPage)/loading"
import { useSession } from "next-auth/react"

interface Product {
  id: string
  title: string
  imageUrl: string
  description: string
  price: number
  category?: string
  inStock?: boolean
  images?: string[]
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
  const { toast } = useToast()
  const { id } = use(props.params)
  const { status } = useSession()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`)
        const productData = {
          ...response.data,
          inStock: response.data.inStock ?? true,
          images: response.data.images ?? [response.data.imageUrl],
        }

        setProduct(productData)
      } catch (error) {
        console.error("Failed to fetch product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])
  const handleAddToWishlist = async () => {
    if (!product) return
    if (status === "unauthenticated" || status === "loading") {
      toast({
        title: "Please Sign In",
        description: "You need to sign in to add items to your wishlist.",
        variant: "destructive",
      })
      return
    }

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
        await axios.post("/api/wishlist", { productId: product.id })
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
    if (status == "unauthenticated") {
      toast({
        title: "Please Sign In",
        description: "You need to sign in to add items to your cart.",
        variant: "destructive",
      })
      return
    }

    setAddingToCart(true)
    try {
      await axios.post("/api/cart", {
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
            <div className="relative">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-black"></div>
                </div>
              )}
              <Image
                src={productImages[selectedImageIndex] || "/placeholder.svg?height=300&width=300"}
                alt={product.title}
                width={600}
                height={600}
                className="object-cover w-[600px] h-[600px] hover:scale-105 transition-transform duration-300 rounded-md"
                priority
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />

              {productImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 lg:hidden z-20">
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
                <div className="absolute top-4 right-4 lg:hidden z-20">
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
                <div className="flex items-center text-black bg-white dark:bg-white gap-2 ml-4">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleShare}
                    className="min-h-[44px] text-black bg-white hover:bg-white min-w-[44px]"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleAddToWishlist}
                    disabled={addingToWishlist}
                    className="min-h-[44px] text-black bg-white hover:bg-white min-w-[44px]"
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
                    variant="default"
                    size="sm"
                    onClick={() => updateQuantity(-1)}
                    disabled={quantity <= 1}
                    className="h-12 w-12 p-0 touch-manipulation"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center font-medium text-lg">{quantity}</span>
                  <Button
                    variant="default"
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
                className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-700 text-white font-semibold h-14 text-lg touch-manipulation"
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
              variant="default"
              size="sm"
              onClick={() => updateQuantity(-1)}
              disabled={quantity <= 1}
              className="h-12 w-12 p-0 bg-gray-50 text-black hover:bg-gray-50 touch-manipulation"
            >
              <Minus className="w-5 h-5" />
            </Button>
            <span className="px-6 py-2 min-w-[4rem] text-center font-medium text-lg">{quantity}</span>
            <Button
              variant="default"
              size="sm"
              onClick={() => updateQuantity(1)}
              className="h-12 w-12 p-0 bg-gray-50 text-black hover:bg-gray-50 touch-manipulation"
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
              className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-700 text-white font-semibold h-14 text-lg  rounded-lg"
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
      <div className=" mx-auto  lg:px-6 py-8">
        {/* <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2> */}
        <TopSellingProducts />
        <div className="mt-8 lg:mt-16">
        </div>
      </div>
    </div>
  )
}
