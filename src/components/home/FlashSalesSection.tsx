"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";

const FLASH_PRODUCTS = [
  {
    id: "prod-hyacinth-1",
    name: "ผักตบชวาอบแห้งกันกระแทก 1 กิโลกรัม",
    image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800&auto=format&fit=crop",
    retailPrice: 59.0,
    originalPrice: 75.0,
    storeName: "สวนดินดี ออร์แกนิค",
    soldCount: 1420,
    rating: 4.95,
    isMall: true,
    size: "1 กิโลกรัม",
    isFreeShipping: true,
    wholesaleTiers: [
      { minQty: 3, unitPrice: 49.0, discountPct: 17 },
      { minQty: 6, unitPrice: 42.0, discountPct: 28 },
      { minQty: 12, unitPrice: 35.0, discountPct: 40 },
    ],
  },
  {
    id: "prod-cornstarch-1",
    name: "โฟมแป้งข้าวโพดละลายน้ำ (Bio Peanuts)",
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop",
    retailPrice: 49.0,
    originalPrice: 65.0,
    storeName: "Green Living Crafts Thailand",
    soldCount: 3100,
    rating: 4.96,
    isMall: true,
    size: "ถุง 50 ลิตร",
    isFreeShipping: false,
    wholesaleTiers: [
      { minQty: 3, unitPrice: 42.0, discountPct: 14 },
      { minQty: 6, unitPrice: 36.0, discountPct: 26 },
      { minQty: 12, unitPrice: 29.0, discountPct: 40 },
    ],
  },
  {
    id: "prod-straw-1",
    name: "ฟางข้าวอัดเส้นกันกระแทกปลอดสารพิษ",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop",
    retailPrice: 45.0,
    originalPrice: 60.0,
    storeName: "สวนดินดี ออร์แกนิค",
    soldCount: 980,
    rating: 4.88,
    isMall: true,
    size: "ถุง 500 กรัม",
    isBuyOneGetOne: true,
    isFreeShipping: true,
    wholesaleTiers: [
      { minQty: 3, unitPrice: 38.0, discountPct: 15 },
      { minQty: 6, unitPrice: 32.0, discountPct: 28 },
      { minQty: 12, unitPrice: 26.0, discountPct: 42 },
    ],
  },
  {
    id: "prod-coir-1",
    name: "ขุยมะพร้าวอัดแผ่นกันกระแทก (ต้านแรงกด 15 kg)",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop",
    retailPrice: 75.0,
    originalPrice: 95.0,
    storeName: "Green Living Crafts Thailand",
    soldCount: 2150,
    rating: 4.98,
    isMall: true,
    size: "แพ็ค 5 แผ่น",
    wholesaleTiers: [
      { minQty: 3, unitPrice: 65.0, discountPct: 13 },
      { minQty: 6, unitPrice: 56.0, discountPct: 25 },
      { minQty: 12, unitPrice: 46.0, discountPct: 38 },
    ],
  },
];

export function FlashSalesSection() {
  const [activeTab, setActiveTab] = useState<"HOURLY" | "DAILY" | "SPECIAL" | "CLEARANCE">("HOURLY");
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 48, seconds: 35 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 0, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num: number) => num.toString().padStart(2, "0");

  return (
    <section id="flash-sales" className="bg-surface-container-low/60 rounded-3xl p-4 sm:p-6 border border-outline-variant/30 flex flex-col gap-5">
      {/* Top Header & Countdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-outline-variant/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-coral-accent text-white flex items-center justify-center font-bold shadow-sm">
            <span className="material-symbols-outlined text-[24px]">local_fire_department</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-extrabold text-base sm:text-lg text-on-surface">
                FORCE SALES (ดีลพิเศษรักษ์โลก)
              </h2>
              <span className="bg-tertiary text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                Flash
              </span>
            </div>
            <p className="text-xs text-secondary font-medium">
              ลดกระหน่ำจำกัดเวลา สำหรับบรรจุภัณฑ์ธรรมชาติแท้ 100%
            </p>
          </div>
        </div>

        {/* Dynamic Countdown Clock */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-surface-container-lowest px-3 py-1.5 rounded-2xl border border-outline-variant/30 shadow-2xs">
          <span className="text-[11px] font-bold text-on-surface-variant mr-1">สิ้นสุดใน:</span>
          <span className="w-7 h-7 rounded-lg bg-forest-slate text-white font-display font-bold text-xs flex items-center justify-center">
            {formatDigit(timeLeft.hours)}
          </span>
          <span className="text-forest-slate font-bold">:</span>
          <span className="w-7 h-7 rounded-lg bg-forest-slate text-white font-display font-bold text-xs flex items-center justify-center">
            {formatDigit(timeLeft.minutes)}
          </span>
          <span className="text-forest-slate font-bold">:</span>
          <span className="w-7 h-7 rounded-lg bg-coral-accent text-white font-display font-bold text-xs flex items-center justify-center animate-pulse">
            {formatDigit(timeLeft.seconds)}
          </span>
        </div>
      </div>

      {/* 4 Campaign Type Filter Tabs (PDF Pages 3 & 10) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("HOURLY")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shadow-2xs ${
            activeTab === "HOURLY"
              ? "bg-coral-accent text-white shadow-xs"
              : "bg-surface-container-lowest text-on-surface hover:bg-surface-container"
          }`}
        >
          ⚡ ดีลชั่วโมงทอง (00:60:00)
        </button>
        <button
          onClick={() => setActiveTab("DAILY")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shadow-2xs ${
            activeTab === "DAILY"
              ? "bg-coral-accent text-white shadow-xs"
              : "bg-surface-container-lowest text-on-surface hover:bg-surface-container"
          }`}
        >
          📅 ดีลประจำวัน (24:00:00)
        </button>
        <button
          onClick={() => setActiveTab("SPECIAL")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shadow-2xs ${
            activeTab === "SPECIAL"
              ? "bg-coral-accent text-white shadow-xs"
              : "bg-surface-container-lowest text-on-surface hover:bg-surface-container"
          }`}
        >
          🎉 แคมเปญพิเศษ (Special Day)
        </button>
        <button
          onClick={() => setActiveTab("CLEARANCE")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shadow-2xs ${
            activeTab === "CLEARANCE"
              ? "bg-coral-accent text-white shadow-xs"
              : "bg-surface-container-lowest text-on-surface hover:bg-surface-container"
          }`}
        >
          🏷️ ลดล้างสต็อก (Clearance)
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FLASH_PRODUCTS.map((prod) => (
          <ProductCard key={prod.id} {...prod} />
        ))}
      </div>
    </section>
  );
}
