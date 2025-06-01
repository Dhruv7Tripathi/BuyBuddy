"use client";
import { useState } from "react";
import {
  Laptop,
  Smartphone,
  Camera,
  Tv,
  Gamepad2,
  Watch,
  Cpu,
  Music
} from "lucide-react";

import Link from "next/link";

const categories = [
  {
    label: "Computers & Laptops",
    icon: <Laptop className="w-5 h-5 mr-2" />,
    submenu: ["MacBook", "Dell", "HP", "Lenovo", "Accessories"],
  },
  {
    label: "Smartphones",
    icon: <Smartphone className="w-5 h-5 mr-2" />,
    submenu: ["Apple iPhone", "Samsung Galaxy", "Xiaomi", "Google Pixel", "Sony Xperia", "Accessories"],
  },
  {
    label: "Camera & Photography",
    icon: <Camera className="w-5 h-5 mr-2" />,
    submenu: ["DSLR", "Mirrorless", "Action Cam"],
  },
  {
    label: "TV & Home Theatre",
    icon: <Tv className="w-5 h-5 mr-2" />,
    submenu: ["Smart TVs", "Projectors", "Sound Systems"],
  },
  {
    label: "Video Games",
    icon: <Gamepad2 className="w-5 h-5 mr-2" />,
    submenu: ["PlayStation", "Xbox", "Nintendo", "Accessories"],
  },
  {
    label: "Smart Watches",
    icon: <Watch className="w-5 h-5 mr-2" />,
    submenu: ["Apple Watch", "Galaxy Watch", "Fossil"],
  },
  {
    label: "Computer Components",
    icon: <Cpu className="w-5 h-5 mr-2" />,
    submenu: ["RAM", "GPU", "SSD", "Motherboard"],
  },
  {
    label: "Audios & Headphones",
    icon: <Music className="w-5 h-5 mr-2" />,
    submenu: ["Earbuds", "Headphones", "Speakers"],
  },
];

export default function SidebarMenu() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative w-64">
      <ul className="bg-white rounded-lg shadow-md p-2">
        {categories.map((category, index) => (
          <li
            key={index}
            className="relative group flex text-black items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex items-center">
              {category.icon}
              <span className="text-sm font-medium">{category.label}</span>
            </div>
            <span>›</span>

            {hoveredIndex === index && (
              <ul className="absolute left-full top-0 ml-2 w-56 bg-white border rounded-lg shadow-lg z-10 p-3">
                {category.submenu.map((item, subIndex) => (
                  <li key={subIndex} className="py-1 hover:text-blue-600 text-sm">
                    <Link href="#">{item}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
