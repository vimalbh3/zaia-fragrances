"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (typeof window !== "undefined" && !localStorage.getItem("zaia_user")) {
        localStorage.setItem("zaia_user", JSON.stringify({
          firstName: "Guest", lastName: "", email, joined: new Date().toISOString(), scentProfile: null,
        }));
      }
      router.push("/account");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex">
      {/* Left: editorial image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hidden lg:block lg:w-1/2 relative overflow-hidden"
      >
        <Image src="/philosophy-cliff.png" alt="ZAIA" fill className="object-cover object-center" sizes="50vw" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,13,13,0.2) 0%, rgba(13,13,13,0.65) 100%)" }} />
        <div className="absolute inset-0 flex flex-col justify-end p-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1 }}>
            <p className="text-[9px] tracking-[0.5em] uppercase text-[#c9a96e] mb-4">Members Only</p>
            <p className="font-serif text-4xl font-light text-[#f5f0e8] leading-tight" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              Welcome back<br />to your collection.
            </p>
            <div className="w-12 h-px bg-[#c9a96e]/40 mt-6" />
          </motion.div>
        </div>
      </motion.div>

      {/* Right: form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-16">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <Link href="/" className="font-serif text-xl tracking-[0.4em] font-light text-[#f5f0e8] block mb-16" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            ZAIA
          </Link>

          <p className="text-[9px] tracking-[0.4em] uppercase text-[#c9a96e] mb-4">Members Area</p>
          <h1 className="font-serif text-4xl font-light text-[#f5f0e8] mb-10" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            Sign In
          </h1>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="block text-[9px] tracking-[0.25em] uppercase text-[#f5f0e8]/40 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-[#f5f0e8] placeholder-[#f5f0e8]/20 focus:outline-none focus:border-[#c9a96e]/60 transition-colors duration-300"
              />
            </div>
            <div>
              <label className="block text-[9px] tracking-[0.25em] uppercase text-[#f5f0e8]/40 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-[#f5f0e8] placeholder-[#f5f0e8]/20 focus:outline-none focus:border-[#c9a96e]/60 transition-colors duration-300 pr-8"
                />
                <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-0 top-3 text-[#f5f0e8]/30 hover:text-[#f5f0e8]/60 transition-colors">
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-[10px] text-[#f5f0e8]/30 hover:text-[#c9a96e] transition-colors tracking-wider">
                Forgot password?
              </button>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 bg-[#f5f0e8] text-[#0d0d0d] text-[10px] tracking-[0.3em] uppercase py-4 font-medium hover:bg-[#c9a96e] transition-colors duration-300 disabled:opacity-60"
            >
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-3 h-3 border border-[#0d0d0d]/40 border-t-[#0d0d0d] rounded-full" />
              ) : (
                <><span>Sign In</span><ArrowRight size={12} /></>
              )}
            </motion.button>
          </form>

          <p className="text-center text-xs text-[#f5f0e8]/30 mt-8">
            New to ZAIA?{" "}
            <Link href="/account/register" className="text-[#c9a96e] hover:text-[#f5f0e8] transition-colors">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
