"use client"
import { Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserAccountNav from "../auth/UserAccountNav";
import SignInButton from "../auth/SignInButton";
import { Button } from "../ui/button";
export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div className=" bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex ml-6 items-center">
              <h1 className="text-2xl text-black font-bold">
                Buy<span className="text-blue-600">Buddy</span>
              </h1>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input type="text" placeholder="Search" className="pl-10 w-full border rounded-md py-2" />
              </div>
            </div>

            <div className="flex items-center space-x-6 mr-12">
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {session?.user ? (
                      <UserAccountNav user={session.user} />
                    ) : (
                      <SignInButton text="Sign In" />
                    )}
                  </div>
                  <div className="md:hidden">
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative ">
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-8">
              <div className="ml-6 flex items-center space-x-2 text-gray-700">
                <Menu className="h-4 w-4" />
                <span>All Categories</span>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Computer</span>
                <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Laptop</span>
                <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Mobile</span>
                <span className="text-gray-700 hover:text-blue-600 cursor-pointer">TV</span>
                <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Gaming</span>
                <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Camera</span>
                <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Tablet</span>
                <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Watch</span>
              </div>
            </div>

          </div>
        </div>
      </nav>
    </div>
  );
}