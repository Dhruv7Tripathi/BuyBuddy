import { FaApple } from "react-icons/fa";
import { SiHp, SiDell, SiXiaomi, SiJbl, SiAsus } from "react-icons/si";

const brands = [
  { name: "EPSON", icon: null },
  { name: "HP", icon: <SiHp size={40} /> },
  { name: "DELL", icon: <SiDell size={40} /> },
  { name: "Apple", icon: <FaApple size={40} /> },
  { name: "Mi", icon: <SiXiaomi size={40} /> },
  { name: "Logi", icon: null },
  { name: "JBL", icon: <SiJbl size={40} /> },
  { name: "ASUS", icon: <SiAsus size={40} /> },
];

export default function SelectedBrands() {
  return (
    <section className="py-10 bg-gray-300 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-10">Selected Brands</h2>
      <div className="flex flex-wrap justify-center gap-12">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="flex items-center justify-center w-20 h-20 text-gray-700 hover:text-black transition"
          >
            {brand.icon ? (
              brand.icon
            ) : (
              <span className="text-xl font-bold">{brand.name}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
