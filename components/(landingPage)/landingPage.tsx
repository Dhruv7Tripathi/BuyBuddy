import { Search, User, ShoppingCart, Menu, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl text-black font-bold">
                Buy<span className="text-blue-600">Buddy</span>
              </h1>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input type="text" placeholder="Search" className="pl-10 w-full" />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="h-5 w-5" />
                <span>Account</span>
              </div>
              <div className="relative">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  1
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 text-gray-700">
                <Menu className="h-4 w-4" />
                <span>All Categories</span>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Computer</span>
                <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Laptop</span>
                <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Mobile</span>
                <span className="text-gray-700 hover:text-blue-600 cursor-pointer">TV</span>
                <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Gaming</span>
                <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Camera</span>
                <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Tablet</span>
                <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Watch</span>
              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-80 bg-white rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between py-3 border-b cursor-pointer hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border border-gray-300 rounded"></div>
                  <span className="text-gray-700">Computers & Laptops</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between py-3 border-b cursor-pointer hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border border-gray-300 rounded"></div>
                  <span className="text-gray-700">Tablets</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between py-3 border-b cursor-pointer hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border border-gray-300 rounded"></div>
                  <span className="text-gray-700">Smartphones</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between py-3 border-b cursor-pointer hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border border-gray-300 rounded"></div>
                  <span className="text-gray-700">Camera & Photography</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between py-3 border-b cursor-pointer hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border border-gray-300 rounded"></div>
                  <span className="text-gray-700">TV & Home Theatre</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between py-3 border-b cursor-pointer hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border border-gray-300 rounded"></div>
                  <span className="text-gray-700">Video Games</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between py-3 border-b cursor-pointer hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border border-gray-300 rounded"></div>
                  <span className="text-gray-700">Smart Watches</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between py-3 border-b cursor-pointer hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border border-gray-300 rounded"></div>
                  <span className="text-gray-700">Computer Components</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between py-3 border-b cursor-pointer hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border border-gray-300 rounded"></div>
                  <span className="text-gray-700">Printers & Ink</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border border-gray-300 rounded"></div>
                  <span className="text-gray-700">Audios & Headphones</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </aside>

          {/* Hero Section */}
          <main className="flex-1">
            <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg overflow-hidden relative h-96">
              <div className="absolute inset-0 flex items-center justify-between px-12">
                <div className="text-white">
                  <h2 className="text-4xl font-bold mb-6">PLAY STATION 5</h2>
                  <Button className="bg-black hover:bg-gray-900 text-white px-8 py-3">Shop now!</Button>
                </div>
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="PlayStation 5 Console and Controller"
                    width={400}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Product Categories */}
        <div className="mt-8 grid grid-cols-3 gap-6">
          <div className="bg-black rounded-lg p-6 text-white relative overflow-hidden h-32">
            <h3 className="text-xl font-semibold">Smart Watches</h3>
            <div className="absolute right-4 top-4">
              <Image
                src="/boat.webp"
                alt="Smart Watch"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg p-6 text-white relative overflow-hidden h-32">
            <h3 className="text-xl font-semibold">Laptops</h3>
            <div className="absolute right-4 top-4">
              <Image
                src="/laptop.jpg"
                alt="Laptop"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>
          <div className="bg-black rounded-lg p-6 text-white relative overflow-hidden h-32">
            <h3 className="text-xl font-semibold">DJI Products</h3>
            <div className="absolute right-4 top-4">
              <Image
                src="/robo.jpg"
                alt="DJI Drone"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}
