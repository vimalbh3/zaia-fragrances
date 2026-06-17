"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────

export interface CurrencyConfig {
  code: string;
  symbol: string;
  symbolAfter?: boolean;
  rate: number; // from GBP
  decimals: number;
}

export const CURRENCIES: Record<string, CurrencyConfig> = {
  GBP: { code: "GBP", symbol: "£",    rate: 1,      decimals: 2 },
  USD: { code: "USD", symbol: "$",    rate: 1.27,   decimals: 2 },
  EUR: { code: "EUR", symbol: "€",    rate: 1.17,   decimals: 2 },
  AED: { code: "AED", symbol: "AED ", rate: 4.67,   decimals: 0 },
  SAR: { code: "SAR", symbol: "SAR ", rate: 4.77,   decimals: 0 },
  KWD: { code: "KWD", symbol: "KD ",  rate: 0.39,   decimals: 3 },
  QAR: { code: "QAR", symbol: "QAR ", rate: 4.63,   decimals: 0 },
  BHD: { code: "BHD", symbol: "BD ",  rate: 0.48,   decimals: 3 },
  OMR: { code: "OMR", symbol: "OMR ", rate: 0.49,   decimals: 3 },
  INR: { code: "INR", symbol: "₹",    rate: 106,    decimals: 0 },
  CAD: { code: "CAD", symbol: "CA$",  rate: 1.73,   decimals: 2 },
  AUD: { code: "AUD", symbol: "A$",   rate: 1.95,   decimals: 2 },
  NZD: { code: "NZD", symbol: "NZ$",  rate: 2.11,   decimals: 2 },
  JPY: { code: "JPY", symbol: "¥",    rate: 198,    decimals: 0 },
  CHF: { code: "CHF", symbol: "CHF ", rate: 1.13,   decimals: 2 },
  SGD: { code: "SGD", symbol: "S$",   rate: 1.71,   decimals: 2 },
  HKD: { code: "HKD", symbol: "HK$",  rate: 9.93,   decimals: 2 },
  MYR: { code: "MYR", symbol: "RM",   rate: 5.98,   decimals: 2 },
  ZAR: { code: "ZAR", symbol: "R",    rate: 23.5,   decimals: 2 },
  PKR: { code: "PKR", symbol: "₨",    rate: 354,    decimals: 0 },
  TRY: { code: "TRY", symbol: "₺",    rate: 40.8,   decimals: 0 },
  SEK: { code: "SEK", symbol: "kr",   symbolAfter: true, rate: 13.6, decimals: 2 },
  NOK: { code: "NOK", symbol: "kr",   symbolAfter: true, rate: 13.8, decimals: 2 },
  DKK: { code: "DKK", symbol: "kr",   symbolAfter: true, rate: 8.75, decimals: 2 },
};

// country code → currency code
const COUNTRY_CURRENCY: Record<string, string> = {
  // UK
  GB: "GBP",
  // US
  US: "USD",
  // Eurozone
  DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", NL: "EUR",
  BE: "EUR", AT: "EUR", IE: "EUR", PT: "EUR", FI: "EUR",
  GR: "EUR", LU: "EUR", SK: "EUR", SI: "EUR", EE: "EUR",
  LV: "EUR", LT: "EUR", CY: "EUR", MT: "EUR",
  // GCC
  AE: "AED", SA: "SAR", KW: "KWD", QA: "QAR", BH: "BHD", OM: "OMR",
  // Asia
  IN: "INR", JP: "JPY", SG: "SGD", HK: "HKD", MY: "MYR",
  PK: "PKR",
  // Oceania
  AU: "AUD", NZ: "NZD",
  // Americas
  CA: "CAD",
  // Europe non-euro
  CH: "CHF", SE: "SEK", NO: "NOK", DK: "DKK",
  // Africa / other
  ZA: "ZAR", TR: "TRY",
};

// ─── Context ──────────────────────────────────────────────────────────────────

interface CurrencyContextType {
  currency: CurrencyConfig;
  country: string | null;
  loading: boolean;
  formatPrice: (gbpPrice: number) => string;
  setCurrencyCode: (code: string) => void;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currencyCode, setCurrencyCode] = useState("GBP");
  const [country, setCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(r => r.json())
      .then(data => {
        const cc = (data.country_code as string) ?? "GB";
        setCountry(cc);
        const detected = COUNTRY_CURRENCY[cc] ?? "GBP";
        setCurrencyCode(detected);
      })
      .catch(() => {
        // silently fall back to GBP
      })
      .finally(() => setLoading(false));
  }, []);

  const currency = CURRENCIES[currencyCode] ?? CURRENCIES.GBP;

  const formatPrice = useCallback((gbpPrice: number) => {
    const converted = gbpPrice * currency.rate;
    const rounded =
      currency.decimals === 0
        ? Math.round(converted)
        : parseFloat(converted.toFixed(currency.decimals));
    const formatted = rounded.toLocaleString("en", {
      minimumFractionDigits: currency.decimals,
      maximumFractionDigits: currency.decimals,
    });
    return currency.symbolAfter
      ? `${formatted} ${currency.symbol.trim()}`
      : `${currency.symbol}${formatted}`;
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, country, loading, formatPrice, setCurrencyCode }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
