"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

interface AttachedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discountPct: number;
  commission: string;
  imageUrl: string;
}

const SAMPLE_PRODUCTS: AttachedProduct[] = [
  {
    id: "prod-1",
    name: "ผักตบชวาอบแห้งกันกระแทก 1 กก.",
    price: 59,
    originalPrice: 79,
    discountPct: 25,
    commission: "15%",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&q=80",
  },
  {
    id: "prod-2",
    name: "โฟมเห็ดไมซีเลียม ย่อยสลายได้ 100%",
    price: 189,
    originalPrice: 250,
    discountPct: 24,
    commission: "12%",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80",
  },
];

const PRESET_ASSETS = [
  {
    id: "asset-1",
    name: "ทดสอบการกันกระแทกขวดแก้ว.mp4",
    duration: "0:45",
    size: "2.4 MB",
    type: "video",
    url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80",
  },
  {
    id: "asset-2",
    name: "รีวิวผักตบกันกระแทก.mov",
    duration: "1:12",
    size: "6.1 MB",
    type: "video",
    url: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&q=80",
  },
  {
    id: "asset-3",
    name: "กล่องพัสดุกรีนแพ็ค.png",
    duration: "ภาพนิ่ง",
    size: "1.8 MB",
    type: "image",
    url: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=600&q=80",
  },
];

export default function CreatorStudioPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"post" | "live">("post");
  const [audience, setAudience] = useState<"public" | "followers" | "green-community">("public");
  const [title, setTitle] = useState("เปิดกรุ 5 ไอเทมลดขยะพลาสติก ฉบับใช้ได้จริงปี 2026!");
  const [description, setDescription] = useState(
    "วันนี้มาแชร์ทริคง่ายๆ ในการเปลี่ยนแพ็กเกจจิ้งส่งของเป็น Zero-waste ทั้งผักตบชวาอบแห้งและโฟมเห็ดย่อยสลายได้ 100% สั่งตรงจากวิสาหกิจชุมชนไทยครับ คอนเฟิร์มว่ากันกระแทกดีเยี่ยม ไม่เปลืองขยะขวดพลาสติกเลย!"
  );
  const [tags, setTags] = useState<string[]>(["#ZeroWaste", "#GreenPackaging", "#OrganicThai"]);
  const [selectedAssetId, setSelectedAssetId] = useState<string>("asset-1");
  const [attachedProducts, setAttachedProducts] = useState<AttachedProduct[]>(SAMPLE_PRODUCTS);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Hardware pickers
  const [camera, setCamera] = useState("Sony Alpha A7 IV (USB Cam)");
  const [mic, setMic] = useState("Rode VideoMic Go II");
  const [filterPreset, setFilterPreset] = useState("ธรรมชาติ");

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const removeProduct = (id: string) => {
    setAttachedProducts(attachedProducts.filter((p) => p.id !== id));
  };

  const handlePublish = () => {
    setIsPublishing(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#2EB82E", "#5ce153", "#142918"],
    });

    setTimeout(() => {
      setIsPublishing(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/profile/me");
      }, 1500);
    }, 1200);
  };

  const activeAsset = PRESET_ASSETS.find((a) => a.id === selectedAssetId) || PRESET_ASSETS[0];

  return (
    <div className="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12 py-6">
      {/* Top Studio Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-outline-variant/30">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-primary-container/20 text-primary flex items-center justify-center flex-shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[28px]">videocam</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-secondary text-xs uppercase tracking-wider font-display font-semibold">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Greeny Creator Studio • Live & Feed Hub</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl text-on-surface truncate">
              {mode === "post" ? "สร้างคอนเทนต์รีวิวรักษ์โลก" : "สตูดิโอถ่ายทอดสด (Go Live)"}
            </h1>
          </div>
        </div>

        {/* Creator Profile Snapshot */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/20">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm">
              🌱
            </div>
            <div className="text-left">
              <div className="font-display font-bold text-xs text-on-surface">EcoCreator Studio</div>
              <div className="text-[10px] text-secondary">14.8k ผู้ติดตามรักษ์โลก</div>
            </div>
          </div>

          <Link
            href="/me"
            className="px-4 py-2 rounded-full bg-surface-container text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors"
          >
            แผงควบคุมของฉัน
          </Link>
        </div>
      </div>

      {isSuccess ? (
        <div className="bg-surface-container-lowest p-12 rounded-3xl border border-primary/30 text-center space-y-4 shadow-sm my-8">
          <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mx-auto text-3xl">
            ✓
          </div>
          <h2 className="font-display font-extrabold text-2xl text-on-surface">
            {mode === "post" ? "เผยแพร่โพสต์รีวิวสำเร็จ!" : "เริ่มถ่ายทอดสดสำเร็จ!"}
          </h2>
          <p className="text-sm text-secondary">
            โพสต์ของคุณถูกแชร์ไปยังหน้าฟีด Greeny Review และแท็กสินค้าในระบบเรียบร้อยแล้ว กำลังนำคุณไปยังหน้าโปรไฟล์...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
          {/* LEFT COLUMN: Media Preview & Stage (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Stage Box */}
            <div className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/30 shadow-2xs">
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2 font-display font-bold text-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[20px]">monitor_heart</span>
                  <span>หน้าจอพรีวิวสตูดิโอ (Live / Feed Visualizer)</span>
                </div>
                <div className="flex items-center gap-2">
                  {mode === "live" && (
                    <span className="px-2.5 py-0.5 rounded-full bg-tertiary-container/30 text-on-tertiary-container text-[11px] font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-tertiary animate-ping" />
                      ON AIR
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
                    1080p FHD 60FPS
                  </span>
                </div>
              </div>

              {/* Video/Image Canvas */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black group shadow-inner">
                <img
                  src={activeAsset.url}
                  alt="Studio Media Preview"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Overlaid Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 flex flex-col justify-between p-4 pointer-events-none">
                  {/* Top Stats */}
                  <div className="flex items-center justify-between w-full pointer-events-auto">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md text-[11px] flex items-center gap-1 font-mono">
                        <span className="material-symbols-outlined text-[14px] text-primary-fixed">signal_cellular_alt</span>
                        4,850 kbps
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md text-[11px] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary-fixed">mic</span>
                        {mic}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-md text-[11px]">
                      ฟิลเตอร์: {filterPreset}
                    </span>
                  </div>

                  {/* Bottom Audio Meter & Visual Filters */}
                  <div className="flex items-end justify-between w-full pointer-events-auto">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-white">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-primary-fixed">equalizer</span>
                        <div className="w-16 h-1.5 bg-white/20 rounded-full overflow-hidden flex">
                          <div className="w-3/4 bg-primary-fixed rounded-full animate-pulse" />
                        </div>
                      </div>
                      <span className="text-white/40">|</span>
                      <span className="text-xs font-mono">00:00:00</span>
                    </div>

                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-xl">
                      {["ธรรมชาติ", "สว่างสดชื่น", "อบอุ่นเอิร์ธโทน"].map((filter) => (
                        <button
                          key={filter}
                          type="button"
                          onClick={() => setFilterPreset(filter)}
                          className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                            filterPreset === filter
                              ? "bg-primary text-white font-bold"
                              : "text-white/80 hover:bg-white/20"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Hardware Pickers */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-surface-container-low p-3 rounded-2xl border border-outline-variant/20">
                  <div className="text-[10px] text-secondary font-bold mb-1">กล้องวิดีโอ (Webcam)</div>
                  <select
                    value={camera}
                    onChange={(e) => setCamera(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-on-surface outline-none cursor-pointer"
                  >
                    <option>Sony Alpha A7 IV (USB Cam)</option>
                    <option>FaceTime HD Camera (Built-in)</option>
                    <option>OBS Virtual Camera</option>
                  </select>
                </div>

                <div className="bg-surface-container-low p-3 rounded-2xl border border-outline-variant/20">
                  <div className="text-[10px] text-secondary font-bold mb-1">ไมโครโฟน (Audio In)</div>
                  <select
                    value={mic}
                    onChange={(e) => setMic(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-on-surface outline-none cursor-pointer"
                  >
                    <option>Rode VideoMic Go II</option>
                    <option>MacBook Pro Microphone</option>
                    <option>Wireless Lapel Greeny Mic</option>
                  </select>
                </div>

                <div className="bg-surface-container-low p-3 rounded-2xl border border-outline-variant/20">
                  <div className="text-[10px] text-secondary font-bold mb-1">โหมดการแสดงผล</div>
                  <select className="w-full bg-transparent text-xs font-semibold text-on-surface outline-none cursor-pointer">
                    <option>มุมกว้างสินค้าชัด (Eco Studio)</option>
                    <option>โฟกัสคนบรรยาย (Creator Focus)</option>
                    <option>แบบแบ่งจอสาธิต (Split Screen)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Media Asset Vault */}
            <div className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/30 shadow-2xs">
              <div className="flex items-center justify-between pb-3">
                <div>
                  <h2 className="font-display font-extrabold text-sm text-on-surface">
                    คลังสื่อและวิดีโอสั้น (Green Reels Vault)
                  </h2>
                  <p className="text-xs text-secondary">
                    เลือกไฟล์ที่อัปโหลดไว้เพื่อแนบลงในโพสต์หรือเตรียมรันในไลฟ์
                  </p>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container text-primary text-xs font-bold hover:bg-primary/10 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">add_photo_alternate</span>
                  <span>อัปโหลดเพิ่ม</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {PRESET_ASSETS.map((asset) => {
                  const isSelected = selectedAssetId === asset.id;
                  return (
                    <div
                      key={asset.id}
                      onClick={() => setSelectedAssetId(asset.id)}
                      className={`relative group cursor-pointer rounded-2xl overflow-hidden border-2 transition-all ${
                        isSelected
                          ? "border-primary shadow-md ring-2 ring-primary/20"
                          : "border-transparent hover:border-outline-variant/50"
                      }`}
                    >
                      <div className="aspect-[4/3] bg-surface-container overflow-hidden">
                        <img
                          src={asset.url}
                          alt={asset.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">
                          {asset.type === "video" ? "play_arrow" : "photo_camera"}
                        </span>
                        <span>{asset.duration}</span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow">
                          ✓
                        </div>
                      )}
                      <div className="p-2 bg-surface-container-lowest">
                        <div className="text-[11px] font-bold text-on-surface truncate">{asset.name}</div>
                        <div className="text-[10px] text-secondary">{asset.size}</div>
                      </div>
                    </div>
                  );
                })}

                {/* Import Box */}
                <div className="flex flex-col items-center justify-center rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer p-4 text-center aspect-[4/3] border border-dashed border-outline-variant/50">
                  <div className="w-8 h-8 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center mb-1 shadow-2xs">
                    <span className="material-symbols-outlined text-[18px]">upload_file</span>
                  </div>
                  <span className="text-xs font-bold text-on-surface">นำเข้าไฟล์ใหม่</span>
                  <span className="text-[10px] text-secondary">รองรับสูงสุด 2GB</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Post / Live Setup Studio Form (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Mode Switcher */}
            <div className="bg-surface-container-lowest rounded-3xl p-2 border border-outline-variant/30 shadow-2xs">
              <div className="grid grid-cols-2 gap-2 bg-surface-container p-1 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setMode("post")}
                  className={`py-2.5 rounded-xl font-display font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    mode === "post"
                      ? "bg-surface-container-lowest text-on-surface shadow-2xs"
                      : "text-secondary hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">edit_note</span>
                  <span>สร้างโพสต์รีวิว</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode("live")}
                  className={`py-2.5 rounded-xl font-display font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    mode === "live"
                      ? "bg-surface-container-lowest text-on-surface shadow-2xs"
                      : "text-secondary hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-coral-red">cell_tower</span>
                  <span>ถ่ายทอดสด (Live)</span>
                </button>
              </div>
            </div>

            {/* Form Details */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-2xs space-y-5">
              {/* Audience selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                  <span>การมองเห็นและกลุ่มเป้าหมาย</span>
                  <span className="text-primary text-[11px] font-normal">ปลอดภัยและตรวจสอบแล้ว</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "public", icon: "public", label: "สาธารณะ", desc: "ทุกคนบน Greeny" },
                    { id: "followers", icon: "group", label: "ผู้ติดตาม", desc: "เฉพาะแฟนคลับ" },
                    { id: "green-community", icon: "spa", label: "ชุมชนรักษ์โลก", desc: "Eco Members" },
                  ].map((aud) => {
                    const isChecked = audience === aud.id;
                    return (
                      <button
                        key={aud.id}
                        type="button"
                        onClick={() => setAudience(aud.id as any)}
                        className={`p-3 rounded-2xl text-center border transition-all ${
                          isChecked
                            ? "bg-secondary-container text-on-secondary-container border-primary font-bold"
                            : "bg-surface-container-low text-secondary border-transparent hover:bg-surface-container"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px] block mx-auto mb-1">
                          {aud.icon}
                        </span>
                        <span className="text-xs block font-bold">{aud.label}</span>
                        <span className="text-[9px] opacity-80 block truncate">{aud.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-on-surface">
                    {mode === "post" ? "หัวข้อโพสต์คอนเทนต์" : "หัวข้อถ่ายทอดสด"}
                  </label>
                  <span className="text-[11px] text-secondary">{title.length}/100</span>
                </div>
                <input
                  type="text"
                  value={title}
                  maxLength={100}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="เพิ่มหัวข้อคอนเทนต์..."
                  className="w-full bg-surface-container-low rounded-2xl px-4 py-3 text-xs font-semibold text-on-surface outline-none border border-outline-variant/20 focus:border-primary"
                />
              </div>

              {/* Description & Tags */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface">คำบรรยายเรื่องราวกรีนๆ</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="เพิ่มคำบรรยาย... แชร์เรื่องราวกรีนๆ แหล่งที่มาของวัตถุดิบ หรือเทคนิคลดคาร์บอนฟุตพริ้นท์ของคุณ"
                  className="w-full bg-surface-container-low rounded-2xl p-4 text-xs text-on-surface outline-none border border-outline-variant/20 focus:border-primary resize-none"
                />

                {/* Hashtag suggestions */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-secondary">แท็กแนะนำ:</span>
                  {["#ZeroWaste", "#GreenPackaging", "#OrganicThai", "#EcoFriendly", "#ขุยมะพร้าว"].map(
                    (tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => addTag(tag)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                          tags.includes(tag)
                            ? "bg-primary text-white"
                            : "bg-surface-container text-secondary hover:text-on-surface"
                        }`}
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Catalog Tagging */}
              <div className="space-y-2 pt-2 border-t border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-primary">local_mall</span>
                    <span>แท็กสินค้าจากร้านค้า (Catalog Tagging)</span>
                  </label>
                  <span className="text-[11px] text-primary font-bold">
                    {attachedProducts.length} ชิ้น
                  </span>
                </div>

                <div className="space-y-2">
                  {attachedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-on-surface truncate">{p.name}</div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-primary font-bold">฿{p.price}</span>
                            <span className="line-through text-secondary text-[11px]">
                              ฿{p.originalPrice}
                            </span>
                            <span className="text-[10px] bg-tertiary-container/30 text-coral-red font-bold px-1.5 py-0.5 rounded">
                              -{p.discountPct}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-surface-container-lowest text-primary font-bold px-2 py-0.5 rounded-full shadow-2xs">
                          คอมฯ {p.commission}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeProduct(p.id)}
                          className="text-secondary hover:text-coral-red p-1 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  disabled={isPublishing}
                  onClick={handlePublish}
                  className="flex-1 py-3.5 rounded-full bg-primary hover:bg-on-primary-container text-white font-display font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {mode === "post" ? "send" : "cell_tower"}
                  </span>
                  <span>
                    {isPublishing
                      ? "กำลังดำเนินการ..."
                      : mode === "post"
                      ? "เผยแพร่โพสต์รีวิว"
                      : "เริ่มถ่ายทอดสด (Go Live)"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/me")}
                  className="px-5 py-3.5 rounded-full bg-surface-container text-on-surface-variant font-bold text-xs hover:bg-surface-container-high transition-colors"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
