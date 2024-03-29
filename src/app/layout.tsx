import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner"
import Nav from "@/components/Bottom/Nav";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event Management System",
  description: "A simple implementation for paperless Event Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} min-h-screen`}>
          <div className="flex justify-center items-center pt-6 mx-auto max-w-[612px]">
            {children}
          </div>
          <Nav className="md:max-w-[480px] md:rounded-xl md:m-5 md:me-2 md:left-auto md:right-0" />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
