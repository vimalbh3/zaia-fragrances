"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

export default function WelcomePage() {
  const router = useRouter();
  const [name, setName] = useState("there");
  const [step, setStep] = useState(0);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("zaia_user") : null;
    if (raw) {
      const u = JSON.parse(raw);
      if (u.firstName) setName(u.firstName);
    }
    const t = setTimeout(() => setStep(1), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 70%)" }} />

      {/* Particle ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{ border: "1px solid rgba(201,169,110,0.06)" }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{ border: "1px solid rgba(201,169,110,0.04)" }}
      />

      <div className="relative text-center max-w-lg">
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-[9px] tracking-[0.5em] uppercase text-[#c9a96e] mb-8"
              >
                Welcome To ZAIA
              </motion.p>

              <h1
                className="font-serif text-5xl lg:text-7xl font-light text-[#f5f0e8] mb-6 leading-tight"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Hello,<br />{name}.
              </h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-16 h-px bg-[#c9a96e]/40 mx-auto mb-8"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-sm text-[#f5f0e8]/45 leading-relaxed mb-12 max-w-sm mx-auto"
              >
                Your private fragrance collection awaits. Begin by discovering your scent profile — a personal consultation to match you with your signature scent.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  onClick={() => router.push("/account")}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 bg-[#f5f0e8] text-[#0d0d0d] text-[10px] tracking-[0.3em] uppercase px-8 py-4 font-medium hover:bg-[#c9a96e] transition-colors duration-300"
                >
                  <Sparkles size={11} />
                  Begin Scent Profiling
                </motion.button>
                <button
                  onClick={() => router.push("/account")}
                  className="text-[10px] tracking-[0.25em] uppercase text-[#f5f0e8]/30 hover:text-[#f5f0e8]/60 transition-colors py-4 flex items-center justify-center gap-2"
                >
                  Go to my collection <ArrowRight size={10} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
