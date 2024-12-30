"use client";

import React, { useState } from "react";

const faqs = [
  { question: "What is BuyBuddy?", answer: "BuyBuddy is a curated online platform for clothing that connects you to branded apparel through affiliate links. Instead of visiting multiple websites, BuyBuddy brings the latest collections, exclusive deals, and easy comparisons from top brands into one seamless shopping experience. It's your go-to partner for smarter, more convenient, and stylish shopping." },
  { question: "How can BuyBuddy help us?", answer: "BuyBuddy helps you by simplifying your shopping experience. It curates the best clothing options from top brands, saving you time and effort. You can compare products, discover exclusive deals, and enjoy a seamless browsing experience—all in one place. Plus, it ensures you find the best styles without navigating multiple websites." },
  { question: "Does this shop really reduce our time?", answer: "Yes, BuyBuddy significantly reduces your shopping time. Instead of browsing multiple websites, it consolidates clothing options from top brands into a single platform. With curated collections, easy comparisons, and highlighted deals, you can quickly find what youre looking for without the hassle of switching between sites." },
  { question: "Can we trust BuyBuddy?", answer: "Absolutely, BuyBuddy is a trustworthy platform. It partners with reputable brands and uses affiliate links to direct you to their official websites for secure purchases. Your transactions are handled directly by the brands, ensuring safety and reliability. Plus, BuyBuddy is transparent in its mission to simplify shopping while providing value to its users." },
  { question: "Does BuyBuddy provide clothes at cheaper prices?", answer: "BuyBuddy itself doesn’t sell clothes but connects you to branded apparel through affiliate links. While the prices are set by the respective brands, BuyBuddy often highlights exclusive deals, discounts, and offers that might not be easily found elsewhere. It helps you save time and potentially money by showcasing the best options in one place." },
];

export default function PeopleAlsoAsk() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-center mb-8 pb-4 py-8 text-blue-600 dark:text-blue-400">FAQs</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-md shadow-sm"
          >
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-medium text-black-900"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span>{openIndex === index ? "-" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 text-black-900">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
