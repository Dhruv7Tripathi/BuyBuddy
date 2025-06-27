import Image from "next/image"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function CollectionsPage() {
  return (
    <div className="bg-gray-50 ml-6 mr-4 p-4 md:p-6 lg:p-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Collections</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Tablet</h3>
                  <div className="space-y-2">
                    <p className="text-gray-700 hover:text-gray-900 cursor-pointer text-sm">iPad</p>
                    <p className="text-gray-700 hover:text-gray-900 cursor-pointer text-sm">Microsoft Surface</p>
                    <p className="text-gray-700 hover:text-gray-900 cursor-pointer text-sm">Samsung Galaxy</p>
                    <p className="text-gray-700 hover:text-gray-900 cursor-pointer text-sm">Amazon Fire</p>
                    <p className="text-gray-700 hover:text-gray-900 cursor-pointer text-sm">E-Readers</p>
                  </div>
                </div>
                <div className="w-40 h-40 ml-4 flex-shrink-0">
                  <Image
                    src="/(collections)/tablet.jpg"
                    alt="Tablet"
                    width={160}
                    height={80}
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
              <Link
                href="/shop/list/tablets"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm pt-2"
              >
                <span>All Tablet</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Laptops</h3>
                  <div className="space-y-2">
                    <p className="text-gray-700 hover:text-gray-900 cursor-pointer text-sm">Asus</p>
                    <p className="text-gray-700 hover:text-gray-900 cursor-pointer text-sm">Lenovo</p>
                    <p className="text-gray-700 hover:text-gray-900 cursor-pointer text-sm">Macbook</p>
                    <p className="text-gray-700 hover:text-gray-900 cursor-pointer text-sm">Dell</p>
                    <p className="text-gray-700 hover:text-gray-900 cursor-pointer text-sm">Acer</p>
                  </div>
                </div>
                <div className="w-40 h-40 ml-4 flex-shrink-0">
                  <Image
                    src="/(collections)/laptop.png"
                    alt="Laptop"
                    width={160}
                    height={80}
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
              <Link
                href="/shop/list/laptops"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm pt-2"
              >
                <span>All Laptops</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Smartwatches</h3>
                  <div className="space-y-2">
                    <p className="text-gray-700 hover:text-gray-900 cursor-pointer text-sm">Apple Watch</p>
                    <p className="text-gray-700 hover:text-gray-900 cursor-pointer text-sm">Samsung Galaxy</p>
                    <p className="text-gray-700 hover:text-gray-900 cursor-pointer text-sm">Android Smartwatches</p>
                    <p className="text-gray-700 hover:text-gray-900 cursor-pointer text-sm">Fitness Smartwatches</p>
                    <p className="text-gray-700 hover:text-gray-900 cursor-pointer text-sm">Smartwatches Accessories</p>
                  </div>
                </div>
                <div className="w-40 h-40 relative ml-4 flex-shrink-0">
                  <Image
                    src="/(collections)/applewatch.webp"
                    alt="Smartwatch"
                    width={160}
                    height={80}
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
              <Link
                href="/shop/list/watches"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm pt-2"
              >
                <span>All Smartwatches</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Accessories</h3>
                  <div className="space-y-2">
                    <p className="text-gray-700 hover:text-gray-900 cursor-pointer text-sm">Chargers</p>
                    <p className="text-gray-700 hover:text-gray-900 cursor-pointer text-sm">Power Banks</p>
                    <p className="text-gray-700 hover:text-gray-900 cursor-pointer text-sm">Cables</p>
                    <p className="text-gray-700 hover:text-gray-900 cursor-pointer text-sm">PC Fans</p>
                    <p className="text-gray-700 hover:text-gray-900 cursor-pointer text-sm">Mobile Covers</p>
                  </div>
                </div>
                <div className="w-40 h-40 relative ml-4 flex-shrink-0">
                  <Image
                    src="/(collections)/headphones.webp"
                    alt="Accessories"
                    width={160}
                    height={80}
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
              <Link
                href="/shop/list/accessories"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm pt-2"
              >
                <span>All Accessories</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
