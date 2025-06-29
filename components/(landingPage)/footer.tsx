import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { Heart } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#2f3132] text-white px-4 py-8 md:py-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

          <div className="text-center sm:text-left col-span-1 sm:col-span-2 lg:col-span-1">
            <Image
              src="/footer.avif"
              alt="Footer Art"
              width={240}
              height={120}
              className="mb-4 rounded-md mx-auto sm:mx-0"
              priority
            />

          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-3 md:mb-4">Quick Links</h3>
            <ul className="space-y-1 md:space-y-2 text-sm">

              <li>
                <Link href="/shop/list/laptops" className="hover:text-gray-300 transition-colors">
                  Laptops
                </Link>
              </li>
              <li>
                <Link href="/shop/list/watches" className="hover:text-gray-300 transition-colors">
                  Watches
                </Link>
              </li>
              <li>
                <Link href="/shop/list/watches" className="hover:text-gray-300 transition-colors">
                  tablets
                </Link>
              </li>
              <li>
                <Link href="/shop/list/accessories" className="hover:text-gray-300 transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-3 md:mb-4">Legal</h3>
            <ul className="space-y-1 md:space-y-2 text-sm">
              <li>
                <Link
                  href="/terms&conditions"
                  className="hover:text-gray-300 transition-colors hover:underline"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy&policy"
                  className="hover:text-gray-300 transition-colors hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-3 md:mb-4">Contact Us</h3>
            <div className="space-y-1 md:space-y-2 text-sm mb-4">
              <p>
                <a
                  href="tel:0123456789"
                  className="hover:text-gray-300 transition-colors"
                >
                  Phone: 0123456789
                </a>
              </p>
              <p>
                <a
                  href="mailto:contact@buybuddy.com"
                  className="hover:text-gray-300 transition-colors"
                >
                  Email:@buybuddy.com
                </a>
              </p>
            </div>

            <div className="flex justify-center sm:justify-start space-x-4 text-xl">
              <a
                href="https://www.linkedin.com/in/dhruv-tripathi-9848792aa/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-pink-400 transition-colors transform hover:scale-110"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com/dhruvtripathi77"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-blue-400 transition-colors transform hover:scale-110"
              >
                <FaTwitter />
              </a>
              <a
                href="https://github.com/dhruv7tripathi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-gray-400 transition-colors transform hover:scale-110"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-6 md:my-8 border-gray-600" />


        <div className="flex items-center justify-center text-gray-300 space-x-1">
          <span className="text-sm">Made with</span>
          <Heart className="w-4 h-4 text-red-500 fill-current mx-1 animate-pulse" />
          <span className="text-sm">by Dhruv Tripathi</span>
        </div>


      </div>
    </footer>
  );
}