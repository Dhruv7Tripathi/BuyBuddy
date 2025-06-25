"use client"

import { Package, ShoppingCart, Users, Shield } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const menuItems = [
  {
    title: "Products",
    url: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Privacy",
    url: "/admin/privacy",
    icon: Shield,
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black">
      <SidebarProvider>
        <div className="flex min-h-screen bg-black text-white w-full">
          <Sidebar className="bg-gray-900 border-gray-800">
            <SidebarHeader>
              <div className="flex items-center gap-2 px-4 py-2">
                <h1 className="text-lg font-semibold text-white">BuyBuddy</h1>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel className="text-gray-300">Admin Panel</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild className="text-gray-300 hover:text-white hover:bg-gray-800">
                          <a href={item.url}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
              <div className="px-4 py-2">
                <p className="text-sm text-gray-400">Admin Dashboard</p>
              </div>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset className="bg-black">
            <div className="p-6 max-w-4xl mx-auto">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-center text-white">Privacy Policy</CardTitle>
                  <p className="text-center text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
                </CardHeader>

                <CardContent className="prose prose-invert max-w-none">
                  <div className="space-y-6 text-gray-300">
                    <section>
                      <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
                      <p>
                        We collect information you provide directly to us, such as when you create an account, make a
                        purchase, or contact us for support. This may include:
                      </p>
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>Name, email address, and contact information</li>
                        <li>Billing and shipping addresses</li>
                        <li>Payment information (processed securely by our payment processors)</li>
                        <li>Purchase history and preferences</li>
                        <li>Communications with our customer service team</li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
                      <p>We use the information we collect to:</p>
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>Process and fulfill your orders</li>
                        <li>Communicate with you about your purchases</li>
                        <li>Provide customer support</li>
                        <li>Send you promotional materials (with your consent)</li>
                        <li>Improve our products and services</li>
                        <li>Prevent fraud and ensure security</li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-white mb-3">3. Information Sharing</h2>
                      <p>
                        We do not sell, trade, or otherwise transfer your personal information to third parties except
                        as described in this policy. We may share your information with:
                      </p>
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>Service providers who assist us in operating our business</li>
                        <li>Payment processors to handle transactions</li>
                        <li>Shipping companies to deliver your orders</li>
                        <li>Legal authorities when required by law</li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-white mb-3">4. Data Security</h2>
                      <p>
                        We implement appropriate security measures to protect your personal information against
                        unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
                        over the internet is 100% secure.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-white mb-3">5. Cookies and Tracking</h2>
                      <p>
                        We use cookies and similar tracking technologies to enhance your browsing experience, analyze
                        site traffic, and understand where our visitors are coming from. You can control cookie settings
                        through your browser preferences.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-white mb-3">6. Your Rights</h2>
                      <p>You have the right to:</p>
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>Access the personal information we hold about you</li>
                        <li>Request correction of inaccurate information</li>
                        <li>Request deletion of your personal information</li>
                        <li>Opt-out of marketing communications</li>
                        <li>Data portability (where applicable)</li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-white mb-3">7. Children&apos;s Privacy</h2>
                      <p>
                        Our services are not intended for children under 13 years of age. We do not knowingly collect
                        personal information from children under 13. If we become aware that we have collected such
                        information, we will take steps to delete it.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-white mb-3">8. International Data Transfers</h2>
                      <p>
                        Your information may be transferred to and processed in countries other than your own. We ensure
                        appropriate safeguards are in place to protect your information during such transfers.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-white mb-3">9. Data Retention</h2>
                      <p>
                        We retain your personal information for as long as necessary to fulfill the purposes outlined in
                        this policy, unless a longer retention period is required by law.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-white mb-3">10. Third-Party Links</h2>
                      <p>
                        Our website may contain links to third-party sites. We are not responsible for the privacy
                        practices or content of these external sites.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-white mb-3">11. Changes to This Policy</h2>
                      <p>
                        We may update this privacy policy from time to time. We will notify you of any changes by
                        posting the new policy on this page and updating the &quot;Last updated&quot; date.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-white mb-3">12. Contact Us</h2>
                      <p>
                        If you have any questions about this Privacy Policy or our data practices, please contact us at:
                      </p>
                      <div className="ml-4 mt-2">
                        <p>Email: privacy@buybuddy.com</p>
                        <p>Phone: (555) 123-4567</p>
                        <p>Address: 123 Commerce Street, Business City, BC 12345</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold text-white mb-3">13. GDPR Compliance</h2>
                      <p>
                        For users in the European Union, we comply with the General Data Protection Regulation (GDPR).
                        You have additional rights under GDPR, including the right to lodge a complaint with a
                        supervisory authority.
                      </p>
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
