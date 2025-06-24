'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="w-32 sm:w-36 md:w-40 lg:w-48">
        <Image
          src="/BuyBuddy.png"
          alt="App Logo"
          layout="responsive"
          width={150}
          height={150}
          priority
        />
      </div>
    </div>
  );
}
