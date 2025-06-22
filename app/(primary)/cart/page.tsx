"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import axios from "axios"

interface Product {
  id: string
  title: string
  price: number
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
    } catch (error: any) {
      console.error("Error fetching cart:", error)
      if (error.response?.status === 401) {
        toast({
          title: "Please Sign In",
          description: "You need to be signed in to view your cart.",
          variant: "destructive",
        })
      } else if (error.response?.status === 404) {
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

  const removeItem = useCallback(
    async (cartItemId: string) => {
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
    },
    [cartItems, toast],
  )

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
    const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
    const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0)
    const shipping = subtotal > 100 ? 0 : subtotal > 0 ? 9.99 : 0
    const total = subtotal + shipping
    return { subtotal, shipping, total, itemCount }
  }, [cartItems])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center">
              <Link href="/">
                <Button variant="ghost" size="sm" className="mr-2 sm:mr-4 p-2">
                  <ArrowLeft className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Cart</h1>
                {cartItems.length > 0 && (
                  <p className="text-xs sm:text-sm text-gray-600">
                    {itemCount} item{itemCount !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </div>
            {cartItems.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-7xl mx-auto">
        {cartItems.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <ShoppingBag className="w-16 h-16 sm:w-24 sm:h-24 text-gray-300 mx-auto mb-4 sm:mb-6" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6 sm:mb-8">Add some products to get started!</p>
            <Link href="/">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="block lg:hidden space-y-3">
                {cartItems.map((item) => {
                  const isUpdating = updatingItems.has(item.id)
                  const isRemoving = removingItems.has(item.id)
                  const isDisabled = isUpdating || isRemoving

                  return (
                    <Card
                      key={item.id}
                      className={`${isDisabled ? "opacity-50" : ""} ${isRemoving ? "animate-pulse" : ""}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex space-x-3">
                          <div className="relative flex-shrink-0">
                            <Image
                              src={item.product.imageUrl || "/placeholder.svg?height=80&width=80"}
                              alt={item.product.title}
                              width={80}
                              height={80}
                              className="rounded-lg object-cover"
                            />
                            {item.product.inStock === false && (
                              <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs">
                                Out of Stock
                              </Badge>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-gray-900 text-sm leading-tight pr-2">
                                {item.product.title}
                              </h3>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                                disabled={isDisabled}
                              >
                                {isRemoving ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </Button>
                            </div>

                            <p className="text-lg font-semibold text-gray-900 mb-3">${item.product.price.toFixed(2)}</p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="h-8 w-8 p-0"
                                  disabled={isDisabled}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>

                                <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>

                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="h-8 w-8 p-0"
                                  disabled={isDisabled || item.product.inStock === false}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>

                              <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                  ${(item.product.price * item.quantity).toFixed(2)}
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

              <Card className="hidden lg:block">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Cart Items ({itemCount})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item, index) => {
                    const isUpdating = updatingItems.has(item.id)
                    const isRemoving = removingItems.has(item.id)
                    const isDisabled = isUpdating || isRemoving

                    return (
                      <div key={item.id} className={isDisabled ? "opacity-50" : ""}>
                        <div className="flex items-center space-x-4">
                          <div className="relative flex-shrink-0">
                            <Image
                              src={item.product.imageUrl || "/placeholder.svg?height=80&width=80"}
                              alt={item.product.title}
                              width={80}
                              height={80}
                              className="rounded-lg object-cover"
                            />
                            {item.product.inStock === false && (
                              <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs">
                                Out of Stock
                              </Badge>
                            )}
                            {(isUpdating || isRemoving) && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg">
                                <Loader2 className="w-4 h-4 animate-spin text-white" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">{item.product.title}</h3>
                            <p className="text-lg font-semibold text-gray-700">${item.product.price.toFixed(2)}</p>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8"
                              disabled={isDisabled}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>

                            <span className="w-12 text-center font-medium text-gray-900">{item.quantity}</span>

                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8"
                              disabled={isDisabled || item.product.inStock === false}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-1"
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

            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                      <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-gray-900">
                        {shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>

                    {subtotal < 100 && subtotal > 0 && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-700">
                          Add <span className="font-semibold">${(100 - subtotal).toFixed(2)}</span> more for free
                          shipping!
                        </p>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${total.toFixed(2)}</span>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Link href={`/checkout?amount=${total.toFixed(2)}`}>
                      <Button className="w-full" size="lg" disabled={cartItems.length === 0}>
                        Proceed to Checkout
                      </Button>
                    </Link>

                    <Link href="/">
                      <Button variant="outline" className="w-full">
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

      {cartItems.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-600">Total ({itemCount} items)</p>
              <p className="text-xl font-bold">${total.toFixed(2)}</p>
            </div>
            <Link href={`/checkout?amount=${total.toFixed(2)}`}>
              <Button size="lg" className="px-8">
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className="h-20 lg:h-0"></div>
    </div>
  )
}
