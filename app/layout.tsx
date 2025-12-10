import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Text Tools - Free Online Text Transformation & Manipulation Utilities",
  description: "Free online text tools to transform, manipulate, and convert text. Includes case converters, encoders, decoders, and custom JavaScript text processing tools.",
  keywords: ["text tools", "text converter", "string manipulation", "online tools", "developer tools", "case converter", "json formatter"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5130489904430960"
          crossOrigin="anonymous"
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
