"use client"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white">
      <SidebarProvider>
        <div className="flex min-h-screen bg-white text-black w-full">
          <SidebarInset className="bg-white">
            <div className="p-6 max-w-4xl mx-auto">
              <Card className="bg-white border-gray-300">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-center text-black">Terms and Conditions</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-invert max-w-none">
                  <div className="space-y-6 text-gray-800">
                    <section>
                      <h2 className="text-xl font-semibold text-black mb-3">1. Acceptance of Terms</h2>
                      <p>
                        By accessing and using BuyBuddy&apos;s services, you accept and agree to be bound by the terms and
                        provision of this agreement. If you do not agree to abide by the above, please do not use this
                        service.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-black mb-3">2. Use License</h2>
                      <p>
                        Permission is granted to temporarily download one copy of the materials on BuyBuddy&apos;`s website
                        for personal, non-commercial transitory viewing only. This is the grant of a license, not a
                        transfer of title, and under this license you may not:
                      </p>
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>modify or copy the materials</li>
                        <li>use the materials for any commercial purpose or for any public display</li>
                        <li>attempt to reverse engineer any software contained on the website</li>
                        <li>remove any copyright or other proprietary notations from the materials</li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-black mb-3">3. Product Information</h2>
                      <p>
                        We strive to provide accurate product information, including descriptions, prices, and
                        availability. However, we do not warrant that product descriptions or other content is accurate,
                        complete, reliable, current, or error-free.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-black mb-3">4. Pricing and Payment</h2>
                      <p>
                        All prices are subject to change without notice. We reserve the right to modify or discontinue
                        products at any time. Payment must be received in full before products are shipped.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-black mb-3">5. Shipping and Delivery</h2>
                      <p>
                        We will make every effort to deliver products within the estimated timeframe. However, delivery
                        dates are estimates only and we are not liable for delays in delivery.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-black mb-3">6. Returns and Refunds</h2>
                      <p>
                        Items may be returned within 30 days of purchase in original condition. Refunds will be
                        processed within 5-10 business days after we receive the returned item.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-black mb-3">7. User Accounts</h2>
                      <p>
                        You are responsible for maintaining the confidentiality of your account information and
                        password. You agree to accept responsibility for all activities that occur under your account.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-black mb-3">8. Privacy Policy</h2>
                      <p>
                        Your privacy is important to us. Please review our Privacy Policy, which also governs your use
                        of the service, to understand our practices.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-black mb-3">9. Limitation of Liability</h2>
                      <p>
                        In no event shall BuyBuddy or its suppliers be liable for any damages (including, without
                        limitation, damages for loss of data or profit, or due to business interruption) arising out of
                        the use or inability to use the materials on BuyBuddy&apos;s website.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-black mb-3">10. Governing Law</h2>
                      <p>
                        These terms and conditions are governed by and construed in accordance with the laws of [Your
                        Jurisdiction] and you irrevocably submit to the exclusive jurisdiction of the courts in that
                        state or location.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-black mb-3">11. Changes to Terms</h2>
                      <p>
                        We reserve the right to update these terms and conditions at any time without prior notice. Your
                        continued use of the service after any changes indicates your acceptance of the new terms.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-black mb-3">12. Contact Information</h2>
                      <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
                      <div className="ml-4 mt-2">
                        <p>Email: legal@buybuddy.com</p>
                        <p>Phone: (555) 123-4567</p>
                        <p>Address: 123 Commerce Street, Business City, BC 12345</p>
                      </div>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
