
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/(landingPage)/navbar";

type PricingCardProps = {
  title: string;
  price: number;
  description: string;
  features: string[];
  actionLabel: string;
};

const PricingCard = ({ title, price, description, features, actionLabel }: PricingCardProps) => (

  <Card className="max-w-80 space-y-6">
    <CardHeader className="pb-8 pt-4 gap-8">
      <CardTitle className="">
        {title}
      </CardTitle>
      <h3 className="text-3xl font-bold my-6">
        Rs {price}
      </h3>
    </CardHeader>
    <CardContent className="flex flex-col gap-2">
      <CardDescription className="pt-1.5 h-12">{description}</CardDescription>
      {features.map((f, i) => {
        return <span key={i} className="flex justify-center items-center gap-4 text-sm text-muted-foreground"><CheckCircle2 className="text-green-500 h-4 w-4" />{f}</span>
      })}
    </CardContent>
    <CardFooter className="mt-2">
      <Button className="w-full" asChild>
        <Link href={`/checkout/?amount=${price}`}>
          {actionLabel}
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

export default function Page() {
  const plans = [
    {
      title: "Basic",
      price: 999,
      description: "Essential features you need to get started",
      features: [
        "Example Feature Number 1",
        "Example Feature Number 2",
        "Example Feature Number 3",
      ],
      actionLabel: "Get Basic",
    },
    {
      title: "Pro",
      price: 5999,
      description: "Perfect for owners of small & medium businessess",
      features: [
        "Example Feature Number 1",
        "Example Feature Number 2",
        "Example Feature Number 3",
      ],
      actionLabel: "Get Pro",
    }
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container py-8 flex flex-col items-center justify-center text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight mb-4">Pricing Plans</h1>
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-12">Choose the plan that&apos;s right for you</h2>
        <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8">
          {plans.map((plan) => {
            return <PricingCard key={plan.title} {...plan} />;
          })}
        </section>
      </div>
    </div>
  );
}
// 'use client';

// import { Button } from '@/components/ui/button';
// import { CheckCircle2 } from 'lucide-react';

// export default function PricingPage() {
//   return (
//     <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
//       <div className="container px-4 md:px-6">
//         <div className="flex flex-col items-center justify-center space-y-4 text-center">
//           <div className="space-y-2">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
//             <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//               Choose the plan that's right for your project
//             </p>
//           </div>
//         </div>
//         <div className="grid gap-6 pt-12 lg:grid-cols-3 lg:gap-8">
//           {/* Starter Plan */}
//           <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
//             <div className="space-y-4">
//               <h3 className="text-xl font-bold">Starter</h3>
//               <div className="text-4xl font-bold">₹4,999</div>
//               <p className="text-sm text-muted-foreground">One-time payment</p>
//               <ul className="grid gap-3 text-sm">
//                 <li className="flex items-center gap-2">
//                   <CheckCircle2 className="h-4 w-4 text-primary" />
//                   <span>Basic Authentication</span>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle2 className="h-4 w-4 text-primary" />
//                   <span>Razorpay Integration</span>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle2 className="h-4 w-4 text-primary" />
//                   <span>User Management</span>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle2 className="h-4 w-4 text-primary" />
//                   <span>3 months support</span>
//                 </li>
//               </ul>
//             </div>
//             <Button className="mt-6" variant="outline">
//               Get Started
//             </Button>
//           </div>

//           {/* Pro Plan */}
//           <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm ring-2 ring-primary">
//             <div className="space-y-4">
//               <div className="inline-block rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
//                 Popular
//               </div>
//               <h3 className="text-xl font-bold">Pro</h3>
//               <div className="text-4xl font-bold">₹9,999</div>
//               <p className="text-sm text-muted-foreground">One-time payment</p>
//               <ul className="grid gap-3 text-sm">
//                 <li className="flex items-center gap-2">
//                   <CheckCircle2 className="h-4 w-4 text-primary" />
//                   <span>Advanced Authentication</span>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle2 className="h-4 w-4 text-primary" />
//                   <span>Complete Razorpay Integration</span>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle2 className="h-4 w-4 text-primary" />
//                   <span>Team Management</span>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle2 className="h-4 w-4 text-primary" />
//                   <span>Analytics Dashboard</span>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle2 className="h-4 w-4 text-primary" />
//                   <span>6 months support</span>
//                 </li>
//               </ul>
//             </div>
//             <Button className="mt-6">Get Started</Button>
//           </div>

//           {/* Enterprise Plan */}
//           <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
//             <div className="space-y-4">
//               <h3 className="text-xl font-bold">Enterprise</h3>
//               <div className="text-4xl font-bold">₹19,999</div>
//               <p className="text-sm text-muted-foreground">One-time payment</p>
//               <ul className="grid gap-3 text-sm">
//                 <li className="flex items-center gap-2">
//                   <CheckCircle2 className="h-4 w-4 text-primary" />
//                   <span>Everything in Pro</span>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle2 className="h-4 w-4 text-primary" />
//                   <span>White-label solution</span>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle2 className="h-4 w-4 text-primary" />
//                   <span>Custom integrations</span>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle2 className="h-4 w-4 text-primary" />
//                   <span>Priority support</span>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle2 className="h-4 w-4 text-primary" />
//                   <span>12 months support</span>
//                 </li>
//               </ul>
//             </div>
//             <Button className="mt-6" variant="outline">
//               Contact Sales
//             </Button>
//           </div>
//         </div>
//       </div>
//     </section>

//   );
// }
