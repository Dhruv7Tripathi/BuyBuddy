import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="bg-[#2f3132] text-white px-4 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Image
            src="/footer.avif"
            alt="Footer Art"
            width={240}
            height={120}
            className="mb-4 rounded-md"
            priority
          />

          <p className="text-sm">
            Dhruv Clothing Store brings you the latest fashion trends with quality and style.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>Clothing Style</li>
            <li>Fashion Design</li>
            <li>Design</li>
            <li>Branding</li>
            <li>Marketing</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm mb-2">Phone: 0123456789</p>
          <p className="text-sm mb-4">Email: @dhruvclothing.com</p>
          <div className="flex space-x-4 text-xl">

            <FaInstagram />
            <Link href="https://twitter.com/dhruvtripathi77" >
              <FaTwitter />
            </Link>
            <Link href="https://github.com/dhruv7tripathi">
              <FaGithub />
            </Link>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-white">
        <p>© 2024 dhruv Clothing Store. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 bg-black rounded-full p-3 hover:bg-gray-800 transition">
        <a href="#top" aria-label="Scroll to top">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
