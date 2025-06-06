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
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
