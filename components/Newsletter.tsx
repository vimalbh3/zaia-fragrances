"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "newsletter", email }),
    }).catch(() => {});
  };

  return (
    <section className="bg-[#0d0d0d] py-28 px-6 lg:px-12 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#c9a96e] mb-6">Join Our World</p>
          <h2
            className="font-serif text-4xl lg:text-5xl font-light mb-4"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Be the first to know.
          </h2>
          <p className="text-sm text-[#f5f0e8]/40 max-w-md mx-auto mb-12 leading-relaxed">
            New fragrances, exclusive offers and rare dispatches from the world of ZAIA.
          </p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-10 h-px bg-[#c9a96e]" />
                <p className="font-serif text-2xl font-light text-[#c9a96e]" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                  Thank you.
                </p>
                <p className="text-xs text-[#f5f0e8]/40 tracking-wider uppercase">You&apos;re on the list.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex max-w-sm mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 bg-transparent border border-white/15 border-r-0 px-5 py-3.5 text-sm text-[#f5f0e8] placeholder-[#f5f0e8]/20 outline-none focus:border-[#c9a96e]/40 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#f5f0e8] text-[#0d0d0d] px-5 py-3.5 hover:bg-[#c9a96e] transition-colors flex-shrink-0"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={16} />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
