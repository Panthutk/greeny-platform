"use client";

import React, { useState } from "react";
import { LiveStreamModal } from "@/components/social/LiveStreamModal";

const SAMPLE_LIVES = [
  {
    id: "live-1",
    title: "สาธิตกันกระแทกจากผักตบชวา อบแห้ง 1 กก.",
    presenterName: "GreenyBKK",
    viewersCount: 342,
    likesCount: 1240,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRmtW_2gBEijmck1lpmDmR6Xy8J0eW-Yc-44tL8OKaQvd8XvQHFqYpHsEVzEr0uQCuYqRmMa8afjDn7G9PCqH9ETPduyllujJFaOGhsJbHBUECw5UlUFVQWmMsxu3DydQP-a1ld5VY0BctQvyTDhCDDxu1Ca9ZNtYTn_ItjFcCoXNlmDZtPRwj7wP1zKM9UhEEkIOLYeuDYEzaA-51gWaa0LN3YJyrP1gtVJbbfqtiHy5BbjZ02PZC",
    pinnedProduct: {
      id: "prod-hyacinth-1",
      name: "ผักตบชวาอบแห้งกันกระแทก 1 กิโลกรัม",
      image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800&auto=format&fit=crop",
      retailPrice: 59.0,
      originalPrice: 75.0,
      soldCount: 1420,
    },
  },
  {
    id: "live-2",
    title: "ทดสอบการรับแรงกด 15 kg ของขุยมะพร้าวอัดแผ่น",
    presenterName: "Green Living Crafts",
    viewersCount: 215,
    likesCount: 890,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop",
    pinnedProduct: {
      id: "prod-coir-1",
      name: "ขุยมะพร้าวอัดแผ่นกันกระแทก (ต้านแรงกด 15 kg)",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop",
      retailPrice: 75.0,
      originalPrice: 95.0,
      soldCount: 2150,
    },
  },
  {
    id: "live-3",
    title: "บรรจุภัณฑ์ฟางข้าวปลอดสารพิษ สำหรับเบเกอรี่",
    presenterName: "สวนดินดี ออร์แกนิค",
    viewersCount: 180,
    likesCount: 650,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop",
    pinnedProduct: {
      id: "prod-straw-1",
      name: "ฟางข้าวอัดเส้นกันกระแทกปลอดสารพิษ",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop",
      retailPrice: 45.0,
      originalPrice: 60.0,
      soldCount: 980,
    },
  },
  {
    id: "live-4",
    title: "นวัตกรรมโฟมแป้งข้าวโพด ละลายน้ำได้ใน 1 นาที",
    presenterName: "Eco Innovate TH",
    viewersCount: 420,
    likesCount: 1980,
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop",
    pinnedProduct: {
      id: "prod-cornstarch-1",
      name: "โฟมแป้งข้าวโพดละลายน้ำ (Bio Peanuts)",
      image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop",
      retailPrice: 49.0,
      originalPrice: 65.0,
      soldCount: 3100,
    },
  },
];

export function LivesCarousel() {
  const [selectedStream, setSelectedStream] = useState<typeof SAMPLE_LIVES[0] | null>(null);

  return (
    <section id="lives" className="flex flex-col gap-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-white -ml-4.5"></span>
            <h2 className="font-display font-extrabold text-sm sm:text-base tracking-tight">
              GREENY LIVES ไลฟ์สดสาธิตสินค้า
            </h2>
          </div>
          <span className="hidden md:inline text-xs text-secondary font-medium">
            ชมการทดสอบการใช้งานจริงจากเกษตรกรและผู้ผลิตไทย
          </span>
        </div>
        <button
          onClick={() => setSelectedStream(SAMPLE_LIVES[0])}
          className="text-xs font-bold text-primary hover:text-on-primary-fixed-variant flex items-center gap-0.5 transition-colors font-display"
        >
          ดูทั้งหมด <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SAMPLE_LIVES.map((live) => (
          <div
            key={live.id}
            onClick={() => setSelectedStream(live)}
            className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group cursor-pointer border border-outline-variant/30"
          >
            <div className="relative w-full aspect-[4/5] bg-surface-container-low overflow-hidden">
              <img
                src={live.image}
                alt={live.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="bg-coral-accent text-white font-display text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> LIVE
                </span>
                <span className="bg-black/50 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
                  <span className="material-symbols-outlined text-[12px]">visibility</span>
                  {live.viewersCount}
                </span>
              </div>

              <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
                <span className="material-symbols-outlined text-[12px] text-tertiary-fixed">favorite</span>
                {live.likesCount}
              </div>

              <div className="absolute bottom-3 inset-x-3 text-white flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[10px] font-bold">
                    G
                  </div>
                  <span className="text-xs font-bold text-white/95">{live.presenterName}</span>
                </div>
                <h3 className="font-display font-bold text-xs sm:text-sm text-white line-clamp-2 leading-snug drop-shadow-sm">
                  {live.title}
                </h3>
              </div>
            </div>

            <div className="p-2.5 flex items-center justify-between bg-surface-container-lowest text-xs">
              <span className="text-[11px] text-secondary truncate max-w-[170px]">
                กำลังสาธิต: {live.pinnedProduct.name}
              </span>
              <span className="bg-primary-container/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                รับโค้ด
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Stream Modal */}
      {selectedStream && (
        <LiveStreamModal
          isOpen={true}
          onClose={() => setSelectedStream(null)}
          stream={selectedStream}
        />
      )}
    </section>
  );
}
