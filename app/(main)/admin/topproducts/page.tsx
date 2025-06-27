"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { RefreshCw, Package } from "lucide-react"
import axios from "axios"
import type { Decimal } from "@prisma/client/runtime/library"
import Loader from "@/components/(landingPage)/loading"

interface Product {
  id: string
  title: string
  imageUrl: string | null
  description: string
  price: number
  category: string | null
  isTopProduct: boolean
}

const decimalToNumber = (decimal: Decimal | number): number => {
  if (typeof decimal === "number") return decimal
  return Number.parseFloat(decimal.toString())
}

const formatPrice = (price: Decimal | number): string => {
  return decimalToNumber(price).toFixed(2)
}

export default function AdminTopProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/product")
      setProducts(response.data)
    } catch (error: unknown) {
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

  const handleRefresh = async () => {
    try {
      setRefreshing(true)
      const response = await axios.get("/api/product")
      setProducts(response.data)
      toast({
        title: "Success",
        description: "Products refreshed successfully",
      })
    } catch (error: unknown) {
      console.error("Error refreshing products:", error)
      toast({
        title: "Error",
        description: "Failed to refresh products",
        variant: "destructive",
      })
    } finally {
      setRefreshing(false)
    }
  }

  const toggleTopProduct = async (productId: string, isTopProduct: boolean) => {
    try {
      setUpdating(productId)
      const response = await axios.patch(`/api/product/${productId}/toggle-top`, { isTopProduct })
      const data = response.data

      setProducts(products.map((product) => (product.id === productId ? { ...product, isTopProduct } : product)))

      toast({
        title: "Success",
        description: data.message,
      })
    } catch (error: unknown) {
      console.error("Error updating product:", error)
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update product",
        variant: "destructive",
      })
    } finally {
      setUpdating(null)
    }
  }

  const topProducts = products.filter((p) => p.isTopProduct)
  const regularProducts = products.filter((p) => !p.isTopProduct)

  if (loading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 space-y-8">
        {/* Enhanced Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-3">

              <div>
                <h1 className="text-3xl font-bold text-gray-900">Top Products</h1>
                <p className="text-gray-600 mt-1">Manage your featured products showcase</p>
              </div>
            </div>
            <div className="flex items-center gap-4">

              <Button
                onClick={handleRefresh}
                variant="outline"
                disabled={refreshing}
                className="bg-white hover:bg-gray-50 border-gray-200 text-gray-700 shadow-sm"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Cards Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Current Top Products Card */}
          <Card className="bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-4">
            </CardHeader>
            <CardContent>
              {topProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="p-3 bg-gray-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">No featured products selected</p>
                  <p className="text-gray-400 text-sm mt-1">Select up to 4 products to feature</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {topProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors duration-150"
                    >
                      <div className="relative">
                        <Image
                          src={product.imageUrl || "/placeholder.svg?height=64&width=64"}
                          alt={product.title}
                          width={64}
                          height={64}
                          className="object-cover rounded-lg shadow-sm"
                        />

                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{product.title}</h3>
                        <p className="text-lg font-bold text-gray-700">${formatPrice(product.price)}</p>
                        {product.category && (
                          <Badge variant="outline" className="text-xs mt-2 border-gray-200 text-gray-600">
                            {product.category}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 hidden sm:block">Featured</span>
                        <Switch
                          checked={true}
                          onCheckedChange={() => toggleTopProduct(product.id, false)}
                          disabled={updating === product.id}
                          className="data-[state=checked]:bg-gray-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* All Products Card */}
          <Card className="bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-xl text-gray-900">

                <span>All Products ({products.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {regularProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center space-x-4 p-4 border border-gray-100 rounded-xl hover:border-gray-200 hover:bg-gray-50 transition-all duration-150"
                  >
                    <Image
                      src={product.imageUrl || "/placeholder.svg?height=56&width=56"}
                      alt={product.title}
                      width={56}
                      height={56}
                      className="object-cover rounded-lg shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{product.title}</h3>
                      <p className="text-sm text-gray-600">${formatPrice(product.price)}</p>
                      {product.category && (
                        <Badge variant="outline" className="text-xs mt-1 border-gray-200 text-gray-600">
                          {product.category}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <span className="text-sm text-gray-600 block">Feature</span>
                        <span className="text-xs text-gray-400">
                          {topProducts.length >= 4 ? "Max reached" : "Available"}
                        </span>
                      </div>
                      <Switch
                        checked={product.isTopProduct}
                        onCheckedChange={(checked) => toggleTopProduct(product.id, checked)}
                        disabled={updating === product.id || (topProducts.length >= 4 && !product.isTopProduct)}
                        className="data-[state=checked]:bg-gray-300"
                      />
                    </div>
                  </div>
                ))}
                {products
                  .filter((p) => p.isTopProduct)
                  .map((product) => (
                    <div
                      key={`top-${product.id}`}
                      className="flex items-center space-x-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
                    >
                      <div className="relative">
                        <Image
                          src={product.imageUrl || "/placeholder.svg?height=56&width=56"}
                          alt={product.title}
                          width={56}
                          height={56}
                          className="object-cover rounded-lg shadow-sm"
                        />

                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{product.title}</h3>
                        <p className="text-sm text-gray-600">${formatPrice(product.price)}</p>
                        {product.category && (
                          <Badge
                            variant="outline"
                            className="text-xs mt-1 border-gray-200 text-gray-700 bg-yellow-50"
                          >
                            {product.category}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <span className="text-sm text-yellow-700 font-medium block">Featured</span>
                          <span className="text-xs text-yellow-600">Currently active</span>
                        </div>
                        <Switch
                          checked={product.isTopProduct}
                          onCheckedChange={(checked) => toggleTopProduct(product.id, checked)}
                          disabled={updating === product.id}
                          className="data-[state=checked]:bg-gray-300"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
