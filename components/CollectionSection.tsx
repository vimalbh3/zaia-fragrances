"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fragrances } from "@/lib/fragrances";
import ProductCard from "./ProductCard";

export default function CollectionSection() {
  return (
    <section className="bg-[#0d0d0d] py-28 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#c9a96e] mb-4">Shop</p>
          <h2
            className="font-serif text-4xl lg:text-5xl font-light tracking-wide"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            The Collection
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {fragrances.map((f, i) => (
            <ProductCard key={f.slug} fragrance={f} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex justify-center mt-14"
        >
          <Link
            href="/shop"
            className="flex items-center gap-3 gold-link text-[#f5f0e8]/60 hover:text-[#c9a96e] transition-colors"
          >
            View All Fragrances <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
