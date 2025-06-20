"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"

interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set())
  const { toast } = useToast()

  const fetchCart = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await axios.get("/api/cart/get")
      // Ensure response.data is always an array
      setCart(Array.isArray(response.data) ? response.data : [])
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast({
          title: "Unauthorized",
          description: "You must be logged in to view your cart.",
          variant: "destructive",
        })
      } else {
        console.error("Error fetching cart:", error)
        toast({
          title: "Error",
          description: "Failed to load your cart. Please try again later.",
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
    async (id: number, newQuantity: number) => {
      if (newQuantity === 0) {
        removeItem(id)
        return
      }

      const updatedCart = cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      setCart(updatedCart)
      setUpdatingItems((prev) => new Set(prev).add(id))

      try {
        await axios.patch(`/api/cart/${id}`, { quantity: newQuantity })
        toast({
          title: "Updated",
          description: "Item quantity updated successfully.",
        })
      } catch (error) {
        setCart(cart)
        console.error("Error updating quantity:", error)
        toast({
          title: "Error",
          description: "Failed to update item quantity. Please try again.",
          variant: "destructive",
        })
      } finally {
        setUpdatingItems((prev) => {
          const newSet = new Set(prev)
          newSet.delete(id)
          return newSet
        })
      }
    },
    [cart, toast],
  )

  const removeItem = useCallback(
    async (id: number) => {
      const updatedCart = cart.filter((item) => item.id !== id)
      setCart(updatedCart)
      setUpdatingItems((prev) => new Set(prev).add(id))

      try {
        await axios.delete(`/api/cart/${id}`)
        toast({
          title: "Item Removed",
          description: "Item has been removed from your cart.",
        })
      } catch (error) {
        setCart(cart)
        console.error("Error removing item:", error)
        toast({
          title: "Error",
          description: "Failed to remove item. Please try again.",
          variant: "destructive",
        })
      } finally {
        setUpdatingItems((prev) => {
          const newSet = new Set(prev)
          newSet.delete(id)
          return newSet
        })
      }
    },
    [cart, toast],
  )

  const clearCart = useCallback(async () => {
    const originalCart = [...cart]
    setCart([])

    try {
      await axios.delete("/api/cart")
      toast({
        title: "Cart Cleared",
        description: "All items have been removed from your cart.",
      })
    } catch (error) {
      // Revert optimistic update on error
      setCart(originalCart)
      console.error("Error clearing cart:", error)
      toast({
        title: "Error",
        description: "Failed to clear cart. Please try again.",
        variant: "destructive",
      })
    }
  }, [cart, toast])

  const { subtotal, shipping, total } = useMemo(() => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    const shipping = subtotal > 100 ? 0 : 9.99
    const total = subtotal + shipping
    return { subtotal, shipping, total }
  }, [cart])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/shop">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Shop
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            </div>
            {cart.length > 0 && (
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <Link href="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">Cart Items ({cart.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cart.map((item, index) => {
                    const isUpdating = updatingItems.has(item.id)
                    return (
                      <div key={item.id} className={isUpdating ? "opacity-50" : ""}>
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              width={80}
                              height={80}
                              className="rounded-lg object-cover"
                            />
                            {isUpdating && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg">
                                <Loader2 className="w-4 h-4 animate-spin text-white" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                            <p className="text-lg font-semibold text-gray-700">${item.price.toFixed(2)}</p>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8"
                              disabled={isUpdating}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>

                            <span className="w-12 text-center font-medium text-gray-900">{item.quantity}</span>

                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8"
                              disabled={isUpdating}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-700 mt-1"
                              disabled={isUpdating}
                            >
                              {isUpdating ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {index < cart.length - 1 && <Separator className="mt-4" />}
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-gray-900">
                        {shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>

                    {subtotal < 100 && subtotal > 0 && (
                      <p className="text-sm text-blue-600">
                        Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                      </p>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${total.toFixed(2)}</span>
                  </div>

                  <Link href={`/checkout?amount=${total.toFixed(2)}`}>
                    <Button className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Link href="/shop">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
