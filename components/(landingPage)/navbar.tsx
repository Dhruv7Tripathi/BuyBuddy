'use client'

import { Menu, Search, ShoppingCart, Heart, X } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import UserAccountNav from '../auth/UserAccountNav'
import SignInButton from '../auth/SignInButton'
import { Button } from '../ui/button'
import NavSearch from './search'
export default function Navbar() {
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (query.trim()) {
  //     router.push(`/search?q=${encodeURIComponent(query.trim())}`)
  //   }
  // }
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
                <NavSearch />

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
                <NavSearch />

              </div>

              <div className="flex flex-col space-y-3 pt-2 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Login</span>
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
                      // { name: 'Gaming', href: '/category/list/gaming' },
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
                  // { name: 'Gaming', href: '/shop/list/gaming' },
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
// "use client"

// import type React from "react"

// import { Menu, Search, ShoppingCart, Heart, X, Loader2 } from "lucide-react"
// import Link from "next/link"
// import { useSession } from "next-auth/react"
// import { useState, useEffect, useRef } from "react"
// import UserAccountNav from "../auth/UserAccountNav"
// import SignInButton from "../auth/SignInButton"
// import { Button } from "../ui/button"
// import { useRouter } from "next/navigation"
// import axios from "axios"

// type SearchResult = {
//   id: string
//   title: string
//   price: number
//   imageUrl: string
//   category: string
// }

// export default function Navbar() {
//   const { data: session } = useSession()
//   const [query, setQuery] = useState("")
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [searchResults, setSearchResults] = useState<SearchResult[]>([])
//   const [showSearchResults, setShowSearchResults] = useState(false)
//   const [isSearching, setIsSearching] = useState(false)
//   const router = useRouter()
//   const searchRef = useRef<HTMLDivElement>(null)
//   const mobileSearchRef = useRef<HTMLDivElement>(null)

//   // Close search results when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         searchRef.current &&
//         !searchRef.current.contains(event.target as Node) &&
//         mobileSearchRef.current &&
//         !mobileSearchRef.current.contains(event.target as Node)
//       ) {
//         setShowSearchResults(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])

//   // Search products as user types
//   useEffect(() => {
//     const searchProducts = async () => {
//       if (query.trim().length > 2) {
//         setIsSearching(true)
//         try {
//           const response = await axios.get(`/api/products/search?q=${encodeURIComponent(query.trim())}`)
//           setSearchResults(response.data.slice(0, 5)) // Show only first 5 results
//           setShowSearchResults(true)
//         } catch (error) {
//           console.error("Search error:", error)
//           setSearchResults([])
//         } finally {
//           setIsSearching(false)
//         }
//       } else {
//         setSearchResults([])
//         setShowSearchResults(false)
//       }
//     }

//     const debounceTimer = setTimeout(searchProducts, 300)
//     return () => clearTimeout(debounceTimer)
//   }, [query])

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (query.trim()) {
//       router.push(`/search?q=${encodeURIComponent(query.trim())}`)
//       setShowSearchResults(false)
//       setIsMobileMenuOpen(false)
//     }
//   }

//   const handleProductClick = (productId: string) => {
//     router.push(`/product/${productId}`)
//     setShowSearchResults(false)
//     setIsMobileMenuOpen(false)
//     setQuery("")
//   }

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen)
//   }

//   return (
//     <div className="z-50 bg-gray-50 transition-transform duration-300">
//       <header className="bg-white sticky z-10 top-0 border-b shadow-sm">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <Link href="/">
//                 <h1 className="text-2xl text-black font-bold ml-4 md:ml-12 cursor-pointer">
//                   Buy<span className="text-blue-600">Buddy</span>
//                 </h1>
//               </Link>
//             </div>

//             {/* Desktop Search Bar */}
//             <div className="hidden md:flex flex-1 bg-white max-w-2xl mx-8 relative" ref={searchRef}>
//               <form
//                 onSubmit={handleSearch}
//                 className="relative border text-black border-gray-400 rounded-md shadow-sm w-full"
//               >
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-4 w-4" />
//                 {isSearching && (
//                   <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 animate-spin" />
//                 )}
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   className="pl-10 pr-10 w-full bg-white border-none rounded-md py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </form>

//               {/* Desktop Search Results Dropdown */}
//               {showSearchResults && (
//                 <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-96 overflow-y-auto z-50">
//                   {searchResults.length > 0 ? (
//                     <>
//                       {searchResults.map((product) => (
//                         <div
//                           key={product.id}
//                           onClick={() => handleProductClick(product.id)}
//                           className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
//                         >
//                           <img
//                             src={product.imageUrl || "/placeholder.svg?height=40&width=40"}
//                             alt={product.title}
//                             className="w-10 h-10 object-cover rounded mr-3"
//                           />
//                           <div className="flex-1">
//                             <p className="text-sm font-medium text-gray-900 truncate">{product.title}</p>
//                             <p className="text-xs text-gray-500">{product.category}</p>
//                           </div>
//                           <p className="text-sm font-semibold text-blue-600">${product.price}</p>
//                         </div>
//                       ))}
//                       <div className="p-3 border-t bg-gray-50">
//                         <button
//                           onClick={handleSearch}
//                           className="text-sm text-blue-600 hover:text-blue-800 font-medium"
//                         >
//                           View all results for "{query}"
//                         </button>
//                       </div>
//                     </>
//                   ) : query.trim().length > 2 && !isSearching ? (
//                     <div className="p-4 text-center text-gray-500">No products found for "{query}"</div>
//                   ) : null}
//                 </div>
//               )}
//             </div>

//             <div className="hidden md:flex items-center space-x-6 mr-12">
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center">
//                   {session?.user ? <UserAccountNav user={session.user} /> : <SignInButton text="Account" />}
//                 </div>
//               </div>

//               <div className="relative">
//                 <Link href="/shop/wishlist">
//                   <Heart className="h-5 w-5 text-gray-600 hover:text-blue-600 transition-colors" />
//                 </Link>
//               </div>

//               <div className="relative">
//                 <Link href="/cart">
//                   <ShoppingCart className="h-5 w-5 text-gray-600 hover:text-blue-600 transition-colors" />
//                 </Link>
//               </div>
//             </div>

//             <div className="md:hidden bg-white rounded-md mr-4">
//               <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="p-2 rounded-md bg-white">
//                 {isMobileMenuOpen ? <X className="h-6 w-6 text-black" /> : <Menu className="h-6 w-6 text-black" />}
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
//             <div className="px-4 py-2 space-y-4">
//               <div className="relative" ref={mobileSearchRef}>
//                 <form onSubmit={handleSearch} className="relative border border-gray-400 rounded-md shadow-sm">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-4 w-4" />
//                   {isSearching && (
//                     <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 animate-spin" />
//                   )}
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     className="pl-10 pr-10 w-full bg-white border-none rounded-md py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </form>

//                 {/* Mobile Search Results */}
//                 {showSearchResults && (
//                   <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-64 overflow-y-auto z-50">
//                     {searchResults.length > 0 ? (
//                       <>
//                         {searchResults.map((product) => (
//                           <div
//                             key={product.id}
//                             onClick={() => handleProductClick(product.id)}
//                             className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
//                           >
//                             <img
//                               src={product.imageUrl || "/placeholder.svg?height=32&width=32"}
//                               alt={product.title}
//                               className="w-8 h-8 object-cover rounded mr-3"
//                             />
//                             <div className="flex-1">
//                               <p className="text-sm font-medium text-gray-900 truncate">{product.title}</p>
//                               <p className="text-xs text-gray-500">{product.category}</p>
//                             </div>
//                             <p className="text-sm font-semibold text-blue-600">${product.price}</p>
//                           </div>
//                         ))}
//                         <div className="p-3 border-t bg-gray-50">
//                           <button
//                             onClick={handleSearch}
//                             className="text-sm text-blue-600 hover:text-blue-800 font-medium"
//                           >
//                             View all results
//                           </button>
//                         </div>
//                       </>
//                     ) : query.trim().length > 2 && !isSearching ? (
//                       <div className="p-4 text-center text-gray-500 text-sm">No products found</div>
//                     ) : null}
//                   </div>
//                 )}
//               </div>

//               <div className="flex flex-col space-y-3 pt-2 pb-4">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-700 font-medium">Account</span>
//                   <div>{session?.user ? <UserAccountNav user={session.user} /> : <SignInButton text="Sign In" />}</div>
//                 </div>

//                 <Link
//                   href="/shop/wishlist"
//                   className="flex items-center justify-between py-2 border-t pt-3"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span className="text-gray-700">Wishlist</span>
//                   <Heart className="h-5 w-5 text-gray-600" />
//                 </Link>

//                 <Link
//                   href="/cart"
//                   className="flex items-center justify-between py-2"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span className="text-gray-700">Cart</span>
//                   <ShoppingCart className="h-5 w-5 text-gray-600" />
//                 </Link>

//                 <div className="border-t pt-3">
//                   <div className="flex items-center space-x-2 text-gray-700 mb-3">
//                     <Menu className="h-4 w-4" />
//                     <span className="font-medium">All Categories</span>
//                   </div>
//                   <div className="flex flex-col space-y-2 ml-6">
//                     {[
//                       { name: "Laptop", href: "/shop/list/laptops" },
//                       { name: "Gaming", href: "/shop/list/gaming" },
//                       { name: "Tablet", href: "/shop/list/tablets" },
//                       { name: "Watch", href: "/shop/list/watches" },
//                       { name: "Accessories", href: "/shop/list/accessories" },
//                     ].map((item) => (
//                       <Link
//                         key={item.name}
//                         href={item.href}
//                         className="text-gray-600 hover:text-blue-600 py-1"
//                         onClick={() => setIsMobileMenuOpen(false)}
//                       >
//                         {item.name}
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </header>

//       <nav className="hidden md:block bg-white border-b">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between h-12">
//             <div className="flex items-center space-x-8">
//               <div className="ml-12 flex items-center space-x-2 text-gray-700">
//                 <Menu className="h-4 w-4" />
//                 <span>All Categories</span>
//               </div>

//               <div className="flex items-center space-x-6 text-sm">
//                 {[
//                   { name: "Laptop", href: "/shop/list/laptops" },
//                   { name: "Gaming", href: "/shop/list/gaming" },
//                   { name: "Tablet", href: "/shop/list/tablets" },
//                   { name: "Watch", href: "/shop/list/watches" },
//                   { name: "Accessories", href: "/shop/list/accessories" },
//                 ].map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors"
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   )
// }
