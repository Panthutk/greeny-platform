"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";

const STORE_CATALOG = [
  {
    id: "prod-hyacinth-1",
    name: "ผักตบชวาอบแห้งกันกระแทก 1 กิโลกรัม",
    image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800&auto=format&fit=crop",
    retailPrice: 59.0,
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
    id: "prod-straw-1",
    name: "ฟางข้าวอัดเส้นกันกระแทกปลอดสารพิษ",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop",
    retailPrice: 45.0,
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
    id: "prod-bagasse-1",
    name: "ถาดชานอ้อยขึ้นรูปกันกระแทกสำหรับขวดแก้ว",
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop",
    retailPrice: 65.0,
    storeName: "สวนดินดี ออร์แกนิค",
    soldCount: 1670,
    rating: 4.85,
    isMall: true,
    size: "แพ็ค 10 ชิ้น",
    isFreeShipping: true,
    wholesaleTiers: [
      { minQty: 3, unitPrice: 55.0, discountPct: 15 },
      { minQty: 6, unitPrice: 48.0, discountPct: 26 },
      { minQty: 12, unitPrice: 39.0, discountPct: 40 },
    ],
  },
  {
    id: "prod-banana-1",
    name: "ก้านกล้วยอบแห้งถักเกลียวกันกระแทก",
    image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=800&auto=format&fit=crop",
    retailPrice: 55.0,
    storeName: "สวนดินดี ออร์แกนิค",
    soldCount: 890,
    rating: 4.82,
    isMall: true,
    size: "ม้วน 10 เมตร",
    isFreeShipping: true,
    wholesaleTiers: [
      { minQty: 3, unitPrice: 47.0, discountPct: 14 },
      { minQty: 6, unitPrice: 40.0, discountPct: 27 },
      { minQty: 12, unitPrice: 33.0, discountPct: 40 },
    ],
  },
];

export default function StorefrontPage() {
  const params = useParams();
  const [catalogMode, setCatalogMode] = useState<"RETAIL" | "WHOLESALE">("RETAIL");
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 flex flex-col gap-6">
      {/* Store Profile Header (PDF Page 27) */}
      <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-2xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 z-10">
          <div className="w-20 h-20 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-3xl shadow-sm border border-primary/20 shrink-0">
            🌱
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="font-display font-extrabold text-xl text-on-surface">
                สวนดินดี ออร์แกนิค (Official Store)
              </h1>
              <span className="bg-forest-slate text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                <span className="material-symbols-outlined text-[12px] text-primary-fixed">verified</span>
                Green Mall Lvl 4
              </span>
            </div>
            <p className="text-xs text-on-surface-variant flex flex-wrap items-center gap-3">
              <span>คะแนนความยั่งยืน: <strong className="text-primary font-display">99.4%</strong></span>
              <span>•</span>
              <span>ตอบแชทภายใน: <strong>4 นาที</strong></span>
              <span>•</span>
              <span>ผู้ติดตาม: <strong className="font-display">3.4k คน</strong></span>
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] bg-secondary-container text-on-secondary-container font-bold px-2 py-0.5 rounded-full">
                มาตรฐาน Organic Thailand
              </span>
              <span className="text-[10px] bg-secondary-container text-on-secondary-container font-bold px-2 py-0.5 rounded-full">
                มผช. ชุมชนนครปฐม
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto z-10 shrink-0">
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
              isFollowing
                ? "bg-surface-container text-on-surface"
                : "bg-forest-slate text-white hover:bg-neutral-800"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isFollowing ? "check" : "add"}
            </span>
            <span>{isFollowing ? "กำลังติดตาม" : "ติดตามร้านค้า"}</span>
          </button>
          <button className="px-5 py-2.5 rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary text-xs font-bold transition-all shadow-xs flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>แชทร้านค้า</span>
          </button>
        </div>
      </div>

      {/* Split Catalog View Tabs: Retail vs Wholesale (PDF Pages 27 & 38–39) */}
      <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
        <div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-full border border-outline-variant/30 shadow-2xs">
          <button
            onClick={() => setCatalogMode("RETAIL")}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              catalogMode === "RETAIL"
                ? "bg-primary-container text-on-primary-container shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
            ขายปลีก (Retail - 1 ชิ้น)
          </button>
          <button
            onClick={() => setCatalogMode("WHOLESALE")}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              catalogMode === "WHOLESALE"
                ? "bg-forest-slate text-white shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-primary-fixed">inventory_2</span>
            ขายส่งยกล็อต (Wholesale Tiers - 3, 6, 12 ชิ้น)
          </button>
        </div>

        <span className="text-xs text-on-surface-variant font-medium hidden sm:inline">
          {catalogMode === "RETAIL"
            ? "ราคาขายปลีกสำหรับผู้ซื้อทั่วไป"
            : "โครงสร้างส่วนลดราคาส่ง B2B สำหรับร้านค้าออนไลน์และ SME"}
        </span>
      </div>

      {/* Product Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {STORE_CATALOG.map((prod) => (
          <ProductCard key={prod.id} {...prod} />
        ))}
      </div>
    </div>
  );
}
