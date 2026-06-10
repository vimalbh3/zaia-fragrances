"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { tones } from "@/lib/fragrances";
import Link from "next/link";

const toneBgs: Record<string, string> = {
  "warm-musky":
    "radial-gradient(ellipse 80% 80% at 50% 50%, #5c3d22 0%, #3d2b1f 40%, #1a0e05 100%)",
  "floral-soft":
    "radial-gradient(ellipse 80% 80% at 50% 50%, #4a2d40 0%, #2e1f2a 40%, #160c13 100%)",
  "fresh-citrus":
    "radial-gradient(ellipse 80% 80% at 50% 50%, #243d2e 0%, #1a2820 40%, #080f0b 100%)",
  "woody-earthy":
    "radial-gradient(ellipse 80% 80% at 50% 50%, #2e2a1e 0%, #1c1a14 40%, #0a0905 100%)",
};

const tonePatterns: Record<string, { icon: string; particles: string[] }> = {
  "warm-musky": { icon: "◈", particles: ["✦", "◆", "⬥"] },
  "floral-soft": { icon: "❋", particles: ["✿", "⊹", "✦"] },
  "fresh-citrus": { icon: "◎", particles: ["⊹", "✦", "◌"] },
  "woody-earthy": { icon: "⬡", particles: ["◆", "◈", "⬥"] },
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
            Find Your Tone
          </h2>
          <p className="text-sm text-[#f5f0e8]/40 max-w-md mx-auto leading-relaxed">
            Each fragrance is crafted with intention.<br />Explore by mood, note or tone.
          </p>
        </motion.div>

        {/* Tone cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {tones.map((tone, i) => {
            const isActive = active === tone.id;
            const pattern = tonePatterns[tone.id];

            return (
              <motion.div
                key={tone.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                onHoverStart={() => setActive(tone.id)}
                onHoverEnd={() => setActive(null)}
                className="relative overflow-hidden cursor-pointer group"
                style={{ minHeight: "420px" }}
              >
                {/* Background */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: isActive ? toneBgs[tone.id] : "linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)",
                  }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Texture overlay */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
                  }}
                />

                {/* Decorative particles */}
                <AnimatePresence>
                  {isActive && pattern.particles.map((p, pi) => (
                    <motion.span
                      key={pi}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 0.2, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ delay: pi * 0.08, duration: 0.4 }}
                      className="absolute text-2xl pointer-events-none"
                      style={{
                        color: tone.accentColor,
                        top: `${20 + pi * 25}%`,
                        right: `${10 + pi * 8}%`,
                      }}
                    >
                      {p}
                    </motion.span>
                  ))}
                </AnimatePresence>

                {/* Border */}
                <motion.div
                  className="absolute inset-0 border"
                  animate={{
                    borderColor: isActive ? `${tone.accentColor}40` : "rgba(255,255,255,0.04)",
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between" style={{ minHeight: "420px" }}>
                  {/* Top */}
                  <div>
                    <motion.span
                      animate={{ color: isActive ? tone.accentColor : "rgba(245,240,232,0.2)", scale: isActive ? 1.2 : 1 }}
                      transition={{ duration: 0.4 }}
                      className="text-3xl block mb-6"
                      style={{ display: "block" }}
                    >
                      {pattern.icon}
                    </motion.span>

                    <h3
                      className="font-serif text-2xl lg:text-3xl font-light mb-3 transition-colors duration-500"
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        color: isActive ? tone.textAccent : "#f5f0e8",
                      }}
                    >
                      {tone.label}
                    </h3>

                    <motion.p
                      animate={{ opacity: isActive ? 0.7 : 0.35, height: isActive ? "auto" : "auto" }}
                      transition={{ duration: 0.4 }}
                      className="text-xs leading-relaxed text-[#f5f0e8]"
                      style={{ maxWidth: "200px" }}
                    >
                      {tone.description}
                    </motion.p>
                  </div>

                  {/* Notes + CTA — revealed on hover */}
                  <div>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        >
                          <p className="text-[9px] tracking-[0.3em] uppercase mb-3" style={{ color: tone.accentColor }}>
                            Key Notes
                          </p>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {tone.keyNotes.map((note) => (
                              <span
                                key={note}
                                className="text-[9px] tracking-wider uppercase border px-2.5 py-1"
                                style={{ borderColor: `${tone.accentColor}40`, color: `${tone.accentColor}cc` }}
                              >
                                {note}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="pt-4 border-t border-white/5">
                      <Link
                        href={`/shop?tone=${tone.id}`}
                        className="flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase transition-colors duration-300"
                        style={{ color: isActive ? tone.accentColor : "rgba(245,240,232,0.3)" }}
                      >
                        Explore <ArrowRight size={10} />
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
