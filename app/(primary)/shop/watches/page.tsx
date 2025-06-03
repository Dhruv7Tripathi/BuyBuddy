import React from 'react'
import Image from 'next/image'
import { watches } from "@/content/shop"
import { ProductFilters } from "@/components/sideFilter"
export default function Watches() {
  return (
    <div>
      <section className="py-10 bg-gray-300 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Watches</h2>
      </section>
      <section className="bg-gray-50 py-10 px-4">
        <div className="grid grid-cols-1 ml-60 mr-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {/* <ProductFilters /> */}
          {watches.map((watches, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition"
            >
              <div className="w-full h-48 flex justify-center items-center">
                <Image
                  src={watches.image}
                  alt={watches.title}
                  width={200}
                  height={200}
                  className="object-contain h-full"
                />
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="text-md font-semibold text-gray-900">{watches.title}</h3>
                {watches.description.map((line, i) => (
                  <p key={i} className="text-sm text-gray-500">
                    {line}
                  </p>
                ))}
              </div>
              <div className="mt-4 flex justify-between items-end">
                <p className="text-lg font-semibold text-gray-800">{watches.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
