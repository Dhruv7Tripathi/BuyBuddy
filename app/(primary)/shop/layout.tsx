import Navbar from "@/components/(landingPage)/navbar";
import Footer from "@/components/(landingPage)/footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className=""
      >
        <Navbar />

        <main>{children}</main>
        <Footer />

      </body>
    </html>
  );
}
