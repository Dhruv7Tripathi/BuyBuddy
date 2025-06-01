// import Link from 'next/link';
// import Image from 'next/image';

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-white border-t ml-6 border-gray-200 py-20 pb-20">
//       <div className="container mx-auto px-4 md:px-8">
//         <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
//           <div className="mb-6 md:mb-0 flex items-center">
//             <Image
//               src="/landingpage/l3.png"
//               alt="logo"
//               className="mr-3 rounded-full border border-gray-200"
//               height={40}
//               width={40}
//             />
//             <div>
//               <h3 className="text-2xl font-semibold text-black">Buy Buddy</h3>
//               <p className="text-black text-sm">A product by Buddy</p>
//               <p className="text-black text-sm">
//                 Building in public at{' '}
//                 <a
//                   href="https://twitter.com/dhruvtripathi77"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-black underline"
//                 >
//                   @dhruvtripathi
//                 </a>
//               </p>
//             </div>
//           </div>
//           <div className="grid text-center grid-cols-2 md:grid-cols-3 gap-8">
//             <div className='text-center'>
//               <h4 className="font-medium  text-black mb-3">Categories</h4>
//               <ul className="space-y-2">
//                 <li>
//                   <Link href="/pricing" className="text-black">Mobiles</Link>
//                 </li>
//                 <li>
//                   <Link href="/components" className="text-black">Laptops</Link>
//                 </li>
//                 <li>
//                   <Link href="/templates" className="text-black">Watches</Link>
//                 </li>
//               </ul>
//             </div>
//             {/* <div>
//               <h4 className="font-medium text-black mb-3">About</h4>
//               <ul className="space-y-2">
//                 <li>
//                   <Link href="/about" className="text-black">About</Link>
//                 </li>
//               </ul>
//             </div> */}
//             <div>
//               <h4 className="font-medium text-black mb-3">Social</h4>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="https://twitter.com/dhruvtripathi77"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-black"
//                   >
//                     Twitter
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="https://www.linkedin.com/in/dhruv-tripathi-9848792aa/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-black"
//                   >
//                     LinkedIn
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
// components/Footer.tsx
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#0d111c] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img
            src="/footer-art.png"
            alt="Footer Art"
            className="w-60 h-auto mb-4 rounded-md"
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
          <p className="text-sm mb-4">Email: info@dhruvclothing.com</p>
          <div className="flex space-x-4 text-xl">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaGithub />
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <p>© 2024 dhruv Clothing Store. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookies</a>
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
