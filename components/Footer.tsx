"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const links = {
  Shop: [
    { label: "All Fragrances", href: "/shop" },
    { label: "Discovery Set", href: "/shop" },
    { label: "Gift Card", href: "/shop" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Sustainability", href: "/about" },
    { label: "Careers", href: "/about" },
  ],
  Support: [
    { label: "Shipping", href: "/" },
    { label: "Returns", href: "/" },
    { label: "FAQ", href: "/" },
    { label: "Contact", href: "/" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/5 px-6 lg:px-12 pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Logo col */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/">
              <span
                className="font-serif text-xl tracking-[0.4em] font-light text-[#f5f0e8]"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                ZAIA
              </span>
            </Link>
            <p className="text-xs text-[#f5f0e8]/30 mt-3 leading-relaxed max-w-[160px]">
              Niche unisex fragrances.<br />Crafted with intention.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-[#f5f0e8]/30 hover:text-[#c9a96e] transition-colors" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a href="#" className="text-[#f5f0e8]/30 hover:text-[#c9a96e] transition-colors" aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.53V6.76a4.85 4.85 0 01-1.02-.07z" />
                </svg>
              </a>
              <a href="#" className="text-[#f5f0e8]/30 hover:text-[#c9a96e] transition-colors" aria-label="Pinterest">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
              <a href="#" className="text-[#f5f0e8]/30 hover:text-[#c9a96e] transition-colors" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.2 2.8 12 2.8 12 2.8s-4.2 0-6.8.2c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.2.3 4.2s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.3 21.7 12 21.7 12 21.7s4.2 0 6.8-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.2v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.3l8.1 3.6-8.1 3.6z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([col, items]) => (
            <div key={col}>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#f5f0e8]/40 mb-5">{col}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-xs text-[#f5f0e8]/50 hover:text-[#f5f0e8] transition-colors tracking-wide"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter mini */}
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#f5f0e8]/40 mb-5">Join Our World</p>
            <p className="text-xs text-[#f5f0e8]/40 mb-4 leading-relaxed">
              Be the first to hear about new fragrances and exclusive offers.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent border border-white/10 px-3 py-2.5 text-xs text-[#f5f0e8] placeholder-[#f5f0e8]/20 outline-none focus:border-[#c9a96e]/30 transition-colors min-w-0"
              />
              <button
                type="submit"
                className="bg-[#f5f0e8]/10 border border-white/10 border-l-0 px-3 hover:bg-[#c9a96e]/20 transition-colors flex-shrink-0"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3 text-[#f5f0e8]/60">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-[#f5f0e8]/20 tracking-wider">
            © ZAIA Fragrances. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms", "Cookies"].map((l) => (
              <a key={l} href="#" className="text-[10px] text-[#f5f0e8]/20 hover:text-[#f5f0e8]/50 tracking-wider transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
