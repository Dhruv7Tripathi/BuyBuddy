import { TracingBeam } from "@/components/ui/tracing-beam";

export default function HeroSection() {
  return (
    <TracingBeam className="custom-class">
      <div className="max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-black-800 mb-6 text-blue-600 dark:text-blue-400">BuyBuddy</h1>
        <img
          src="/cloth.webp"
          alt="Beautiful nature"
          width={700}
          height={700}
          className="rounded-lg shadow-lg ml-20"
        />
        <p className="mt-6 text-black-900 leading-relaxed ml-20">
          Welcome to BuyBuddy – your ultimate destination for trendy and stylish clothing! We curate the finest branded apparel for every occasion and bring it to you with ease. Explore our collection of top-tier affiliate links to the biggest fashion brands, ensuring you always get the best in quality, style, and convenience. Shop smarter, dress better – with BuyBuddy, your fashion journey starts here!"
        </p>
      </div>

      <div className="max-w-4xl text-center p-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">What's Different</h1>
        <img
          src="/c2.webp"
          alt="Beautiful nature"
          width={700}
          height={700}
          className="rounded-lg shadow-lg ml-20"
        />
        <p className="mt-6 text-black-900 leading-relaxed ml-20">
          "What sets BuyBuddy apart? Unlike traditional clothing websites, we don’t just sell—we connect you directly to the brands you love through our trusted affiliate partnerships. This means access to exclusive deals, the latest collections, and a seamless shopping experience without any hidden costs. At BuyBuddy, we focus on curation, convenience, and transparency, so you can shop confidently, knowing you’re getting authentic branded products every time. It's not just shopping—it's smarter shopping with your trusted style partner!"
        </p>
      </div>

      <div className="max-w-4xl text-center p-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">Why we use BuyBuddy ?</h1>
        <img
          src="/c4.jpg"
          alt="Beautiful nature"
          width={700}
          height={700}
          className="rounded-lg shadow-lg ml-20"
        />
        <p className="mt-6 text-black-900 leading-relaxed ml-20">
          "BuyBuddy simplifies your shopping experience by curating the best clothing from multiple brands, all in one place—saving you time and effort. Unlike browsing individual sites, we offer exclusive deals and make it easy to compare products side-by-side. Plus, every purchase through BuyBuddy supports our platform at no extra cost to you. It’s convenience, value, and style—all in one!
        </p>
      </div>
    </TracingBeam>
  );
}
