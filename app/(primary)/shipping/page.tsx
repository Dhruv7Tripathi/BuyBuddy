"use client"

import { useEffect, useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { CheckCircle, Package, Truck } from "lucide-react"
import axios from "axios"

export default function ShippingDetails() {
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
    shippingMethod: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { status } = useSession()
  const router = useRouter()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    }
  }, [status, router])

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
      // const axios = (await import("axios")).default
      const response = await axios.post("/api/shipping", formData)

      if (response.status !== 200) {
        throw new Error("Failed to save shipping details")
      }

      const result = response.data
      router.push("/checkout?amount=${total.toFixed(2)}")
      console.log("Shipping details submitted:", result)
      setIsSubmitted(true)
    } catch (err) {
      console.error(err)
      setError("Failed to save shipping details.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid lg:grid-cols-2 min-h-screen">
        <div className="flex items-center justify-center p-6 bg-white">
          <Card className="w-full bg-white max-w-2xl border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-black font-bold text-center">Shipping Details</CardTitle>
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
                    <div className="space-y-2  text-black">
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
                    <div className="space-y-2 ">
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
                    <Select
                      value={formData.country}
                      onValueChange={(value) => handleInputChange("country", value)}>
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
                </div>

                <Button type="submit" variant={"default"} className="w-full bg-gray-800 text-white hover:bg-gray-900 " disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Shipping Details"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

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
                  <h2 className="text-3xl font-bold text-green-700">Thank You for Your Purchase!</h2>
                  <p className="text-gray-600 text-lg">
                    Your shipping details have been saved successfully. We'll process your order shortly!
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
                    Complete your shipping details to finalize your purchase. We're excited to get your order to you!
                  </p>
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
                      <span>Complete</span>
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
