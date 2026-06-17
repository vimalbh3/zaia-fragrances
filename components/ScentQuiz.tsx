"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, ChevronRight } from "lucide-react";
import { useStore } from "@/lib/store";

type Family = "warm-musky" | "floral-soft" | "fresh-citrus" | "woody-earthy";

// ─── Data ─────────────────────────────────────────────────────────────────────

const questions = [
  {
    id: 1,
    prompt: "Close your eyes.",
    question: "What do you smell first?",
    options: [
      { label: "Rain on warm stone", sub: "An unexpected, quiet intimacy", family: "fresh-citrus" as Family },
      { label: "Burning cedarwood", sub: "Something ancient and grounding", family: "woody-earthy" as Family },
      { label: "Warmed skin and resin", sub: "A second-skin comfort", family: "warm-musky" as Family },
      { label: "A garden after dark", sub: "Soft, intoxicating, alive", family: "floral-soft" as Family },
    ],
  },
  {
    id: 2,
    prompt: "It's midnight.",
    question: "Where are you?",
    options: [
      { label: "Standing at the edge of the sea", sub: "Salt air and open sky", family: "fresh-citrus" as Family },
      { label: "In a forest with no path", sub: "Ancient trees, dark earth", family: "woody-earthy" as Family },
      { label: "Beside a fire, amber glass in hand", sub: "Warmth, smoke, stillness", family: "warm-musky" as Family },
      { label: "A room full of white flowers", sub: "Lush, soft, ethereal", family: "floral-soft" as Family },
    ],
  },
  {
    id: 3,
    prompt: "A texture draws you in.",
    question: "Which one?",
    options: [
      { label: "Cold linen", sub: "Clean. Unadorned. Present.", family: "fresh-citrus" as Family },
      { label: "Aged leather", sub: "A history worn in.", family: "woody-earthy" as Family },
      { label: "Heavy cashmere", sub: "Enveloping. Like being held.", family: "warm-musky" as Family },
      { label: "Raw silk", sub: "Delicate, but with weight.", family: "floral-soft" as Family },
    ],
  },
  {
    id: 4,
    prompt: "One word.",
    question: "Choose without thinking.",
    options: [
      { label: "Clarity", sub: "", family: "fresh-citrus" as Family },
      { label: "Depth", sub: "", family: "woody-earthy" as Family },
      { label: "Ember", sub: "", family: "warm-musky" as Family },
      { label: "Bloom", sub: "", family: "floral-soft" as Family },
    ],
  },
];

const results: Record<Family, {
  slug: string; name: string; toneLabel: string; image: string;
  headline: string; verse: string; keyNotes: string; accentColor: string;
}> = {
  "warm-musky": {
    slug: "noir-ambre",
    name: "Noir Ambre",
    toneLabel: "Warm & Musky",
    image: "/bottle-noir-ambre.png",
    headline: "You are drawn to warmth.",
    verse: "Smouldering amber, a veil of smoke, vanilla that lingers long after you've left the room. Noir Ambre is for those who leave an impression.",
    keyNotes: "Amber · Smoke · Vanilla",
    accentColor: "#c9a96e",
  },
  "floral-soft": {
    slug: "fleur-dombre",
    name: "Fleur d'Ombre",
    toneLabel: "Floral & Soft",
    image: "/bottle-fleur-dombre.png",
    headline: "You carry softness as strength.",
    verse: "Jasmine that blooms in the dark, patchouli that grounds, ambrox that breathes on skin. Fleur d'Ombre is never simply a floral — it is a feeling.",
    keyNotes: "Jasmine · Ambrox · Patchouli",
    accentColor: "#d4b8c7",
  },
  "fresh-citrus": {
    slug: "citrus-nebuleuse",
    name: "Citrus Nébuleuse",
    toneLabel: "Fresh & Citrus",
    image: "/bottle-citrus-nebuleuse.png",
    headline: "You move through the world lightly.",
    verse: "Sun on bergamot, the quiet of white tea, neroli like a breath of clean air. Citrus Nébuleuse is luminous, effortless, yours.",
    keyNotes: "Bergamot · Neroli · White Tea",
    accentColor: "#b8c9a0",
  },
  "woody-earthy": {
    slug: "oud-silhouette",
    name: "Oud Silhouette",
    toneLabel: "Woody & Earthy",
    image: "/bottle-oud-silhouette.png",
    headline: "You carry ancient things.",
    verse: "Rich oud, cool leather, incense that rises and settles. Oud Silhouette demands nothing — and commands everything.",
    keyNotes: "Oud · Leather · Incense",
    accentColor: "#9b8a7a",
  },
};

// Atmospheric backgrounds per family
const atmospheres: Record<Family, string> = {
  "warm-musky": "radial-gradient(ellipse 70% 60% at 60% 80%, rgba(180,100,20,0.22) 0%, rgba(100,50,10,0.12) 50%, transparent 80%)",
  "floral-soft": "radial-gradient(ellipse 70% 60% at 40% 20%, rgba(180,120,140,0.2) 0%, rgba(120,80,100,0.1) 50%, transparent 80%)",
  "fresh-citrus": "radial-gradient(ellipse 70% 60% at 70% 30%, rgba(100,150,100,0.18) 0%, rgba(60,100,80,0.1) 50%, transparent 80%)",
  "woody-earthy": "radial-gradient(ellipse 70% 60% at 30% 70%, rgba(80,60,40,0.22) 0%, rgba(50,40,20,0.12) 50%, transparent 80%)",
};

// ─── Dot progress ─────────────────────────────────────────────────────────────
function Dots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            width: i === current ? 20 : 6,
            background: i < current ? "#c9a96e" : i === current ? "#f5f0e8" : "rgba(245,240,232,0.2)",
          }}
          transition={{ duration: 0.4 }}
          className="h-[3px] rounded-full"
        />
      ))}
    </div>
  );
}

interface ScentQuizProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function ScentQuiz({ forceOpen, onClose }: ScentQuizProps = {}) {
  const [open, setOpen] = useState(false);
  const [triggered, setTriggered] = useState(false);
  const [phase, setPhase] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<Family, number>>({
    "warm-musky": 0, "floral-soft": 0, "fresh-citrus": 0, "woody-earthy": 0,
  });
  const [dominantFamily, setDominantFamily] = useState<Family | null>(null);
  const [selectedOption, setSelectedOption] = useState<Family | null>(null);
  const { addToCart } = useStore();

  // External force-open (e.g. from account page retake button)
  useEffect(() => {
    if (forceOpen) {
      setOpen(true);
      setPhase("intro");
    }
  }, [forceOpen]);

  const trigger = useCallback(() => {
    if (triggered || forceOpen) return;
    setTriggered(true);
    setOpen(true);
  }, [triggered, forceOpen]);

  useEffect(() => {
    if (forceOpen) return; // don't set up auto-trigger when externally controlled
    // Timer: 12 seconds
    const timer = setTimeout(trigger, 12000);

    // Exit intent: mouse leaves near the top
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 8) trigger();
    };
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [trigger, forceOpen]);

  // Compute dominant family from current scores
  const computeDominant = (s: Record<Family, number>): Family => {
    return (Object.entries(s) as [Family, number][]).reduce((a, b) => b[1] > a[1] ? b : a)[0];
  };

  const handleAnswer = (family: Family) => {
    setSelectedOption(family);
    const newScores = { ...scores, [family]: scores[family] + 1 };
    setScores(newScores);

    setTimeout(() => {
      setSelectedOption(null);
      if (currentQ < questions.length - 1) {
        setCurrentQ(q => q + 1);
      } else {
        const family = computeDominant(newScores);
        setDominantFamily(family);
        saveProfileToUser(family);
        setPhase("result");
      }
    }, 380);
  };

  const reset = () => {
    setPhase("intro");
    setCurrentQ(0);
    setScores({ "warm-musky": 0, "floral-soft": 0, "fresh-citrus": 0, "woody-earthy": 0 });
    setDominantFamily(null);
    setSelectedOption(null);
  };

  const close = () => {
    setOpen(false);
    reset();
    onClose?.();
  };

  // Save scent profile to localStorage when result is determined
  const saveProfileToUser = (family: Family) => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("zaia_user");
    if (!raw) return;
    try {
      const user = JSON.parse(raw);
      localStorage.setItem("zaia_user", JSON.stringify({ ...user, scentProfile: family }));
    } catch {}
  };

  const result = dominantFamily ? results[dominantFamily] : null;

  // Atmospheric bg based on running dominant score
  const runningDominant = computeDominant(scores);
  const hasAnswered = Object.values(scores).some(v => v > 0);
  const atmosphereBg = hasAnswered ? atmospheres[runningDominant] : "none";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-[#080808] flex flex-col overflow-hidden"
        >
          {/* Atmospheric glow — shifts with answers */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ background: atmosphereBg }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Grain texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Header bar */}
          <div className="relative z-10 flex items-center justify-between px-8 lg:px-16 pt-8 pb-0">
            <div className="flex items-center gap-6">
              <span
                className="font-serif text-base tracking-[0.4em] text-[#f5f0e8]/60"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                ZAIA
              </span>
              {phase === "quiz" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <Dots current={currentQ} total={questions.length} />
                </motion.div>
              )}
            </div>
            <button
              onClick={close}
              className="w-9 h-9 flex items-center justify-center text-[#f5f0e8]/30 hover:text-[#f5f0e8] transition-colors border border-white/10 hover:border-white/25"
            >
              <X size={15} />
            </button>
          </div>

          {/* Main content */}
          <div className="relative z-10 flex-1 flex items-center justify-center px-6 lg:px-16">
            <AnimatePresence mode="wait">

              {/* ── Intro ────────────────────────────────── */}
              {phase === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center max-w-xl"
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-12 h-px bg-[#c9a96e]/50 mx-auto mb-10"
                  />
                  <p className="text-[9px] tracking-[0.5em] uppercase text-[#c9a96e]/70 mb-6">
                    Scent Consultation
                  </p>
                  <h2
                    className="font-serif font-light text-[#f5f0e8] leading-tight mb-6"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                    }}
                  >
                    A scent is not<br />chosen. It is<br />recognised.
                  </h2>
                  <p className="text-sm text-[#f5f0e8]/40 leading-relaxed mb-12 max-w-sm mx-auto">
                    Four questions. No right answers.<br />
                    Your fragrance is already within you.
                  </p>
                  <motion.button
                    onClick={() => setPhase("quiz")}
                    whileHover={{ gap: "16px" }}
                    className="group inline-flex items-center gap-3 border border-[#f5f0e8]/20 hover:border-[#c9a96e]/50 text-[#f5f0e8]/70 hover:text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase px-10 py-4 transition-all duration-400"
                  >
                    Begin
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ChevronRight size={12} />
                    </motion.span>
                  </motion.button>
                  <div className="mt-8">
                    <button onClick={close} className="text-[9px] tracking-[0.25em] uppercase text-[#f5f0e8]/15 hover:text-[#f5f0e8]/35 transition-colors">
                      Skip for now
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Quiz ─────────────────────────────────── */}
              {phase === "quiz" && (
                <motion.div
                  key={`q-${currentQ}`}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-3xl"
                >
                  {/* Question */}
                  <div className="mb-12 lg:mb-16">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-[9px] tracking-[0.4em] uppercase text-[#c9a96e]/60 mb-4"
                    >
                      {questions[currentQ].prompt}
                    </motion.p>
                    <motion.h2
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18 }}
                      className="font-serif font-light text-[#f5f0e8] leading-tight"
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                      }}
                    >
                      {questions[currentQ].question}
                    </motion.h2>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {questions[currentQ].options.map((opt, i) => {
                      const isSelected = selectedOption === opt.family;
                      return (
                        <motion.button
                          key={opt.label}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          onClick={() => handleAnswer(opt.family)}
                          className="group relative text-left px-6 py-5 border transition-all duration-300"
                          style={{
                            background: isSelected ? "rgba(201,169,110,0.08)" : "rgba(255,255,255,0.02)",
                            borderColor: isSelected ? "rgba(201,169,110,0.5)" : "rgba(255,255,255,0.08)",
                          }}
                        >
                          {/* Option number */}
                          <span className="absolute top-4 right-5 text-[9px] text-[#f5f0e8]/15 tracking-widest">
                            {String(i + 1).padStart(2, "0")}
                          </span>

                          <p
                            className="font-serif text-xl lg:text-2xl font-light text-[#f5f0e8] leading-tight mb-1.5 transition-colors group-hover:text-[#c9a96e]"
                            style={{ fontFamily: "Cormorant Garamond, serif" }}
                          >
                            {opt.label}
                          </p>
                          {opt.sub && (
                            <p className="text-[10px] text-[#f5f0e8]/30 tracking-wide leading-relaxed">
                              {opt.sub}
                            </p>
                          )}

                          {/* Hover line */}
                          <motion.div
                            className="absolute bottom-0 left-0 h-px bg-[#c9a96e]"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.35 }}
                          />
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Question counter */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 text-[9px] tracking-[0.3em] uppercase text-[#f5f0e8]/15"
                  >
                    {currentQ + 1} / {questions.length}
                  </motion.p>
                </motion.div>
              )}

              {/* ── Result ───────────────────────────────── */}
              {phase === "result" && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full max-w-5xl"
                >
                  <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                    {/* Left: copy */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="w-10 h-px mb-8"
                        style={{ background: result.accentColor }}
                      />

                      <p className="text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: result.accentColor }}>
                        Your Scent · {result.toneLabel}
                      </p>

                      <h2
                        className="font-serif font-light text-[#f5f0e8] leading-none mb-3"
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: "clamp(2.8rem, 6vw, 5rem)",
                        }}
                      >
                        {result.name}
                      </h2>

                      <p
                        className="font-serif italic font-light mb-6"
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          color: result.accentColor,
                          fontSize: "1.1rem",
                        }}
                      >
                        {result.headline}
                      </p>

                      <p className="text-sm text-[#f5f0e8]/50 leading-relaxed mb-6 max-w-sm">
                        {result.verse}
                      </p>

                      <p className="text-[10px] tracking-[0.3em] uppercase text-[#f5f0e8]/30 mb-8">
                        {result.keyNotes}
                      </p>

                      {/* CTAs */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                          href={`/product/${result.slug}`}
                          onClick={close}
                          className="flex items-center justify-center gap-3 bg-[#f5f0e8] text-[#0d0d0d] text-[10px] tracking-[0.25em] uppercase px-8 py-4 font-medium hover:bg-[#c9a96e] transition-colors duration-300"
                        >
                          Explore {result.name} <ArrowRight size={12} />
                        </Link>
                        <button
                          onClick={() => {
                            addToCart({
                              slug: result.slug,
                              name: result.name,
                              price: 45,
                              size: "100ml",
                              image: result.image,
                            });
                            close();
                          }}
                          className="flex items-center justify-center gap-2 border text-[10px] tracking-[0.2em] uppercase px-8 py-4 hover:bg-white/5 transition-all duration-300"
                          style={{ borderColor: `${result.accentColor}40`, color: result.accentColor }}
                        >
                          Add to Cart
                        </button>
                      </div>

                      <button
                        onClick={reset}
                        className="mt-5 text-[9px] tracking-[0.25em] uppercase text-[#f5f0e8]/20 hover:text-[#f5f0e8]/40 transition-colors"
                      >
                        Start again
                      </button>
                    </motion.div>

                    {/* Right: bottle */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                      className="relative flex items-center justify-center"
                    >
                      {/* Glow */}
                      <div
                        className="absolute w-72 h-72 rounded-full pointer-events-none"
                        style={{
                          background: `radial-gradient(circle, ${result.accentColor}20 0%, transparent 70%)`,
                          filter: "blur(40px)",
                        }}
                      />
                      {/* Floating bottle */}
                      <motion.div
                        animate={{ y: [0, -14, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-64 h-80 lg:w-80 lg:h-[420px]"
                      >
                        <Image
                          src={result.image}
                          alt={result.name}
                          fill
                          className="object-contain drop-shadow-2xl"
                          priority
                        />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Bottom progress bar (quiz only) */}
          <AnimatePresence>
            {phase === "quiz" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10 h-px bg-white/5 mx-8 lg:mx-16 mb-8"
              >
                <motion.div
                  className="absolute left-0 top-0 h-full bg-[#c9a96e]"
                  animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
