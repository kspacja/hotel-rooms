import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/stylingUtils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hotel",
  description: "Find room availability and book your stay.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <main className="p-6 max-w-[1024px] mx-auto">
          <h1>Hotel</h1>
          <h2 className="mb-4">Welcome to our hotel!</h2>
          {children}
        </main>
      </body>
    </html>
  );
}
