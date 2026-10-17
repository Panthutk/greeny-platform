"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  const [isPrivateAccount, setIsPrivateAccount] = useState(false);
  const [isDmsOnly, setIsDmsOnly] = useState(true);
  const [isEcoPush, setIsEcoPush] = useState(true);
  const [showSignoutConfirm, setShowSignoutConfirm] = useState(false);

  const handleSignout = () => {
    setShowSignoutConfirm(false);
    router.push("/login");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/me"
          className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </Link>
        <div>
          <h1 className="font-display font-extrabold text-2xl text-on-surface">
            การตั้งค่าและความเป็นส่วนตัว
          </h1>
          <p className="text-xs text-secondary">
            จัดการบัญชีของคุณ การแจ้งเตือน และความปลอดภัย
          </p>
        </div>
      </div>

      {/* Group 1: การแจ้งเตือน (PDF Page 17) */}
      <div className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/30 shadow-2xs space-y-4">
        <h2 className="text-xs font-bold font-display text-secondary uppercase tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-primary">notifications</span>
          การแจ้งเตือน
        </h2>

        <div className="space-y-3 divide-y divide-outline-variant/10">
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="text-xs font-bold text-on-surface">ข้อความเท่านั้น</div>
              <div className="text-[11px] text-secondary">รับการแจ้งเตือนเฉพาะข้อความแชทโดยตรง</div>
            </div>
            <button
              type="button"
              onClick={() => setIsDmsOnly(!isDmsOnly)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                isDmsOnly ? "bg-primary" : "bg-surface-container-highest"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform shadow-xs ${
                  isDmsOnly ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <div className="text-xs font-bold text-on-surface">แจ้งเตือนแคมเปญลดคาร์บอน</div>
              <div className="text-[11px] text-secondary">รับสรุปความคืบหน้าการชดเชยคาร์บอนประจำสัปดาห์</div>
            </div>
            <button
              type="button"
              onClick={() => setIsEcoPush(!isEcoPush)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                isEcoPush ? "bg-primary" : "bg-surface-container-highest"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform shadow-xs ${
                  isEcoPush ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Group 2: ความเป็นส่วนตัว (PDF Page 17) */}
      <div className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/30 shadow-2xs space-y-4">
        <h2 className="text-xs font-bold font-display text-secondary uppercase tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-primary">security</span>
          ความเป็นส่วนตัว
        </h2>

        <div className="space-y-3 divide-y divide-outline-variant/10">
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="text-xs font-bold text-on-surface">บัญชีส่วนตัว</div>
              <div className="text-[11px] text-secondary">เฉพาะผู้ติดตามที่ได้รับอนุมัติจึงจะเห็นโพสต์ของคุณ</div>
            </div>
            <button
              type="button"
              onClick={() => setIsPrivateAccount(!isPrivateAccount)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                isPrivateAccount ? "bg-primary" : "bg-surface-container-highest"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform shadow-xs ${
                  isPrivateAccount ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-between pt-3 text-left hover:text-primary transition-colors"
          >
            <div>
              <div className="text-xs font-bold text-on-surface">โพสต์ส่วนตัว</div>
              <div className="text-[11px] text-secondary">กำหนดกลุ่มเป้าหมายเริ่มต้นสำหรับโพสต์ใหม่</div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-secondary">chevron_right</span>
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-between pt-3 text-left hover:text-primary transition-colors"
          >
            <div>
              <div className="text-xs font-bold text-on-surface">ข้อความส่วนตัว</div>
              <div className="text-[11px] text-secondary">กำหนดผู้ที่สามารถส่งข้อความหาคุณได้</div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-secondary">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Group 3: การบล็อกและการรายงาน (PDF Page 17) */}
      <div className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/30 shadow-2xs space-y-4">
        <h2 className="text-xs font-bold font-display text-secondary uppercase tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-primary">shield</span>
          ความปลอดภัยและการตรวจสอบ
        </h2>

        <div className="space-y-3 divide-y divide-outline-variant/10">
          <button
            type="button"
            className="w-full flex items-center justify-between pt-2 text-left hover:text-primary transition-colors"
          >
            <div>
              <div className="text-xs font-bold text-on-surface">บล็อกบัญชี</div>
              <div className="text-[11px] text-secondary">จัดการรายชื่อผู้ใช้ที่คุณบล็อกไว้</div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-secondary">chevron_right</span>
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-between pt-3 text-left hover:text-primary transition-colors"
          >
            <div>
              <div className="text-xs font-bold text-on-surface">รายงานบัญชี / สินค้าหลอกลวง</div>
              <div className="text-[11px] text-secondary">แจ้งตรวจสอบร้านค้าหรือคอนเทนต์ที่ละเมิดมาตรฐานรักษ์โลก</div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-secondary">chevron_right</span>
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-between pt-3 text-left hover:text-primary transition-colors"
          >
            <div>
              <div className="text-xs font-bold text-on-surface">รายงานความคิดเห็น</div>
              <div className="text-[11px] text-secondary">ตรวจสอบสถานะการรายงานความคิดเห็นสแปม</div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-secondary">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Group 4: เกี่ยวกับและศูนย์ช่วยเหลือ (PDF Page 17) */}
      <div className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/30 shadow-2xs space-y-4">
        <h2 className="text-xs font-bold font-display text-secondary uppercase tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-primary">info</span>
          เกี่ยวกับแพลตฟอร์ม
        </h2>

        <div className="space-y-3 divide-y divide-outline-variant/10">
          <Link
            href="/landing"
            className="w-full flex items-center justify-between pt-2 text-left hover:text-primary transition-colors"
          >
            <div>
              <div className="text-xs font-bold text-on-surface">เกี่ยวกับเรา (Greeny Mission)</div>
              <div className="text-[11px] text-secondary">พันธกิจลดขยะพลาสติกและสนับสนุนเกษตรกรไทย</div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-secondary">chevron_right</span>
          </Link>

          <div className="flex items-center justify-between pt-3">
            <div>
              <div className="text-xs font-bold text-on-surface">ศูนย์ช่วยเหลือ & มาตรฐานเกษตร</div>
              <div className="text-[11px] text-secondary">คู่มือรับรองมาตรฐาน GAP, GMP และ Organic Thailand</div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-secondary">chevron_right</span>
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={() => setShowSignoutConfirm(true)}
              className="w-full py-3 rounded-2xl bg-coral-red/10 text-coral-red hover:bg-coral-red hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span>ออกจากระบบ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sign Out Confirmation Modal */}
      {showSignoutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest p-6 rounded-3xl max-w-sm w-full space-y-4 border border-outline-variant/30 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-coral-red/10 text-coral-red flex items-center justify-center mx-auto text-2xl">
              ⚠️
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-display font-bold text-base text-on-surface">ยืนยันออกจากระบบ?</h3>
              <p className="text-xs text-secondary">
                คุณจะต้องเข้าสู่ระบบใหม่อีกครั้งเพื่อเข้าถึง Greeny Wallet และประวัติคำสั่งซื้อ
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleSignout}
                className="flex-1 py-2.5 rounded-full bg-coral-red text-white text-xs font-bold hover:opacity-90 transition-opacity"
              >
                ออกจากระบบ
              </button>
              <button
                type="button"
                onClick={() => setShowSignoutConfirm(false)}
                className="flex-1 py-2.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-bold hover:bg-surface-container-high transition-colors"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
