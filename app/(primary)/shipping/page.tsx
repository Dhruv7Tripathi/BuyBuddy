"use client"

import { useEffect, useState, type FormEvent, useCallback, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, Package, Truck, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"
import Link from "next/link"

interface CartItem {
  id: string
  quantity: number
  product: {
    id: string
    title: string
    price: number
    imageUrl: string
  }
}

interface CartResponse {
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  itemCount: number
}

function ShippingPageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Package className="w-8 h-8 animate-spin mx-auto mb-4" />
        <p>Loading shipping page...</p>
      </div>
    </div>
  )
}

function ShippingPageContent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    shippingMethod: "standard",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [cartData, setCartData] = useState<CartResponse | null>(null)
  const [isLoadingCart, setIsLoadingCart] = useState(true)

  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const urlAmount = searchParams.get("amount")

  const fetchCartData = useCallback(async () => {
    try {
      setIsLoadingCart(true)
      const response = await axios.get<CartResponse>("/api/cart/get")
      setCartData(response.data)
    } catch (error) {
      console.error("Error fetching cart:", error)

      if (urlAmount) {
        const amount = Number.parseFloat(urlAmount)
        const subtotal = amount > 9.99 ? amount - 9.99 : amount
        const shipping = amount > 100 ? 0 : 9.99
        setCartData({
          items: [],
          subtotal,
          shipping,
          total: amount,
          itemCount: 0,
        })
      }
    } finally {
      setIsLoadingCart(false)
    }
  }, [urlAmount])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
      return
    }

    if (status === "authenticated") {
      fetchCartData()
      if (session?.user?.email) {
        setFormData((prev) => ({
          ...prev,
          email: session.user.email || "",
        }))
      }
    }
  }, [status, router, fetchCartData, session])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const requiredFields = ["firstName", "lastName", "email", "address", "city", "state", "zipCode"]
    const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData])

    if (missingFields.length > 0) {
      setError("Please fill out all required fields.")
      setIsLoading(false)
      return
    }

    try {
      const response = await axios.post("/api/shipping", formData)

      if (response.status === 200) {
        console.log("Shipping details submitted:", response.data)
        setIsSubmitted(true)

        toast({
          title: "Success!",
          description: "Shipping details saved successfully.",
        })

        // Redirect to checkout after a short delay
        setTimeout(() => {
          const total = cartData?.total || Number.parseFloat(urlAmount || "0")
          router.push(`/checkout?amount=${total.toFixed(2)}`)
        }, 2000)
      }
    } catch (err) {
      console.error(err)
      setError("Failed to save shipping details. Please try again.")
      toast({
        title: "Error",
        description: "Failed to save shipping details. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading" || isLoadingCart) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Package className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  const total = cartData?.total || Number.parseFloat(urlAmount || "0")
  const itemCount = cartData?.itemCount || 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/cart" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Link>
            {cartData && (
              <div className="text-right">
                <p className="text-sm text-gray-600">{itemCount} items</p>
                <p className="font-bold text-lg">${total.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Form */}
        <div className="flex items-center justify-center p-6 bg-white">
          <Card className="w-full bg-white max-w-2xl border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-black font-bold text-center">Shipping Details</CardTitle>
              <p className="text-center text-gray-600">Please provide your shipping information</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="rounded-md bg-red-50 border border-red-200 p-3">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="space-y-4 text-black bg-white">
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  <div className="grid grid-cols-1 bg-white md:grid-cols-2 gap-4">
                    <div className="space-y-2 text-black">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        type="text"
                        className="text-black bg-white border-gray-300 hover:border-gray-400 focus:border-gray-500"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        className="text-black bg-white border-gray-300 hover:border-gray-400 focus:border-gray-500"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        className="text-black bg-white border-gray-300 hover:border-gray-400 focus:border-gray-500"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        className="text-black bg-white border-gray-300 hover:border-gray-400 focus:border-gray-500"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-black">
                  <h3 className="text-lg font-semibold">Shipping Address</h3>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      className="text-black bg-white border-gray-300 hover:border-gray-400 focus:border-gray-500"
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apartment">Apartment, suite, etc.</Label>
                    <Input
                      id="apartment"
                      className="text-black bg-white border-gray-300 hover:border-gray-400 focus:border-gray-500"
                      type="text"
                      value={formData.apartment}
                      onChange={(e) => handleInputChange("apartment", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        className="text-black bg-white border-gray-300 hover:border-gray-400 focus:border-gray-500"
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        className="text-black bg-white border-gray-300 hover:border-gray-400 focus:border-gray-500"
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        className="text-black bg-white border-gray-300 hover:border-gray-400 focus:border-gray-500"
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger className="text-black bg-white border-gray-300 hover:border-gray-400 focus:border-gray-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-black">
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="IN">India</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shippingMethod">Shipping Method</Label>
                    <Select
                      value={formData.shippingMethod}
                      onValueChange={(value) => handleInputChange("shippingMethod", value)}
                    >
                      <SelectTrigger className="text-black bg-white border-gray-300 hover:border-gray-400 focus:border-gray-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-black">
                        <SelectItem value="standard">Standard Shipping (5-7 days)</SelectItem>
                        <SelectItem value="express">Express Shipping (2-3 days)</SelectItem>
                        <SelectItem value="overnight">Overnight Shipping</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gray-800 text-white hover:bg-gray-900" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Continue to Payment"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Thank You Section */}
        <div className="flex items-center justify-center p-6 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="text-center space-y-6 max-w-md">
            {isSubmitted ? (
              <>
                <div className="relative">
                  <div className="w-32 h-32 mx-auto bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                    <CheckCircle className="w-16 h-16 text-green-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-green-700">Details Saved!</h2>
                  <p className="text-gray-600 text-lg">
                    Your shipping details have been saved successfully. Redirecting to payment...
                  </p>
                  <div className="flex justify-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Package className="w-4 h-4" />
                      <span>Processing</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Truck className="w-4 h-4" />
                      <span>Fast Shipping</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-32 h-32 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="w-16 h-16 text-blue-600" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800">Almost There!</h2>
                  <p className="text-gray-600">
                    Complete your shipping details to proceed to payment. We&apos;re excited to get your order to you!
                  </p>

                  {cartData && (
                    <div className="bg-white rounded-lg p-4 shadow-sm border">
                      <h3 className="font-semibold text-gray-800 mb-2">Order Summary</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Subtotal ({itemCount} items)</span>
                          <span>${cartData.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span>{cartData.shipping === 0 ? "Free" : `$${cartData.shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="border-t pt-1 flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${cartData.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-4 text-xs text-gray-500">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span>Cart</span>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                        <Truck className="w-4 h-4 text-blue-600" />
                      </div>
                      <span>Shipping</span>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                        <Package className="w-4 h-4 text-gray-400" />
                      </div>
                      <span>Payment</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Main export component with Suspense wrapper
export default function ShippingPageClient() {
  return (
    <Suspense fallback={<ShippingPageLoading />}>
      <ShippingPageContent />
    </Suspense>
  )
}
