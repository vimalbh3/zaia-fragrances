"use client";

import { motion } from "framer-motion";

const benefits = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-6 h-6">
        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    title: "Complimentary Shipping",
    sub: "On all orders over £100",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-6 h-6">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M8 12s1.5 3 4 3 4-3 4-3" strokeLinecap="round" />
        <path d="M9 9h.01M15 9h.01" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    ),
    title: "Sample With Every Order",
    sub: "Discover something new",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    title: "Secure Payments",
    sub: "Trusted & encrypted",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-6 h-6">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Made With Intention",
    sub: "Quality. Transparency. Integrity.",
  },
];

export default function BenefitsStrip() {
  return (
    <section className="border-y border-white/5 bg-[#080808] py-12 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <div className="text-[#c9a96e]/60 flex-shrink-0">{b.icon}</div>
              <div>
                <p className="text-xs tracking-wider uppercase text-[#f5f0e8]/80 font-medium">{b.title}</p>
                <p className="text-[10px] text-[#f5f0e8]/35 tracking-wide mt-0.5">{b.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
