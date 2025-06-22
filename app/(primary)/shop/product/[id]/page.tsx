// "use client"
// import { notFound } from "next/navigation"
// import Image from "next/image"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Minus, Plus, ShoppingCart, Heart, Star } from "lucide-react"
// import axios from "axios"
// import { useEffect, useState, use } from "react"
// import { Separator } from "@/components/ui/separator"
// import { Badge } from "@/components/ui/badge"
// import CollectionsPage from "@/components/(landingPage)/collections"
// import { useToast } from "@/hooks/use-toast"


// interface Product {
//   id: string
//   title: string
//   imageUrl: string
//   description: string
//   price: number
//   category?: string
//   inStock?: boolean
//   rating?: number
//   reviewCount?: number
//   images?: string[]
// }

// // interface CartItem extends Product {
// //   quantity: number
// // }

// interface ProductPageProps {
//   params: Promise<{ id: string }>
// }
// export default function ProductPage(props: ProductPageProps) {
//   const [product, setProduct] = useState<Product | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [quantity, setQuantity] = useState(1)
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0)
//   const [isWishlisted, setIsWishlisted] = useState(false)
//   const { toast } = useToast()
//   const { id } = use(props.params)

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`)
//         const productData = {
//           ...response.data,
//           inStock: response.data.inStock ?? true,
//           rating: response.data.rating ?? 4.5,
//           reviewCount: response.data.reviewCount ?? 128,
//           images: response.data.images ?? [response.data.imageUrl],
//         }

//         setProduct(productData)
//       } catch (error) {
//         console.error("Failed to fetch product:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProduct()
//   }, [id])

//   const handleAddToWishlist = async (productId: string) => {
//     try {
//       await axios.post("/api/wishlist/add", { productId })
//       console.log("Added to wishlist:", productId)
//     } catch (error) {
//       console.error("Failed to add to wishlist:", error)
//     }
//   }

//   const updateQuantity = (change: number) => {
//     setQuantity((prev) => Math.max(1, prev + change))
//   }

//   const addToCart = async (product: Product) => {
//     if (!product?.inStock) {
//       toast({
//         title: "Out of Stock",
//         description: "This item is currently out of stock.",
//         variant: "destructive",
//       })
//       return
//     }

//     try {
//       await axios.post("/api/cart", {
//         productId: product.id,
//         quantity,
//       })

//       toast({
//         title: "Added to Cart",
//         description: `${quantity} ${product.title}${quantity > 1 ? "s" : ""} added to your cart.`,
//       })

//       setQuantity(1)
//     } catch (error) {
//       console.error("Failed to add to cart:", error)
//       toast({
//         title: "Error",
//         description: "Failed to add item to cart. Please try again.",
//         variant: "destructive",
//       })
//     }

//     setQuantity(1)
//   }

//   if (loading) {
//     return (
//       <div className="bg-white  text-black min-h-screen">
//         <div className="max-w-6xl mx-auto p-6">
//           <div className="animate-pulse">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="bg-gray-200 aspect-square rounded-lg"></div>
//               <div className="space-y-4">
//                 <div className="h-8 bg-gray-200 rounded w-3/4"></div>
//                 <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                 <div className="h-20 bg-gray-200 rounded"></div>
//                 <div className="h-8 bg-gray-200 rounded w-1/4"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (!product) return notFound()

//   const productImages = product.images || [product.imageUrl]

//   return (
//     <div className="bg-white pt-10 text-black min-h-screen">
//       <div className="max-w-6xl mx-auto p-6">
//         <nav className="mb-6 text-sm text-gray-600">
//           <div className="flex items-center space-x-2">
//             <Link href="/" className="hover:text-black transition-colors">
//               Home
//             </Link>
//             <span>/</span>
//             <Link href={`/list/${product.category}`} className="hover:text-black transition-colors">
//               {product.category}
//             </Link>
//             <span>/</span>
//             <span className="text-black">{product.title}</span>
//           </div>
//         </nav>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           <div className="space-y-4">
//             <div className=" overflow-hidden rounded-lg ">
//               <Image
//                 src={productImages[selectedImageIndex] || "/placeholder.svg"}
//                 alt={product.title}
//                 width={600}
//                 height={600}
//                 className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
//               />
//             </div>

//             {productImages.length > 1 && (
//               <div className="flex space-x-2 overflow-x-auto">
//                 {productImages.map((image, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedImageIndex(index)}
//                     className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${selectedImageIndex === index ? "border-black" : "border-gray-200"
//                       }`}
//                   >
//                     <Image
//                       src={image || "/placeholder.svg"}
//                       alt={`${product.title} ${index + 1}`}
//                       width={80}
//                       height={80}
//                       className="object-cover w-full h-full"
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="space-y-6">
//             <div>
//               <div className="flex items-center gap-2 mb-2">
//                 {product.category && (
//                   <Badge variant="secondary" className="text-xs">
//                     {product.category}
//                   </Badge>
//                 )}
//                 {product.inStock ? (
//                   <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>
//                 ) : (
//                   <Badge variant="destructive">Out of Stock</Badge>
//                 )}
//               </div>

//               <h1 className="text-3xl lg:text-4xl font-bold mb-3">{product.title}</h1>

//               <div className="flex items-center gap-2 mb-4">
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
//                         }`}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-sm text-gray-600">
//                   {product.rating} ({product.reviewCount} reviews)
//                 </span>
//               </div>
//             </div>

//             <Separator />

//             <div className="text-3xl font-bold text-black">
//               {new Intl.NumberFormat("en-US", {
//                 style: "currency",
//                 currency: "USD",
//               }).format(product.price)}
//             </div>

//             <p className="text-gray-700 leading-relaxed">{product.description}</p>

//             <Separator />

//             <div className="space-y-4">
//               <div className="flex items-center gap-4">
//                 <span className="font-medium">Quantity:</span>
//                 <div className="flex items-center border rounded-md">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => updateQuantity(-1)}
//                     disabled={quantity <= 1}
//                     className="h-10 w-10 p-0"
//                   >
//                     <Minus className="w-4 h-4" />
//                   </Button>
//                   <span className="px-4 py-2 min-w-[3rem] text-center font-medium">{quantity}</span>
//                   <Button variant="ghost" size="sm" onClick={() => updateQuantity(1)} className="h-10 w-10 p-0">
//                     <Plus className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <Button
//                   onClick={() => addToCart(product)}
//                   disabled={!product.inStock}
//                   className="flex-1 bg-black text-white hover:bg-gray-800  h-12"
//                   size="lg"
//                 >
//                   <ShoppingCart className="w-5 h-5 mr-2" />
//                   Add to Cart
//                 </Button>

//                 {/* <Button
//                   variant={isWishlisted ? "secondary" : "outline"}
//                   onClick={async () => {
//                     if (product) {
//                       await handleAddToWishlist(product.id)
//                       setIsWishlisted((prev) => !prev)
//                       toast({
//                         title: !isWishlisted ? "Added to Wishlist" : "Removed from Wishlist",
//                         description: `${product.title} has been ${!isWishlisted ? "added to" : "removed from"} your wishlist.`,
//                       })
//                     }
//                   }}
//                   className={`h-12 px-4`}
//                   aria-pressed={isWishlisted}
//                 >
//                   <Heart
//                     className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
//                     stroke={isWishlisted ? "red" : "currentColor"}
//                     fill={isWishlisted ? "red" : "none"}
//                   /> */}
//                 {/* </Button> */}
//               </div>
//             </div>

//             <Separator />
//           </div>
//         </div>
//       </div>

//       <div className="mt-16">
//         <CollectionsPage />
//       </div>
//     </div>
//   )
// }
"use client"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingCart, Heart, Star, ArrowLeft } from "lucide-react"
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
  const { toast } = useToast()
  const { id } = use(props.params)

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
    return (
      <Loader />
    )
  }

  if (!product) return notFound()

  const productImages = product.images || [product.imageUrl]

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="sticky top-0 z-10 bg-white border-b lg:hidden">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="font-semibold text-lg truncate mx-4">{product?.title}</h1>
          <Button variant="ghost" size="sm" onClick={handleAddToWishlist} disabled={addingToWishlist}>
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <nav className="hidden lg:block mb-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          <div className="space-y-3 sm:space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={productImages[selectedImageIndex] || "/placeholder.svg?height=600&width=600"}
                alt={product.title}
                width={500}
                height={500}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            {productImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 transition-colors ${selectedImageIndex === index ? "border-black" : "border-gray-200"
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
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="hidden lg:block">
              <div className="flex items-center gap-2 mb-2">
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

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">{product.title}</h1>


            </div>

            <div className="lg:hidden">
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

            <Separator />

            <div className="text-2xl sm:text-3xl font-bold text-black">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.price)}
            </div>

            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{product.description}</p>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium text-sm sm:text-base">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0 touch-manipulation"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(1)}
                    className="h-10 w-10 p-0 touch-manipulation"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={addToCart}
                  disabled={!product.inStock || addingToCart}
                  className="flex-1 bg-black text-white hover:bg-gray-800 h-12 sm:h-12 text-base touch-manipulation"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {addingToCart ? "Adding..." : "Add to Cart"}
                </Button>

                <Button
                  variant={isWishlisted ? "secondary" : "outline"}
                  onClick={handleAddToWishlist}
                  disabled={addingToWishlist}
                  className="h-12 px-4 sm:px-6 touch-manipulation hidden lg:flex"
                  aria-pressed={isWishlisted}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                  {addingToWishlist ? "..." : isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </Button>
              </div>
            </div>

            <Separator className="hidden lg:block" />
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-10">
        <div className="flex gap-3">
          <Button
            onClick={addToCart}
            disabled={!product.inStock || addingToCart}
            className="flex-1 bg-black text-white hover:bg-gray-800 h-12 text-base touch-manipulation"
            size="lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {addingToCart ? "Adding..." : "Add to Cart"}
          </Button>
          <div className="text-right">
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

      <div className="h-20 lg:h-0"></div>

      <div className="mt-8 lg:mt-16">
        <CollectionsPage />
      </div>
    </div>
  )
}
