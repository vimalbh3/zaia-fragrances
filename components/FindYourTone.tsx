"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { tones } from "@/lib/fragrances";
import Link from "next/link";

const toneImages: Record<string, string> = {
  "warm-musky": "/tone-warm-musky.png",
  "floral-soft": "/tone-floral-soft.png",
  "fresh-citrus": "/tone-fresh-citrus.png",
  "woody-earthy": "/tone-woody-earthy.png",
};

export default function FindYourTone() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="bg-[#080808] py-28 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#c9a96e] mb-4">Explore</p>
          <h2
            className="font-serif text-4xl lg:text-5xl font-light tracking-wide mb-4"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            The Olfactive Families
          </h2>
          <p className="text-sm text-[#f5f0e8]/40 max-w-md mx-auto leading-relaxed">
            Each fragrance is crafted with intention.<br />Explore by mood, note or family.
          </p>
        </motion.div>

        {/* Tone cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {tones.map((tone, i) => {
            const isActive = active === tone.id;

            return (
              <motion.div
                key={tone.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                onHoverStart={() => setActive(tone.id)}
                onHoverEnd={() => setActive(null)}
                className="relative overflow-hidden cursor-pointer"
                style={{ minHeight: "520px" }}
              >
                {/* Background image */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: isActive ? 1.08 : 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={toneImages[tone.id]}
                    alt={tone.label}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </motion.div>

                {/* Dark overlay — lightens on hover (floral stays darker for legibility) */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: isActive
                      ? tone.id === "floral-soft"
                        ? "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 50%, rgba(0,0,0,0.58) 100%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.15) 100%)"
                      : tone.id === "floral-soft"
                        ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.70) 50%, rgba(0,0,0,0.62) 100%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.55) 100%)",
                  }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Accent colour tint on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    opacity: isActive ? 0.12 : 0,
                    background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${tone.accentColor} 0%, transparent 70%)`,
                  }}
                  transition={{ duration: 0.6 }}
                />

                {/* Thin top border accent */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px"
                  animate={{ background: isActive ? `${tone.accentColor}` : "rgba(255,255,255,0.08)" }}
                  transition={{ duration: 0.5 }}
                />

                {/* Content */}
                <div
                  className="relative z-10 p-8 h-full flex flex-col justify-between"
                  style={{
                    minHeight: "520px",
                    textShadow: tone.id === "floral-soft" ? "0 1px 8px rgba(0,0,0,0.8)" : "none",
                  }}
                >
                  {/* Top label */}
                  <div>
                    <motion.p
                      animate={{ color: isActive ? tone.accentColor : "rgba(245,240,232,0.35)", y: isActive ? 0 : 0 }}
                      transition={{ duration: 0.4 }}
                      className="text-[9px] tracking-[0.35em] uppercase mb-5 font-medium"
                    >
                      {`0${i + 1}`}
                    </motion.p>

                    <motion.h3
                      animate={{ y: isActive ? -4 : 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="font-serif text-2xl lg:text-3xl font-light mb-3"
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        color: isActive ? "#f5f0e8" : "rgba(245,240,232,0.85)",
                      }}
                    >
                      {tone.label}
                    </motion.h3>

                    <motion.p
                      animate={{ opacity: isActive ? 0.65 : 0.35 }}
                      transition={{ duration: 0.4 }}
                      className="text-xs leading-relaxed text-[#f5f0e8]"
                      style={{ maxWidth: "200px" }}
                    >
                      {tone.description}
                    </motion.p>
                  </div>

                  {/* Bottom: notes + CTA revealed on hover */}
                  <div>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.45, delay: 0.05 }}
                        >
                          <p className="text-[9px] tracking-[0.3em] uppercase mb-3" style={{ color: tone.accentColor }}>
                            Key Notes
                          </p>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {tone.keyNotes.map((note) => (
                              <span
                                key={note}
                                className="text-[9px] tracking-wider uppercase border px-2.5 py-1 backdrop-blur-sm"
                                style={{
                                  borderColor: `${tone.accentColor}50`,
                                  color: `${tone.accentColor}dd`,
                                  background: "rgba(0,0,0,0.25)",
                                }}
                              >
                                {note}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="pt-4 border-t border-white/10">
                      <Link
                        href={`/shop?tone=${tone.id}`}
                        className="flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase transition-colors duration-300 group"
                        style={{ color: isActive ? tone.accentColor : "rgba(245,240,232,0.3)" }}
                      >
                        Explore
                        <motion.span
                          animate={{ x: isActive ? 4 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight size={10} />
                        </motion.span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
