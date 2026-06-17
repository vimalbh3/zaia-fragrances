"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import Image from "next/image";

function Field({
  label, type = "text", value, onChange, placeholder,
}: { label: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="relative">
      <label className="block text-[9px] tracking-[0.25em] uppercase text-[#f5f0e8]/40 mb-2">{label}</label>
      <div className="relative">
        <input
          type={isPassword && show ? "text" : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-[#f5f0e8] placeholder-[#f5f0e8]/20 focus:outline-none focus:border-[#c9a96e]/60 transition-colors duration-300 pr-8"
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(s => !s)} className="absolute right-0 top-3 text-[#f5f0e8]/30 hover:text-[#f5f0e8]/60 transition-colors">
            {show ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "", marketing: false });
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("zaia_user", JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          joined: new Date().toISOString(),
          scentProfile: null,
          orders: [],
        }));
      }
      router.push("/account/welcome");
    }, 1200);
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
        <Image src="/bottle-noir-ambre-v2.png" alt="ZAIA" fill className="object-cover object-center scale-110" sizes="50vw" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.7) 100%)" }} />
        <div className="absolute inset-0 flex flex-col justify-end p-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1 }}>
            <p className="text-[9px] tracking-[0.5em] uppercase text-[#c9a96e] mb-4">Private Collection</p>
            <p className="font-serif text-4xl font-light text-[#f5f0e8] leading-tight" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              Your scent profile.<br />Your story.
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

          <p className="text-[9px] tracking-[0.4em] uppercase text-[#c9a96e] mb-4">Join ZAIA</p>
          <h1 className="font-serif text-4xl font-light text-[#f5f0e8] mb-10" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            Create Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="grid grid-cols-2 gap-5">
              <Field label="First Name" value={form.firstName} onChange={set("firstName")} />
              <Field label="Last Name" value={form.lastName} onChange={set("lastName")} />
            </div>
            <Field label="Email" type="email" value={form.email} onChange={set("email")} placeholder="your@email.com" />
            <Field label="Password" type="password" value={form.password} onChange={set("password")} />
            <Field label="Confirm Password" type="password" value={form.confirm} onChange={set("confirm")} />

            <label className="flex items-start gap-3 cursor-pointer group">
              <div
                onClick={() => set("marketing")(!form.marketing)}
                className={`mt-0.5 w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-all duration-300 ${form.marketing ? "border-[#c9a96e] bg-[#c9a96e]/10" : "border-white/20"}`}
              >
                {form.marketing && <div className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full" />}
              </div>
              <span className="text-xs text-[#f5f0e8]/35 leading-relaxed">
                Keep me informed about new releases, exclusive offers and ZAIA Society events.
              </span>
            </label>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 bg-[#f5f0e8] text-[#0d0d0d] text-[10px] tracking-[0.3em] uppercase py-4 font-medium hover:bg-[#c9a96e] transition-colors duration-300 mt-2 disabled:opacity-60"
            >
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-3 h-3 border border-[#0d0d0d]/40 border-t-[#0d0d0d] rounded-full" />
              ) : (
                <><span>Create Account</span><ArrowRight size={12} /></>
              )}
            </motion.button>
          </form>

          <p className="text-center text-xs text-[#f5f0e8]/30 mt-8">
            Already a member?{" "}
            <Link href="/account/login" className="text-[#c9a96e] hover:text-[#f5f0e8] transition-colors">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
