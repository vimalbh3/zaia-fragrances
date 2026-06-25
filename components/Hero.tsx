"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0d0d0d] flex items-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        aria-hidden="true"
      >
        <source src="/hero-bg.webm" type="video/webm" />
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay to keep text readable */}
      <div className="absolute inset-0 bg-[#0d0d0d]/60 pointer-events-none" />

      {/* Top vignette */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0d0d0d] to-transparent pointer-events-none" />
      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d0d0d] to-transparent pointer-events-none" />

      {/* Decorative horizontal lines */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-12 lg:gap-0 items-center pt-24 pb-16">
        {/* Left: copy */}
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-8"
          >
            New Collection
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif leading-[1.05] mb-6"
            style={{
              fontFamily: "Cormorant Garamond, Times New Roman, serif",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
            }}
          >
            Fragrance<br />
            beyond<br />
            borders.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-[#f5f0e8]/50 tracking-[0.25em] text-sm uppercase mb-10"
          >
            East meets West. Intuition over gender. Timeless scent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
          >
            <Link
              href="/shop"
              className="border border-[#f5f0e8]/60 text-[#f5f0e8] text-xs tracking-[0.25em] uppercase px-6 py-3.5 sm:px-8 sm:py-4 hover:bg-[#f5f0e8] hover:text-[#0d0d0d] transition-all duration-400 relative group overflow-hidden text-center"
            >
              <span className="relative z-10">Discover the Collection</span>
            </Link>
            <Link href="/about" className="gold-link text-[#f5f0e8]/50 hover:text-[#c9a96e] text-center sm:text-left">
              Our Story
            </Link>
          </motion.div>

          {/* Decorative stat */}
        </div>

        {/* Right: bottle */}
        <div className="relative flex items-center justify-center lg:justify-end">
          {/* Glow behind bottle */}
          <div
            className="absolute w-80 h-80 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[320px] h-[420px] lg:w-[400px] lg:h-[520px]"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image
                src="/bottle-noir-ambre-v2.png"
                alt="Noir Ambre"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Fragrance label floating */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute right-0 lg:right-8 top-1/2 -translate-y-1/2 text-right hidden lg:block"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-1">Featured</p>
            <p
              className="font-serif text-xl font-light"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Noir Ambre
            </p>
            <p className="text-[10px] tracking-wider text-[#f5f0e8]/30 uppercase mt-1">
              Amber · Smoke · Vanilla
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-[#c9a96e]/60 to-transparent"
        />
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#f5f0e8]/20">Scroll</p>
      </motion.div>
    </section>
  );
}
