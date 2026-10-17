"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type SupportedLocale = "th-TH" | "ja-JP" | "en-US";
export type SupportedCurrency = "THB" | "JPY" | "USD";

interface LocaleConfig {
  locale: SupportedLocale;
  currency: SupportedCurrency;
  symbol: string;
  label: string;
  flag: string;
  exchangeRate: number; // relative to 1 THB
}

export const LOCALE_CONFIGS: Record<SupportedLocale, LocaleConfig> = {
  "th-TH": {
    locale: "th-TH",
    currency: "THB",
    symbol: "฿",
    label: "ไทย (THB)",
    flag: "🇹🇭",
    exchangeRate: 1.0,
  },
  "ja-JP": {
    locale: "ja-JP",
    currency: "JPY",
    symbol: "¥",
    label: "日本語 (JPY)",
    flag: "🇯🇵",
    exchangeRate: 4.1,
  },
  "en-US": {
    locale: "en-US",
    currency: "USD",
    symbol: "$",
    label: "English (USD)",
    flag: "🌐",
    exchangeRate: 0.028,
  },
};

interface LocaleContextType {
  currentLocale: SupportedLocale;
  config: LocaleConfig;
  setLocale: (locale: SupportedLocale) => void;
  formatPrice: (amountInTHB: number | string) => string;
  convertPrice: (amountInTHB: number | string) => number;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>("th-TH");

  useEffect(() => {
    const saved = localStorage.getItem("greeny_locale") as SupportedLocale;
    if (saved && LOCALE_CONFIGS[saved]) {
      setCurrentLocale(saved);
    }
  }, []);

  const setLocale = (locale: SupportedLocale) => {
    setCurrentLocale(locale);
    localStorage.setItem("greeny_locale", locale);
  };

  const config = LOCALE_CONFIGS[currentLocale];

  const convertPrice = (amountInTHB: number | string): number => {
    const num = typeof amountInTHB === "string" ? parseFloat(amountInTHB) : amountInTHB;
    if (isNaN(num)) return 0;
    return num * config.exchangeRate;
  };

  const formatPrice = (amountInTHB: number | string): string => {
    const converted = convertPrice(amountInTHB);
    if (config.currency === "USD") {
      return `${config.symbol}${converted.toFixed(2)}`;
    }
    if (config.currency === "JPY") {
      return `${config.symbol}${Math.round(converted).toLocaleString()}`;
    }
    // Default THB
    return `${config.symbol}${converted.toLocaleString("th-TH", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  return (
    <LocaleContext.Provider
      value={{
        currentLocale,
        config,
        setLocale,
        formatPrice,
        convertPrice,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
