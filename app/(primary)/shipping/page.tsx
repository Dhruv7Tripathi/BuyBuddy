"use client"

import { useState, type FormEvent } from "react"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


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
    sameAsBilling: false,
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "address", "city", "state", "zipCode", "shippingMethod"]
    const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData])

    if (missingFields.length > 0) {
      setError("Please fill out all required fields.")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Shipping details submitted:", formData)
      alert("Shipping details saved successfully!")
    } catch (err) {
      console.error(err)
      setError("Failed to save shipping details.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <SidebarProvider>
        <div className="flex min-h-screen bg-white text-black w-full">
          <SidebarInset className="bg-white">
            <div className="flex min-h-screen items-center justify-center p-6">
              <Card className="w-full max-w-2xl bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center text-black">Shipping Details</CardTitle>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="rounded-md bg-red-900/20 border border-red-800 p-3">
                        <p className="text-sm text-red-400">{error}</p>
                      </div>
                    )}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-black">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-black">
                            First Name *
                          </Label>
                          <Input
                            id="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            required
                            className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-black">
                            Last Name *
                          </Label>
                          <Input
                            id="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            required
                            className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-black">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                            className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-black">
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-black">Shipping Address</h3>
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-black">
                          Address *
                        </Label>
                        <Input
                          id="address"
                          type="text"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          required
                          className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apartment" className="text-black">
                          Apartment, suite, etc.
                        </Label>
                        <Input
                          id="apartment"
                          type="text"
                          value={formData.apartment}
                          onChange={(e) => handleInputChange("apartment", e.target.value)}
                          className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city" className="text-black">
                            City *
                          </Label>
                          <Input
                            id="city"
                            type="text"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            required
                            className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state" className="text-black">
                            State *
                          </Label>
                          <Input
                            id="state"
                            type="text"
                            value={formData.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                            required
                            className="bg-white border-gray-300 text-black placeholder:text-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode" className="text-black">
                            ZIP Code *
                          </Label>
                          <Input
                            id="zipCode"
                            type="text"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange("zipCode", e.target.value)}
                            required
                            className="bg-white border-gray-300 text-black placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-black">
                          Country
                        </Label>
                        <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                          <SelectTrigger className="bg-white border-gray-300 text-black">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white text-black  border-gray-300 rounded-md">
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="UK">India</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-gray-800 rounded-md text-white hover:bg-black" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Shipping Details"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
