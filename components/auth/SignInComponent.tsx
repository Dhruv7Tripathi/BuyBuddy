"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
export default function Home() {
  const [formData] = useState({
    email: '',
    password: '',
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };
  return (
    <>
      <div className="flex h-screen w-full">

        <div className="flex-1 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <Image src="/BuyBuddy.png" alt="BuyBuddy Logo" width={150} height={150} className="mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-center mb-6 text-black">Welcome to BuyBuddy</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Button
                type="button"
                className="w-full flex items-center text-black justify-center gap-2 border border-gray-300 font-medium py-3 px-4 rounded-full dark:bg-white hover:bg-gray-50 transition duration-300"
                onClick={() => {
                  signIn("google", { callbackUrl: "/" });
                }}
              >
                <Image src="/auth/google.png" alt="Google" width={20} height={20} />
                Log in with Google
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}