"use client"

import { useState, useEffect, type FormEvent } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Package, ShoppingCart, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "next-auth/react"
export default function AddProduct() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState<string>("")
  const [imageUrl, setImageUrl] = useState("")
  const [category, setCategory] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    }
  }, [status, router])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title || !description || !price || !imageUrl) {
      setError("Please fill out all fields.")
      return
    }

    const numericPrice = Number.parseFloat(price)
    if (isNaN(numericPrice) || numericPrice <= 0) {
      setError("Please enter a valid price.")
      return
    }

    setIsLoading(true)
    try {
      await axios.post("/api/product", {
        title,
        description,
        price: numericPrice,
        imageUrl,
        category
      })

      router.push(`shop/(landingPage)/topSellingProduct`)
    } catch (err) {
      console.error(err)
      setError("Failed to add the product.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-white text-black w-full">
        <SidebarInset className="bg-white">
          <div className="flex min-h-screen items-center justify-center p-6 bg-white">
            <Card className="w-full max-w-md bg-white text-black border border-gray-200">
              <CardHeader className="bg-white">
                <CardTitle className="text-2xl font-bold text-center text-black">Add New Product</CardTitle>
              </CardHeader>

              <CardContent className="bg-white">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="rounded-md bg-red-50 border border-red-200 p-3">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-black">Title</Label>
                    <Input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      placeholder="Enter product title"
                      className="bg-white text-black border-gray-300 placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-black">Description</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      placeholder="Enter product description"
                      className="bg-white text-black border-gray-300 placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-black">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      className="bg-white text-black border-gray-300 placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imageUrl" className="text-black">Image URL</Label>
                    <Input
                      id="imageUrl"
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      required
                      placeholder="https://example.com/image.jpg"
                      className="bg-white text-black border-gray-300 placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-black">Category</Label>
                    <Input
                      id="category"
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      placeholder="Enter product category"
                      className="bg-white text-black border-gray-300 placeholder:text-gray-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800"
                    disabled={isLoading}
                  >
                    {isLoading ? "Adding Product..." : "Add Product"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}