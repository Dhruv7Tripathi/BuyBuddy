"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import axios from "axios"
import type { Decimal } from "@prisma/client/runtime/library"
import Loader from "@/components/(landingPage)/loading"
interface Product {
  id: string
  title: string
  price: Decimal
  imageUrl: string
  description?: string
  inStock?: boolean
}

interface CartItem {
  id: string
  quantity: number
  product: Product
}

interface CartResponse {
  items: CartItem[]
  subtotal?: number
  shipping?: number
  total?: number
  itemCount?: number
}

const decimalToNumber = (decimal: Decimal | number): number => {
  if (typeof decimal === "number") return decimal
  return Number.parseFloat(decimal.toString())
}

const formatPrice = (price: Decimal | number): string => {
  return decimalToNumber(price).toFixed(2)
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  const fetchCart = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await axios.get<CartResponse>("/api/cart/get")

      const items = response.data.items || []
      setCartItems(items)
    } catch (error: unknown) {
      console.error("Error fetching cart:", error)
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast({
          title: "Please Sign In",
          description: "You need to be signed in to view your cart.",
          variant: "destructive",
        })
      } else if (axios.isAxiosError(error) && error.response?.status === 404) {
        setCartItems([])
      } else {
        toast({
          title: "Error Loading Cart",
          description: "Failed to load your cart. Please refresh the page.",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const updateQuantity = useCallback(
    async (cartItemId: string, newQuantity: number) => {
      if (newQuantity === 0) {
        removeItem(cartItemId)
        return
      }

      const originalItems = [...cartItems]
      const updatedItems = cartItems.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
      setCartItems(updatedItems)
      setUpdatingItems((prev) => new Set(prev).add(cartItemId))

      try {
        await axios.put("/api/cart/update", {
          cartItemId,
          quantity: newQuantity,
        })

        toast({
          title: "Updated",
          description: "Quantity updated successfully.",
        })
      } catch (error) {
        setCartItems(originalItems)
        console.error("Error updating quantity:", error)
        toast({
          title: "Update Failed",
          description: "Failed to update quantity. Please try again.",
          variant: "destructive",
        })
      } finally {
        setUpdatingItems((prev) => {
          const newSet = new Set(prev)
          newSet.delete(cartItemId)
          return newSet
        })
      }
    },
    [cartItems, toast],
  )

  // const removeItem = useCallback(
  //   async (cartItemId: string) => {
  //     const originalItems = [...cartItems]
  //     const updatedItems = cartItems.filter((item) => item.id !== cartItemId)
  //     setCartItems(updatedItems)
  //     setRemovingItems((prev) => new Set(prev).add(cartItemId))

  //     try {
  //       await axios.delete(`/api/cart/${cartItemId}`)
  //       toast({
  //         title: "Item Removed",
  //         description: "Item removed from your cart.",
  //       })
  //     } catch (error) {
  //       setCartItems(originalItems)
  //       console.error("Error removing item:", error)
  //       toast({
  //         title: "Remove Failed",
  //         description: "Failed to remove item. Please try again.",
  //         variant: "destructive",
  //       })
  //     } finally {
  //       setRemovingItems((prev) => {
  //         const newSet = new Set(prev)
  //         newSet.delete(cartItemId)
  //         return newSet
  //       })
  //     }
  //   },
  //   [cartItems, toast],
  // )
  const removeItem = async (cartItemId: string) => {
    const originalItems = [...cartItems]
    const updatedItems = cartItems.filter((item) => item.id !== cartItemId)

    setCartItems(updatedItems)
    setRemovingItems((prev) => new Set(prev).add(cartItemId))

    try {
      await axios.delete(`/api/cart/${cartItemId}`)

      toast({
        title: "Item Removed",
        description: "Item removed from your cart.",
      })
    } catch (error) {
      setCartItems(originalItems)
      console.error("Error removing item:", error)

      toast({
        title: "Remove Failed",
        description: "Failed to remove item. Please try again.",
        variant: "destructive",
      })
    } finally {
      setRemovingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(cartItemId)
        return newSet
      })
    }
  }

  const clearCart = useCallback(async () => {
    const originalItems = [...cartItems]
    setCartItems([])

    try {
      await axios.delete("/api/cart/clear")
      toast({
        title: "Cart Cleared",
        description: "All items removed from your cart.",
      })
    } catch (error) {
      setCartItems(originalItems)
      console.error("Error clearing cart:", error)
      toast({
        title: "Clear Failed",
        description: "Failed to clear cart. Please try again.",
        variant: "destructive",
      })
    }
  }, [cartItems, toast])

  const { subtotal, shipping, total, itemCount } = useMemo(() => {
    const subtotal = cartItems.reduce((total, item) => {
      const price = decimalToNumber(item.product.price)
      return total + price * item.quantity
    }, 0)
    const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0)
    const shipping = subtotal > 100 ? 0 : subtotal > 0 ? 9.99 : 0
    const total = subtotal + shipping
    return { subtotal, shipping, total, itemCount }
  }, [cartItems])

  if (isLoading) {
    return (

      <Loader />

    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="px-4 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-7xl mx-auto">
        {cartItems.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 max-w-md mx-auto">
              <ShoppingBag className="w-16 h-16 sm:w-24 sm:h-24 text-gray-300 mx-auto mb-4 sm:mb-6" />
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6 sm:mb-8">Add some products to get started!</p>
              <Link href="/">
                <Button size="lg" className="bg-gradient-to-r from-blue-50 to-indigo-50 text-black transition-colors px-8">
                  Start Shopping
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="block lg:hidden space-y-3">
                {cartItems.map((item) => {
                  const isUpdating = updatingItems.has(item.id)
                  const isRemoving = removingItems.has(item.id)
                  const isDisabled = isUpdating || isRemoving
                  const itemPrice = decimalToNumber(item.product.price)

                  return (
                    <Card
                      key={item.id}
                      className={`bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${isDisabled ? "opacity-50" : ""
                        } ${isRemoving ? "animate-pulse" : ""}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex space-x-3">
                          <div className="relative flex-shrink-0">
                            <Image
                              src={item.product.imageUrl || "/placeholder.svg?height=80&width=80"}
                              alt={item.product.title}
                              width={80}
                              height={80}
                              className="rounded-xl object-cover shadow-md"
                            />
                            {item.product.inStock === false && (
                              <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs">
                                Out of Stock
                              </Badge>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-gray-900 text-sm leading-tight pr-2">
                                {item.product.title}
                              </h3>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-auto rounded-lg transition-colors"
                                disabled={isDisabled}
                              >
                                {isRemoving ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </Button>
                            </div>

                            <p className="text-lg font-bold text-gray-600 mb-3">${formatPrice(item.product.price)}</p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="h-8 w-8 p-0 hover:bg-white rounded-md"
                                  disabled={isDisabled}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>

                                <span className="w-8 text-center font-semibold text-sm text-gray-900">
                                  {item.quantity}
                                </span>

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="h-8 w-8 p-0 hover:bg-white rounded-md"
                                  disabled={isDisabled || item.product.inStock === false}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>

                              <div className="text-right">
                                <p className="font-bold text-gray-900 text-lg">
                                  ${(itemPrice * item.quantity).toFixed(2)}
                                </p>
                                {isUpdating && <Loader2 className="w-3 h-3 animate-spin mx-auto mt-1" />}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Desktop View */}
              <Card className="hidden lg:block bg-white border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="flex items-center justify-between text-gray-900">
                    <span className="text-xl font-bold">Cart Items ({itemCount})</span>
                    {cartItems.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearCart}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                      >
                        <X className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Clear All</span>
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  {cartItems.map((item, index) => {
                    const isUpdating = updatingItems.has(item.id)
                    const isRemoving = removingItems.has(item.id)
                    const isDisabled = isUpdating || isRemoving
                    const itemPrice = decimalToNumber(item.product.price)

                    return (
                      <div key={item.id} className={`${isDisabled ? "opacity-50" : ""} group`}>
                        <div className="flex items-center space-x-6 p-4 rounded-xl transition-colors">
                          <div className="relative flex-shrink-0">
                            <Image
                              src={item.product.imageUrl || "/placeholder.svg?height=100&width=100"}
                              alt={item.product.title}
                              width={100}
                              height={100}
                              className="rounded-xl object-cover shadow-md"
                            />
                            {item.product.inStock === false && (
                              <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs">
                                Out of Stock
                              </Badge>
                            )}
                            {(isUpdating || isRemoving) && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-xl">
                                <Loader2 className="w-5 h-5 animate-spin text-white" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-lg mb-1">{item.product.title}</h3>
                            <p className="text-xl font-bold text-gray-800">${formatPrice(item.product.price)}</p>
                          </div>

                          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2">
                            <Button
                              variant="default"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-9 w-9 hover:bg-white rounded-md"
                              disabled={isDisabled}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>

                            <span className="w-12 text-center font-semibold text-gray-900 text-lg">
                              {item.quantity}
                            </span>

                            <Button
                              variant="default"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-9 w-9 hover:bg-white rounded-md"
                              disabled={isDisabled || item.product.inStock === false}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="text-right min-w-[120px]">
                            <p className="font-bold text-gray-900 text-xl mb-2">
                              ${(itemPrice * item.quantity).toFixed(2)}
                            </p>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors rounded-lg"
                              disabled={isDisabled}
                            >
                              {isRemoving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {index < cartItems.length - 1 && <Separator className="mt-4" />}
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20 bg-white border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 text-black rounded-t-lg">
                  <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-base">
                      <span className="text-gray-700 font-medium">Subtotal ({itemCount} items)</span>
                      <span className="font-bold text-gray-900 text-lg">${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-base">
                      <span className="text-gray-700 font-medium">Shipping</span>
                      <span className="font-bold text-gray-900">
                        {shipping === 0 ? (
                          <span className="text-green-600 font-bold">Free</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    {subtotal < 100 && subtotal > 0 && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                        <p className="text-sm text-blue-800 font-medium">
                          Add <span className="font-bold text-blue-900">${(100 - subtotal).toFixed(2)}</span> more for
                          free shipping! 🚚
                        </p>
                      </div>
                    )}
                  </div>

                  <Separator className="border-gray-200" />

                  <div className="flex justify-between text-xl font-bold bg-gray-50 p-4 rounded-xl">
                    <span className="text-gray-900">Total</span>
                    <span className="text-green-600">${total.toFixed(2)}</span>
                  </div>

                  <div className="space-y-4 pt-2">
                    <Link href={`/shipping?amount=${total.toFixed(2)}`}>
                      <Button
                        className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                        size="lg"
                        disabled={cartItems.length === 0}
                      >
                        Proceed to Checkout
                      </Button>
                    </Link>

                    <Link href="/">
                      <Button
                        variant="outline"
                        className="w-full border-2 mt-1 border-gray-300 bg-gray-800 hover:bg-gray-900 font-medium py-3 rounded-xl transition-colors"
                      >
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <div className="h-20 lg:h-0"></div>
    </div>
  )
}
