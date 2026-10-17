"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ReviewPostModal } from "@/components/social/ReviewPostModal";

interface ProfilePost {
  id: string;
  type: "photo" | "video";
  title: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  duration?: string;
  imageUrl: string;
  date: string;
}

interface ProfileProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discountPct: number;
  soldCount: number;
  imageUrl: string;
}

const SAMPLE_POSTS: ProfilePost[] = [
  {
    id: "post-1",
    type: "photo",
    title: "เปลี่ยนแพ็กเกจจิ้งส่งของเป็นผักตบชวาอบแห้ง 100%",
    caption: "หลังจากลองเปลี่ยนมาใช้ผักตบชวาแทนบับเบิ้ลพลาสติก ลูกค้าชมกันเยอะมาก แพ็กของหนาแน่น ไม่แตกหัก แถมย่อยสลายได้ในกระถางต้นไม้",
    likesCount: 1420,
    commentsCount: 86,
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80",
    date: "2 วันที่แล้ว",
  },
  {
    id: "post-2",
    type: "video",
    duration: "0:45",
    title: "ดรอปเทสต์! ทดสอบโฟมเห็ดไมซีเลียมกับขวดเซรั่มแก้ว",
    caption: "โยนลงพื้นจากความสูง 1.5 เมตร ขวดแก้วปลอดภัย 100% ตัวโฟมเห็ดรับแรงกระแทกได้ดีกว่าโฟมสังเคราะห์อีกครับ",
    likesCount: 3890,
    commentsCount: 245,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80",
    date: "5 วันที่แล้ว",
  },
  {
    id: "post-3",
    type: "photo",
    title: "แกะกล่องก้านกล้วยกันกระแทก แฮนด์เมดจากสุโขทัย",
    caption: "งานฝีมือเกษตรกรไทย สะอาด ปลอดภัย ไม่มีสารเคมีปนเปื้อน เหมาะสำหรับร้านเบเกอรี่และของขวัญออร์แกนิกมาก",
    likesCount: 890,
    commentsCount: 42,
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80",
    date: "1 สัปดาห์ที่แล้ว",
  },
  {
    id: "post-4",
    type: "video",
    duration: "1:12",
    title: "สาธิตการย่อยสลายบับเบิ้ลแป้งข้าวโพดด้วยน้ำอุ่น",
    caption: "ละลายน้ำใน 10 วินาที เทลงท่อระบายน้ำหรือรดน้ำต้นไม้ได้เลย ไม่เป็นมลพิษต่อสิ่งแวดล้อมแน่นอน",
    likesCount: 5210,
    commentsCount: 380,
    imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&q=80",
    date: "2 สัปดาห์ที่แล้ว",
  },
  {
    id: "post-5",
    type: "photo",
    title: "สรุปยอดลดคาร์บอนจากการใช้แพ็กเกจจิ้งรักษ์โลกประจำเดือน",
    caption: "เดือนนี้ร้านเราลดพลาสติกแบบใช้ครั้งเดียวไปได้ 85 กิโลกรัม เทียบเท่ากับการปลูกต้นไม้ 12 ต้น!",
    likesCount: 1650,
    commentsCount: 94,
    imageUrl: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=600&q=80",
    date: "3 สัปดาห์ที่แล้ว",
  },
  {
    id: "post-6",
    type: "photo",
    title: "ชุดกล่องรังผึ้งคราฟท์ สวยคลีน มินิมอล",
    caption: "กระดาษรังผึ้งยืดได้ ไม่ต้องพึ่งเทปกาวพลาสติก ดึงยืดขยายแล้วล็อกตัวเองได้เลย สะดวกและประหยัดเวลามาก",
    likesCount: 2100,
    commentsCount: 112,
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&q=80",
    date: "1 เดือนที่แล้ว",
  },
];

const SAMPLE_PRODUCTS: ProfileProduct[] = [
  {
    id: "prod-1",
    name: "ผักตบชวาอบแห้งกันกระแทก 1 กิโลกรัม (เกรดพรีเมียม ไร้ฝุ่น)",
    price: 59,
    originalPrice: 79,
    discountPct: 25,
    soldCount: 1250,
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&q=80",
  },
  {
    id: "prod-2",
    name: "ฟางข้าวอัดแท่งกันกระแทก ปลอดสารเคมี",
    price: 45,
    originalPrice: 60,
    discountPct: 25,
    soldCount: 890,
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&q=80",
  },
  {
    id: "prod-3",
    name: "โฟมเห็ดไมซีเลียมรองก้นกล่อง ทรงหลุมขวดแก้ว",
    price: 189,
    originalPrice: 250,
    discountPct: 24,
    soldCount: 420,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80",
  },
];

export default function ProfilePage() {
  const params = useParams();
  const profileId = (params?.id as string) || "me";
  const isMe = profileId === "me" || profileId === "my" || profileId === "user-1";

  const [activeTab, setActiveTab] = useState<"posts" | "products" | "reposts" | "private">("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedReviewModal, setSelectedReviewModal] = useState<any | null>(null);

  return (
    <div className="max-w-[1240px] mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Profile Header Card */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Avatar & Bio */}
          <div className="flex items-start sm:items-center gap-5">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-display font-black text-3xl border-4 border-surface shadow-md">
                🌱
              </div>
              <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow">
                ✓
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h1 className="font-display font-extrabold text-xl sm:text-2xl text-on-surface">
                  {isMe ? "EcoLife by Narin" : "วิสาหกิจชุมชนบางเลน"}
                </h1>
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/20">
                  Green Creator
                </span>
                <span className="bg-coral-red/10 text-coral-red text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Mall
                </span>
              </div>
              <p className="text-xs text-secondary font-mono">
                {isMe ? "@ecolife_narin" : "@banglen_greenpack"}
              </p>
              <p className="text-xs text-on-surface-variant max-w-lg leading-relaxed">
                แบ่งปันทริคแพ็กเกจจิ้งเกษตรย่อยสลายได้ 100% สนับสนุนเกษตรกรไทย และลดขยะพลาสติกสู่วิถี Zero Waste 🌱✨
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto justify-end">
            {isMe ? (
              <>
                <Link
                  href="/creator/new"
                  className="px-5 py-2.5 rounded-full bg-primary hover:bg-on-primary-container text-white text-xs font-bold font-display shadow-xs transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>สร้างคอนเทนต์ (Post Now)</span>
                </Link>
                <Link
                  href="/notifications"
                  className="p-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
                  title="การแจ้งเตือน"
                >
                  <span className="material-symbols-outlined text-[20px]">notifications</span>
                </Link>
                <Link
                  href="/settings"
                  className="p-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
                  title="การตั้งค่า"
                >
                  <span className="material-symbols-outlined text-[20px]">settings</span>
                </Link>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold font-display transition-all ${
                    isFollowing
                      ? "bg-surface-container text-secondary hover:bg-surface-container-high"
                      : "bg-primary text-white hover:bg-on-primary-container shadow-xs"
                  }`}
                >
                  {isFollowing ? "กำลังติดตาม ✓" : "+ ติดตาม"}
                </button>
                <Link
                  href="/me"
                  className="px-4 py-2.5 rounded-full bg-surface-container text-xs font-bold text-on-surface hover:bg-surface-container-high transition-colors"
                >
                  แชท
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Counter Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-outline-variant/20">
          <div className="text-center p-3 rounded-2xl bg-surface-container-low">
            <div className="font-display font-extrabold text-lg text-on-surface">142</div>
            <div className="text-[11px] text-secondary">กำลังติดตาม</div>
          </div>
          <div className="text-center p-3 rounded-2xl bg-surface-container-low">
            <div className="font-display font-extrabold text-lg text-on-surface">14.8k</div>
            <div className="text-[11px] text-secondary">ผู้ติดตาม</div>
          </div>
          <div className="text-center p-3 rounded-2xl bg-surface-container-low">
            <div className="font-display font-extrabold text-lg text-on-surface">28</div>
            <div className="text-[11px] text-secondary">โพสต์รีวิว</div>
          </div>
          <div className="text-center p-3 rounded-2xl bg-secondary-container text-on-secondary-container">
            <div className="font-display font-extrabold text-lg text-primary">342 kg</div>
            <div className="text-[11px] font-bold">ยอดลดคาร์บอน (CO₂e)</div>
          </div>
        </div>
      </div>

      {/* 4 Tabs Strip */}
      <div className="bg-surface-container-lowest rounded-2xl p-1.5 border border-outline-variant/30 shadow-2xs flex items-center justify-around">
        {[
          { id: "posts", icon: "photo_camera", label: "โพสต์รีวิว" },
          { id: "products", icon: "local_mall", label: "สินค้าที่แนะนำ" },
          { id: "reposts", icon: "autorenew", label: "รีโพสต์ชุมชน" },
          { id: "private", icon: "lock", label: "บันทึกส่วนตัว" },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 rounded-xl text-xs font-display font-bold flex items-center justify-center gap-2 transition-all ${
                isActive
                  ? "bg-secondary-container text-on-secondary-container shadow-2xs"
                  : "text-secondary hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content 1: Posts Grid (📸 PDF Page 15) */}
      {activeTab === "posts" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {SAMPLE_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() =>
                setSelectedReviewModal({
                  id: post.id,
                  title: post.title,
                  caption: post.caption,
                  authorName: isMe ? "EcoLife by Narin" : "วิสาหกิจชุมชนบางเลน",
                  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
                  mediaUrl: post.imageUrl,
                  externalPlatform: "Greeny Review",
                  externalSourceUrl: "https://greeny.eco/review/" + post.id,
                  likesCount: post.likesCount,
                  taggedProduct: {
                    id: "prod-1",
                    name: "ผักตบชวาอบแห้งกันกระแทก 1 กิโลกรัม",
                    image: post.imageUrl,
                    retailPrice: 59.0,
                    storeName: "สวนดินดี ออร์แกนิค",
                  },
                })
              }
              className="group cursor-pointer bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/20 hover:border-primary/50 shadow-2xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden bg-surface-container">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {post.type === "video" && (
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                    <span>{post.duration}</span>
                  </div>
                )}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-coral-red">favorite</span>
                  <span>{post.likesCount}</span>
                </div>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <h3 className="font-display font-bold text-xs text-on-surface line-clamp-2 mb-1.5 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between text-[10px] text-secondary">
                  <span>{post.commentsCount} ความคิดเห็น</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 2: Products Catalog (🛍) */}
      {activeTab === "products" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {SAMPLE_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="bg-surface-container-lowest rounded-3xl p-4 border border-outline-variant/30 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="aspect-square rounded-2xl overflow-hidden bg-surface-container mb-3">
                  <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] bg-coral-red text-white font-bold px-1.5 py-0.5 rounded">
                    Mall
                  </span>
                  <span className="text-[10px] text-secondary font-mono">ขายแล้ว {prod.soldCount} ชิ้น</span>
                </div>
                <h3 className="font-display font-bold text-xs text-on-surface line-clamp-2 mb-2">
                  {prod.name}
                </h3>
              </div>

              <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-primary">฿{prod.price}</div>
                  <div className="text-[10px] text-secondary line-through">฿{prod.originalPrice}</div>
                </div>
                <Link
                  href="/product/cm-hyacinth-1kg"
                  className="px-4 py-2 rounded-full bg-primary hover:bg-on-primary-container text-white text-xs font-bold"
                >
                  สั่งซื้อ
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 3: Reposts (♻) */}
      {activeTab === "reposts" && (
        <div className="bg-surface-container-lowest rounded-3xl p-10 border border-outline-variant/30 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-secondary-container text-primary flex items-center justify-center mx-auto text-2xl">
            ♻
          </div>
          <h3 className="font-display font-bold text-sm text-on-surface">
            การรีโพสต์และผลกระทบเชิงบวกต่อสิ่งแวดล้อม
          </h3>
          <p className="text-xs text-secondary max-w-md mx-auto">
            คุณได้รีโพสต์คอนเทนต์รักษ์โลก 6 ครั้ง ช่วยกระจายการรับรู้โครงการฟื้นฟูวัชพืชผักตบชวาในลุ่มน้ำท่าจีน
          </p>
        </div>
      )}

      {/* Tab Content 4: Private Bookmarks (🔓) */}
      {activeTab === "private" && (
        <div className="bg-surface-container-lowest rounded-3xl p-10 border border-outline-variant/30 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-surface-container text-secondary flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[24px]">lock</span>
          </div>
          <h3 className="font-display font-bold text-sm text-on-surface">
            รายการที่บันทึกไว้ (เห็นเฉพาะคุณ)
          </h3>
          <p className="text-xs text-secondary max-w-md mx-auto">
            ไอเดียแพ็กเกจจิ้งและบทความที่คุณกดบุ๊กมาร์กไว้ จะถูกจัดเก็บไว้ที่นี่อย่างปลอดภัย
          </p>
        </div>
      )}

      {/* Review Post Viewer Modal */}
      {selectedReviewModal && (
        <ReviewPostModal
          post={selectedReviewModal}
          isOpen={true}
          onClose={() => setSelectedReviewModal(null)}
        />
      )}
    </div>
  );
}
