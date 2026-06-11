"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingBag, X, Menu } from "lucide-react";
import { useStore } from "@/lib/store";
import CartDrawer from "./CartDrawer";
import SearchOverlay from "./SearchOverlay";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, setCartOpen, setSearchOpen, cartOpen, searchOpen } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/shop", label: "Collection" },
    { href: "/about", label: "About" },
    { href: "/journal", label: "Journal" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          {/* Left nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link key={l.label} href={l.href} className="gold-link text-[#f5f0e8]/70 hover:text-[#f5f0e8] transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-[#f5f0e8]/70 hover:text-[#f5f0e8]"
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <span
              className="font-serif text-2xl tracking-[0.4em] font-light text-[#f5f0e8]"
              style={{ fontFamily: "Cormorant Garamond, Times New Roman, serif" }}
            >
              ZAIA
            </span>
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setSearchOpen(true)}
              className="gold-link text-[#f5f0e8]/70 hover:text-[#f5f0e8] transition-colors hidden lg:block"
              aria-label="Search"
            >
              Search
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="lg:hidden text-[#f5f0e8]/70 hover:text-[#f5f0e8]"
            >
              <Search size={18} />
            </button>
            <Link href="/account" className="gold-link text-[#f5f0e8]/70 hover:text-[#f5f0e8] transition-colors hidden lg:block">
              Account
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="gold-link text-[#f5f0e8]/70 hover:text-[#f5f0e8] transition-colors flex items-center gap-1"
              aria-label="Cart"
            >
              <span className="hidden lg:inline">Cart ({cartCount})</span>
              <span className="lg:hidden flex items-center gap-1">
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="text-[10px] bg-[#c9a96e] text-[#0d0d0d] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-[#0d0d0d] flex flex-col p-8"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="self-end text-[#f5f0e8]/60 hover:text-[#f5f0e8] mb-12"
            >
              <X size={22} />
            </button>
            <nav className="flex flex-col gap-8">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.1 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-4xl font-light text-[#f5f0e8] tracking-wide hover:text-[#c9a96e] transition-colors block"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto flex gap-6">
              <Link href="/account" onClick={() => setMobileOpen(false)} className="gold-link text-[#f5f0e8]/50">Account</Link>
              <button onClick={() => { setSearchOpen(true); setMobileOpen(false); }} className="gold-link text-[#f5f0e8]/50">Search</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
      <SearchOverlay />
    </>
  );
}
