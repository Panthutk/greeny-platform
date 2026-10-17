"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AGRI_CERTIFICATIONS = [
  { id: "DISTRICT_AGRI", label: "สำนักงานเกษตรอำเภอ (District Agriculture Office)" },
  { id: "ORGANIC", label: "มาตรฐานเกษตรอินทรีย์ (Organic Thailand)" },
  { id: "OTOP", label: "มาตรฐานผลิตภัณฑ์ชุมชน (มผช.)" },
  { id: "FDA", label: "สำนักงานคณะกรรมการอาหารและยา (อย.)" },
  { id: "GAP_GMP", label: "GAP / GMP ทางการเกษตร" },
  { id: "HACCP", label: "HACCP มาตรฐานสากล" },
  { id: "OTHER", label: "อื่นๆ ระบุ (วิสาหกิจชุมชน / หนังสือสัญญา)" },
];

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [materialType, setMaterialType] = useState("HYACINTH");
  const [retailPrice, setRetailPrice] = useState("59");
  const [size, setSize] = useState("1 กิโลกรัม");
  const [description, setDescription] = useState("");
  const [usageInfo, setUsageInfo] = useState("");
  const [warningInfo, setWarningInfo] = useState("");
  const [isBogo, setIsBogo] = useState(false);
  const [isFreeShipping, setIsFreeShipping] = useState(true);
  const [selectedCerts, setSelectedCerts] = useState<string[]>(["ORGANIC", "DISTRICT_AGRI"]);
  const [uploadedCertName, setUploadedCertName] = useState<string | null>("organic_certificate_th.pdf");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Wholesale tiered pricing (3, 6, 12 units)
  const [tier3Price, setTier3Price] = useState("49");
  const [tier6Price, setTier6Price] = useState("42");
  const [tier12Price, setTier12Price] = useState("35");

  const toggleCert = (certId: string) => {
    if (selectedCerts.includes(certId)) {
      setSelectedCerts(selectedCerts.filter((c) => c !== certId));
    } else {
      setSelectedCerts([...selectedCerts, certId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      router.push("/seller/dashboard");
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 flex flex-col gap-6">
      {/* Top Banner */}
      <div className="bg-forest-slate text-surface-container-lowest p-6 rounded-3xl flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[20px] text-primary-fixed">add_box</span>
            <span className="font-display font-extrabold text-lg text-white">ลงทะเบียนสินค้าใหม่</span>
            <span className="text-[10px] bg-primary px-2 py-0.5 rounded-full font-bold">
              Green Mall Catalog
            </span>
          </div>
          <p className="text-xs text-surface-variant">
            กรอกข้อมูลสินค้าและแนบเอกสารรับรองมาตรฐานเกษตร เพื่อเปิดขายราคาส่งและปลีก
          </p>
        </div>
        <Link
          href="/seller/dashboard"
          className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
        >
          กลับสู่แผงควบคุม
        </Link>
      </div>

      {isSubmitted ? (
        <div className="bg-surface-container-lowest p-10 rounded-3xl border border-outline-variant/30 text-center space-y-4 shadow-sm animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mx-auto text-3xl">
            ✓
          </div>
          <h2 className="font-display font-extrabold text-xl text-on-surface">
            ลงทะเบียนสินค้าเกษตรสำเร็จ!
          </h2>
          <p className="text-xs text-on-surface-variant">
            สินค้าและเอกสารมาตรฐานเกษตรถูกบันทึกลงในฐานข้อมูล Greeny เรียบร้อยแล้ว กำลังนำคุณกลับหน้าแดชบอร์ด...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: ข้อมูลสินค้าพื้นฐาน & รูปภาพ (PDF Page 37) */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-4">
            <h2 className="font-display font-extrabold text-sm sm:text-base text-on-surface flex items-center gap-2 border-b border-outline-variant/20 pb-3">
              <span className="material-symbols-outlined text-[20px] text-primary">image</span>
              1. รูปภาพและชื่อสินค้า (Product Basics)
            </h2>

            {/* Image Guide Box */}
            <div className="p-4 rounded-2xl bg-surface-container-low border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-[24px]">photo_camera</span>
                <div>
                  <span className="font-bold text-on-surface block">คำแนะนำ: ควรมีรูปฉลากสินค้าและบรรจุภัณฑ์จริง</span>
                  <span className="text-[11px] text-on-surface-variant">
                    รองรับไฟล์ JPG, PNG, WebP สูงสุด 10MB ระบบจะบีบอัดอัตโนมัติ
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-bold text-xs shrink-0"
              >
                + อัปโหลดรูปภาพ (3/5)
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="font-bold text-on-surface block mb-1">ชื่อสินค้า (Product Name) *</label>
                <input
                  type="text"
                  placeholder="เช่น ผักตบชวาอบแห้งกันกระแทก 1 กิโลกรัม"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-surface-container-low px-3 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">ประเภทวัสดุธรรมชาติ (Raw Material) *</label>
                <select
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value)}
                  className="w-full bg-surface-container-low px-3 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="HYACINTH">ผักตบชวา (Water Hyacinth)</option>
                  <option value="RICE_STRAW">ฟางข้าว (Rice Straw)</option>
                  <option value="MYCELIUM">เส้นใยเห็ดชีวมวล (Mushroom Mycelium)</option>
                  <option value="BAGASSE">ชานอ้อย (Sugarcane Bagasse)</option>
                  <option value="CORNSTARCH">แป้งข้าวโพด (Cornstarch)</option>
                  <option value="BANANA_STEM">ก้านกล้วย (Banana Stem)</option>
                  <option value="COCONUT_COIR">ขุยมะพร้าว (Coconut Coir)</option>
                  <option value="HONEYCOMB">กระดาษคราฟท์รังผึ้ง (Honeycomb Paper)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">ขนาด / ปริมาตรบรรจุ (Size) *</label>
                <input
                  type="text"
                  placeholder="เช่น 1 กก. หรือ 13x17x7 cm"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  required
                  className="w-full bg-surface-container-low px-3 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Section 2: ราคาขายปลีก & โครงสร้างราคาส่ง B2B (PDF Page 37) */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-4">
            <h2 className="font-display font-extrabold text-sm sm:text-base text-on-surface flex items-center gap-2 border-b border-outline-variant/20 pb-3">
              <span className="material-symbols-outlined text-[20px] text-primary">price_change</span>
              2. ราคาขายปลีก & ส่วนลดราคาส่งยกล็อต (Wholesale Tiers)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-surface-container-low p-3 rounded-2xl border border-outline-variant/30">
                <label className="font-bold text-on-surface block mb-1">ขายปลีก (1 ชิ้น) *</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={retailPrice}
                    onChange={(e) => setRetailPrice(e.target.value)}
                    required
                    className="w-full bg-surface-container-lowest px-2.5 py-1.5 rounded-lg border border-outline-variant/30 font-display font-bold text-sm text-primary"
                  />
                  <span>฿</span>
                </div>
                <span className="text-[10px] text-outline mt-1 block">ราคามาตรฐานหน้าร้าน</span>
              </div>

              <div className="bg-surface-container-low p-3 rounded-2xl border border-outline-variant/30">
                <label className="font-bold text-on-surface block mb-1">ราคาส่ง (≥ 3 ชิ้น)</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={tier3Price}
                    onChange={(e) => setTier3Price(e.target.value)}
                    className="w-full bg-surface-container-lowest px-2.5 py-1.5 rounded-lg border border-outline-variant/30 font-display font-bold text-sm text-primary"
                  />
                  <span>฿</span>
                </div>
                <span className="text-[10px] text-coral-accent font-bold mt-1 block">ลด ~17%</span>
              </div>

              <div className="bg-surface-container-low p-3 rounded-2xl border border-outline-variant/30">
                <label className="font-bold text-on-surface block mb-1">ราคาส่ง (≥ 6 ชิ้น)</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={tier6Price}
                    onChange={(e) => setTier6Price(e.target.value)}
                    className="w-full bg-surface-container-lowest px-2.5 py-1.5 rounded-lg border border-outline-variant/30 font-display font-bold text-sm text-primary"
                  />
                  <span>฿</span>
                </div>
                <span className="text-[10px] text-coral-accent font-bold mt-1 block">ลด ~28%</span>
              </div>

              <div className="bg-surface-container-low p-3 rounded-2xl border border-outline-variant/30">
                <label className="font-bold text-on-surface block mb-1">ราคาส่ง (≥ 12 ชิ้น)</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={tier12Price}
                    onChange={(e) => setTier12Price(e.target.value)}
                    className="w-full bg-surface-container-lowest px-2.5 py-1.5 rounded-lg border border-outline-variant/30 font-display font-bold text-sm text-primary"
                  />
                  <span>฿</span>
                </div>
                <span className="text-[10px] text-coral-accent font-bold mt-1 block">ลด ~40% (ยกล็อต)</span>
              </div>
            </div>

            {/* Promotional Toggles */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBogo}
                  onChange={(e) => setIsBogo(e.target.checked)}
                  className="w-4 h-4 rounded text-coral-accent focus:ring-coral-accent"
                />
                <span className="font-bold text-on-surface">ร่วมโปร ซื้อ 1 แถม 1</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFreeShipping}
                  onChange={(e) => setIsFreeShipping(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary"
                />
                <span className="font-bold text-on-surface">ส่งฟรีทั่วไทย 0 บาท</span>
              </label>
            </div>
          </div>

          {/* Section 3: การรับรองมาตรฐานเกษตรอินทรีย์ & เอกสารรับรอง (PDF Page 37) */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-4">
            <h2 className="font-display font-extrabold text-sm sm:text-base text-on-surface flex items-center gap-2 border-b border-outline-variant/20 pb-3">
              <span className="material-symbols-outlined text-[20px] text-primary">verified</span>
              3. การรับรองมาตรฐานที่เกี่ยวข้องกับสินค้าเกษตร (Eco Certifications)
            </h2>

            <p className="text-xs text-on-surface-variant">
              เลือกมาตรฐานที่ได้รับการรับรองจริงและอัปโหลดไฟล์แนบ เพื่อรับตราสัญลักษณ์ "Green Mall Verified"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {AGRI_CERTIFICATIONS.map((cert) => {
                const checked = selectedCerts.includes(cert.id);
                return (
                  <label
                    key={cert.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      checked
                        ? "bg-secondary-container/30 border-primary"
                        : "bg-surface-container-low/40 border-outline-variant/30 hover:bg-surface-container-low"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCert(cert.id)}
                      className="w-4 h-4 rounded text-primary focus:ring-primary"
                    />
                    <span className="font-semibold text-on-surface">{cert.label}</span>
                  </label>
                );
              })}
            </div>

            {/* Document Upload Box */}
            <div className="p-4 rounded-2xl bg-surface-container-low border border-dashed border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-[24px]">description</span>
                <div>
                  <span className="font-bold text-on-surface block">รูปเอกสาร / หนังสือสัญญา / ใบรับรองมาตรฐาน</span>
                  <span className="text-[11px] text-outline">
                    {uploadedCertName ? `ไฟล์ที่แนบ: ${uploadedCertName}` : "ยังไม่ได้เลือกไฟล์ (PDF / JPG / PNG)"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setUploadedCertName("organic_certificate_updated.pdf")}
                className="px-4 py-2 rounded-full bg-forest-slate text-white text-xs font-bold hover:bg-neutral-800 transition-colors shrink-0"
              >
                {uploadedCertName ? "เปลี่ยนไฟล์เอกสาร" : "+ แนบไฟล์ใบรับรอง"}
              </button>
            </div>
          </div>

          {/* Section 4: คำเตือนและวิธีการใช้งาน */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-4">
            <h2 className="font-display font-extrabold text-sm sm:text-base text-on-surface flex items-center gap-2 border-b border-outline-variant/20 pb-3">
              <span className="material-symbols-outlined text-[20px] text-primary">info</span>
              4. ข้อมูลวิธีการใช้และข้อควรระวัง (Usage & Warnings)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-on-surface block mb-1">ข้อมูลวิธีการใช้</label>
                <textarea
                  rows={2}
                  placeholder="เช่น รองก้นกล่อง อัดรอบตัวสินค้าเพื่อกันกระแทก..."
                  value={usageInfo}
                  onChange={(e) => setUsageInfo(e.target.value)}
                  className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">คำเตือน / ข้อควรระวัง</label>
                <textarea
                  rows={2}
                  placeholder="เช่น ควรเก็บในที่แห้ง ไม่โดนความชื้นหรือฝน..."
                  value={warningInfo}
                  onChange={(e) => setWarningInfo(e.target.value)}
                  className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end gap-3 pt-2">
            <Link
              href="/seller/dashboard"
              className="px-6 py-3 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs"
            >
              ยกเลิก
            </Link>
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary font-bold font-display text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>เสร็จสิ้นและบันทึกสินค้า (Publish Product)</span>
              <span className="material-symbols-outlined text-[18px]">check</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
