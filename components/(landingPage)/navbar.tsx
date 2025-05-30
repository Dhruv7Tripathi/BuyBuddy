// // import Link from "next/link";
// // import { ModeToggle } from "./ui/ModeToggle";

// // export default function Navbar() {
// //   return (
// //     <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 bg-opacity-50 backdrop-blur-lg border-b shadow-sm z-50">
// //       <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
// //         <div className="text-xl font-bold">
// //           <Link href="/" className="flex items-center">
// //             <img
// //               src="l3.png"
// //               alt="logo"
// //               className="h-10 w-10 mr-2 rounded-full border border-purple-200"
// //             />
// //             <span className="text-blue-600 dark:text-blue-400">BuyBuddy</span>
// //           </Link>
// //         </div>

// //         <nav className="hidden md:flex gap-6 text-gray-700 dark:text-gray-300">
// //           <Link
// //             href="#meet"
// //             className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
// //           >
// //             Home
// //           </Link>
// //           <Link
// //             href="#about"
// //             className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
// //           >
// //             About
// //           </Link>
// //           <Link
// //             href="#contactus"
// //             className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
// //           >
// //             Contact Us
// //           </Link>
// //         </nav>
// //         <div className="flex items-center gap-4">
// //           <button className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
// //             Login
// //           </button>
// //           <ModeToggle />
// //         </div>
// //       </div>
// //     </header>
// //   );
// // }
// "use client"
// import Link from "next/link";
// import { Menu } from "lucide-react";

// import { useSession } from "next-auth/react";
// import UserAccountNav from "../auth/UserAccountNav";
// import SignInButton from "../auth/SignInButton";
// import { Button } from "../ui/button";

// export default function Navbar() {
//   const { data: session } = useSession();

//   return (
//     <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
//       <div className="flex items-center space-x-2">
//         <h1 className="text-xl font-bold text-black dark:text-white">BuyBuddy</h1>
//       </div>

//       <div className="hidden md:flex items-center space-x-6">
//         <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
//           Home
//         </Link>
//         <Link href="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
//           pricing
//         </Link>
//         <Link href="/shop" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
//           shop
//         </Link>
//       </div>

// <div className="flex items-center space-x-4">
//   <div className="flex items-center">
//     {session?.user ? (
//       <UserAccountNav user={session.user} />
//     ) : (
//       <SignInButton text="Sign In" />
//     )}
//   </div>
//   <div className="md:hidden">
//     <Button variant="ghost" size="icon">
//       <Menu className="h-6 w-6" />
//     </Button>
//   </div>
// </div>
//     </nav>
//   );
// }
"use client"
import { Menu, Search, ShoppingCart } from "lucide-react";

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
            <div className="flex items-center">
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

            <div className="flex items-center space-x-6">
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
              <div className="relative">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  1
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 text-gray-700">
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