"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
              We craft at the intersection of heritage and modern minimalism, blending rare, raw ingredients with an undone, contemporary vision.
            </p>
            <p className="text-sm text-[#f5f0e8]/40 leading-relaxed mb-10 max-w-sm">
              We do not design for volume; we design for resonance. ZAIA is not a mask to wear, but a landscape to inhabit. No labels. No boundaries. Just scent.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 border border-[#f5f0e8]/20 text-xs tracking-[0.2em] uppercase px-7 py-3.5 text-[#f5f0e8]/70 hover:border-[#c9a96e]/50 hover:text-[#c9a96e] transition-all duration-300"
            >
              Step inside our story
            </Link>
          </motion.div>

          {/* Right: philosophy image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src="/philosophy-cliff.png"
              alt="A solitary figure on a cliff at golden hour"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Subtle dark vignette to blend with site bg */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to right, rgba(13,13,13,0.35) 0%, transparent 40%), linear-gradient(to top, rgba(13,13,13,0.3) 0%, transparent 40%)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
