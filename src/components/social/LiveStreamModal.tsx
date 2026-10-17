"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useLocale } from "@/context/LocaleContext";

interface LiveStreamModalProps {
  isOpen: boolean;
  onClose: () => void;
  stream: {
    id: string;
    title: string;
    presenterName: string;
    viewersCount: number;
    likesCount: number;
    videoUrl?: string;
    pinnedProduct: {
      id: string;
      name: string;
      image: string;
      retailPrice: number;
      originalPrice: number;
      soldCount: number;
    };
  };
}

export function LiveStreamModal({ isOpen, onClose, stream }: LiveStreamModalProps) {
  const { addToCart } = useCart();
  const { formatPrice } = useLocale();
  const [likes, setLikes] = useState(stream.likesCount);
  const [isProductDrawerOpen, setIsProductDrawerOpen] = useState(false);
  const [comments, setComments] = useState<Array<{ id: string; user: string; text: string }>>([
    { id: "c1", user: "คุณแนน", text: "ผักตบชวากลิ่นหอมสะอาดมากค่ะ สั่งมาใช้แล้วดีงาม" },
    { id: "c2", user: "ร้านเบเกอรี่สวนผึ้ง", text: "ถ้าสั่ง 12 กก. ได้ราคาส่งเท่าไหร่คะ?" },
    { id: "c3", user: "FarmerEco", text: "แนะนำเลยครับ ตัวนี้รับแรงกดทับขวดแก้วได้เยี่ยมมาก" },
  ]);
  const [inputComment, setInputComment] = useState("");

  if (!isOpen) return null;

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputComment.trim()) return;
    setComments((prev) => [
      ...prev,
      { id: `c-${Date.now()}`, user: "ฉัน", text: inputComment.trim() },
    ]);
    setInputComment("");
  };

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[90vh] max-h-[800px] bg-black rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-outline-variant/20">
        {/* Left Side: Video Stream Player */}
        <div className="relative flex-1 bg-neutral-900 flex items-center justify-center overflow-hidden">
          {/* Simulated Live Video Background */}
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1000&auto=format&fit=crop"
            alt="Live Stream background"
            className="w-full h-full object-cover opacity-80"
          />

          {/* Top Stream Overlays */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md p-1.5 pr-3 rounded-full border border-white/20">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">
                G
              </div>
              <div className="text-white">
                <div className="text-xs font-bold leading-tight">{stream.presenterName}</div>
                <div className="text-[10px] text-primary-fixed">Verified Eco Merchant</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-coral-accent text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                LIVE
              </span>
              <span className="bg-black/50 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
                <span className="material-symbols-outlined text-[14px]">visibility</span>
                {stream.viewersCount} ผู้ชม
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors border border-white/20 ml-2"
                aria-label="Close live modal"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>

          {/* Floating Stream Title */}
          <div className="absolute bottom-20 left-4 right-4 z-10 text-white">
            <h3 className="font-display font-extrabold text-base sm:text-lg text-white drop-shadow-md">
              {stream.title}
            </h3>
            <p className="text-xs text-white/80 drop-shadow">
              กำลังสาธิตการใช้งานจริง โยนทดสอบขวดแก้ว พร้อมแจกโค้ดส่งฟรี 0 บาท
            </p>
          </div>

          {/* Bottom In-Stream "กำลังไลฟ์" Pinned Product Quick-Bar */}
          <div className="absolute bottom-3 left-3 right-3 z-20 bg-surface-container-lowest/95 backdrop-blur-md p-2.5 rounded-2xl shadow-xl flex items-center justify-between gap-3 border border-outline-variant/30">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-surface-container-low">
                <img
                  src={stream.pinnedProduct.image}
                  alt={stream.pinnedProduct.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 bg-coral-accent text-white text-[8px] font-extrabold text-center">
                  กำลังไลฟ์
                </span>
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-on-surface truncate">
                  {stream.pinnedProduct.name}
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display font-bold text-sm text-primary">
                    {formatPrice(stream.pinnedProduct.retailPrice)}
                  </span>
                  <span className="text-[10px] line-through text-outline">
                    {formatPrice(stream.pinnedProduct.originalPrice)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setIsProductDrawerOpen(!isProductDrawerOpen)}
                className="px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-colors"
              >
                ดูสินค้า
              </button>
              <button
                onClick={() =>
                  addToCart({
                    id: stream.pinnedProduct.id,
                    name: stream.pinnedProduct.name,
                    image: stream.pinnedProduct.image,
                    retailPrice: stream.pinnedProduct.retailPrice,
                    wholesaleTiers: [],
                    storeName: stream.presenterName,
                  })
                }
                className="px-4 py-1.5 rounded-full bg-coral-accent hover:bg-red-600 text-white text-xs font-bold shadow-sm transition-all"
              >
                ซื้อเลย
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Live Chat & Reactions */}
        <div className="w-full md:w-80 bg-neutral-950 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 h-72 md:h-full">
          {/* Chat Header */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between text-white">
            <span className="text-xs font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary-fixed text-[18px]">forum</span>
              ข้อความสด (Live Chat)
            </span>
            <button
              onClick={handleLike}
              className="flex items-center gap-1 text-xs text-coral-accent hover:scale-110 transition-transform font-display font-bold"
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
              <span>{likes}</span>
            </button>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 text-xs">
            {comments.map((c) => (
              <div key={c.id} className="bg-white/5 p-2 rounded-xl border border-white/5">
                <span className="font-bold text-primary-fixed text-[11px] block">{c.user}</span>
                <span className="text-white/90 text-xs">{c.text}</span>
              </div>
            ))}
          </div>

          {/* Comment Input */}
          <form onSubmit={handleSendComment} className="p-3 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={inputComment}
              onChange={(e) => setInputComment(e.target.value)}
              placeholder="แสดงความคิดเห็นในไลฟ์..."
              className="flex-1 bg-white/10 text-white placeholder-white/40 text-xs rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-fixed"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
