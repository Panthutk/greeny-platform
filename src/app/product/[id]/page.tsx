"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useLocale } from "@/context/LocaleContext";

const SAMPLE_PRODUCT = {
  id: "prod-hyacinth-1",
  name: "ผักตบชวาอบแห้งกันกระแทก 1 กิโลกรัม (Sun-Dried Water Hyacinth)",
  description:
    "ผักตบชวาธรรมชาติ 100% ผ่านกรรมวิธีล้างสะอาด อบแห้งฆ่าเชื้อด้วยตู้อบแสงอาทิตย์ ไร้กลิ่นอับ ไร้สารเคมี ใช้รองก้นกล่อง ห่อหุ้มเครื่องสำอาง เซรามิก และขวดแก้วได้อย่างมั่นใจ ย่อยสลายได้ใน 60 วัน เพิ่มมูลค่าให้วัชพืชท้องถิ่นไทย",
  materialType: "HYACINTH",
  retailPrice: 59.0,
  originalPrice: 75.0,
  storeId: "store-01",
  storeName: "สวนดินดี ออร์แกนิค (Official Store)",
  rating: 4.95,
  soldCount: 1420,
  carbonOffsetKg: 0.85,
  size: "1 กิโลกรัม (ประมาณ 100 ลิตรหลังฟู)",
  images: [
    "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop",
  ],
  wholesaleTiers: [
    { minQty: 3, unitPrice: 49.0, discountPct: 17 },
    { minQty: 6, unitPrice: 42.0, discountPct: 28 },
    { minQty: 12, unitPrice: 35.0, discountPct: 40 },
  ],
  specs: [
    { label: "วัสดุหลัก", value: "ก้านผักตบชวาตากแห้ง 100%" },
    { label: "แหล่งกำเนิด", value: "ลุ่มน้ำแม่กลอง-นครปฐม ประเทศไทย" },
    { label: "การย่อยสลาย", value: "สลายตัวในดินธรรมชาติ 60-90 วัน" },
    { label: "การรองรับน้ำหนัก", value: "รองรับการกดทับได้สูงสุด 8 กิโลกรัม" },
    { label: "มาตรฐานการรับรอง", value: "มาตรฐานเกษตรอินทรีย์, มผช. ชุมชน, ใบรับรองเกษตรอำเภอ" },
  ],
};

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const { formatPrice } = useLocale();

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"SPECS" | "REVIEWS" | "EXTERNAL">("SPECS");

  // Calculate current tier discount
  const sortedTiers = [...SAMPLE_PRODUCT.wholesaleTiers].sort((a, b) => b.minQty - a.minQty);
  const matchedTier = sortedTiers.find((t) => quantity >= t.minQty);
  const effectiveUnitPrice = matchedTier ? matchedTier.unitPrice : SAMPLE_PRODUCT.retailPrice;
  const totalPrice = effectiveUnitPrice * quantity;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 flex flex-col gap-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
        <Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link>
        <span>/</span>
        <Link href="/search?q=ผักตบ" className="hover:text-primary transition-colors">วัสดุกันกระแทกธรรมชาติ</Link>
        <span>/</span>
        <span className="text-on-surface font-bold truncate max-w-sm">{SAMPLE_PRODUCT.name}</span>
      </nav>

      {/* Main Top Section: Gallery & Purchase Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Gallery (Col 5) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-surface-container-low border border-outline-variant/30 shadow-sm">
            <img
              src={SAMPLE_PRODUCT.images[activeImage]}
              alt={SAMPLE_PRODUCT.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-3 left-3 bg-forest-slate text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-[13px] text-primary-fixed">eco</span>
              Green Mall Verified
            </span>
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-3">
            {SAMPLE_PRODUCT.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                  activeImage === idx
                    ? "border-primary shadow-sm scale-105"
                    : "border-outline-variant/30 hover:border-outline opacity-70"
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Buy Matrix & Tiered Discounts (Col 7) */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-1">
              <Link href="/store/store-01" className="font-bold text-primary hover:underline">
                {SAMPLE_PRODUCT.storeName}
              </Link>
              <span>•</span>
              <span className="text-outline">Thailand</span>
            </div>
            <h1 className="font-display font-extrabold text-xl sm:text-2xl text-on-surface leading-tight">
              {SAMPLE_PRODUCT.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-on-surface-variant">
              <span className="text-amber-500 font-bold flex items-center gap-0.5">
                ⭐ {SAMPLE_PRODUCT.rating}
              </span>
              <span>•</span>
              <span>ขายแล้ว {SAMPLE_PRODUCT.soldCount} ชิ้น</span>
              <span>•</span>
              <span className="text-primary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">eco</span>
                ลดคาร์บอน {SAMPLE_PRODUCT.carbonOffsetKg} kgCO₂e/ชิ้น
              </span>
            </div>
          </div>

          {/* Price & Wholesale Tier Grid */}
          <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-on-surface-variant font-bold">ราคาขายปลีก:</span>
              <span className="font-display font-extrabold text-2xl text-primary">
                {formatPrice(effectiveUnitPrice)}
              </span>
              {SAMPLE_PRODUCT.originalPrice > effectiveUnitPrice && (
                <span className="text-xs line-through text-outline font-display">
                  {formatPrice(SAMPLE_PRODUCT.originalPrice)}
                </span>
              )}
            </div>

            {/* Wholesale Tier Cards */}
            <div>
              <span className="text-[11px] font-bold text-forest-slate uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-primary">inventory_2</span>
                ตารางราคาส่งยกล็อต (Wholesale Volume Tiers):
              </span>
              <div className="grid grid-cols-3 gap-2">
                {SAMPLE_PRODUCT.wholesaleTiers.map((tier) => {
                  const isActive = matchedTier?.minQty === tier.minQty;
                  return (
                    <div
                      key={tier.minQty}
                      onClick={() => setQuantity(tier.minQty)}
                      className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                        isActive
                          ? "bg-primary-container/20 border-primary shadow-xs"
                          : "bg-surface-container-lowest border-outline-variant/40 hover:bg-surface-container"
                      }`}
                    >
                      <div className="text-[11px] font-bold text-on-surface">
                        ≥ {tier.minQty} ชิ้น
                      </div>
                      <div className="font-display font-extrabold text-sm text-primary">
                        {formatPrice(tier.unitPrice)}
                      </div>
                      <div className="text-[10px] font-extrabold text-coral-accent">
                        ลด {tier.discountPct}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quantity Stepper & Cart Total */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-on-surface">จำนวน:</span>
              <div className="flex items-center border border-outline-variant/40 rounded-full bg-surface-container-lowest shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <span className="w-10 text-center font-bold font-display text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-on-surface-variant block">ยอดรวมทั้งสิ้น</span>
              <span className="font-display font-extrabold text-xl text-primary">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() =>
                addToCart(
                  {
                    id: SAMPLE_PRODUCT.id,
                    name: SAMPLE_PRODUCT.name,
                    image: SAMPLE_PRODUCT.images[0],
                    retailPrice: SAMPLE_PRODUCT.retailPrice,
                    wholesaleTiers: SAMPLE_PRODUCT.wholesaleTiers,
                    storeName: SAMPLE_PRODUCT.storeName,
                    size: SAMPLE_PRODUCT.size,
                    isMall: true,
                  },
                  quantity
                )
              }
              className="flex-1 py-3.5 rounded-full bg-surface-container-high hover:bg-surface-container text-on-surface font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-[20px] text-primary">shopping_cart</span>
              <span>เพิ่มลงรถเข็นหิ้วๆ</span>
            </button>

            <button
              onClick={() => {
                addToCart(
                  {
                    id: SAMPLE_PRODUCT.id,
                    name: SAMPLE_PRODUCT.name,
                    image: SAMPLE_PRODUCT.images[0],
                    retailPrice: SAMPLE_PRODUCT.retailPrice,
                    wholesaleTiers: SAMPLE_PRODUCT.wholesaleTiers,
                    storeName: SAMPLE_PRODUCT.storeName,
                    size: SAMPLE_PRODUCT.size,
                    isMall: true,
                  },
                  quantity
                );
              }}
              className="flex-1 py-3.5 rounded-full bg-coral-accent hover:bg-red-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">bolt</span>
              <span>ซื้อสินค้าทันที</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Tabbed Sections: Specs, Ratings, External Reviews (PDF Pages 28–31) */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-2xs space-y-6">
        {/* Tab Headers */}
        <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab("SPECS")}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === "SPECS"
                ? "bg-primary-container text-on-primary-container shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            รายละเอียดสินค้า (Specs)
          </button>
          <button
            onClick={() => setActiveTab("REVIEWS")}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === "REVIEWS"
                ? "bg-primary-container text-on-primary-container shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            รีวิวคะแนนดาว (Ratings)
          </button>
          <button
            onClick={() => setActiveTab("EXTERNAL")}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "EXTERNAL"
                ? "bg-forest-slate text-white shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
            รีวิวจากที่อื่น (Lemon8 & UGC)
          </button>
        </div>

        {/* Tab 1: Specs */}
        {activeTab === "SPECS" && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <h3 className="font-display font-extrabold text-base text-on-surface">ข้อมูลจำเพาะสินค้า</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {SAMPLE_PRODUCT.specs.map((spec, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-surface-container-low flex justify-between gap-3">
                  <span className="text-outline font-medium">{spec.label}</span>
                  <span className="text-on-surface font-bold text-right">{spec.value}</span>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-2xl bg-secondary-container/40 border border-secondary-container text-xs text-on-surface-variant space-y-1">
              <div className="font-bold text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">eco</span>
                การรับรองด้านสิ่งแวดล้อม
              </div>
              <p>ผ่านการตรวจวิเคราะห์ปริมาณจุลินทรีย์และการฆ่าเชื้อ ไร้สารเคมีฟอกสี ย่อยสลายตามธรรมชาติ 100%</p>
            </div>
          </div>
        )}

        {/* Tab 2: Internal Ratings */}
        {activeTab === "REVIEWS" && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="p-4 rounded-2xl bg-surface-container-low flex items-center gap-6">
              <div className="text-center">
                <div className="font-display font-extrabold text-3xl text-primary">4.95</div>
                <div className="text-amber-500 text-sm">⭐⭐⭐⭐⭐</div>
                <div className="text-[11px] text-outline mt-0.5">จาก 340 ผู้ซื้อ</div>
              </div>
              <div className="border-l border-outline-variant/30 pl-6 text-xs space-y-1 text-on-surface-variant">
                <div>คะแนนสินค้า: <strong>4.9 / 5.0</strong></div>
                <div>บริการการขนส่ง: <strong>5.0 / 5.0</strong></div>
                <div>การตอบแชทร้านค้า: <strong>4.9 / 5.0</strong></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-on-surface">คุณมนัส (ร้านเครื่องหอมออแกนิก)</span>
                  <span className="text-[10px] text-outline">3 วันที่แล้ว</span>
                </div>
                <div className="text-amber-500 text-xs">⭐⭐⭐⭐⭐</div>
                <p className="text-on-surface-variant leading-relaxed">
                  ผักตบชวาสะอาดมาก ไร้ฝุ่นละออง กลิ่นแดดหอมสะอาด ห่อขวดแก้วแล้วลูกค้าชมทุกคน สั่งซ้ำรอบที่ 4 แล้วครับ
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: External Lemon8 & Social UGC Reviews (PDF Pages 30–31) */}
        {activeTab === "EXTERNAL" && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="p-3 rounded-2xl bg-surface-container-low text-xs text-on-surface-variant flex items-center justify-between">
              <span>รีวิวที่รวบรวมจากผู้ใช้บนแอปพลิเคชันภายนอก (Lemon8 / Instagram / TikTok)</span>
              <span className="font-bold text-primary">Verified Social Citations</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-yellow-400/20 text-neutral-900 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                    🍋 Lemon8 Creator
                  </span>
                  <span className="text-[10px] text-outline">@ecolover_bkk</span>
                </div>
                <h4 className="font-bold text-xs text-on-surface">
                  ไอเดีย Upcycling: เอาผักตบชวาจากพัสดุไปปลูกต้นไม้ต่อ ดีงามมาก!
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  ได้รับพัสดุแล้วอย่าเพิ่งทิ้งผักตบชวา เอาไปรองก้นกระถางต้นไม้แทนกาบมะพร้าว เก็บความชื้นได้ดีเว่อร์ ต้นไม้โตไว เป็นมิตรต่อโลกสุดๆ
                </p>
                <div className="text-[10px] text-primary font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">link</span>
                  <span>ดูโพสต์ต้นทางบน Lemon8</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
