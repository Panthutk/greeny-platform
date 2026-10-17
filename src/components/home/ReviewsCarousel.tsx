"use client";

import React, { useState } from "react";
import { ReviewPostModal } from "@/components/social/ReviewPostModal";

const SAMPLE_REVIEWS = [
  {
    id: "rev-1",
    title: "เปลี่ยนมาใช้ผักตบชวาแทนบับเบิ้ล ลูกค้าชมเพียบ! 🌿📦",
    caption: "เปิดร้านขนมออนไลน์มา 3 ปี ลูกค้าชอบมากที่เปลี่ยนมาใช้ผักตบชวา หอมกลิ่นธรรมชาติ ขนมไม่แตกเลยสักกล่อง แถมเอาไปใส่ต้นไม้ต่อได้ด้วย แนะนำสั่งแพ็คราคาส่ง 12 กก. คุ้มมาก!",
    authorName: "คุณแพร (Little Baker)",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    mediaUrl: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800&auto=format&fit=crop",
    externalPlatform: "Lemon8",
    externalSourceUrl: "https://www.lemon8-app.com/@ecolover_bkk/post/7123982341",
    likesCount: 456,
    taggedProduct: {
      id: "prod-hyacinth-1",
      name: "ผักตบชวาอบแห้งกันกระแทก 1 กิโลกรัม",
      image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800&auto=format&fit=crop",
      retailPrice: 59.0,
      storeName: "สวนดินดี ออร์แกนิค",
    },
  },
  {
    id: "rev-2",
    title: "รีวิวโฟมแป้งข้าวโพด ละลายน้ำโชว์ให้ดูจะๆ",
    caption: "ได้รับของแล้ว แกะกล่องมาคือสะอาดมาก เอาไปแช่น้ำ 1 นาทีละลายเกลี้ยง ไม่เหลือขยะให้รกบ้านเลย ประทับใจ 10/10",
    authorName: "Green Life BKK",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    mediaUrl: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop",
    externalPlatform: "TikTok",
    likesCount: 890,
    taggedProduct: {
      id: "prod-cornstarch-1",
      name: "โฟมแป้งข้าวโพดละลายน้ำ (Bio Peanuts)",
      image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop",
      retailPrice: 49.0,
      storeName: "Green Living Crafts Thailand",
    },
  },
  {
    id: "rev-3",
    title: "ทดลองส่งขวดแก้วด้วยขุยมะพร้าว 15kg รอดชัวร์!",
    caption: "ส่งน้ำผึ้งแท้ขวดแก้วไปเชียงใหม่ ถึงมือลูกค้าสภาพ 100% ตัวขุยมะพร้าวอัดแผ่นแน่นหนามาก ทรงสวยงามพรีเมียมสุดๆ",
    authorName: "สวนผึ้งราชบุรี",
    avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop",
    mediaUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop",
    likesCount: 620,
    taggedProduct: {
      id: "prod-coir-1",
      name: "ขุยมะพร้าวอัดแผ่นกันกระแทก (ต้านแรงกด 15 kg)",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop",
      retailPrice: 75.0,
      storeName: "Green Living Crafts Thailand",
    },
  },
  {
    id: "rev-4",
    title: "แพ็คเซ็ตของขวัญด้วยกระดาษรังผึ้ง ดูหรูหรามาก",
    caption: "ไม่ต้องใช้เทปใสเลย ดึงยืดแล้วล็อคตัวเองได้เลย สะดวกและลดเวลาแพ็คไปได้เยอะ ลูกค้าถ่ายรูปลงไอจีเพียบ",
    authorName: "Craft & Gift Box",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop",
    mediaUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop",
    externalPlatform: "Instagram",
    likesCount: 512,
    taggedProduct: {
      id: "prod-honeycomb-1",
      name: "กระดาษคราฟท์รังผึ้งย่อยสลายได้ (Honeycomb)",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop",
      retailPrice: 69.0,
      storeName: "Green Living Crafts Thailand",
    },
  },
];

export function ReviewsCarousel() {
  const [selectedReview, setSelectedReview] = useState<typeof SAMPLE_REVIEWS[0] | null>(null);

  return (
    <section id="reviews" className="flex flex-col gap-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full flex items-center gap-2 shadow-2xs">
            <span className="material-symbols-outlined text-primary text-[18px]">rate_review</span>
            <h2 className="font-display font-extrabold text-sm sm:text-base tracking-tight text-on-surface">
              GREENY REVIEW ประสบการณ์จริงจากผู้ใช้
            </h2>
          </div>
          <span className="hidden md:inline text-xs text-secondary font-medium">
            รวมรีวิวการใช้งานจริงและไอเดีย Upcycling จากชุมชนและ Lemon8
          </span>
        </div>
        <button
          onClick={() => setSelectedReview(SAMPLE_REVIEWS[0])}
          className="text-xs font-bold text-primary hover:text-on-primary-fixed-variant flex items-center gap-0.5 transition-colors font-display"
        >
          ดูทั้งหมด <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SAMPLE_REVIEWS.map((rev) => (
          <div
            key={rev.id}
            onClick={() => setSelectedReview(rev)}
            className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="relative aspect-[4/3] w-full bg-surface-container-low overflow-hidden">
              <img
                src={rev.mediaUrl}
                alt={rev.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {rev.externalPlatform && (
                <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] text-white font-bold flex items-center gap-1 border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                  {rev.externalPlatform}
                </div>
              )}
              <div className="absolute top-2.5 right-2.5 bg-black/50 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
                <span className="material-symbols-outlined text-[12px] text-coral-accent">favorite</span>
                {rev.likesCount}
              </div>
            </div>

            <div className="p-3.5 flex flex-col justify-between flex-1 gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <img
                    src={rev.avatarUrl}
                    alt={rev.authorName}
                    className="w-6 h-6 rounded-full object-cover border border-primary/20"
                  />
                  <span className="text-xs font-bold text-on-surface truncate">{rev.authorName}</span>
                </div>
                <h4 className="font-title-sm text-xs font-bold text-on-surface line-clamp-2 leading-snug">
                  {rev.title}
                </h4>
                <p className="text-[11px] text-on-surface-variant line-clamp-2 mt-1 leading-normal">
                  {rev.caption}
                </p>
              </div>

              <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[11px] text-primary font-bold">
                <span className="truncate max-w-[170px] text-secondary text-[10px]">
                  สินค้า: {rev.taggedProduct.name}
                </span>
                <span className="flex items-center gap-0.5">
                  อ่านต่อ <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {selectedReview && (
        <ReviewPostModal
          isOpen={true}
          onClose={() => setSelectedReview(null)}
          post={selectedReview}
        />
      )}
    </section>
  );
}
