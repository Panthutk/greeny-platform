import React from "react";
import Link from "next/link";

export function HeroBanner() {
  return (
    <section className="relative w-full rounded-3xl overflow-hidden shadow-sm bg-gradient-to-r from-surface-container via-surface-container-high to-surface-container-low min-h-[380px] md:min-h-[440px] flex items-center border border-outline-variant/30">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1400&auto=format&fit=crop&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-on-surface/90 via-on-surface/75 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 p-6 md:p-10 lg:p-14 max-w-2xl flex flex-col items-start gap-4 text-surface-container-lowest">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-primary text-on-primary font-display text-[11px] font-bold uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            โฆษณาพิเศษ
          </span>
          <span className="bg-surface-container-lowest/20 backdrop-blur-md text-surface-container-lowest text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-white/20">
            <span className="material-symbols-outlined text-[15px] text-primary-fixed">local_shipping</span>
            ส่งฟรีทั่วไทย 0 บาท
          </span>
        </div>

        <div className="space-y-2">
          <span className="font-display font-extrabold text-xs sm:text-sm text-primary-fixed tracking-wider uppercase">
            ECO SUSTAINABILITY REVOLUTION
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-surface-container-lowest leading-tight">
            Greeny รักษ์โลกตัวจริง <br />
            <span className="text-primary-fixed">ลดสูงสุด 50%</span>
          </h1>
          <p className="text-xs sm:text-sm text-surface-variant max-w-lg leading-relaxed pt-1">
            เปลี่ยนมาใช้บรรจุภัณฑ์ย่อยสลายได้ 100% เพื่อโลกวันนี้ ลดขยะพลาสติก เริ่มต้นจากพัสดุทุกกล่องของคุณ ผลิตจากผักตบชวา ฟางข้าว และขุยมะพร้าวไทย
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/search"
            className="bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary font-display font-bold text-sm px-7 py-3 rounded-full transition-all shadow-md flex items-center gap-2 group"
          >
            <span>ช้อปเลย (Shop Now)</span>
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </Link>
          <span className="text-xs text-surface-variant flex items-center gap-1.5 font-medium">
            <span className="material-symbols-outlined text-[18px] text-primary-fixed">compost</span>
            สลายตัวตามธรรมชาติใน 60–90 วัน
          </span>
        </div>
      </div>

      {/* Floating Right Carbon Ticker (Desktop) */}
      <div className="hidden xl:flex absolute right-10 bottom-10 z-10 flex-col items-end gap-2 text-right">
        <div className="bg-surface-container-lowest/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-outline-variant/30 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shadow-inner">
            <span className="material-symbols-outlined text-[32px]">energy_savings_leaf</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
              ยอดลดคาร์บอนสะสม
            </span>
            <span className="font-display font-extrabold text-xl text-on-surface text-primary">
              1,480,250 kg CO₂
            </span>
            <span className="text-[10px] text-secondary">อัปเดตแบบ Real-time ทั่วไทย</span>
          </div>
        </div>
      </div>
    </section>
  );
}
