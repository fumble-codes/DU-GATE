import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SeedData } from "@/components/seed-data";
import { Providers } from "@/components/providers";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CUETPioneer - CUET Exam Preparation",
  description:
    "Comprehensive CUET exam preparation platform with mock tests, PYQ bank, chapter practice, and performance analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full`} suppressHydrationWarning>
      <body className="h-full">
        <SeedData />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
