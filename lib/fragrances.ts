export interface Fragrance {
  slug: string;
  name: string;
  subtitle: string;
  tone: "warm-musky" | "floral-soft" | "fresh-citrus" | "woody-earthy";
  toneLabel: string;
  prices: { "50ml": number; "100ml": number };
  notes: { top: string[]; heart: string[]; base: string[] };
  description: string;
  keyNotes: string;
  bottleColor: string;
  accentColor: string;
  image: string;
}

export const fragrances: Fragrance[] = [
  {
    slug: "noir-ambre",
    name: "Noir Ambre",
    subtitle: "A smouldering amber wrapped in smoke and vanilla.",
    tone: "warm-musky",
    toneLabel: "Warm & Musky",
    prices: { "50ml": 25, "100ml": 45 },
    notes: {
      top: ["Black pepper", "Saffron", "Smoke"],
      heart: ["Amber resin", "Labdanum", "Rose absolute"],
      base: ["Vanilla", "Benzoin", "Sandalwood"],
    },
    description:
      "Noir Ambre opens with a veil of spiced smoke before settling into a deep, resinous amber heart. The dry-down is pure skin — warm, powdery, and magnetic. A fragrance that lingers like a memory.",
    keyNotes: "Amber, Smoke, Vanilla",
    bottleColor: "#1a1a1a",
    accentColor: "#c9a96e",
    image: "/bottle-noir-ambre-v2.png",
  },
  {
    slug: "santal-veil",
    name: "Santal Veil",
    subtitle: "Sandalwood meets soft iris in a whisper of musk.",
    tone: "woody-earthy",
    toneLabel: "Woody & Earthy",
    prices: { "50ml": 25, "100ml": 45 },
    notes: {
      top: ["Cardamom", "Pink pepper", "Bergamot"],
      heart: ["Iris root", "Violet", "Orris butter"],
      base: ["Sandalwood", "White musk", "Vetiver"],
    },
    description:
      "Santal Veil is an exercise in restraint. Creamy sandalwood and powdery iris intertwine over a clean musk base, creating a fragrance that feels like a second skin — subtle, refined, and deeply personal.",
    keyNotes: "Sandalwood, Iris, Musk",
    bottleColor: "#1a1a1a",
    accentColor: "#9b8a7a",
    image: "/bottle-santal-veil.png",
  },
  {
    slug: "fleur-dombre",
    name: "Fleur d'Ombre",
    subtitle: "Jasmine blossoms in the dark, kissed by patchouli.",
    tone: "floral-soft",
    toneLabel: "Floral & Soft",
    prices: { "50ml": 25, "100ml": 45 },
    notes: {
      top: ["Neroli", "Petitgrain", "Green leaves"],
      heart: ["Jasmine absolute", "Tuberose", "Ambrox"],
      base: ["Patchouli", "Amber", "White cedar"],
    },
    description:
      "Fleur d'Ombre takes the softness of jasmine and transforms it into something shadowed and complex. This is not a simple floral — it is a nocturnal garden, mysterious and intoxicating with every breath.",
    keyNotes: "Jasmine, Ambrox, Patchouli",
    bottleColor: "#1a1a1a",
    accentColor: "#d4b8c7",
    image: "/bottle-fleur-dombre.png",
  },
  {
    slug: "citrus-nebuleuse",
    name: "Citrus Nébuleuse",
    subtitle: "Sun-drenched bergamot dissolving into white tea.",
    tone: "fresh-citrus",
    toneLabel: "Fresh & Citrus",
    prices: { "50ml": 25, "100ml": 45 },
    notes: {
      top: ["Bergamot", "Lemon zest", "Grapefruit"],
      heart: ["Neroli", "White tea", "Jasmine petals"],
      base: ["Musk", "Amberwood", "Cedarwood"],
    },
    description:
      "Citrus Nébuleuse is effortless clarity. Bright bergamot and tart citrus open to a luminous white tea heart before fading into a soft, airy musk. Light enough for every day, refined enough for every occasion.",
    keyNotes: "Bergamot, Neroli, White Tea",
    bottleColor: "#1a1a1a",
    accentColor: "#b8c9a0",
    image: "/bottle-citrus-nebuleuse.png",
  },
  {
    slug: "oud-silhouette",
    name: "Oud Silhouette",
    subtitle: "Ancient oud shadows lean leather and incense.",
    tone: "woody-earthy",
    toneLabel: "Woody & Earthy",
    prices: { "50ml": 25, "100ml": 45 },
    notes: {
      top: ["Incense", "Black cumin", "Elemi"],
      heart: ["Oud wood", "Leather accord", "Suede"],
      base: ["Frankincense", "Patchouli", "Dark musk"],
    },
    description:
      "Oud Silhouette commands attention. Rich, smoky oud is balanced by cool leather and resinous incense in a fragrance of unmistakable depth. This is presence distilled — bold, dark, and unforgettable.",
    keyNotes: "Oud, Leather, Incense",
    bottleColor: "#1a1a1a",
    accentColor: "#8a7055",
    image: "/bottle-oud-silhouette.png",
  },
];

export const tones = [
  {
    id: "warm-musky",
    label: "Warm & Musky",
    description:
      "Deep, sensual and enveloping scents with rich woods, amber and smoky accords.",
    keyNotes: ["Amber", "Benzoin", "Vanilla", "Smoke", "Labdanum"],
    gradient: "from-[#3d2b1f] via-[#5c3d22] to-[#2a1a0e]",
    accentColor: "#c9a96e",
    textAccent: "#e8c98a",
    bgImage: "warm",
  },
  {
    id: "floral-soft",
    label: "Floral & Soft",
    description:
      "Elegant, romantic and expressive compositions with floral and powdery notes.",
    keyNotes: ["Jasmine", "Rose", "Iris", "Tuberose", "Peony"],
    gradient: "from-[#2d1f2a] via-[#4a3040] to-[#1e1520]",
    accentColor: "#d4b8c7",
    textAccent: "#e8d0dc",
    bgImage: "floral",
  },
  {
    id: "fresh-citrus",
    label: "Fresh & Citrus",
    description:
      "Clean, uplifting and vibrant scents inspired by citrus, herbs and watery accords.",
    keyNotes: ["Bergamot", "Neroli", "White Tea", "Lemon", "Petitgrain"],
    gradient: "from-[#1a2820] via-[#243d2e] to-[#111e18]",
    accentColor: "#b8c9a0",
    textAccent: "#ccddb4",
    bgImage: "fresh",
  },
  {
    id: "woody-earthy",
    label: "Woody & Earthy",
    description:
      "Grounded, sophisticated and timeless blends built on woods, resins and spices.",
    keyNotes: ["Oud", "Sandalwood", "Vetiver", "Patchouli", "Incense"],
    gradient: "from-[#1c1a14] via-[#2e2a1e] to-[#121009]",
    accentColor: "#9b8a7a",
    textAccent: "#b5a490",
    bgImage: "woody",
  },
];
