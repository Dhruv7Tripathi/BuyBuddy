// import Image from "next/image";
import Navbar from "@/components/navbar";
import { HeroParallax, Header, ProductCard } from "@/components/ui/hero-parallax";
// import { title } from "process";
import PeopleAlsoAsk from "@/components/FAQs";
import Footer from "@/components/footer";
import HeroSection from "@/components/heroSection";
export default function Home() {
  const products = [
    {
      title: "Product 1",
      link: "/product/1",
      thumbnail: "/1.jpg",
    },
    {
      title: "Product 2",
      link: "/product/2",
      thumbnail: "/2.jpg",
    },
    {
      title: "Product 3",
      link: "/product/3",
      thumbnail: "/3.jpg",
    },
    {
      title: "Product 4",
      link: "/product/4",
      thumbnail: "/4.jpg",
    },
    {
      title: "Product 5",
      link: "/product/5",
      thumbnail: "/5.jpg",
    },
    {
      title: "Product 6",
      link: "/product/6",
      thumbnail: "/6.jpg",
    },
    {
      title: "Product 7",
      link: "/product/7",
      thumbnail: "/c4.jpg",
    },
    {
      title: "Product 8",
      link: "/product/8",
      thumbnail: "/cloth.webp",
    },
    {
      title: "Product 9",
      link: "/product/9",
      thumbnail: "/c2.webp",
    },




  ];
  return (
    <div>
      <Navbar />
      {/* <Sidebar /> */}
      {/* <Header /> */}

      {/* <div className='flex justify-center items-center h-screen'>
        <h1 className='text-4xl font-bold'>Welcome to KaiShop</h1> */}
      {/* <Header /> */}
      {/* <ProductCard products={products} /> */}
      <HeroParallax products={products} />
      {/* <ProductCard products={products},translate={} /> */}
      {/* </div> */}
      <HeroSection />
      <PeopleAlsoAsk />
      <Footer />
    </div>

  );
}
