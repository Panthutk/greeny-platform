"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

export default function SellerDashboardPage() {
  const { formatPrice } = useLocale();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 flex flex-col gap-6">
      {/* Top Store Spotlight Banner (PDF Pages 38–39) */}
      <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4 z-10">
          <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center text-primary text-3xl shadow-inner shrink-0">
            🏪
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs text-on-surface-variant font-bold">ร้านค้าของฉัน:</span>
              <h1 className="font-display font-extrabold text-xl text-primary">
                Green Living Crafts Thailand
              </h1>
              <span className="bg-forest-slate text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px] text-primary-fixed">verified</span>
                Green Mall Lvl 4
              </span>
            </div>
            <p className="text-xs text-on-surface-variant flex flex-wrap items-center gap-3">
              <span>คะแนนความยั่งยืน: <strong className="text-primary font-display">99.4%</strong></span>
              <span>•</span>
              <span>ตอบแชทเฉลี่ย: <strong>4 นาที</strong></span>
              <span>•</span>
              <span className="text-primary font-bold">TH Certified Eco Merchant (เกรด A+)</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 z-10">
          <Link
            href="/seller/products/new"
            className="px-5 py-2.5 rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary font-display font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">add_box</span>
            <span>+ ลงสินค้าใหม่</span>
          </Link>
          <a
            href="/api/admin/export"
            className="px-5 py-2.5 rounded-full bg-forest-slate hover:bg-neutral-800 text-white font-display font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            download="greeny_platform_operations_export.csv"
          >
            <span className="material-symbols-outlined text-[18px] text-primary-fixed">download</span>
            <span>ส่งออกรายงาน (Excel/CSV)</span>
          </a>
        </div>
      </div>

      {/* Financial Wallet & Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Wallet Balance */}
        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-on-surface-variant mb-2">
            <span className="font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px] text-primary">account_balance_wallet</span>
              Greeny Wallet
            </span>
            <span className="text-[10px] font-bold text-primary bg-primary-container/20 px-2 py-0.5 rounded-full">
              รอบโอน 18:00 น.
            </span>
          </div>
          <div>
            <div className="font-display font-extrabold text-2xl text-on-surface">
              ฿ 45,820.50
            </div>
            <div className="text-[11px] text-primary font-bold mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +12.8% จากสัปดาห์ก่อน
            </div>
          </div>
        </div>

        {/* Carbon Reduction Metric */}
        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-on-surface-variant mb-2">
            <span className="font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px] text-primary">energy_savings_leaf</span>
              ยอดลดคาร์บอนสะสม
            </span>
            <span className="text-[10px] font-bold text-secondary bg-surface-container px-2 py-0.5 rounded-full">
              ฟาร์มสีเขียว
            </span>
          </div>
          <div>
            <div className="font-display font-extrabold text-2xl text-primary">
              342.0 kgCO₂e
            </div>
            <div className="text-[11px] text-outline mt-1">
              เทียบเท่าการปลูกต้นไม้ 18 ต้น
            </div>
          </div>
        </div>

        {/* Orders to Ship */}
        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-on-surface-variant mb-2">
            <span className="font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px] text-coral-accent">local_shipping</span>
              ต้องจัดส่งวันนี้
            </span>
            <span className="text-[10px] font-extrabold text-white bg-coral-accent px-2 py-0.5 rounded-full">
              ด่วน
            </span>
          </div>
          <div>
            <div className="font-display font-extrabold text-2xl text-on-surface">
              12 ออเดอร์
            </div>
            <div className="text-[11px] text-outline mt-1">
              เตรียมพัสดุและพิมพ์ใบปะหน้า
            </div>
          </div>
        </div>

        {/* Shipped & Delivered */}
        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-on-surface-variant mb-2">
            <span className="font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px] text-primary">check_circle</span>
              จัดส่งสำเร็จเดือนนี้
            </span>
            <span className="text-[10px] font-bold text-primary bg-surface-container px-2 py-0.5 rounded-full">
              สำเร็จ
            </span>
          </div>
          <div>
            <div className="font-display font-extrabold text-2xl text-on-surface">
              156 ออเดอร์
            </div>
            <div className="text-[11px] text-outline mt-1">
              คำขอคืนสินค้า: 2 รายการ (1.2%)
            </div>
          </div>
        </div>
      </div>

      {/* Orders Fulfillment Stages Pipeline */}
      <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-4">
        <h2 className="font-display font-extrabold text-base text-on-surface flex items-center justify-between border-b border-outline-variant/20 pb-3">
          <span>คำสั่งซื้อของร้านค้า (Fulfillment Pipeline)</span>
          <span className="text-xs text-primary font-bold">อัปเดตอัตโนมัติ</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 flex items-center justify-between">
            <div>
              <div className="font-bold text-on-surface text-sm">ต้องจัดส่ง (To Ship)</div>
              <div className="text-[11px] text-on-surface-variant">รอเรียกรถเข้ารับพัสดุ</div>
            </div>
            <span className="font-display font-extrabold text-xl text-coral-accent">12</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 flex items-center justify-between">
            <div>
              <div className="font-bold text-on-surface text-sm">จัดส่งแล้ว (In Transit)</div>
              <div className="text-[11px] text-on-surface-variant">อยู่ระหว่างการนำจ่าย</div>
            </div>
            <span className="font-display font-extrabold text-xl text-primary">48</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 flex items-center justify-between">
            <div>
              <div className="font-bold text-on-surface text-sm">คำขอคืนเงิน / ยกเลิก</div>
              <div className="text-[11px] text-on-surface-variant">รอดำเนินการตรวจสอบ</div>
            </div>
            <span className="font-display font-extrabold text-xl text-outline">2</span>
          </div>
        </div>
      </div>
    </div>
  );
}
