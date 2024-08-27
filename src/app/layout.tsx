import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/ui/StarBackground";
import Navbar from "@/components/ui/Navbar";
import { cn } from "@/lib/utils";
import Footer from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web3JobPortal",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="nhRfXle5OXFKWN-0DTxovy31T0P3Q6mAfVs845GnzZY"
      />
      <body
        className={cn(
          inter.className,
          "bg-[#030014] overflow-y-scroll overflow-x-hidden"
        )}
      >
        <StarsCanvas />
        <Navbar />
        <div className="px-2 md:p-0">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
