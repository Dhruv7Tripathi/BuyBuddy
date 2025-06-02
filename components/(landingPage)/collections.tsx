import Image from "next/image"
import { ChevronRight } from "lucide-react"

export default function CollectionsPage() {
  return (
    <div className=" bg-gray-50 ml-6 mr-4 p-4 md:p-6 lg:p-8">



      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Collections</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Tablet</h3>
                <div className="w-16 h-16 relative">
                  <Image src="/collections/tablet.avif" alt="Tablet" fill className="object-contain" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">iPad</p>
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">Microsoft Surface</p>
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">Samsung Galaxy</p>
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">Amazon Fire</p>
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">E-Readers</p>
              </div>

              <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <span>All Tablet</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Smartphones</h3>
                <div className="w-16 h-16 relative">
                  <Image src="/collections/smartphones.png" alt="Smartphone" fill className="object-contain" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">iPhone</p>
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">Samsung Galaxy</p>
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">Google</p>
              </div>

              <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <span>All Smartphones</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Smartwatches</h3>
                <div className="w-16 h-16 relative">
                  <Image src="/watch.webp" alt="Smartwatch" fill className="object-contain" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">Apple Watch</p>
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">Samsung Galaxy</p>
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">Android Smartwatches</p>
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">Fitness Smartwatches</p>
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">Smartwatches Accessories</p>
              </div>

              <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <span>All Smartwatches</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Accessories</h3>
                <div className="w-16 h-16 relative">
                  <Image
                    src="/collections/cable.jpg"
                    alt="Accessories"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">Chargers</p>
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">Power Banks</p>
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">Cables</p>
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">PC Fans</p>
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">Mobile Covers</p>
              </div>

              <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <span>All Accessories</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
