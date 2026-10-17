"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";

const ALL_SEARCH_PRODUCTS = [
  {
    id: "prod-hyacinth-1",
    name: "ผักตบชวาอบแห้งกันกระแทก 1 กิโลกรัม",
    image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800&auto=format&fit=crop",
    retailPrice: 59.0,
    storeName: "สวนดินดี ออร์แกนิค",
    soldCount: 1420,
    rating: 4.95,
    isMall: true,
    size: "1 กก.",
    isFreeShipping: true,
    categoryKey: "ผักตบ",
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
    categoryKey: "ฟางข้าว",
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
    storeName: "Green Living Crafts Thailand",
    soldCount: 2150,
    rating: 4.98,
    isMall: true,
    size: "แพ็ค 5 แผ่น",
    categoryKey: "ขุยมะพร้าว",
    wholesaleTiers: [
      { minQty: 3, unitPrice: 65.0, discountPct: 13 },
      { minQty: 6, unitPrice: 56.0, discountPct: 25 },
      { minQty: 12, unitPrice: 46.0, discountPct: 38 },
    ],
  },
  {
    id: "prod-mycelium-1",
    name: "แผ่นโฟมเห็ดชีวมวลกันกระแทก (Mycelium Packaging)",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop",
    retailPrice: 89.0,
    storeName: "Green Living Crafts Thailand",
    soldCount: 540,
    rating: 4.92,
    isMall: true,
    size: "15x15x10 cm",
    isFreeShipping: true,
    categoryKey: "เห็ด",
    wholesaleTiers: [
      { minQty: 3, unitPrice: 79.0, discountPct: 11 },
      { minQty: 6, unitPrice: 69.0, discountPct: 22 },
      { minQty: 12, unitPrice: 59.0, discountPct: 33 },
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
    categoryKey: "ชานอ้อย",
    wholesaleTiers: [
      { minQty: 3, unitPrice: 55.0, discountPct: 15 },
      { minQty: 6, unitPrice: 48.0, discountPct: 26 },
      { minQty: 12, unitPrice: 39.0, discountPct: 40 },
    ],
  },
  {
    id: "prod-cornstarch-1",
    name: "โฟมแป้งข้าวโพดละลายน้ำ (Bio Peanuts)",
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop",
    retailPrice: 49.0,
    storeName: "Green Living Crafts Thailand",
    soldCount: 3100,
    rating: 4.96,
    isMall: true,
    size: "ถุงใหญ่ 50 ลิตร",
    categoryKey: "แป้งข้าวโพด",
    wholesaleTiers: [
      { minQty: 3, unitPrice: 42.0, discountPct: 14 },
      { minQty: 6, unitPrice: 36.0, discountPct: 26 },
      { minQty: 12, unitPrice: 29.0, discountPct: 40 },
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
    categoryKey: "ก้านกล้วย",
    wholesaleTiers: [
      { minQty: 3, unitPrice: 47.0, discountPct: 14 },
      { minQty: 6, unitPrice: 40.0, discountPct: 27 },
      { minQty: 12, unitPrice: 33.0, discountPct: 40 },
    ],
  },
  {
    id: "prod-honeycomb-1",
    name: "กระดาษคราฟท์รังผึ้งย่อยสลายได้ (Honeycomb Paper)",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop",
    retailPrice: 69.0,
    storeName: "Green Living Crafts Thailand",
    soldCount: 2800,
    rating: 4.94,
    isMall: true,
    size: "30 ซม. x 30 ม.",
    isFreeShipping: true,
    categoryKey: "รังผึ้ง",
    wholesaleTiers: [
      { minQty: 3, unitPrice: 59.0, discountPct: 14 },
      { minQty: 6, unitPrice: 49.0, discountPct: 28 },
      { minQty: 12, unitPrice: 39.0, discountPct: 43 },
    ],
  },
];

const FILTER_PILLS = [
  { label: "ทั้งหมด", key: "" },
  { label: "ผักตบชวา", key: "ผักตบ" },
  { label: "ฟางข้าว", key: "ฟางข้าว" },
  { label: "เห็ดชีวมวล", key: "เห็ด" },
  { label: "ชานอ้อย", key: "ชานอ้อย" },
  { label: "แป้งข้าวโพด", key: "แป้งข้าวโพด" },
  { label: "ก้านกล้วย", key: "ก้านกล้วย" },
  { label: "ขุยมะพร้าว", key: "ขุยมะพร้าว" },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [activeCategory, setActiveCategory] = useState<string>(initialQuery);
  const [onlyMall, setOnlyMall] = useState(false);
  const [onlyFreeShipping, setOnlyFreeShipping] = useState(false);
  const [sortBy, setSortBy] = useState<"POPULAR" | "PRICE_ASC" | "PRICE_DESC">("POPULAR");

  const filteredProducts = useMemo(() => {
    let result = ALL_SEARCH_PRODUCTS;

    if (activeCategory.trim()) {
      result = result.filter(
        (p) =>
          p.name.includes(activeCategory) ||
          p.categoryKey.includes(activeCategory)
      );
    }

    if (onlyMall) {
      result = result.filter((p) => p.isMall);
    }

    if (onlyFreeShipping) {
      result = result.filter((p) => p.isFreeShipping);
    }

    if (sortBy === "PRICE_ASC") {
      result = [...result].sort((a, b) => a.retailPrice - b.retailPrice);
    } else if (sortBy === "PRICE_DESC") {
      result = [...result].sort((a, b) => b.retailPrice - a.retailPrice);
    } else {
      result = [...result].sort((a, b) => b.soldCount - a.soldCount);
    }

    return result;
  }, [activeCategory, onlyMall, onlyFreeShipping, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 flex flex-col gap-6">
      {/* Search Header Banner */}
      <div className="bg-surface-container-lowest p-4 sm:p-6 rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-outline">ผลการค้นหา:</span>
            <span className="text-base font-extrabold text-primary font-display">
              {activeCategory ? `"${activeCategory}"` : "วัสดุกันกระแทกรักษ์โลกทั้งหมด"}
            </span>
          </div>
          <p className="text-xs text-on-surface-variant">
            พบสินค้าเกษตรและบรรจุภัณฑ์ธรรมชาติ {filteredProducts.length} รายการ
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-on-surface-variant font-medium">เรียงตาม:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-surface-container-low text-xs font-bold px-3 py-2 rounded-xl border border-outline-variant/30 text-on-surface focus:outline-none"
          >
            <option value="POPULAR">สินค้าขายดี ยอดนิยม</option>
            <option value="PRICE_ASC">ราคา: ต่ำไปสูง</option>
            <option value="PRICE_DESC">ราคา: สูงไปต่ำ</option>
          </select>
        </div>
      </div>

      {/* Category Pills Navigation (PDF Pages 23–24) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {FILTER_PILLS.map((pill) => {
          const isSelected =
            (pill.key === "" && !activeCategory) ||
            (pill.key !== "" && activeCategory.includes(pill.key));

          return (
            <button
              key={pill.label}
              onClick={() => setActiveCategory(pill.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shadow-2xs border ${
                isSelected
                  ? "bg-primary-container text-on-primary-container border-primary shadow-xs"
                  : "bg-surface-container-lowest text-on-surface border-outline-variant/30 hover:bg-surface-container"
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      {/* Main Grid & Quick Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Filter Sidebar */}
        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-5">
          <h3 className="font-display font-extrabold text-sm text-on-surface border-b border-outline-variant/20 pb-3 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-primary">filter_list</span>
            ตัวกรองสินค้า (Filters)
          </h3>

          <div className="space-y-3 text-xs">
            <span className="font-bold text-on-surface block uppercase tracking-wider text-[11px]">
              มาตรฐานและบริการ
            </span>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyMall}
                onChange={(e) => setOnlyMall(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary"
              />
              <span className="font-medium text-on-surface flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
                เฉพาะร้านค้า Green Mall
              </span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyFreeShipping}
                onChange={(e) => setOnlyFreeShipping(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary"
              />
              <span className="font-medium text-on-surface flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-[16px]">local_shipping</span>
                ส่งฟรีทั่วไทย 0 บาท
              </span>
            </label>
          </div>

          <div className="pt-3 border-t border-outline-variant/20 space-y-2 text-xs">
            <span className="font-bold text-on-surface block uppercase tracking-wider text-[11px]">
              ข้อดีของราคาส่ง B2B
            </span>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              ทุกสินค้าที่แสดงมีโครงสร้างราคาส่งแบบขั้นบันได 3, 6, และ 12 หน่วยขึ้นไป ระบบจะคำนวณส่วนลดให้อัตโนมัติในรถเข็น
            </p>
          </div>
        </div>

        {/* Right Products Feed */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-surface-container-lowest p-12 rounded-3xl text-center border border-outline-variant/30">
              <span className="material-symbols-outlined text-[48px] text-outline mb-2">search_off</span>
              <h3 className="font-display font-bold text-base text-on-surface">ไม่พบสินค้าที่ตรงกับการค้นหา</h3>
              <p className="text-xs text-on-surface-variant mt-1">
                ลองค้นหาด้วยคำอื่น เช่น "ผักตบ", "ฟางข้าว", "ขุยมะพร้าว" หรือเลือกดูหมวดหมู่ทั้งหมด
              </p>
              <button
                onClick={() => {
                  setActiveCategory("");
                  setOnlyMall(false);
                  setOnlyFreeShipping(false);
                }}
                className="mt-4 px-5 py-2 rounded-full bg-primary-container text-on-primary-container text-xs font-bold"
              >
                ล้างตัวกรองทั้งหมด
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-secondary">
          กำลังค้นหาสินค้าเกษตรย่อยสลายได้...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
