// import Navbar from "@/components/(landingPage)/navbar";
export const metadata = {
  title: 'BuyBuddy',
  description: 'Admin Panel for BuyBuddy',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Navbar /> */}
      <main>{children}</main>
    </>
  );
}
