"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, ArrowRight, Shield, Truck, Gift,
  CreditCard, ChevronDown, Check, Plus
} from "lucide-react";
import { useStore } from "@/lib/store";
import { fragrances } from "@/lib/fragrances";

// ─── Progress Bar ────────────────────────────────────────────────────────────
function ProgressBar({ step }: { step: number }) {
  const steps = ["Details", "Delivery", "Payment"];
  return (
    <div className="flex items-center gap-0 mb-12">
      {steps.map((label, i) => {
        const num = i + 1;
        const done = step > num;
        const active = step === num;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium transition-all duration-500 ${
                  done
                    ? "bg-[#c9a96e] text-[#0d0d0d]"
                    : active
                    ? "border border-[#c9a96e] text-[#c9a96e]"
                    : "border border-white/10 text-[#f5f0e8]/25"
                }`}
              >
                {done ? <Check size={11} /> : num}
              </div>
              <span className={`text-[9px] tracking-[0.2em] uppercase transition-colors duration-300 ${active ? "text-[#c9a96e]" : done ? "text-[#f5f0e8]/40" : "text-[#f5f0e8]/20"}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-16 lg:w-24 h-px mx-3 mb-5 transition-all duration-500 ${done ? "bg-[#c9a96e]/50" : "bg-white/8"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Field ───────────────────────────────────────────────────────────────────
function Field({
  label, type = "text", placeholder, value, onChange, required, half
}: {
  label: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; required?: boolean; half?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className={half ? "flex-1 min-w-0" : "w-full"}>
      <label className="block text-[9px] tracking-[0.25em] uppercase text-[#f5f0e8]/40 mb-2">
        {label}{required && <span className="text-[#c9a96e] ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent border text-sm text-[#f5f0e8] placeholder-[#f5f0e8]/20 px-4 py-3.5 outline-none transition-all duration-300"
        style={{
          borderColor: focused ? "rgba(201,169,110,0.5)" : "rgba(255,255,255,0.1)",
        }}
      />
    </div>
  );
}

// ─── Order Summary Sidebar ────────────────────────────────────────────────────
function OrderSummary({ shipping = 0 }: { shipping?: number }) {
  const { cart, cartTotal } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#0a0a0a] border border-white/5 p-6 lg:p-8">
      <button
        className="w-full flex items-center justify-between lg:cursor-default"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#f5f0e8]/40">Order Summary</span>
        <ChevronDown
          size={14}
          className={`text-[#f5f0e8]/30 transition-transform lg:hidden ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div className={`${open ? "block" : "hidden"} lg:block`}>
        <div className="mt-6 space-y-5">
          {cart.map(item => {
            const f = fragrances.find(fr => fr.slug === item.slug);
            return (
              <div key={`${item.slug}-${item.size}`} className="flex gap-4">
                <div className="relative w-14 h-16 bg-[#141414] border border-white/5 flex-shrink-0 overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#c9a96e] text-[#0d0d0d] text-[9px] flex items-center justify-center font-medium">
                    {item.quantity}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  {f && <p className="text-[9px] tracking-wider uppercase text-[#c9a96e]/50 mb-0.5">{f.toneLabel}</p>}
                  <p className="font-serif text-sm font-light text-[#f5f0e8]" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                    {item.name}
                  </p>
                  <p className="text-[9px] text-[#f5f0e8]/30 tracking-wider uppercase mt-0.5">{item.size} · Eau de Parfum</p>
                </div>
                <span className="text-sm text-[#f5f0e8]/70 flex-shrink-0">£{item.price * item.quantity}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-5 space-y-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex justify-between text-xs text-[#f5f0e8]/40">
            <span className="tracking-wider">Subtotal</span>
            <span>£{cartTotal}</span>
          </div>
          <div className="flex justify-between text-xs text-[#f5f0e8]/40">
            <span className="tracking-wider">Shipping</span>
            <span>{shipping === 0 ? <span className="text-[#c9a96e]/60">Free</span> : `£${shipping}`}</span>
          </div>
          <div className="flex justify-between text-xs text-[#f5f0e8]/40">
            <span className="tracking-wider">Complimentary Sample</span>
            <span className="text-[#c9a96e]/60">Included</span>
          </div>
        </div>

        <div className="mt-4 pt-4 flex justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#f5f0e8]/50">Total</span>
          <span className="font-serif text-xl font-light text-[#c9a96e]" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            £{cartTotal + shipping}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Trust Badges ─────────────────────────────────────────────────────────────
function TrustBadges() {
  return (
    <div className="flex flex-col gap-2.5 mt-8">
      {[
        { icon: Shield, text: "Secure Checkout" },
        { icon: Gift, text: "Complimentary Sample Included" },
        { icon: Truck, text: "Free UK Shipping on Orders Over £100" },
      ].map(({ icon: Icon, text }) => (
        <div key={text} className="flex items-center gap-3 text-[10px] tracking-wide text-[#f5f0e8]/35">
          <Check size={11} className="text-[#c9a96e]/50 flex-shrink-0" />
          {text}
        </div>
      ))}
    </div>
  );
}

// ─── Step 1: Customer Details ─────────────────────────────────────────────────
function StepDetails({ onNext }: { onNext: (data: Record<string, string>) => void }) {
  const [form, setForm] = useState({ email: "", firstName: "", lastName: "", phone: "" });
  const f = (k: keyof typeof form) => (v: string) => setForm(p => ({ ...p, [k]: v }));
  const valid = form.email && form.firstName && form.lastName;

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="text-[9px] tracking-[0.35em] uppercase text-[#c9a96e] mb-3">Step 1 of 3</p>
      <h1
        className="font-serif text-3xl lg:text-4xl font-light text-[#f5f0e8] mb-8"
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        Your Details
      </h1>

      <div className="space-y-5">
        <Field label="Email Address" type="email" placeholder="you@example.com" value={form.email} onChange={f("email")} required />
        <div className="flex gap-4">
          <Field label="First Name" placeholder="Aria" value={form.firstName} onChange={f("firstName")} required half />
          <Field label="Last Name" placeholder="Laurent" value={form.lastName} onChange={f("lastName")} required half />
        </div>
        <Field label="Phone Number" type="tel" placeholder="+44 7700 900000" value={form.phone} onChange={f("phone")} />
      </div>

      <TrustBadges />

      <button
        onClick={() => valid && onNext(form)}
        disabled={!valid}
        className="mt-10 w-full flex items-center justify-center gap-3 py-4 text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-300"
        style={{
          background: valid ? "#f5f0e8" : "rgba(255,255,255,0.05)",
          color: valid ? "#0d0d0d" : "rgba(245,240,232,0.25)",
          cursor: valid ? "pointer" : "not-allowed",
        }}
        onMouseEnter={e => { if (valid) (e.currentTarget as HTMLButtonElement).style.background = "#c9a96e"; }}
        onMouseLeave={e => { if (valid) (e.currentTarget as HTMLButtonElement).style.background = "#f5f0e8"; }}
      >
        Continue <ArrowRight size={13} />
      </button>
    </motion.div>
  );
}

// ─── Step 2: Delivery ─────────────────────────────────────────────────────────
function StepDelivery({ onNext, onBack }: { onNext: (data: Record<string, string | number>) => void; onBack: () => void }) {
  const [form, setForm] = useState({ country: "United Kingdom", address1: "", address2: "", city: "", postcode: "" });
  const [shipping, setShipping] = useState<"standard" | "express">("standard");
  const f = (k: keyof typeof form) => (v: string) => setForm(p => ({ ...p, [k]: v }));
  const valid = form.address1 && form.city && form.postcode;

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="text-[9px] tracking-[0.35em] uppercase text-[#c9a96e] mb-3">Step 2 of 3</p>
      <h1
        className="font-serif text-3xl lg:text-4xl font-light text-[#f5f0e8] mb-8"
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        Delivery
      </h1>

      <div className="space-y-5 mb-8">
        <div className="w-full">
          <label className="block text-[9px] tracking-[0.25em] uppercase text-[#f5f0e8]/40 mb-2">Country</label>
          <select
            value={form.country}
            onChange={e => f("country")(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-white/10 text-sm text-[#f5f0e8] px-4 py-3.5 outline-none focus:border-[#c9a96e]/50 transition-colors appearance-none"
          >
            {["United Kingdom", "United States", "France", "Germany", "Japan", "Australia"].map(c => (
              <option key={c} value={c} className="bg-[#111]">{c}</option>
            ))}
          </select>
        </div>
        <Field label="Address Line 1" placeholder="12 Mayfair Street" value={form.address1} onChange={f("address1")} required />
        <Field label="Address Line 2" placeholder="Apartment, suite, etc. (optional)" value={form.address2} onChange={f("address2")} />
        <div className="flex gap-4">
          <Field label="City" placeholder="London" value={form.city} onChange={f("city")} required half />
          <Field label="Postcode" placeholder="W1K 1AB" value={form.postcode} onChange={f("postcode")} required half />
        </div>
      </div>

      {/* Shipping options */}
      <div className="mb-8">
        <p className="text-[9px] tracking-[0.25em] uppercase text-[#f5f0e8]/40 mb-4">Shipping Method</p>
        <div className="space-y-3">
          {[
            { id: "standard", label: "Standard Delivery", sub: "3–5 business days", price: 0 },
            { id: "express", label: "Express Delivery", sub: "1–2 business days", price: 9.95 },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setShipping(opt.id as "standard" | "express")}
              className="w-full flex items-center justify-between px-5 py-4 text-left transition-all duration-300"
              style={{
                border: `1px solid ${shipping === opt.id ? "rgba(201,169,110,0.4)" : "rgba(255,255,255,0.08)"}`,
                background: shipping === opt.id ? "rgba(201,169,110,0.04)" : "transparent",
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ borderColor: shipping === opt.id ? "#c9a96e" : "rgba(255,255,255,0.2)" }}
                >
                  {shipping === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />}
                </div>
                <div>
                  <p className="text-sm text-[#f5f0e8]/80 font-medium tracking-wide">{opt.label}</p>
                  <p className="text-[10px] text-[#f5f0e8]/35 tracking-wide mt-0.5">{opt.sub}</p>
                </div>
              </div>
              <span className={`text-sm font-medium ${opt.price === 0 ? "text-[#c9a96e]/70" : "text-[#f5f0e8]/60"}`}>
                {opt.price === 0 ? "Free" : `£${opt.price}`}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#f5f0e8]/30 hover:text-[#f5f0e8]/60 transition-colors py-4 px-1">
          <ArrowLeft size={12} /> Back
        </button>
        <button
          onClick={() => valid && onNext({ ...form, shippingCost: shipping === "express" ? 9.95 : 0 })}
          disabled={!valid}
          className="flex-1 flex items-center justify-center gap-3 py-4 text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-300"
          style={{
            background: valid ? "#f5f0e8" : "rgba(255,255,255,0.05)",
            color: valid ? "#0d0d0d" : "rgba(245,240,232,0.25)",
          }}
          onMouseEnter={e => { if (valid) (e.currentTarget as HTMLButtonElement).style.background = "#c9a96e"; }}
          onMouseLeave={e => { if (valid) (e.currentTarget as HTMLButtonElement).style.background = "#f5f0e8"; }}
        >
          Continue <ArrowRight size={13} />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Upsell Card ──────────────────────────────────────────────────────────────
function UpsellCard({ checked, onChange, label, price, desc }: {
  checked: boolean; onChange: (v: boolean) => void;
  label: string; price: number; desc: string;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-300"
      style={{
        border: `1px solid ${checked ? "rgba(201,169,110,0.4)" : "rgba(255,255,255,0.07)"}`,
        background: checked ? "rgba(201,169,110,0.04)" : "transparent",
      }}
    >
      <div
        className="w-5 h-5 border flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{
          borderColor: checked ? "#c9a96e" : "rgba(255,255,255,0.2)",
          background: checked ? "#c9a96e" : "transparent",
        }}
      >
        {checked && <Check size={11} className="text-[#0d0d0d]" />}
      </div>
      <div className="flex-1">
        <p className="text-sm text-[#f5f0e8]/80 font-medium tracking-wide">{label}</p>
        <p className="text-[10px] text-[#f5f0e8]/35 tracking-wide mt-0.5">{desc}</p>
      </div>
      <span className="text-sm text-[#c9a96e]/70 flex-shrink-0">+£{price}</span>
    </button>
  );
}

// ─── Step 3: Payment ──────────────────────────────────────────────────────────
function StepPayment({
  onBack, onPlace, deliveryData
}: {
  onBack: () => void;
  onPlace: () => void;
  deliveryData: Record<string, string | number>;
}) {
  const { cartTotal } = useStore();
  const shipping = Number(deliveryData.shippingCost ?? 0);
  const [method, setMethod] = useState<"card" | "apple" | "google" | "klarna" | "paypal">("card");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [upsells, setUpsells] = useState({ discovery: false, atomiser: false, giftwrap: false });
  const upsellTotal = (upsells.discovery ? 25 : 0) + (upsells.atomiser ? 20 : 0) + (upsells.giftwrap ? 5 : 0);
  const grandTotal = cartTotal + shipping + upsellTotal;

  const payMethods = [
    { id: "card", label: "Credit Card", icon: <CreditCard size={15} /> },
    { id: "apple", label: "Apple Pay", icon: <span className="text-[11px] font-semibold"></span> },
    { id: "google", label: "Google Pay", icon: <span className="text-[11px] font-medium">G</span> },
    { id: "klarna", label: "Klarna", icon: <span className="text-[11px] font-semibold">K</span> },
    { id: "paypal", label: "PayPal", icon: <span className="text-[11px] font-bold text-[#003087]">P</span> },
  ];

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="text-[9px] tracking-[0.35em] uppercase text-[#c9a96e] mb-3">Step 3 of 3</p>
      <h1
        className="font-serif text-3xl lg:text-4xl font-light text-[#f5f0e8] mb-8"
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        Payment
      </h1>

      {/* Payment methods */}
      <div className="flex gap-2 flex-wrap mb-7">
        {payMethods.map(m => (
          <button
            key={m.id}
            onClick={() => setMethod(m.id as typeof method)}
            className="flex items-center gap-2 px-4 py-2.5 text-[10px] tracking-[0.15em] uppercase transition-all duration-300"
            style={{
              border: `1px solid ${method === m.id ? "rgba(201,169,110,0.5)" : "rgba(255,255,255,0.08)"}`,
              background: method === m.id ? "rgba(201,169,110,0.06)" : "transparent",
              color: method === m.id ? "#c9a96e" : "rgba(245,240,232,0.4)",
            }}
          >
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      {/* Card fields */}
      <AnimatePresence>
        {method === "card" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 mb-8 overflow-hidden"
          >
            <Field
              label="Card Number"
              placeholder="4242 4242 4242 4242"
              value={card.number}
              onChange={v => setCard(p => ({ ...p, number: v }))}
            />
            <div className="flex gap-4">
              <Field
                label="Expiry Date"
                placeholder="MM / YY"
                value={card.expiry}
                onChange={v => setCard(p => ({ ...p, expiry: v }))}
                half
              />
              <Field
                label="CVV"
                placeholder="123"
                value={card.cvv}
                onChange={v => setCard(p => ({ ...p, cvv: v }))}
                half
              />
            </div>
          </motion.div>
        )}
        {method !== "card" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 px-5 py-6 text-center"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-sm text-[#f5f0e8]/40 tracking-wide">
              You&apos;ll be redirected to {method === "apple" ? "Apple Pay" : method === "google" ? "Google Pay" : method === "klarna" ? "Klarna" : "PayPal"} to complete your purchase.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upsell */}
      <div className="mb-8 p-5 lg:p-6" style={{ border: "1px solid rgba(201,169,110,0.12)", background: "rgba(201,169,110,0.02)" }}>
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#c9a96e] mb-1">Complete Your Ritual</p>
        <p className="text-xs text-[#f5f0e8]/35 tracking-wide mb-5">Add to your order before you place it</p>
        <div className="space-y-3">
          <UpsellCard checked={upsells.discovery} onChange={v => setUpsells(p => ({ ...p, discovery: v }))} label="Discovery Set" price={25} desc="5 × 2ml samples of the full ZAIA collection" />
          <UpsellCard checked={upsells.atomiser} onChange={v => setUpsells(p => ({ ...p, atomiser: v }))} label="Travel Atomiser" price={20} desc="Refillable 10ml atomiser in brushed gold" />
          <UpsellCard checked={upsells.giftwrap} onChange={v => setUpsells(p => ({ ...p, giftwrap: v }))} label="Luxury Gift Wrapping" price={5} desc="Black box, ivory ribbon and handwritten card" />
        </div>
      </div>

      {/* Grand total */}
      <div className="flex justify-between items-center mb-6 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#f5f0e8]/40">Grand Total</span>
        <span className="font-serif text-2xl font-light text-[#c9a96e]" style={{ fontFamily: "Cormorant Garamond, serif" }}>
          £{grandTotal.toFixed(2)}
        </span>
      </div>

      <div className="flex gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#f5f0e8]/30 hover:text-[#f5f0e8]/60 transition-colors py-4 px-1">
          <ArrowLeft size={12} /> Back
        </button>
        <motion.button
          onClick={onPlace}
          whileTap={{ scale: 0.98 }}
          className="flex-1 flex items-center justify-center gap-3 py-4 text-[10px] tracking-[0.25em] uppercase font-medium bg-[#f5f0e8] text-[#0d0d0d] hover:bg-[#c9a96e] transition-colors duration-300"
        >
          Place Order <ArrowRight size={13} />
        </motion.button>
      </div>

      <div className="flex items-center justify-center gap-6 mt-6">
        {[Shield, Truck].map((Icon, i) => (
          <div key={i} className="flex items-center gap-2 text-[9px] text-[#f5f0e8]/25 tracking-wider">
            <Icon size={10} className="text-[#c9a96e]/30" />
            {i === 0 ? "SSL Secured" : "Free Returns"}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Checkout ─────────────────────────────────────────────────────────────
function CheckoutContent() {
  const [step, setStep] = useState(1);
  const [customerData, setCustomerData] = useState<Record<string, string>>({});
  const [deliveryData, setDeliveryData] = useState<Record<string, string | number>>({});
  const { cart, cartTotal, clearCart } = useStore();
  const router = useRouter();

  const saveOrderToUser = (shippingCost: number) => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("zaia_user");
    if (!raw) return;
    try {
      const user = JSON.parse(raw);
      const total = cartTotal + shippingCost;
      const newOrder = {
        id: `ZA-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        status: "Processing",
        items: cart.map(item => `${item.name} ${item.size}`),
        total,
      };
      const orders = Array.isArray(user.orders) ? user.orders : [];
      localStorage.setItem("zaia_user", JSON.stringify({ ...user, orders: [newOrder, ...orders] }));
    } catch {}
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="font-serif text-3xl font-light text-[#f5f0e8]/40 mb-4" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            Your cart is empty
          </p>
          <Link href="/shop" className="gold-link text-[#c9a96e]">Discover the Collection →</Link>
        </div>
      </div>
    );
  }

  const shipping = Number(deliveryData.shippingCost ?? 0);

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Header */}
      <header className="border-b border-white/5 px-6 lg:px-12 py-5 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-[0.4em] font-light text-[#f5f0e8]" style={{ fontFamily: "Cormorant Garamond, serif" }}>
          ZAIA
        </Link>
        <div className="flex items-center gap-2 text-[10px] tracking-widest text-[#f5f0e8]/30 uppercase">
          <Shield size={12} className="text-[#c9a96e]/40" /> Secure Checkout
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-start">
          {/* Left: form */}
          <div>
            <ProgressBar step={step} />
            <AnimatePresence mode="wait">
              {step === 1 && (
                <StepDetails
                  key="details"
                  onNext={data => { setCustomerData(data as Record<string, string>); setStep(2); }}
                />
              )}
              {step === 2 && (
                <StepDelivery
                  key="delivery"
                  onNext={data => { setDeliveryData(data); setStep(3); }}
                  onBack={() => setStep(1)}
                />
              )}
              {step === 3 && (
                <StepPayment
                  key="payment"
                  onBack={() => setStep(2)}
                  deliveryData={deliveryData}
                  onPlace={() => {
                    const shippingCost = Number(deliveryData.shippingCost ?? 0);
                    const orderId = `ZA-${Math.floor(10000 + Math.random() * 90000)}`;
                    saveOrderToUser(shippingCost);
                    const addressParts = [
                      deliveryData.address1,
                      deliveryData.address2,
                      deliveryData.city,
                      deliveryData.postcode,
                      deliveryData.country,
                    ].filter(Boolean).join(", ");
                    fetch("/api/notify", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        type: "order",
                        orderId,
                        customer: {
                          name: `${customerData.firstName} ${customerData.lastName}`,
                          email: customerData.email,
                          phone: customerData.phone,
                        },
                        address: addressParts,
                        items: cart.map(i => ({ name: i.name, size: i.size, qty: i.quantity, price: i.price })),
                        total: cartTotal + shippingCost,
                        shipping: shippingCost,
                      }),
                    }).catch(() => {});
                    clearCart();
                    router.push("/checkout/confirmation");
                  }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Right: order summary */}
          <div className="lg:sticky lg:top-8">
            <OrderSummary shipping={shipping} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return <CheckoutContent />;
}
