"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Fragrance } from "@/lib/fragrances";
import { useStore } from "@/lib/store";
import BottleIllustration from "./BottleIllustration";

interface ProductCardProps {
  fragrance: Fragrance;
  index?: number;
}

export default function ProductCard({ fragrance, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useStore();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ slug: fragrance.slug, name: fragrance.name, price: fragrance.price, size: "100ml" });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative flex flex-col"
    >
      {/* Image area */}
      <div className="relative overflow-hidden bg-[#111111] border border-white/5 aspect-[3/4] flex items-end justify-center pb-6">
        {/* Glow on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 60%, ${fragrance.accentColor}18 0%, transparent 70%)`,
          }}
        />

        {/* Bottle */}
        <motion.div
          animate={{ scale: hovered ? 1.05 : 1, y: hovered ? -8 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <BottleIllustration
            size="lg"
            accentColor={fragrance.accentColor}
            sublabel={fragrance.name.toUpperCase()}
          />
        </motion.div>

        {/* Quick-view overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40"
            >
              <Link
                href={`/product/${fragrance.slug}`}
                className="flex items-center gap-2 border border-white/20 text-[10px] tracking-[0.25em] uppercase px-5 py-2.5 text-[#f5f0e8] hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                <Eye size={12} /> Quick View
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="mt-4 flex flex-col gap-1">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#c9a96e]/70">{fragrance.toneLabel}</p>
        <Link href={`/product/${fragrance.slug}`}>
          <h3
            className="font-serif text-xl font-light hover:text-[#c9a96e] transition-colors"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {fragrance.name}
          </h3>
        </Link>
        <p className="text-xs text-[#f5f0e8]/40 tracking-wider">{fragrance.keyNotes}</p>
        <div className="flex items-center justify-between mt-3">
          <p className="text-sm text-[#f5f0e8]/80">£{fragrance.price}</p>
          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase border border-white/15 px-4 py-2 hover:border-[#c9a96e]/50 hover:text-[#c9a96e] transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span key="added" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Added ✓
                </motion.span>
              ) : (
                <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <ShoppingBag size={10} /> Add to Cart
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
