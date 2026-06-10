"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, cartTotal } = useStore();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-md bg-[#111111] border-l border-white/5 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
              <h2 className="font-serif text-xl tracking-widest font-light" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                YOUR CART
              </h2>
              <button onClick={() => setCartOpen(false)} className="text-[#f5f0e8]/50 hover:text-[#f5f0e8] transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <p className="font-serif text-2xl font-light text-[#f5f0e8]/40" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                    Your cart is empty.
                  </p>
                  <p className="text-xs text-[#f5f0e8]/30 tracking-widest uppercase">
                    Discover the collection
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => setCartOpen(false)}
                    className="mt-4 border border-[#c9a96e] text-[#c9a96e] text-xs tracking-widest uppercase px-6 py-3 hover:bg-[#c9a96e] hover:text-[#0d0d0d] transition-all duration-300"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <motion.div
                      key={`${item.slug}-${item.size}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 pb-6 border-b border-white/5"
                    >
                      {/* Bottle placeholder */}
                      <div className="w-16 h-20 bg-[#1a1a1a] border border-white/10 flex items-center justify-center flex-shrink-0">
                        <div className="w-6 h-12 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-lg font-light" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                          {item.name}
                        </p>
                        <p className="text-xs text-[#f5f0e8]/40 tracking-wider uppercase mt-0.5">{item.size}</p>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-sm text-[#c9a96e]">£{item.price}</p>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-[#f5f0e8]/40">Qty {item.quantity}</span>
                            <button
                              onClick={() => removeFromCart(item.slug, item.size)}
                              className="text-[#f5f0e8]/30 hover:text-[#f5f0e8]/70 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-8 py-6 border-t border-white/5">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs tracking-widest uppercase text-[#f5f0e8]/50">Total</span>
                  <span className="font-serif text-2xl font-light text-[#c9a96e]" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                    £{cartTotal}
                  </span>
                </div>
                <button className="w-full bg-[#f5f0e8] text-[#0d0d0d] text-xs tracking-[0.2em] uppercase py-4 flex items-center justify-center gap-3 hover:bg-[#c9a96e] transition-colors duration-300 font-medium">
                  Checkout <ArrowRight size={14} />
                </button>
                <p className="text-center text-xs text-[#f5f0e8]/25 tracking-wider mt-3 uppercase">
                  Complimentary shipping over £100
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
