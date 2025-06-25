import { FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { Heart } from "lucide-react";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-[#2f3132] text-white px-4 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        <div>
          <Image
            src="/footer.avif"
            alt="Footer Art"
            width={240}
            height={120}
            className="mb-4 rounded-md"
            priority
          />
          {/* <p className="text-sm">
            BuyBuddy Tech Store brings you the latest digital device trends with
            quality.
          </p> */}
        </div>
        <div className="col-span-2 md:col-span-1 mx-auto md:mx-0">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>Tech</li>
            <li>Laptops</li>
            <li>Watches</li>
            <li>Mobiles</li>
            <li>Accessories</li>
          </ul>
        </div>

        <div className="mx-auto md:mx-0">
          <h3 className="text-lg font-semibold mb-4">Rules</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/terms&conditions" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy&policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1 mx-auto md:mx-0">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm mb-2">Phone: 0123456789</p>
          <p className="text-sm mb-4">Email: contact@buybuddy.com</p>
          <div className="flex justify-center md:justify-start space-x-4 text-xl">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com/dhruvtripathi77"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://github.com/dhruv7tripathi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />

      <div className="flex items-center justify-center text-gray-50 space-x-1">
        <span>Made with</span>
        <Heart className="w-4 h-4 text-red-600 fill-current mx-1" />
        <span>by Dhruv Tripathi</span>
      </div>
    </footer>
  );
}
