import React from "react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="w-full bg-surface pb-16">
      {/* Hero Presentation */}
      <section className="relative w-full py-16 md:py-24 bg-gradient-to-b from-surface-container via-surface-container-low to-surface border-b border-outline-variant/30 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center flex flex-col items-center gap-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary-container/20 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]">nature</span>
            THAILAND CIRCULAR PACKAGING PLATFORM
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-on-surface leading-tight tracking-tight">
            พลิกโฉมวงการบรรจุภัณฑ์ไทย <br />
            <span className="text-primary">สู่นวัตกรรมย่อยสลายได้ 100%</span>
          </h1>

          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            Greeny เป็นแพลตฟอร์มตลาดกลางพาณิชย์อิเล็กทรอนิกส์แห่งแรกของไทยที่เชื่อมโยงเกษตรกรผู้ปลูกผักตบชวา ฟางข้าว และเห็ดชีวมวล เข้ากับผู้ประกอบการ SME และร้านค้าออนไลน์ทั่วประเทศ เพื่อลดการใช้พลาสติกแบบใช้ครั้งเดียวทิ้ง
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/"
              className="px-8 py-3.5 rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary font-bold font-display text-sm sm:text-base transition-all shadow-md flex items-center gap-2 group"
            >
              <span>เข้าสู่ตลาดกลาง Greeny (Enter Marketplace)</span>
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
            <Link
              href="/seller/onboarding"
              className="px-8 py-3.5 rounded-full bg-forest-slate text-white hover:bg-neutral-800 font-bold font-display text-sm sm:text-base transition-all shadow-md flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px] text-primary-fixed">storefront</span>
              <span>เปิดร้านค้าสำหรับเกษตรกร</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center text-primary font-bold">
            <span className="material-symbols-outlined text-[26px]">recycling</span>
          </div>
          <h3 className="font-display font-extrabold text-lg text-on-surface">
            เศรษฐกิจหมุนเวียน (Circular Economy)
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            เปลี่ยนวัชพืชทางน้ำและเศษวัสดุเหลือใช้ทางการเกษตร เช่น ผักตบชวา ก้านกล้วย และฟางข้าว ให้กลายเป็นวัสดุกันกระแทกมูลค่าสูง เพิ่มรายได้ให้ชุมชนเกษตรกร
          </p>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center text-forest-slate font-bold">
            <span className="material-symbols-outlined text-[26px]">verified_user</span>
          </div>
          <h3 className="font-display font-extrabold text-lg text-on-surface">
            รับรองมาตรฐานเกษตรอินทรีย์
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            ทุกร้านค้าใน Greeny Mall ผ่านการตรวจสอบเอกสารรับรองมาตรฐานเกษตรอำเภอ มผช. ชุมชน และ Organic Thailand ปลอดภัยต่อผู้ใช้และสิ่งแวดล้อม
          </p>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[26px]">local_shipping</span>
          </div>
          <h3 className="font-display font-extrabold text-lg text-on-surface">
            ระบบราคาส่ง B2B สำหรับธุรกิจ
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            รองรับโครงสร้างราคาส่งแบบขั้นบันได (3, 6, 12 หน่วยขึ้นไป) ช่วยให้ร้านค้าออนไลน์และโรงงานลดต้นทุนบรรจุภัณฑ์ได้สูงสุดถึง 45%
          </p>
        </div>
      </section>
    </div>
  );
}
