"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = { text: string };

const SignInButton = ({ text }: Props) => {
  return (
    <Button className="bg-gray-800 text-white hover:bg-gray-900 transition-colors duration-300">
      <Link href="/signin">
        {text}
      </Link>
    </Button>
  );
};

export default SignInButton;