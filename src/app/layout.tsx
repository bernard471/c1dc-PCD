import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from '@/providers/SessionProvider';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";

// Update the font configuration
const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NextAuthSessionProvider session={session}>
          {children}
          <Toaster />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
