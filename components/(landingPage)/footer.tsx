import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#2f3132] text-white px-4 py-8 md:py-10">
      <div className="max-w-9xl mx-auto">
        <div className="grid ml-12 grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 text-center lg:text-left">

          <div className="lg:col-span-2 flex flex-col items-center lg:items-start">
            <div className="mb-6">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300" />
                  <Image
                    src="/BuyBuddy.png"
                    width={40}
                    height={40}
                    alt="BuyBuddy Logo"
                    unoptimized
                    className="relative rounded-xl ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
                  />
                </div>
                <span className="text-2xl font-semibold text-white">
                  Bloggify
                </span>
              </Link>
            </div>

            {/* <p className="text-neutral-200 mb-6 text-sm leading-relaxed max-w-md">
              The mindful scroll for modern storytellers. Create, share, and discover inspiring content that matters.
            </p> */}
            <p className="text-neutral-100 mb-6 text-sm leading-relaxed max-w-sm">
              This website is created for project purposes only and is not intended for sale or commercial use.
            </p>

            <div className="flex items-center gap-2 text-sm text-neutral-200 mb-6">
              <span>Building in public at</span>
              <Link
                href="https://twitter.com/dhruvtripathi77"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-neutral-100 hover:text-white transition-colors duration-200"
              >
                @dhruv7tripathi
                <ExternalLink className="size-3" />
              </Link>
            </div>

            <div className="flex gap-2 ">
              <Link
                href="https://twitter.com/dhruvtripathi77"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg"
              >
                <SiX className="size-5 text-muted-foreground " />
              </Link>
              <Link
                href="https://www.linkedin.com/in/dhruv-tripathi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg"
              >
                <SiLinkedin className="size-5 text-muted-foreground  duration-200" />
              </Link>
              <Link
                href="https://github.com/dhruv7tripathi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg"
              >
                <SiGithub className="size-5 text-muted-foreground group-hover:text-white transition-colors duration-200" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3 ml-24 px-28 grid grid-cols-1 justify-end sm:grid-cols-2 md:grid-cols-3 gap-x-4">

            <div>
              <h3 className="text-lg font-semibold mb-3 md:mb-4">Quick Links</h3>
              <ul className="space-y-1 md:space-y-2 text-sm">
                <li>
                  <Link href="/shop/list/laptops" className="hover:text-gray-300 transition-colors">
                    Laptops
                  </Link>
                </li>
                <li>
                  <Link href="/shop/list/watches" className="hover:text-neutral-300 transition-colors">
                    Watches
                  </Link>
                </li>
                <li>
                  <Link href="/shop/list/tablets" className="hover:text-neutral-300 transition-colors">
                    Tablets
                  </Link>
                </li>
                <li>
                  <Link href="/shop/list/accessories" className="hover:text-neutral-300 transition-colors">
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 md:mb-4">Legal</h3>
              <ul className="space-y-1 md:space-y-2 text-sm">
                <li>
                  <Link href="/terms&conditions" className="hover:text-neutral-300 transition-colors ">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy&policy" className="hover:text-neutral-300 transition-colors ">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/#cookies" className="hover:text-neutral-300 transition-colors ">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 md:mb-4">Contact Us</h3>
              <div className="space-y-1 md:space-y-2 text-sm mb-4">
                <p>
                  <a href="tel:0123456789" className="hover:text-neutral-300 transition-colors">
                    Phone: 0123456789
                  </a>
                </p>
                <p>
                  <a href="mailto:contact@buybuddy.com" className="hover:text-neutral-300 transition-colors">
                    contact @buybuddy.com
                  </a>
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
