"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Philosophy() {
  return (
    <section className="bg-[#0d0d0d] py-28 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#c9a96e] mb-6">Our Philosophy</p>
            <h2
              className="font-serif text-5xl lg:text-6xl font-light leading-tight mb-8"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Less.<br />But Better.
            </h2>
            <p className="text-sm text-[#f5f0e8]/50 leading-relaxed mb-4 max-w-sm">
              ZAIA is an exploration of scent, memory and emotion. Every fragrance is made with the finest ingredients, blending craftsmanship with a modern, minimalist vision.
            </p>
            <p className="text-sm text-[#f5f0e8]/40 leading-relaxed mb-10 max-w-sm">
              We don&apos;t create for volume. We create for resonance. Each bottle holds something singular — a feeling, a moment, a version of you.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 border border-[#f5f0e8]/20 text-xs tracking-[0.2em] uppercase px-7 py-3.5 text-[#f5f0e8]/70 hover:border-[#c9a96e]/50 hover:text-[#c9a96e] transition-all duration-300"
            >
              Our Story
            </Link>
          </motion.div>

          {/* Right: atmospheric visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/3] bg-[#0a0a0a] border border-white/5 overflow-hidden"
          >
            {/* Abstract atmospheric layers */}
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse 70% 60% at 30% 60%, rgba(201,169,110,0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 30%, rgba(201,169,110,0.04) 0%, transparent 50%)",
              }}
            />
            {/* Horizon line */}
            <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            {/* Vertical beam */}
            <div
              className="absolute top-0 bottom-0 left-1/3 w-px"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.15), transparent)" }}
            />
            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <p
                className="font-serif text-7xl font-light text-[#f5f0e8]/[0.04] leading-none select-none"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                ZAIA
              </p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p
                  className="font-serif text-3xl font-light text-[#f5f0e8]/20 tracking-widest"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  Scent is memory.
                </p>
                <div className="w-12 h-px bg-[#c9a96e]/30 mx-auto mt-4" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
