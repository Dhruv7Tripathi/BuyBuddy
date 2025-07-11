"use client";
import * as React from "react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { LoaderCircle } from "lucide-react";
import axios from "axios";

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

function CheckoutContent() {
  const router = useRouter();
  const params = useSearchParams();
  const amount = params.get("amount");
  const plan = params.get("plan");

  const [loading1, setLoading1] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [orderId, setOrderId] = React.useState<string | null>(null);

  const createOrder = React.useCallback(async () => {
    try {
      const response = await axios.post("/api/order", {
        amount: parseFloat(amount!) * 100,
        currency: "INR",
        plan,
      });

      setOrderId(response.data.orderId);
    } catch (error) {
      console.error("Order creation failed:", error);
    } finally {
      setLoading1(false);
    }
  }, [amount, plan]);

  React.useEffect(() => {
    if (!amount) {
      router.replace("/");
    }
    createOrder();
  }, [amount, router, createOrder]);

  const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!orderId) {
      alert("Order not ready yet. Please wait.");
      setLoading(false);
      return;
    }

    try {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: parseFloat(amount!) * 100,
        currency: "INR",
        name: "YSaas Starter",
        description: `Subscription - ${plan} Plan`,
        order_id: orderId,
        handler: async (response: RazorpayResponse) => {
          const verifyData = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            plan,
          };

          try {
            const res = await axios.post("/api/verify", verifyData);

            if (res.data.success) {
              alert("Payment successful! Your subscription has been updated.");
              router.push("/dashboard");
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Something went wrong during verification.");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
        },
        theme: { color: "#3399cc" },
        method: {
          upi: true,
          netbanking: true,
          card: true,
        },
      };

      // const paymentObject = new window.Razorpay(options);
      // paymentObject.on("payment.failed", (response: { error: { description: string } }) => {
      //   alert("Payment failed. " + response.error.description);
      // });
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", (response) => {
        alert("Payment failed: " + response.error.description);
      });


      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred while processing your payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading1)
    return (
      <div className="container h-screen flex justify-center items-center">
        <LoaderCircle className="animate-spin h-20 w-20 text-primary" />
      </div>
    );

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <section className="container h-screen flex flex-col justify-center items-center gap-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Checkout
        </h1>
        <Card className="max-w-[25rem] space-y-8">
          <CardHeader>
            <CardTitle className="my-4">Choose Payment Method</CardTitle>
            <CardDescription>
              Select your preferred payment method to complete the subscription.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={processPayment}>
              <Button className="w-full mb-4" type="submit" disabled={loading}>
                {loading ? "Processing..." : "Pay with Card / UPI"}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground underline underline-offset-4">
              Please read the terms and conditions.
            </p>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CheckoutContent />
    </Suspense>
  );
}

function LoadingFallback() {
  return (
    <div className="container h-screen flex justify-center items-center">
      <LoaderCircle className="animate-spin h-20 w-20 text-primary" />
    </div>
  );
}