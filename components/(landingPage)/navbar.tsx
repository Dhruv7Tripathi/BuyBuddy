'use client'

import { Menu, Search, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import UserAccountNav from '../auth/UserAccountNav'
import SignInButton from '../auth/SignInButton'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const { data: session } = useSession()
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setShowNav(false)
      } else {
        setShowNav(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-gray-50 transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex ml-12 items-center">
              <h1 className="text-2xl text-black font-bold">
                Buy<span className="text-blue-600">Buddy</span>
              </h1>
            </div>
            <div className="flex-1 bg-white max-w-2xl mx-8">
              <div className="relative border border-gray-400 rounded-md shadow-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 w-full bg-white border-none rounded-md py-2 text-sm focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center space-x-6 mr-12">
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {session?.user ? (
                      <UserAccountNav user={session.user} />
                    ) : (
                      <SignInButton text="Account" />
                    )}
                  </div>
                  <div className="md:hidden">
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Category nav */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-8">
              <div className="ml-12 flex items-center space-x-2 text-gray-700">
                <Menu className="h-4 w-4" />
                <span>All Categories</span>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                {[
                  'Computer',
                  'Laptop',
                  'Mobile',
                  'TV',
                  'Gaming',
                  'Camera',
                  'Tablet',
                  'Watch',
                ].map((item) => (
                  <span
                    key={item}
                    className="text-gray-700 hover:text-blue-600 cursor-pointer"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
