import React from 'react'
import Image from 'next/image'
export default function Watches() {
  const watches = [
    {
      title: "Rolex Submariner",
      image: "/watches/rolex-submariner.jpg",
      description: [
        "Classic diving watch",
        "Automatic movement",
        "Water-resistant up to 300m"
      ],
      price: "$8,500"
    },
    {
      title: "Omega Speedmaster",
      image: "/watches/omega_speedmaster.webp",
      description: [
        "Iconic chronograph",
        "Manual winding movement",
        "Moonwatch heritage"
      ],
      price: "$5,200"
    },
    {
      title: "Tag Heuer Carrera",
      image: "/watches/tag_heuer_carrera.avif",
      description: [
        "Sporty design",
        "Automatic movement",
        "Water-resistant up to 100m"
      ],
      price: "$3,500"
    },
    {
      title: "Breitling Navitimer",
      image: "/watches/breitling_navitimer.jpg",
      description: [
        "Aviator's watch",
        "Chronograph function",
        "Slide rule bezel"
      ],
      price: "$7,800"
    },
    {
      title: "Patek Philippe Nautilus",
      image: "/watches/patek_philippe_nautilus.webp",
      description: [
        "Luxury sports watch",
        "Automatic movement",
        "Iconic design"
      ],
      price: "$30,000"
    },
    {
      title: "Cartier Tank",
      image: "/watches/cartier_tank.webp",
      description: [
        "Elegant dress watch",
        "Quartz movement",
        "Timeless design"
      ],
      price: "$4,000"
    },
    {
      title: "IWC Pilot's Watch",
      image: "/watches/iwc_pilots_watch.webp",
      description: [
        "Aviator's watch",
        "Automatic movement",
        "Large legible dial"
      ],
      price: "$6,500"
    },
    {
      title: "Seiko Prospex Diver",
      image: "/watches/seiko_prospex_diver.webp",
      description: [
        "Affordable diving watch",
        "Automatic movement",
        "Water-resistant up to 200m"
      ],
      price: "$500"
    }
  ]
  return (
    <div>
      <section className="py-10 bg-gray-300 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Watches</h2>
      </section>
      <section className="bg-gray-50 py-10 px-4">
        <div className="flex justify-between ml-6 items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Top Selling watchess</h2>
        </div>

        <div className="grid grid-cols-1 ml-6 mr-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
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
