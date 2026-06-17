"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { useStore } from "@/lib/store";
import { fragrances } from "@/lib/fragrances";
import { useCurrency } from "@/lib/currency";
import Link from "next/link";

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const { formatPrice } = useCurrency();
  const [query, setQuery] = useState("");

  const results = query.length > 1
    ? fragrances.filter(
        (f) =>
          f.name.toLowerCase().includes(query.toLowerCase()) ||
          f.keyNotes.toLowerCase().includes(query.toLowerCase()) ||
          f.toneLabel.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] bg-[#0d0d0d]/98 backdrop-blur-md flex flex-col"
        >
          <div className="flex justify-end px-8 pt-6">
            <button onClick={() => { setSearchOpen(false); setQuery(""); }} className="text-[#f5f0e8]/50 hover:text-[#f5f0e8]">
              <X size={22} />
            </button>
          </div>

          <div className="max-w-2xl mx-auto w-full px-6 mt-16">
            <div className="flex items-center gap-4 border-b border-[#c9a96e]/40 pb-4">
              <Search size={18} className="text-[#c9a96e]" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fragrances, notes, moods…"
                className="flex-1 bg-transparent text-xl font-light text-[#f5f0e8] placeholder-[#f5f0e8]/20 outline-none font-serif"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              />
            </div>

            {results.length > 0 ? (
              <div className="mt-8 space-y-4">
                {results.map((f) => (
                  <Link
                    key={f.slug}
                    href={`/product/${f.slug}`}
                    onClick={() => { setSearchOpen(false); setQuery(""); }}
                    className="flex items-center gap-5 p-4 border border-white/5 hover:border-[#c9a96e]/30 transition-colors group"
                  >
                    <div className="w-10 h-14 bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                      <div className="w-4 h-9 bg-gradient-to-b from-[#2a2a2a] to-[#111] rounded-sm" />
                    </div>
                    <div>
                      <p className="font-serif text-lg group-hover:text-[#c9a96e] transition-colors" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                        {f.name}
                      </p>
                      <p className="text-xs text-[#f5f0e8]/40 tracking-wider uppercase mt-0.5">{f.keyNotes}</p>
                    </div>
                    <p className="ml-auto text-[#c9a96e] text-sm">from {formatPrice(f.prices["50ml"])}</p>
                  </Link>
                ))}
              </div>
            ) : query.length > 1 ? (
              <p className="mt-8 text-[#f5f0e8]/30 text-sm tracking-wider">No fragrances found.</p>
            ) : (
              <div className="mt-8">
                <p className="text-xs tracking-widest uppercase text-[#f5f0e8]/30 mb-4">Popular searches</p>
                <div className="flex flex-wrap gap-3">
                  {["Oud", "Amber", "Floral", "Citrus", "Woody"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="border border-white/10 text-xs tracking-wider uppercase px-4 py-2 text-[#f5f0e8]/50 hover:border-[#c9a96e]/40 hover:text-[#c9a96e] transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
