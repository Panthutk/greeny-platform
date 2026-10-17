"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useLocale } from "@/context/LocaleContext";

interface ReviewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: string;
    title: string;
    caption: string;
    authorName: string;
    avatarUrl: string;
    mediaUrl: string;
    externalPlatform?: string;
    externalSourceUrl?: string;
    likesCount: number;
    taggedProduct: {
      id: string;
      name: string;
      image: string;
      retailPrice: number;
      storeName: string;
    };
  };
}

export function ReviewPostModal({ isOpen, onClose, post }: ReviewPostModalProps) {
  const { addToCart } = useCart();
  const { formatPrice } = useLocale();
  const [likes, setLikes] = useState(post.likesCount);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<Array<{ id: string; user: string; text: string; time: string }>>([
    { id: "c1", user: "EcoShop Chiang Mai", text: "คอนเฟิร์มอีกเสียงครับ ย่อยสลายเร็วและลูกค้าประทับใจมาก", time: "2 ชม. ที่แล้ว" },
    { id: "c2", user: "คุณก้อย", text: "สั่งมาแพ็คเซรามิกแล้ว ปลอดภัย 100% เลยค่ะ", time: "5 ชม. ที่แล้ว" },
  ]);
  const [commentInput, setCommentInput] = useState("");

  if (!isOpen) return null;

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setComments((prev) => [
      ...prev,
      { id: `c-${Date.now()}`, user: "ฉัน", text: commentInput.trim(), time: "เมื่อสักครู่" },
    ]);
    setCommentInput("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-surface-container-lowest rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-outline-variant/30">
        {/* Left Side: Photo / Gallery */}
        <div className="md:w-1/2 bg-surface-container-low flex items-center justify-center relative overflow-hidden">
          <img
            src={post.mediaUrl}
            alt={post.title}
            className="w-full h-full object-cover max-h-[400px] md:max-h-none"
          />

          {post.externalPlatform && (
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-on-surface shadow-md flex items-center gap-1.5 border border-outline-variant/30">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              <span>รีวิวจาก {post.externalPlatform}</span>
            </div>
          )}

          <button
            onClick={onClose}
            className="md:hidden absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Right Side: Post Content & Comments */}
        <div className="md:w-1/2 flex flex-col justify-between p-4 sm:p-6 overflow-y-auto max-h-[500px] md:max-h-[85vh]">
          {/* Header */}
          <div className="border-b border-outline-variant/20 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={post.avatarUrl}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full object-cover border border-primary/30"
                />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-on-surface">{post.authorName}</h4>
                  <div className="text-[10px] text-outline flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-primary">verified</span>
                    Greeny Community Creator
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="hidden md:flex w-8 h-8 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <h3 className="font-display font-extrabold text-sm sm:text-base text-on-surface mt-3 leading-snug">
              {post.title}
            </h3>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              {post.caption}
            </p>

            {/* Tagged Product Box */}
            <div className="mt-3.5 p-2.5 rounded-2xl bg-surface-container-low/60 border border-outline-variant/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <img
                  src={post.taggedProduct.image}
                  alt={post.taggedProduct.name}
                  className="w-11 h-11 rounded-xl object-cover shrink-0 bg-surface-container"
                />
                <div className="truncate">
                  <div className="text-xs font-bold text-on-surface truncate">
                    {post.taggedProduct.name}
                  </div>
                  <div className="text-xs font-bold text-primary font-display">
                    {formatPrice(post.taggedProduct.retailPrice)}
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  addToCart({
                    id: post.taggedProduct.id,
                    name: post.taggedProduct.name,
                    image: post.taggedProduct.image,
                    retailPrice: post.taggedProduct.retailPrice,
                    wholesaleTiers: [],
                    storeName: post.taggedProduct.storeName,
                  })
                }
                className="px-3 py-1.5 rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary text-xs font-bold transition-all shadow-xs shrink-0"
              >
                เพิ่มลงรถเข็น
              </button>
            </div>
          </div>

          {/* Comments Feed */}
          <div className="flex-1 py-3 space-y-2.5 overflow-y-auto">
            <div className="text-xs font-bold text-on-surface flex items-center justify-between">
              <span>ความคิดเห็น ({comments.length})</span>
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 text-xs font-bold ${
                  hasLiked ? "text-coral-accent" : "text-outline hover:text-coral-accent"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: hasLiked ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </span>
                <span>{likes} ถูกใจ</span>
              </button>
            </div>

            {comments.map((c) => (
              <div key={c.id} className="p-2.5 rounded-xl bg-surface-container-low text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-on-surface text-[11px]">{c.user}</span>
                  <span className="text-[10px] text-outline">{c.time}</span>
                </div>
                <p className="text-on-surface-variant text-xs">{c.text}</p>
              </div>
            ))}
          </div>

          {/* Add Comment */}
          <form onSubmit={handleAddComment} className="pt-2 flex gap-2 border-t border-outline-variant/20">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="แสดงความคิดเห็น หรือถามประสบการณ์ใช้งาน..."
              className="flex-1 bg-surface-container-low rounded-full px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-on-surface"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-forest-slate text-white text-xs font-bold hover:bg-neutral-800 transition-colors shrink-0"
            >
              ส่ง
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewPostModal;
