"use client";

import { useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { StoreProvider, useStore } from "@/lib/store";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { fragrances } from "@/lib/fragrances";

function ProductContent({ slug }: { slug: string }) {
  const fragrance = fragrances.find((f) => f.slug === slug) ?? fragrances[0];
  const related = fragrances.filter((f) => f.slug !== fragrance.slug).slice(0, 3);

  const [size, setSize] = useState("100ml");
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const { addToCart } = useStore();

  const handleAdd = () => {
    addToCart({ slug: fragrance.slug, name: fragrance.name, price: fragrance.price, size });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const accordions = [
    {
      id: "ingredients",
      title: "Ingredients",
      content:
        "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Linalool, Limonene, Citronellol, Geraniol, Benzyl Salicylate, Benzyl Alcohol, Eugenol, Farnesol, Cinnamal. All ingredients are ethically sourced and cruelty-free.",
    },
    {
      id: "delivery",
      title: "Delivery & Returns",
      content:
        "Complimentary standard shipping on all orders over £100. Express delivery available at checkout. Returns accepted within 30 days on unopened items. All orders arrive in ZAIA signature packaging.",
    },
    {
      id: "notes",
      title: "About This Fragrance",
      content: fragrance.description,
    },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0d0d0d] pt-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
          {/* Back */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase text-[#f5f0e8]/40 hover:text-[#c9a96e] transition-colors mb-12"
          >
            <ArrowLeft size={12} /> Back to Collection
          </Link>

          {/* Product */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: bottle */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center bg-[#0a0a0a] border border-white/5 aspect-square"
            >
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: `radial-gradient(ellipse 60% 60% at 50% 55%, ${fragrance.accentColor}08 0%, transparent 65%)`,
                }}
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src={fragrance.image}
                  alt={fragrance.name}
                  fill
                  className="object-contain p-8"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Right: info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center"
            >
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#c9a96e] mb-4">
                {fragrance.toneLabel}
              </p>
              <h1
                className="font-serif text-4xl lg:text-5xl font-light mb-3"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                {fragrance.name}
              </h1>
              <p className="text-sm text-[#f5f0e8]/50 mb-6 leading-relaxed max-w-md">
                {fragrance.subtitle}
              </p>
              <p className="font-serif text-3xl font-light text-[#c9a96e] mb-8" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                £{fragrance.price}
              </p>

              {/* Notes pyramid */}
              <div className="mb-8 p-6 border border-white/5 bg-[#0a0a0a]">
                <p className="text-[9px] tracking-[0.3em] uppercase text-[#f5f0e8]/40 mb-4">Notes Pyramid</p>
                <div className="space-y-4">
                  {(["top", "heart", "base"] as const).map((tier) => (
                    <div key={tier} className="flex items-start gap-4">
                      <p className="text-[9px] tracking-[0.2em] uppercase text-[#c9a96e]/70 w-10 flex-shrink-0 pt-0.5">
                        {tier}
                      </p>
                      <p className="text-xs text-[#f5f0e8]/60 tracking-wide">
                        {fragrance.notes[tier].join(" · ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size selector */}
              <div className="mb-6">
                <p className="text-[9px] tracking-[0.3em] uppercase text-[#f5f0e8]/40 mb-3">Size</p>
                <div className="flex gap-3">
                  {["50ml", "100ml"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`border text-xs tracking-wider uppercase px-5 py-2.5 transition-all duration-300 ${
                        size === s
                          ? "border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/5"
                          : "border-white/10 text-[#f5f0e8]/40 hover:border-white/25"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to cart */}
              <motion.button
                onClick={handleAdd}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#f5f0e8] text-[#0d0d0d] text-xs tracking-[0.25em] uppercase py-4 mb-4 hover:bg-[#c9a96e] transition-colors duration-300 font-medium"
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span key="added" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Added to Cart ✓
                    </motion.span>
                  ) : (
                    <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Add to Cart — £{fragrance.price}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <p className="text-center text-[10px] text-[#f5f0e8]/25 tracking-wider uppercase mb-10">
                Complimentary shipping over £100 · Sample included
              </p>

              {/* Accordions */}
              <div className="border-t border-white/5">
                {accordions.map((acc) => (
                  <div key={acc.id} className="border-b border-white/5">
                    <button
                      onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                      className="w-full flex items-center justify-between py-4 text-left"
                    >
                      <span className="text-xs tracking-[0.2em] uppercase text-[#f5f0e8]/70">
                        {acc.title}
                      </span>
                      <motion.div
                        animate={{ rotate: openAccordion === acc.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={14} className="text-[#f5f0e8]/30" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openAccordion === acc.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-[#f5f0e8]/40 leading-relaxed pb-5">
                            {acc.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Pairs well with */}
          <div className="mt-28">
            <div className="mb-10">
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#c9a96e] mb-3">Pairs Well With</p>
              <h2
                className="font-serif text-3xl font-light"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                You may also like
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((f, i) => (
                <ProductCard key={f.slug} fragrance={f} index={i} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return (
    <StoreProvider>
      <ProductContent slug={slug} />
    </StoreProvider>
  );
}
