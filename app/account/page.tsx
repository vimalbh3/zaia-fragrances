"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User, ShoppingBag, Heart, FlaskConical, BookOpen, Star,
  Package, RotateCcw, ChevronRight, LogOut, Plus, Minus,
  Flame, Droplets, Leaf, Wind
} from "lucide-react";
import { fragrances } from "@/lib/fragrances";

// ─── Types ───────────────────────────────────────────────────────────────────

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  joined: string;
  scentProfile: string | null;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_ORDERS = [
  { id: "ZA-84201", date: "2 Jun 2026", status: "Delivered", items: ["Noir Ambre 100ml"], total: 45 },
  { id: "ZA-77953", date: "14 May 2026", status: "Delivered", items: ["Fleur d'Ombre 50ml", "Citrus Nébuleuse 50ml"], total: 50 },
];

const MOCK_WISHLIST = ["noir-ambre", "citrus-nebuleuse"];

const MOCK_SAMPLES = [
  { name: "Noir Ambre", date: "Jun 2026", rating: 5, note: "Warm, smoky, addictive. Will definitely buy the full bottle." },
  { name: "Santal Veil", date: "May 2026", rating: 4, note: "Subtle and clean. Perfect for everyday wear." },
  { name: "Fleur d'Ombre", date: "Apr 2026", rating: 3, note: "Beautiful but slightly too floral for my taste." },
];

const MOCK_JOURNAL = [
  { id: 1, date: "8 Jun 2026", mood: "Confident", scent: "Noir Ambre", note: "Wore this to an important meeting. The warmth of the amber made me feel grounded and present. People asked what I was wearing." },
  { id: 2, date: "22 May 2026", mood: "Calm", scent: "Santal Veil", note: "A quiet Sunday. The sandalwood felt like wrapping yourself in something soft. Perfect for doing nothing." },
];

const SOCIETY_TIERS = [
  { label: "Initiate", points: 0, perks: ["Early access to new releases", "Birthday gift"] },
  { label: "Member", points: 500, perks: ["All Initiate perks", "Complimentary sample with every order", "Exclusive member pricing"] },
  { label: "Curator", points: 1500, perks: ["All Member perks", "Private release previews", "Annual limited edition gift", "Personal fragrance consultation"] },
  { label: "Maison", points: 3000, perks: ["All Curator perks", "Lifetime samples programme", "Invite-only events", "Bespoke fragrance consultation"] },
];

const MOOD_OPTIONS = ["Confident", "Calm", "Nostalgic", "Adventurous", "Romantic", "Focused", "Playful", "Mysterious"];

// ─── Sub-components ──────────────────────────────────────────────────────────

function ScentFamilyIcon({ family }: { family: string }) {
  const map: Record<string, React.ReactNode> = {
    "warm-musky": <Flame size={18} className="text-[#c9a96e]" />,
    "floral-soft": <Droplets size={18} className="text-[#d4b8c7]" />,
    "fresh-citrus": <Wind size={18} className="text-[#b8c9a0]" />,
    "woody-earthy": <Leaf size={18} className="text-[#9b8a7a]" />,
  };
  return <>{map[family] ?? <Star size={18} className="text-[#c9a96e]" />}</>;
}

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={10} className={i <= value ? "text-[#c9a96e] fill-[#c9a96e]" : "text-white/15"} />
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Delivered: "text-[#b8c9a0] border-[#b8c9a0]/30 bg-[#b8c9a0]/5",
    Shipped: "text-[#c9a96e] border-[#c9a96e]/30 bg-[#c9a96e]/5",
    Processing: "text-[#f5f0e8]/50 border-white/10 bg-white/5",
  };
  return (
    <span className={`text-[9px] tracking-[0.2em] uppercase border px-2.5 py-1 ${styles[status] ?? styles.Processing}`}>
      {status}
    </span>
  );
}

// ─── Tab panels ──────────────────────────────────────────────────────────────

function ProfileTab({ user }: { user: UserData }) {
  const profile = fragrances.find(f => f.tone === (user.scentProfile ?? "warm-musky")) ?? fragrances[0];

  return (
    <div className="space-y-8">
      {/* Scent profile card */}
      <div className="relative overflow-hidden border border-white/6 bg-[#0a0a0a] p-8">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-20" style={{ background: `radial-gradient(circle at 100% 0%, ${profile.accentColor} 0%, transparent 60%)` }} />
        <p className="text-[9px] tracking-[0.35em] uppercase text-[#c9a96e] mb-6">Your Scent Profile</p>
        <div className="flex items-start gap-8">
          <div className="relative w-20 h-24 flex-shrink-0">
            <Image src={profile.image} alt={profile.name} fill className="object-cover object-center" sizes="80px" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <ScentFamilyIcon family={profile.tone} />
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#f5f0e8]/40">{profile.toneLabel}</p>
            </div>
            <h3 className="font-serif text-2xl font-light text-[#f5f0e8] mb-2" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              {profile.name}
            </h3>
            <p className="text-xs text-[#f5f0e8]/40 leading-relaxed max-w-sm mb-5">{profile.subtitle}</p>
            <div className="flex flex-wrap gap-2">
              {profile.notes.heart.map(n => (
                <span key={n} className="text-[9px] tracking-wider uppercase border border-white/8 px-3 py-1.5 text-[#f5f0e8]/40">
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/5">
          <Link href="/" className="text-[10px] tracking-[0.25em] uppercase text-[#c9a96e]/70 hover:text-[#c9a96e] transition-colors flex items-center gap-2">
            Retake scent consultation <ChevronRight size={10} />
          </Link>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <p className="text-[9px] tracking-[0.35em] uppercase text-[#f5f0e8]/30 mb-5">Recommended For You</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {fragrances.filter(f => f.tone === profile.tone || f.slug === "noir-ambre").slice(0,3).map(f => (
            <Link key={f.slug} href={`/product/${f.slug}`} className="group relative border border-white/5 bg-[#0a0a0a] p-5 hover:border-[#c9a96e]/20 transition-all duration-300">
              <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden">
                <Image src={f.image} alt={f.name} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-500" sizes="200px" />
              </div>
              <p className="text-[9px] tracking-widest uppercase text-[#c9a96e]/60 mb-1">{f.toneLabel}</p>
              <p className="font-serif text-base font-light text-[#f5f0e8]" style={{ fontFamily: "Cormorant Garamond, serif" }}>{f.name}</p>
              <p className="text-[10px] text-[#f5f0e8]/30 mt-0.5">from £{f.prices["50ml"]}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function OrdersTab() {
  return (
    <div className="space-y-4">
      <p className="text-[9px] tracking-[0.35em] uppercase text-[#f5f0e8]/30 mb-6">Order History</p>
      {MOCK_ORDERS.map(order => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-white/6 bg-[#0a0a0a] p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-serif text-lg font-light text-[#c9a96e]" style={{ fontFamily: "Cormorant Garamond, serif" }}>{order.id}</p>
              <p className="text-[10px] text-[#f5f0e8]/30 tracking-wider mt-0.5">{order.date}</p>
            </div>
            <StatusBadge status={order.status} />
          </div>
          <div className="space-y-1 mb-5">
            {order.items.map(item => (
              <p key={item} className="text-sm text-[#f5f0e8]/60">{item}</p>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <p className="text-sm text-[#f5f0e8]/50">Total <span className="text-[#c9a96e] font-serif">£{order.total}</span></p>
            <button className="flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase text-[#f5f0e8]/40 hover:text-[#c9a96e] transition-colors border border-white/8 hover:border-[#c9a96e]/30 px-4 py-2">
              <RotateCcw size={10} /> Reorder
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function WishlistTab() {
  const saved = fragrances.filter(f => MOCK_WISHLIST.includes(f.slug));
  return (
    <div>
      <p className="text-[9px] tracking-[0.35em] uppercase text-[#f5f0e8]/30 mb-6">Saved Fragrances</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {saved.map(f => (
          <motion.div
            key={f.slug}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group border border-white/5 bg-[#0a0a0a] overflow-hidden hover:border-[#c9a96e]/20 transition-all duration-300"
          >
            <Link href={`/product/${f.slug}`}>
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image src={f.image} alt={f.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="300px" />
              </div>
              <div className="p-5">
                <p className="text-[9px] tracking-widest uppercase text-[#c9a96e]/60 mb-1">{f.toneLabel}</p>
                <p className="font-serif text-lg font-light text-[#f5f0e8] mb-3" style={{ fontFamily: "Cormorant Garamond, serif" }}>{f.name}</p>
                <p className="text-xs text-[#f5f0e8]/30">from £{f.prices["50ml"]}</p>
              </div>
            </Link>
          </motion.div>
        ))}
        <Link
          href="/shop"
          className="border border-dashed border-white/8 flex flex-col items-center justify-center gap-3 p-10 text-center hover:border-[#c9a96e]/30 transition-colors group"
        >
          <Plus size={16} className="text-[#f5f0e8]/20 group-hover:text-[#c9a96e]/60 transition-colors" />
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#f5f0e8]/25 group-hover:text-[#f5f0e8]/50 transition-colors">Discover more</span>
        </Link>
      </div>
    </div>
  );
}

function SamplesTab() {
  return (
    <div className="space-y-5">
      <p className="text-[9px] tracking-[0.35em] uppercase text-[#f5f0e8]/30 mb-6">Sample History</p>
      {MOCK_SAMPLES.map((s, i) => (
        <motion.div
          key={s.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          className="border border-white/6 bg-[#0a0a0a] p-6"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-serif text-lg font-light text-[#f5f0e8]" style={{ fontFamily: "Cormorant Garamond, serif" }}>{s.name}</p>
              <p className="text-[9px] text-[#f5f0e8]/30 tracking-wider mt-0.5">{s.date}</p>
            </div>
            <StarRating value={s.rating} />
          </div>
          <p className="text-xs text-[#f5f0e8]/40 leading-relaxed italic">"{s.note}"</p>
        </motion.div>
      ))}
    </div>
  );
}

function JournalTab() {
  const [newEntry, setNewEntry] = useState(false);
  const [mood, setMood] = useState("");
  const [scent, setScent] = useState("");
  const [note, setNote] = useState("");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-[9px] tracking-[0.35em] uppercase text-[#f5f0e8]/30">Fragrance Journal</p>
        <button
          onClick={() => setNewEntry(e => !e)}
          className="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase border border-[#c9a96e]/30 text-[#c9a96e] px-4 py-2 hover:bg-[#c9a96e]/10 transition-all"
        >
          <Plus size={10} /> New Entry
        </button>
      </div>

      <AnimatePresence>
        {newEntry && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-[#c9a96e]/20 bg-[#0a0a0a] p-6 mb-6 overflow-hidden"
          >
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#c9a96e] mb-5">New Journal Entry</p>
            <div className="space-y-5">
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase text-[#f5f0e8]/35 mb-3">Mood</p>
                <div className="flex flex-wrap gap-2">
                  {MOOD_OPTIONS.map(m => (
                    <button
                      key={m}
                      onClick={() => setMood(m)}
                      className={`text-[9px] tracking-wider uppercase border px-3 py-1.5 transition-all ${mood === m ? "border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/5" : "border-white/10 text-[#f5f0e8]/35 hover:border-white/25"}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase text-[#f5f0e8]/35 mb-2">Fragrance worn</p>
                <input
                  value={scent}
                  onChange={e => setScent(e.target.value)}
                  placeholder="e.g. Noir Ambre"
                  className="w-full bg-transparent border-b border-white/10 py-2.5 text-sm text-[#f5f0e8] placeholder-[#f5f0e8]/20 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
                />
              </div>
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase text-[#f5f0e8]/35 mb-2">Notes</p>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  rows={3}
                  placeholder="How did this scent make you feel today?"
                  className="w-full bg-transparent border border-white/8 p-4 text-sm text-[#f5f0e8] placeholder-[#f5f0e8]/20 focus:outline-none focus:border-[#c9a96e]/40 transition-colors resize-none"
                />
              </div>
              <button
                onClick={() => setNewEntry(false)}
                className="text-[10px] tracking-[0.25em] uppercase bg-[#f5f0e8] text-[#0d0d0d] px-6 py-3 hover:bg-[#c9a96e] transition-colors font-medium"
              >
                Save Entry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-5">
        {MOCK_JOURNAL.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="border border-white/6 bg-[#0a0a0a] p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-[9px] tracking-[0.2em] uppercase border border-[#c9a96e]/25 text-[#c9a96e]/70 px-2.5 py-1">{entry.mood}</span>
                <span className="text-[9px] text-[#f5f0e8]/25 tracking-wider">{entry.date}</span>
              </div>
            </div>
            <p className="text-[9px] tracking-[0.25em] uppercase text-[#f5f0e8]/30 mb-2">Wearing · {entry.scent}</p>
            <p className="text-sm text-[#f5f0e8]/50 leading-relaxed italic">"{entry.note}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SocietyTab() {
  const currentPoints = 620;
  const currentTierIndex = SOCIETY_TIERS.reduce((acc, t, i) => currentPoints >= t.points ? i : acc, 0);
  const nextTier = SOCIETY_TIERS[currentTierIndex + 1];
  const progress = nextTier ? ((currentPoints - SOCIETY_TIERS[currentTierIndex].points) / (nextTier.points - SOCIETY_TIERS[currentTierIndex].points)) * 100 : 100;

  return (
    <div className="space-y-8">
      {/* Current status */}
      <div className="relative border border-[#c9a96e]/20 bg-[#0a0a0a] p-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 100% 0%, rgba(201,169,110,0.05) 0%, transparent 60%)" }} />
        <p className="text-[9px] tracking-[0.4em] uppercase text-[#c9a96e] mb-6">ZAIA Society</p>
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="font-serif text-4xl font-light text-[#f5f0e8]" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              {SOCIETY_TIERS[currentTierIndex].label}
            </p>
            <p className="text-[10px] text-[#f5f0e8]/35 tracking-wider mt-1">{currentPoints} points</p>
          </div>
          {nextTier && (
            <p className="text-[10px] text-[#f5f0e8]/30 tracking-wider">
              {nextTier.points - currentPoints} pts to <span className="text-[#c9a96e]">{nextTier.label}</span>
            </p>
          )}
        </div>
        {/* Progress bar */}
        <div className="h-px bg-white/8 relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 left-0 bg-[#c9a96e]"
          />
        </div>
        <div className="flex justify-between mt-2">
          {SOCIETY_TIERS.map((t, i) => (
            <p key={t.label} className={`text-[8px] tracking-widest uppercase ${i <= currentTierIndex ? "text-[#c9a96e]" : "text-[#f5f0e8]/20"}`}>
              {t.label}
            </p>
          ))}
        </div>
      </div>

      {/* Perks grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SOCIETY_TIERS[currentTierIndex].perks.map((perk, i) => (
          <motion.div
            key={perk}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-start gap-4 border border-white/5 bg-[#0a0a0a] p-5"
          >
            <Star size={12} className="text-[#c9a96e] flex-shrink-0 mt-0.5 fill-[#c9a96e]" />
            <p className="text-xs text-[#f5f0e8]/50 leading-relaxed">{perk}</p>
          </motion.div>
        ))}
      </div>

      {/* Upcoming tiers */}
      {nextTier && (
        <div>
          <p className="text-[9px] tracking-[0.35em] uppercase text-[#f5f0e8]/25 mb-4">Unlock at {nextTier.label}</p>
          <div className="space-y-2">
            {nextTier.perks.filter(p => !SOCIETY_TIERS[currentTierIndex].perks.includes(p)).map(perk => (
              <div key={perk} className="flex items-start gap-4 p-4 border border-white/[0.04] opacity-40">
                <Minus size={12} className="text-[#f5f0e8]/30 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#f5f0e8]/40">{perk}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main dashboard ───────────────────────────────────────────────────────────

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "samples", label: "Samples", icon: FlaskConical },
  { id: "journal", label: "Journal", icon: BookOpen },
  { id: "society", label: "ZAIA Society", icon: Star },
];

export default function AccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("zaia_user") : null;
    if (raw) {
      setUser(JSON.parse(raw));
    } else {
      router.push("/account/login");
    }
  }, [router]);

  if (!user) return null;

  const handleSignOut = () => {
    localStorage.removeItem("zaia_user");
    router.push("/");
  };

  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() || "Z";
  const joinedDate = new Date(user.joined).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Top nav */}
      <header className="border-b border-white/5 px-6 lg:px-12 py-5 flex items-center justify-between sticky top-0 bg-[#0d0d0d]/95 backdrop-blur-sm z-40">
        <Link href="/" className="font-serif text-xl tracking-[0.4em] font-light text-[#f5f0e8]" style={{ fontFamily: "Cormorant Garamond, serif" }}>
          ZAIA
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/shop" className="text-[9px] tracking-[0.25em] uppercase text-[#f5f0e8]/40 hover:text-[#f5f0e8] transition-colors">
            Shop
          </Link>
          <button onClick={handleSignOut} className="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-[#f5f0e8]/30 hover:text-[#f5f0e8]/60 transition-colors">
            <LogOut size={12} /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Profile hero */}
        <div className="py-14 border-b border-white/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-end gap-8"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-16 h-16 border border-[#c9a96e]/30 flex items-center justify-center bg-[#c9a96e]/5">
                <span className="font-serif text-xl font-light text-[#c9a96e]" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                  {initials}
                </span>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 rounded-full"
                style={{ border: "1px solid rgba(201,169,110,0.15)" }}
              />
            </div>

            <div>
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#c9a96e] mb-2">Your Collection</p>
              <h1 className="font-serif text-4xl lg:text-5xl font-light text-[#f5f0e8]" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-xs text-[#f5f0e8]/30 mt-2 tracking-wider">Member since {joinedDate} · ZAIA Society — Member</p>
            </div>
          </motion.div>
        </div>

        {/* Tab nav */}
        <div className="border-b border-white/5 flex gap-0 overflow-x-auto">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2.5 px-5 py-5 text-[9px] tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-300 ${isActive ? "text-[#c9a96e]" : "text-[#f5f0e8]/35 hover:text-[#f5f0e8]/60"}`}
              >
                <Icon size={12} />
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#c9a96e]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="py-10 pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === "profile" && <ProfileTab user={user} />}
              {activeTab === "orders" && <OrdersTab />}
              {activeTab === "wishlist" && <WishlistTab />}
              {activeTab === "samples" && <SamplesTab />}
              {activeTab === "journal" && <JournalTab />}
              {activeTab === "society" && <SocietyTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
