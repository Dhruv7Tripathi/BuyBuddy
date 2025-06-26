'use client'

import { Menu, Search, ShoppingCart, Heart, X } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import UserAccountNav from '../auth/UserAccountNav'
import SignInButton from '../auth/SignInButton'
import { Button } from '../ui/button'

export default function Navbar() {
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="z-50 bg-gray-50 transition-transform duration-300">
      <header className="bg-white sticky z-10 top-0 border-b shadow-sm">
        <div className="container mx-auto px-4">

          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl text-black font-bold ml-4 md:ml-12">
                Buy<span className="text-blue-600">Buddy</span>
              </h1>
            </div>

            <div className="hidden md:flex flex-1 bg-white max-w-2xl mx-8">
              <div className="relative border border-gray-400 rounded-md shadow-sm w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 w-full bg-white border-none rounded-md py-2 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6 mr-12">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {session?.user ? (
                    <UserAccountNav user={session.user} />
                  ) : (
                    <SignInButton text="Account" />
                  )}
                </div>
              </div>
              <div className="relative">
                <Link href="/shop/wishlist">
                  <Heart className="h-5 w-5 text-gray-600" />
                </Link>
              </div>
              <div className="relative">
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                </Link>
              </div>
            </div>
            <div className="md:hidden bg-white rounded-md mr-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="p-2 rounded-md bg-white"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-black" />
                ) : (
                  <Menu className="h-6 w-6 text-black" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-2 space-y-4">
              <div className="relative border border-gray-400 rounded-md shadow-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 w-full bg-white border-none rounded-md py-2 text-sm focus:outline-none"
                />
              </div>

              <div className="flex flex-col space-y-3 pt-2 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Account</span>
                  <div>
                    {session?.user ? (
                      <UserAccountNav user={session.user} />
                    ) : (
                      <SignInButton text="Sign In" />
                    )}
                  </div>
                </div>



                <Link
                  href="/shop/wishlist"
                  className="flex items-center justify-between py-2 border-t pt-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-gray-700">Wishlist</span>
                  <Heart className="h-5 w-5 text-gray-600" />
                </Link>

                <Link
                  href="/cart"
                  className="flex items-center justify-between py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-gray-700">Cart</span>
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                </Link>
                <div className="border-t pt-3">
                  <div className="flex items-center space-x-2 text-gray-700 mb-3">
                    <Menu className="h-4 w-4" />
                    <span className="font-medium">All Categories</span>
                  </div>
                  <div className="flex flex-col space-y-2 ml-6">
                    {[
                      { name: 'Laptop', href: '/category/list/laptops' },
                      { name: 'Gaming', href: '/category/list/gaming' },
                      { name: 'Tablet', href: '/category/list/tablets' },
                      { name: 'Watch', href: '/category/list/watches' },
                      { name: 'Accessories', href: '/category/list/accessories' },
                    ].map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-gray-600 hover:text-blue-600 py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </header>

      <nav className="hidden md:block bg-white border-b ">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-8">
              <div className="ml-12 flex items-center space-x-2 text-gray-700">
                <Menu className="h-4 w-4" />
                <span>All Categories</span>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                {[
                  { name: 'Laptop', href: '/shop/list/laptops' },
                  { name: 'Gaming', href: '/shop/list/gaming' },
                  { name: 'Tablet', href: '/shop/list/tablets' },
                  { name: 'Watch', href: '/shop/list/watches' },
                  { name: 'Accessories', href: '/shop/list/accessories' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 cursor-pointer"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}