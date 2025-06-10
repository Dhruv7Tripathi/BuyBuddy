import Navbar from "@/components/(landingPage)/navbar";
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
    </>
  );
}
