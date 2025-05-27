// components/Sidebar.tsx
import React from "react";
import Link from "next/link";
// import { ModeToggle } from "@/components/ui/ModeToggle";
const Sidebar: React.FC = () => {
  const components = [
    { name: "T-shirts", path: "/components/cloths/TShirts" },
    { name: "Jeans", path: "/components/cloths/avatar" },
    { name: "Lowers", path: "/components/badge" },
    { name: "watches", path: "/components/button-group" },
    { name: "Trousers", path: "/components/buttons" },
    { name: "Caps", path: "/components/checkbox" },
    { name: "girls", path: "/components/cookies" },
    // { name: "Footer", path: "/components/footer" },
    // { name: "Form", path: "/components/form" },
    // { name: "Gallery", path: "/components/gallery" },
    // { name: "Indicators", path: "/components/indicators" },
    // { name: "Input", path: "/components/input" },
    // { name: "KBD", path: "/components/kbd" },
    // { name: "List Group", path: "/components/list-group" },
    // { name: "Pagination", path: "/components/pagination" },
    // { name: "Progress", path: "/components/progress" },
    // { name: "Rating", path: "/components/rating" },
    // { name: "Select", path: "/components/select" },
    // { name: "Switch", path: "/components/switch" },
  ];

  return (
    <div className="h-screen w-60 bg-black-800 text-white flex flex-col py-4 p-6 pb-6">
      {/* <h2 className="text-2xl font-bold px-4 mb-4">BuyBuddy</h2> */}
      <nav>
        <ul className="space-y-2">
          {components.map((component) => (
            <li key={component.name}>
              <Link href={component.path} className="block px-4 py-2 rounded hover:bg-gray-700 transition">

                {component.name}

              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
