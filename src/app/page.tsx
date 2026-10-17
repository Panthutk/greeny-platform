import React from "react";
import Link from "next/link";
import { HeroBanner } from "@/components/home/HeroBanner";
import { LivesCarousel } from "@/components/home/LivesCarousel";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { FlashSalesSection } from "@/components/home/FlashSalesSection";
import { ProductCard } from "@/components/product/ProductCard";

const ECO_CATEGORIES = [
  { name: "ผักตบกันกระแทก", emoji: "🍀", query: "ผักตบ", desc: "สลายตัวใน 60 วัน" },
  { name: "ฟางข้าวกันกระแทก", emoji: "🌾", query: "ฟางข้าว", desc: "ปลอดสารเคมี 100%" },
  { name: "เห็ดกันกระแทก", emoji: "🍄", query: "เห็ด", desc: "โฟมชีวภาพ EPS" },
  { name: "ชานอ้อยกันกระแทก", emoji: "🎋", query: "ชานอ้อย", desc: "ถาดล็อคขวดแก้ว" },
  { name: "แป้งข้าวโพดกันกระแทก", emoji: "🌽", query: "แป้งข้าวโพด", desc: "ละลายน้ำใน 1 นาที" },
  { name: "ก้านกล้วยกันกระแทก", emoji: "🍌", query: "ก้านกล้วย", desc: "เหนียวนุ่มถักเกลียว" },
  { name: "ขุยมะพร้าวกันกระแทก", emoji: "🥥", query: "ขุยมะพร้าว", desc: "ต้านแรงกดทับ 15 kg" },
  { name: "กระดาษรังผึ้ง", emoji: "📦", query: "รังผึ้ง", desc: "รีไซเคิล ไม่ใช้กาว" },
];

const RECOMMENDED_PRODUCTS = [
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
    wholesaleTiers: [
      { minQty: 3, unitPrice: 79.0, discountPct: 11 },
      { minQty: 6, unitPrice: 69.0, discountPct: 22 },
      { minQty: 12, unitPrice: 59.0, discountPct: 33 },
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
    wholesaleTiers: [
      { minQty: 3, unitPrice: 59.0, discountPct: 14 },
      { minQty: 6, unitPrice: 49.0, discountPct: 28 },
      { minQty: 12, unitPrice: 39.0, discountPct: 43 },
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
    wholesaleTiers: [
      { minQty: 3, unitPrice: 42.0, discountPct: 14 },
      { minQty: 6, unitPrice: 36.0, discountPct: 26 },
      { minQty: 12, unitPrice: 29.0, discountPct: 40 },
    ],
  },
  {
    id: "prod-popcorn-1",
    name: "โฟมป๊อปคอร์นธรรมชาติ (Organic Popcorn Cushion)",
    image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=800&auto=format&fit=crop",
    retailPrice: 39.0,
    storeName: "สวนดินดี ออร์แกนิค",
    soldCount: 760,
    rating: 4.79,
    isMall: true,
    size: "ถุงละ 20 ลิตร",
    isBuyOneGetOne: true,
    wholesaleTiers: [
      { minQty: 3, unitPrice: 33.0, discountPct: 15 },
      { minQty: 6, unitPrice: 28.0, discountPct: 28 },
      { minQty: 12, unitPrice: 22.0, discountPct: 43 },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 flex flex-col gap-10">
      {/* 1. Hero Promotional Banner */}
      <HeroBanner />

      {/* 2. Greeny Lives Video Streams Carousel */}
      <LivesCarousel />

      {/* 3. Force Sales Section */}
      <FlashSalesSection />

      {/* 4. Eco Materials Categories Explorer (PDF Pages 23–24) */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[20px]">category</span>
            </div>
            <div>
              <h2 className="font-display font-extrabold text-base sm:text-lg text-on-surface">
                หมวดหมู่วัสดุกันกระแทกธรรมชาติ (Eco Cushioning Materials)
              </h2>
              <p className="text-xs text-secondary font-medium">
                เลือกซื้อตามวัตถุดิบทางการเกษตรอินทรีย์ไทย
              </p>
            </div>
          </div>
          <Link
            href="/search"
            className="text-xs font-bold text-primary hover:text-on-primary-fixed-variant flex items-center gap-0.5"
          >
            ดูทั้งหมด <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {ECO_CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              href={`/search?q=${encodeURIComponent(cat.query)}`}
              className="bg-surface-container-lowest p-3 rounded-2xl border border-outline-variant/30 hover:border-primary shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center gap-1.5 group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container-low group-hover:bg-primary-container/20 flex items-center justify-center text-2xl transition-colors">
                {cat.emoji}
              </div>
              <h3 className="font-bold text-xs text-on-surface group-hover:text-primary transition-colors leading-tight">
                {cat.name}
              </h3>
              <span className="text-[10px] text-outline font-medium">{cat.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Greeny Review Social Section */}
      <ReviewsCarousel />

      {/* 6. Recommended Products Catalog (Dual Pricing Retail & Wholesale) */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-forest-slate text-white flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[20px]">thumb_up</span>
            </div>
            <div>
              <h2 className="font-display font-extrabold text-base sm:text-lg text-on-surface">
                สินค้าแนะนำสำหรับคุณ (ขายปลีก & ราคาส่ง)
              </h2>
              <p className="text-xs text-secondary font-medium">
                รองรับการสั่งซื้อปลีกสำหรับร้านค้า และสั่งซื้อยกล็อตสำหรับธุรกิจ SME
              </p>
            </div>
          </div>
          <Link
            href="/search"
            className="text-xs font-bold text-primary hover:text-on-primary-fixed-variant flex items-center gap-0.5"
          >
            ดูทั้งหมด <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {RECOMMENDED_PRODUCTS.map((prod) => (
            <ProductCard key={prod.id} {...prod} />
          ))}
        </div>
      </section>
    </div>
  );
}
