"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SellerOnboardingPage() {
  const router = useRouter();

  const [sellerName, setSellerName] = useState("");
  const [taxId, setTaxId] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("นครปฐม");
  const [storeName, setStoreName] = useState("");
  const [payoutMethod, setPayoutMethod] = useState<"PROMPTPAY" | "BANK" | "CARD">("PROMPTPAY");
  const [payoutAccount, setPayoutAccount] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      <div className="bg-forest-slate text-surface-container-lowest p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[20px]">storefront</span>
            </span>
            <span className="font-display font-extrabold text-xl text-white">Greeny Seller</span>
            <span className="text-[10px] font-bold bg-primary-fixed/20 text-primary-fixed px-2 py-0.5 rounded-full uppercase">
              เปิดร้านค้าใหม่
            </span>
          </div>
          <p className="text-xs text-surface-variant max-w-lg leading-relaxed">
            ลงทะเบียนร้านค้าเกษตรรักษ์โลก รับสิทธิ์ขายทั้งปลีกและส่งทั่วประเทศ พร้อมการรับรองมาตรฐาน Green Mall
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-primary-fixed">
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
          <span>ความปลอดภัยระดับองค์กร</span>
        </div>
      </div>

      {isSubmitted ? (
        <div className="bg-surface-container-lowest p-10 rounded-3xl border border-outline-variant/30 text-center space-y-4 shadow-sm animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mx-auto text-3xl">
            ✓
          </div>
          <h2 className="font-display font-extrabold text-xl text-on-surface">
            ลงทะเบียนร้านค้าสำเร็จเรียบร้อย!
          </h2>
          <p className="text-xs text-on-surface-variant">
            กำลังนำคุณเข้าสู่แผงควบคุมร้านค้าของฉัน (Seller Dashboard)...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: ข้อมูลผู้ขาย (PDF Page 36) */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-4">
            <h2 className="font-display font-extrabold text-sm sm:text-base text-on-surface flex items-center gap-2 border-b border-outline-variant/20 pb-3">
              <span className="material-symbols-outlined text-[20px] text-primary">badge</span>
              1. ข้อมูลผู้ขายและตัวแทน (Seller Identity)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-on-surface block mb-1">ชื่อ-นามสกุล ผู้ขาย / ตัวแทน / นิติบุคคล *</label>
                <input
                  type="text"
                  placeholder="เช่น นายสุขใจ เกษตรพัฒนา หรือ บริษัท กรีนเนเจอร์ จำกัด"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  required
                  className="w-full bg-surface-container-low px-3 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">เลขทะเบียนนิติบุคคล / เลขบัตรประชาชน 13 หลัก *</label>
                <input
                  type="text"
                  placeholder="เลข 13 หลักตามบัตรประชาชนหรือหนังสือรับรอง"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  required
                  className="w-full bg-surface-container-low px-3 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">เบอร์มือถือติดต่อ *</label>
                <input
                  type="tel"
                  placeholder="08X-XXX-XXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full bg-surface-container-low px-3 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">จังหวัดที่ตั้งฟาร์ม / สถานประกอบการ *</label>
                <input
                  type="text"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  required
                  className="w-full bg-surface-container-low px-3 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-on-surface block mb-1">ที่อยู่ออกใบกำกับภาษี หรือที่อยู่ตามบัตรประชาชน *</label>
                <textarea
                  rows={2}
                  placeholder="เลขที่, หมู่, ซอย, ถนน, ตำบล/แขวง, อำเภอ/เขต, รหัสไปรษณีย์"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full bg-surface-container-low px-3 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Section 2: ข้อมูลร้านค้า */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-4">
            <h2 className="font-display font-extrabold text-sm sm:text-base text-on-surface flex items-center gap-2 border-b border-outline-variant/20 pb-3">
              <span className="material-symbols-outlined text-[20px] text-primary">store</span>
              2. ข้อมูลร้านค้าบนแพลตฟอร์ม (Store Information)
            </h2>
            <div className="text-xs space-y-3">
              <div>
                <label className="font-bold text-on-surface block mb-1">ชื่อร้านค้า (Store Name) *</label>
                <input
                  type="text"
                  placeholder="เช่น สวนผักตบอินทรีย์ ดินดีออร์แกนิค"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  required
                  className="w-full bg-surface-container-low px-3 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Section 3: ช่องทางการรับรายได้ (PromptPay / Bank / Card) */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-4">
            <h2 className="font-display font-extrabold text-sm sm:text-base text-on-surface flex items-center gap-2 border-b border-outline-variant/20 pb-3">
              <span className="material-symbols-outlined text-[20px] text-primary">account_balance_wallet</span>
              3. ช่องทางการรับรายได้ (Greeny Wallet Payout)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "PROMPTPAY", title: "พร้อมเพย์ (PromptPay)", desc: "โอนไว อัตโนมัติ 0 บาทค่าธรรมเนียม", icon: "qr_code" },
                { id: "BANK", title: "บัญชีธนาคาร", desc: "รอบโอนอัตโนมัติประจำวัน", icon: "account_balance" },
                { id: "CARD", title: "บัตรเดบิต/เครดิต", desc: "โอนผ่านระบบสากล", icon: "credit_card" },
              ].map((pm) => (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setPayoutMethod(pm.id as any)}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all ${
                    payoutMethod === pm.id
                      ? "bg-forest-slate text-white border-forest-slate shadow-sm"
                      : "bg-surface-container-low/40 text-on-surface border-outline-variant/30 hover:bg-surface-container-low"
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">{pm.icon}</span>
                  <div>
                    <div className="text-xs font-bold">{pm.title}</div>
                    <div className={`text-[10px] ${payoutMethod === pm.id ? "text-primary-fixed" : "text-outline"}`}>
                      {pm.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 text-xs">
              <label className="font-bold text-on-surface block mb-1">
                {payoutMethod === "PROMPTPAY"
                  ? "เบอร์โทรศัพท์พร้อมเพย์ หรือเลขบัตรประชาชน 13 หลัก *"
                  : payoutMethod === "BANK"
                  ? "ระบุเลขที่บัญชีและชื่อธนาคาร *"
                  : "ระบุข้อมูลบัตรสำหรับรับเงิน *"}
              </label>
              <input
                type="text"
                placeholder={payoutMethod === "PROMPTPAY" ? "08X-XXX-XXXX" : "เช่น 045-2-XXXXX-X ธนาคารกสิกรไทย"}
                value={payoutAccount}
                onChange={(e) => setPayoutAccount(e.target.value)}
                required
                className="w-full bg-surface-container-low px-3 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-2">
            <Link
              href="/"
              className="px-6 py-3 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs"
            >
              ยกเลิก
            </Link>
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary font-bold font-display text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>เสร็จสิ้นและเปิดร้านค้า (Complete Registration)</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
