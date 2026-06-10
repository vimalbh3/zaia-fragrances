"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Package, ArrowRight, Gift } from "lucide-react";

function ConfirmationContent() {
  const orderNumber = useRef(`ZA-${Math.floor(10000 + Math.random() * 90000)}`);

  const today = new Date();
  const delivery = new Date(today);
  delivery.setDate(today.getDate() + 5);
  const deliveryStr = delivery.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 px-6 lg:px-12 py-5 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-[0.4em] font-light text-[#f5f0e8]" style={{ fontFamily: "Cormorant Garamond, serif" }}>
          ZAIA
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-lg w-full text-center">
          {/* Success ring */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-20 h-20 mx-auto mb-10"
          >
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 80 80">
              <motion.circle
                cx="40" cy="40" r="36"
                fill="none" stroke="#c9a96e" strokeWidth="1"
                strokeDasharray="226"
                initial={{ strokeDashoffset: 226 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              />
            </svg>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Check size={28} className="text-[#c9a96e]" />
            </motion.div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#c9a96e] mb-5">Order Confirmed</p>
            <h1
              className="font-serif text-5xl lg:text-6xl font-light text-[#f5f0e8] mb-4 leading-tight"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Thank You.
            </h1>
            <p className="text-sm text-[#f5f0e8]/50 leading-relaxed mb-10">
              Your fragrance is being prepared.
            </p>
          </motion.div>

          {/* Order details card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="bg-[#0a0a0a] border border-white/5 p-8 mb-8 text-left"
          >
            <div className="space-y-5">
              <div className="flex justify-between items-start pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div>
                  <p className="text-[9px] tracking-[0.25em] uppercase text-[#f5f0e8]/30 mb-1">Order Number</p>
                  <p className="font-serif text-lg font-light text-[#c9a96e]" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                    {orderNumber.current}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] tracking-[0.25em] uppercase text-[#f5f0e8]/30 mb-1">Estimated Delivery</p>
                  <p className="text-sm text-[#f5f0e8]/70">{deliveryStr}</p>
                </div>
              </div>

              {/* Complimentary note */}
              <div className="flex items-start gap-4 py-2">
                <Gift size={16} className="text-[#c9a96e]/50 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#f5f0e8]/45 leading-relaxed">
                  A complimentary sample has been included to help you discover your next ZAIA fragrance.
                </p>
              </div>

              <div className="flex items-start gap-4 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <Package size={16} className="text-[#c9a96e]/50 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#f5f0e8]/45 leading-relaxed">
                  You will receive a shipping confirmation with tracking details once your order is dispatched.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Scent note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mb-10"
          >
            <div className="w-12 h-px bg-[#c9a96e]/30 mx-auto mb-6" />
            <p className="font-serif text-lg font-light italic text-[#f5f0e8]/25 leading-relaxed" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              &ldquo;Scent is the most powerful trigger of memory.&rdquo;
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button className="flex-1 flex items-center justify-center gap-2 border border-[#c9a96e]/30 text-[#c9a96e] text-[10px] tracking-[0.25em] uppercase py-4 hover:bg-[#c9a96e]/10 transition-all duration-300">
              <Package size={12} /> Track Order
            </button>
            <Link
              href="/shop"
              className="flex-1 flex items-center justify-center gap-2 bg-[#f5f0e8] text-[#0d0d0d] text-[10px] tracking-[0.25em] uppercase py-4 font-medium hover:bg-[#c9a96e] transition-colors duration-300"
            >
              Continue Shopping <ArrowRight size={12} />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return <ConfirmationContent />;
}
