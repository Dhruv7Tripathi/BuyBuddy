"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import Loader from "@/components/(landingPage)/loading"
import axios from "axios"
interface Product {
  id: string
  title: string
  imageUrl: string | null
  description: string
  price: number
  category: string | null
  isTopProduct: boolean
}

export default function AdminTopProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/product")
      setProducts(response.data)
    } catch (error) {
      console.error("Error fetching products:", error)
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleTopProduct = async (productId: string, isTopProduct: boolean) => {
    try {
      setUpdating(productId)
      const response = await axios.patch(`/api/products/${productId}/toggle-top`, { isTopProduct })
      const data = response.data

      setProducts(products.map((product) => (product.id === productId ? { ...product, isTopProduct } : product)))

      toast({
        title: "Success",
        description: data.message,
      })
    } catch (error: any) {
      console.error("Error updating product:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update product",
        variant: "destructive",
      })
    } finally {
      setUpdating(null)
    }
  }

  const topProducts = products.filter((p) => p.isTopProduct)

  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Top Products</h1>
        <div className="flex items-center gap-4">
          <Badge variant="secondary">{topProducts.length}/4 Top Products Selected</Badge>
          <Button onClick={fetchProducts} variant="outline">
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Top Products ({topProducts.length}/4)</CardTitle>
          </CardHeader>
          <CardContent>
            {topProducts.length === 0 ? (
              <p className="text-muted-foreground">No top products selected</p>
            ) : (
              <div className="space-y-4">
                {topProducts.map((product) => (
                  <div key={product.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <Image
                      src={product.imageUrl || "/placeholder.svg?height=60&width=60"}
                      alt={product.title}
                      width={60}
                      height={60}
                      className="object-contain rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.title}</h3>
                      <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                      {product.category && (
                        <Badge variant="outline" className="text-xs mt-1">
                          {product.category}
                        </Badge>
                      )}
                    </div>
                    <Switch
                      checked={true}
                      onCheckedChange={() => toggleTopProduct(product.id, false)}
                      disabled={updating === product.id}
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {products.map((product) => (
                <div key={product.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                  <Image
                    src={product.imageUrl || "/placeholder.svg?height=60&width=60"}
                    alt={product.title}
                    width={60}
                    height={60}
                    className="object-contain rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.title}</h3>
                    <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                    {product.category && (
                      <Badge variant="outline" className="text-xs mt-1">
                        {product.category}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Top Product</span>
                    <Switch
                      checked={product.isTopProduct}
                      onCheckedChange={(checked) => toggleTopProduct(product.id, checked)}
                      disabled={updating === product.id}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
