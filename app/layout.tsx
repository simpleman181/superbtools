import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevToolkit - Developer Utilities",
  description: "A collection of essential developer utilities — JSON formatter, password generator, UUID generator, and 70+ more free tools.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  themeColor: "#3b82f6",
  openGraph: {
    title: "DevToolkit - Developer Utilities",
    description: "70+ free developer tools — JSON, Base64, UUID, Password Generator, and more.",
    url: "https://superbtools.vercel.app",
    siteName: "DevToolkit",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "DevToolkit - Developer Utilities",
    description: "70+ free developer tools — JSON, Base64, UUID, Password Generator, and more.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen bg-background">
          {children}
        </main>
      </body>
    </html>
  );
}
