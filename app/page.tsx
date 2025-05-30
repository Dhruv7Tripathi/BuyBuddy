// import Navbar from "@/components/(landingPage)/navbar";
// import { HeroParallax } from "@/components/ui/hero-parallax";
// import PeopleAlsoAsk from "@/components/(landingPage)/FAQs";
import Footer from "@/components/(landingPage)/footer";
// import HeroSection from "@/components/(landingPage)/heroSection";
// import { products } from "@/content";
import HomePage from "@/components/(landingPage)/landingPage";
export default function Home() {
  return (
    <div>
      {/* <Navbar />
      <HeroParallax products={products} />
      <HeroSection />
      <PeopleAlsoAsk /> */}
      <HomePage />
      <Footer />
    </div>
  );
}
