import React from 'react'
import Image from 'next/image'
import { accessories } from "@/content/shop"
import { ProductFilters } from "@/components/sideFilter"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
export default function Accessories() {
  return (
    <div>
      <section className="py-6 bg-gray-300 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Accessories</h2>
        <Link href={"/"}>
          <a className='text-gray-600' >Home</a>
        </Link>
        <span className="mx-2 text-gray-600">/</span>
        <a className="text-black hover:underline">Accessories</a>
        <p className="text-gray-600 mt-2">Explore our collection of accessories</p>
      </section>

      <section className="bg-gray-50 py-10 px-4">
        <div className="flex gap-6">
          <div className="w-80 flex-shrink-0">
            <ProductFilters />
          </div>

          <Separator orientation="vertical" className="h-auto border-gray-600" />

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {accessories.map((accessories, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition"
                >
                  <div className="w-full h-48 flex justify-center items-center">
                    <Image
                      src={accessories.image}
                      alt={accessories.title}
                      width={200}
                      height={200}
                      className="object-contain h-full"
                    />
                  </div>

                  <div className="mt-4 space-y-1">
                    <h3 className="text-md font-semibold text-gray-900">{accessories.title}</h3>
                    {accessories.description.map((line, i) => (
                      <p key={i} className="text-sm text-gray-500">
                        {line}
                      </p>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-between items-end">
                    <p className="text-lg font-semibold text-gray-800">{accessories.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}