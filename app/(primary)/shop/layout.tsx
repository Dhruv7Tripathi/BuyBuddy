import Navbar from "@/components/(landingPage)/navbar";
import Footer from "@/components/(landingPage)/footer";
export const metadata = {
  title: 'My App',
  description: 'Description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
