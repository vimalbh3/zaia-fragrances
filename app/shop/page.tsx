"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { fragrances, tones } from "@/lib/fragrances";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialTone = searchParams.get("tone");
  const [activeTone, setActiveTone] = useState<string | null>(initialTone);

  const filtered = activeTone
    ? fragrances.filter((f) => f.tone === activeTone)
    : fragrances;

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0d0d0d] pt-24">
        {/* Header */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 border-b border-white/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#c9a96e] mb-4">Shop</p>
            <h1
              className="font-serif text-5xl lg:text-7xl font-light"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              The Collection
            </h1>
          </motion.div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
          {/* Tone filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            <button
              onClick={() => setActiveTone(null)}
              className={`text-[9px] tracking-[0.25em] uppercase border px-5 py-2.5 transition-all duration-300 ${
                activeTone === null
                  ? "border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/5"
                  : "border-white/10 text-[#f5f0e8]/40 hover:border-white/25 hover:text-[#f5f0e8]/70"
              }`}
            >
              All
            </button>
            {tones.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTone(t.id)}
                className={`text-[9px] tracking-[0.25em] uppercase border px-5 py-2.5 transition-all duration-300 ${
                  activeTone === t.id
                    ? "border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/5"
                    : "border-white/10 text-[#f5f0e8]/40 hover:border-white/25 hover:text-[#f5f0e8]/70"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.map((f, i) => (
              <ProductCard key={f.slug} fragrance={f} index={i} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopContent />
    </Suspense>
  );
}
