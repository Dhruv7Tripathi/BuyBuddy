import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-20 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="mb-6 md:mb-0 flex items-center">
            <Image
              src="/landingpage/l3.png"
              alt="logo"
              className="mr-3 rounded-full border border-gray-200"
              height={40}
              width={40}
            />
            <div>
              <h3 className="text-2xl font-semibold text-black">Buy Buddy</h3>
              <p className="text-black text-sm">A product by Buddy</p>
              <p className="text-black text-sm">
                Building in public at{' '}
                <a
                  href="https://twitter.com/dhruvtripathi77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black underline"
                >
                  @dhruvtripathi
                </a>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium text-black mb-3">Home</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/pricing" className="text-black">T-shirts</Link>
                </li>
                <li>
                  <Link href="/components" className="text-black">Shirts</Link>
                </li>
                <li>
                  <Link href="/templates" className="text-black">Jeans</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-black mb-3">About</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-black">About</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-black mb-3">Social</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://twitter.com/dhruvtripathi77"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/dhruv-tripathi-9848792aa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
