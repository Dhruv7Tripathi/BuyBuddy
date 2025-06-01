import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

const collections = [
  {
    title: "Tablet",
    items: ["iPad", "Microsoft Surface", "Samsung Galaxy", "Amazon Fire", "E-Readers"],
    image: "/collections/tablet.avif",
    link: "All Tablet",
  },
  {
    title: "Smartphones",
    items: ["iPhone", "Samsung Galaxy", "Google"],
    image: "/collections/smartphones.png",
    link: "All Smartphones",
  },
  {
    title: "Smartwatches",
    items: [
      "Apple Watch",
      "Samsung Galaxy",
      "Android Smartwatches",
      "Fitness Smartwatches",
      "Smartwatches Accessories",
    ],
    image: "/collections/smartwatches.avif",
    link: "All Smartwatches",
  },
  {
    title: "Accessories",
    items: ["Chargers", "Power Banks", "Cables", "PC Fans", "Mobile Covers"],
    image: "/collections/cable.jpg",
    link: "All Accessories",
  },
];

export default function Collections() {
  return (
    <section className="bg-gray-50 ml-6 mr-6 py-12 px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">Collections</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {collections.map((collection) => (
          <div
            key={collection.title}
            className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between transition hover:shadow-md"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{collection.title}</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {collection.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-blue-600 font-medium flex items-center gap-1">
                {collection.link} <FaArrowRight className="text-xs" />
              </p>
              <div className="relative w-16 h-16">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
