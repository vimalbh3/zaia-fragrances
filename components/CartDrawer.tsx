"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ArrowRight, Gift, Truck, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { fragrances } from "@/lib/fragrances";
import { useCurrency } from "@/lib/currency";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQuantity, cartTotal } = useStore();
  const { formatPrice, currency } = useCurrency();
  const freeShipping = cartTotal >= 100;

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-[480px] bg-[#0f0f0f] flex flex-col"
            style={{ borderLeft: "1px solid rgba(201,169,110,0.12)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div>
                <h2 className="font-serif text-lg tracking-[0.2em] font-light text-[#f5f0e8]" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                  YOUR CART
                </h2>
                {cart.length > 0 && (
                  <p className="text-[10px] tracking-widest uppercase text-[#c9a96e]/60 mt-0.5">
                    {cart.reduce((s, i) => s + i.quantity, 0)} {cart.reduce((s, i) => s + i.quantity, 0) === 1 ? "item" : "items"}
                  </p>
                )}
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-[#f5f0e8]/40 hover:text-[#f5f0e8] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
                  <div className="w-16 h-px bg-[#c9a96e]/30" />
                  <p className="font-serif text-2xl font-light text-[#f5f0e8]/30" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                    Your cart is empty
                  </p>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#f5f0e8]/20">
                    Discover the collection
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-2 border border-[#c9a96e]/30 text-[#c9a96e] text-[10px] tracking-[0.25em] uppercase px-7 py-3 hover:bg-[#c9a96e]/10 transition-all duration-300"
                  >
                    Shop Now
                  </button>
                </div>
              ) : (
                <div className="space-y-0 divide-y divide-white/[0.04]">
                  {cart.map((item, idx) => {
                    const fragrance = fragrances.find(f => f.slug === item.slug);
                    return (
                      <motion.div
                        key={`${item.slug}-${item.size}`}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ delay: idx * 0.06, duration: 0.4 }}
                        className="py-6 flex gap-5"
                      >
                        {/* Image */}
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="flex-shrink-0 relative w-20 h-24 bg-[#141414] overflow-hidden group"
                          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            sizes="80px"
                          />
                        </Link>

                        {/* Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            {fragrance && (
                              <p className="text-[9px] tracking-[0.3em] uppercase text-[#c9a96e]/60 mb-1">
                                {fragrance.toneLabel}
                              </p>
                            )}
                            <Link
                              href={`/product/${item.slug}`}
                              onClick={() => setCartOpen(false)}
                              className="font-serif text-base font-light text-[#f5f0e8] hover:text-[#c9a96e] transition-colors leading-tight"
                              style={{ fontFamily: "Cormorant Garamond, serif" }}
                            >
                              {item.name}
                            </Link>
                            <p className="text-[10px] text-[#f5f0e8]/30 tracking-wider uppercase mt-0.5">
                              Eau de Parfum · {item.size}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            {/* Qty */}
                            <div className="flex items-center gap-0" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                              <button
                                onClick={() => updateQuantity(item.slug, item.size, -1)}
                                className="w-7 h-7 flex items-center justify-center text-[#f5f0e8]/40 hover:text-[#f5f0e8] hover:bg-white/5 transition-all"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="w-7 text-center text-xs text-[#f5f0e8]/70">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.slug, item.size, 1)}
                                className="w-7 h-7 flex items-center justify-center text-[#f5f0e8]/40 hover:text-[#f5f0e8] hover:bg-white/5 transition-all"
                              >
                                <Plus size={10} />
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-sm text-[#f5f0e8]/80">{formatPrice(item.price * item.quantity)}</span>
                              <button
                                onClick={() => removeFromCart(item.slug, item.size)}
                                className="text-[#f5f0e8]/20 hover:text-[#f5f0e8]/60 transition-colors"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-8 pb-8 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {/* Perks */}
                <div className="space-y-2 mb-5 pt-4">
                  <div className="flex items-center gap-2.5 text-[10px] tracking-wide text-[#f5f0e8]/40">
                    <Gift size={11} className="text-[#c9a96e]/50 flex-shrink-0" />
                    Complimentary sample included with every order
                  </div>
                  <div className="flex items-center gap-2.5 text-[10px] tracking-wide text-[#f5f0e8]/40">
                    <Truck size={11} className={`flex-shrink-0 ${freeShipping ? "text-[#c9a96e]/50" : "text-[#f5f0e8]/25"}`} />
                    {freeShipping
                      ? <span className="text-[#c9a96e]/60">Free shipping applied</span>
                      : `Add ${formatPrice(100 - cartTotal)} more for free shipping`}
                  </div>
                  <div className="flex items-center gap-2.5 text-[10px] tracking-wide text-[#f5f0e8]/40">
                    <Shield size={11} className="text-[#c9a96e]/50 flex-shrink-0" />
                    Secure, encrypted checkout
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between mb-5 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#f5f0e8]/50">Order Total</span>
                  <div className="text-right">
                    <span className="font-serif text-xl font-light text-[#c9a96e]" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                      {formatPrice(cartTotal)}
                    </span>
                    {!freeShipping && (
                      <p className="text-[9px] text-[#f5f0e8]/25 tracking-wider">+ shipping</p>
                    )}
                  </div>
                </div>

                {/* CTAs */}
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="w-full flex items-center justify-center gap-3 bg-[#f5f0e8] text-[#0d0d0d] text-[10px] tracking-[0.25em] uppercase py-4 font-medium hover:bg-[#c9a96e] transition-colors duration-300 mb-3"
                >
                  Checkout <ArrowRight size={13} />
                </Link>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full text-[10px] tracking-[0.2em] uppercase text-[#f5f0e8]/30 hover:text-[#f5f0e8]/60 transition-colors py-2"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
