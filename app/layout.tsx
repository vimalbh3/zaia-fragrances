import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "ZAIA Fragrances — Refined. Unisex. Timeless.",
  description: "Niche unisex fragrances crafted with intention. Explore the ZAIA collection.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#0d0d0d] text-[#f5f0e8] antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
