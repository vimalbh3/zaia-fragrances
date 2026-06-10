"use client";

interface BottleProps {
  accentColor?: string;
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  sublabel?: string;
  className?: string;
}

const sizes = {
  sm: { width: 80, height: 110 },
  md: { width: 120, height: 165 },
  lg: { width: 180, height: 248 },
  xl: { width: 280, height: 385 },
};

export default function BottleIllustration({
  accentColor = "#c9a96e",
  size = "md",
  label = "ZAIA",
  sublabel = "FRAGRANCES",
  className = "",
}: BottleProps) {
  const { width, height } = sizes[size];
  const vw = 100;
  const vh = 138;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${vw} ${vh}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Cap */}
      <rect x="38" y="0" width="24" height="18" rx="4" fill="#111111" />
      <rect x="40" y="15" width="20" height="4" rx="1" fill="#1e1e1e" />

      {/* Neck */}
      <rect x="43" y="19" width="14" height="8" fill="#1a1a1a" />

      {/* Bottle body */}
      <rect x="10" y="27" width="80" height="100" rx="10" fill="#161616" />

      {/* Glass shine */}
      <rect x="12" y="29" width="6" height="96" rx="3" fill="white" opacity="0.04" />
      <rect x="82" y="29" width="4" height="96" rx="2" fill="white" opacity="0.03" />

      {/* Label */}
      <rect x="20" y="44" width="60" height="60" rx="2" fill="#e8e0d0" opacity="0.94" />
      <rect x="22" y="46" width="56" height="56" rx="1" fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.6" />

      {/* Label text — ZAIA */}
      <text
        x="50"
        y="68"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, Times New Roman, serif"
        fontSize="12"
        fontWeight="400"
        letterSpacing="3"
        fill="#111111"
      >
        {label}
      </text>

      {/* Divider */}
      <line x1="28" y1="74" x2="72" y2="74" stroke={accentColor} strokeWidth="0.5" opacity="0.7" />

      {/* Sublabel */}
      <text
        x="50"
        y="83"
        textAnchor="middle"
        fontFamily="Montserrat, Arial, sans-serif"
        fontSize="5"
        fontWeight="400"
        letterSpacing="2"
        fill="#333333"
      >
        {sublabel}
      </text>

      {/* Bottom reflection */}
      <rect x="10" y="122" width="80" height="5" rx="3" fill="white" opacity="0.03" />

      {/* Base shadow */}
      <ellipse cx="50" cy="132" rx="35" ry="4" fill="black" opacity="0.4" />
    </svg>
  );
}
