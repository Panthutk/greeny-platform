"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";

const ME_PRODUCTS = [
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
    wholesaleTiers: [
      { minQty: 3, unitPrice: 49.0, discountPct: 17 },
      { minQty: 6, unitPrice: 42.0, discountPct: 28 },
      { minQty: 12, unitPrice: 35.0, discountPct: 40 },
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
    wholesaleTiers: [
      { minQty: 3, unitPrice: 65.0, discountPct: 13 },
      { minQty: 6, unitPrice: 56.0, discountPct: 25 },
      { minQty: 12, unitPrice: 46.0, discountPct: 38 },
    ],
  },
];

export default function GreenyMePage() {
  const [activeHistoryTab, setActiveHistoryTab] = useState<"LIKED" | "VIEWED" | "PURCHASED" | "REORDER">("PURCHASED");

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* User Spotlight Banner (PDF Pages 11 & 13) */}
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
            alt="User avatar"
            className="w-20 h-20 rounded-2xl object-cover border-2 border-primary shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-display font-extrabold text-xl text-on-surface">สมชาย รักธรรมชาติ</h1>
              <span className="text-[10px] font-bold bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full">
                Eco Member
              </span>
            </div>
            <p className="text-xs text-on-surface-variant flex items-center gap-3">
              <span>ยอดลดคาร์บอนสะสม: <strong className="text-primary font-display">42.5 kgCO₂e</strong></span>
              <span>•</span>
              <span>ผู้ติดตาม: <strong className="font-display">120 คน</strong></span>
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Link
                href="/creator/new"
                className="text-[11px] font-bold text-primary bg-primary-container/20 px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">add_circle</span>
                โพสต์รีวิว / สตูดิโอครีเอเตอร์
              </Link>
            </div>
          </div>
        </div>

        {/* Greeny Wallet Balance Card */}
        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-center gap-4 self-start md:self-auto shrink-0">
          <div className="w-12 h-12 rounded-xl bg-forest-slate text-white flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
          </div>
          <div>
            <span className="text-[11px] text-outline block font-medium">Greeny Wallet (ยอดเงินสะสม)</span>
            <span className="font-display font-extrabold text-xl text-primary">฿ 2,500.00</span>
          </div>
        </div>
      </div>

      {/* 4 Order Status Trackers (PDF Page 13) */}
      <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-4">
        <h2 className="font-display font-extrabold text-sm sm:text-base text-on-surface flex items-center justify-between border-b border-outline-variant/20 pb-3">
          <span>คำสั่งซื้อของฉัน (My Orders)</span>
          <Link href="/help" className="text-xs text-primary font-bold hover:underline">
            ประวัติทั้งหมด
          </Link>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-surface-container-low/70 hover:bg-surface-container transition-colors cursor-pointer flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-[28px] text-on-surface-variant">payment</span>
            <span className="text-xs font-bold text-on-surface">ต้องชำระเงิน</span>
            <span className="text-[10px] text-outline">0 รายการ</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low/70 hover:bg-surface-container transition-colors cursor-pointer flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-[28px] text-coral-accent">inventory</span>
            <span className="text-xs font-bold text-on-surface">เตรียมจัดส่ง</span>
            <span className="text-[10px] font-bold text-coral-accent">1 รายการ</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low/70 hover:bg-surface-container transition-colors cursor-pointer flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-[28px] text-primary">local_shipping</span>
            <span className="text-xs font-bold text-on-surface">ต้องได้รับ</span>
            <span className="text-[10px] font-bold text-primary">2 รายการ</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low/70 hover:bg-surface-container transition-colors cursor-pointer flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-[28px] text-on-surface-variant">rate_review</span>
            <span className="text-xs font-bold text-on-surface">รีวิวคะแนน</span>
            <span className="text-[10px] text-outline">5 รอรีวิว</span>
          </div>
        </div>
      </div>

      {/* 4 History Tabs (PDF Page 13: ถูกใจสินค้า, ดูสินค้า, ซื้อสินค้า, ซื้อสินค้าซ้ำ) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-outline-variant/30">
          {[
            { id: "PURCHASED", label: "ซื้อสินค้าแล้ว (Purchased)" },
            { id: "REORDER", label: "ซื้อสินค้าซ้ำ (Re-order)" },
            { id: "LIKED", label: "ถูกใจสินค้า (Wishlist)" },
            { id: "VIEWED", label: "สินค้าที่ดูล่าสุด (History)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveHistoryTab(tab.id as any)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeHistoryTab === tab.id
                  ? "bg-primary-container text-on-primary-container shadow-xs"
                  : "bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-outline-variant/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards for Selected History */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ME_PRODUCTS.map((prod) => (
            <ProductCard key={prod.id} {...prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
