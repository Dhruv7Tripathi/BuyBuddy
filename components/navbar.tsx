// import Link from "next/link";
// import { ModeToggle } from "./ui/ModeToggle";

// export default function Navbar() {
//   return (
//     <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 bg-opacity-50 backdrop-blur-lg border-b shadow-sm z-50">
//       <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
//         <div className="text-xl font-bold">
//           <Link href="/" className="flex items-center">
//             <img
//               src="l3.png"
//               alt="logo"
//               className="h-10 w-10 mr-2 rounded-full border border-purple-200"
//             />
//             <span className="text-blue-600 dark:text-blue-400">BuyBuddy</span>
//           </Link>
//         </div>

//         <nav className="hidden md:flex gap-6 text-gray-700 dark:text-gray-300">
//           <Link
//             href="#meet"
//             className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
//           >
//             Home
//           </Link>
//           <Link
//             href="#about"
//             className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
//           >
//             About
//           </Link>
//           <Link
//             href="#contactus"
//             className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
//           >
//             Contact Us
//           </Link>
//         </nav>
//         <div className="flex items-center gap-4">
//           <button className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
//             Login
//           </button>
//           <ModeToggle />
//         </div>
//       </div>
//     </header>
//   );
// }
"use client"
import Link from "next/link";
import { Menu } from "lucide-react";

import { useSession } from "next-auth/react";
import UserAccountNav from "./auth/UserAccountNav";
import SignInButton from "./auth/SignInButton";
// import { Themetoggle } from "./ui/themetoggle";
import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold text-black dark:text-white">Donezo</h1>
      </div>

      <div className="hidden md:flex items-center space-x-6">
        <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
          Home
        </Link>
        <Link href="/createTodo" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
          Dashboard
        </Link>
        <Link href="/calender" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
          Calender
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {/* <Themetoggle /> */}
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
    </nav>
  );
}