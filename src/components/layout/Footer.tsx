import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-forest-slate text-surface-container-lowest pt-12 pb-8 border-t border-outline/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-surface-variant/20">
          {/* Col 1: Brand Info & Carbon Commitment */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[22px]">eco</span>
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                Greeny
              </span>
              <span className="bg-primary-fixed/20 text-primary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Eco Thailand
              </span>
            </div>
            <p className="text-xs text-surface-variant/80 max-w-sm leading-relaxed">
              แพลตฟอร์มตลาดกลางพาณิชย์อิเล็กทรอนิกส์สำหรับบรรจุภัณฑ์และสินค้าเกษตรแปรรูปรักษ์โลก 100% เชื่อมโยงเกษตรกรไทย ผู้ผลิตชุมชน เข้ากับผู้บริโภคและธุรกิจยุคใหม่ เพื่อสิ่งแวดล้อมที่ยั่งยืน
            </p>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface/10 border border-surface-variant/10">
              <span className="material-symbols-outlined text-primary-fixed text-[26px]">energy_savings_leaf</span>
              <div className="text-xs">
                <div className="text-outline-variant font-medium">ยอดลดคาร์บอนสะสมทั่วประเทศ</div>
                <div className="text-sm font-bold text-white font-display">1,480,250 kg CO₂e</div>
              </div>
            </div>
          </div>

          {/* Col 2: Customer Help Center (PDF Page 51) */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-primary-fixed">
              ศูนย์ช่วยเหลือ (Help Center)
            </h4>
            <ul className="space-y-2 text-xs text-surface-variant/80">
              <li>
                <Link href="/help" className="hover:text-primary-fixed transition-colors">วิธีสั่งซื้อสินค้า</Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-primary-fixed transition-colors">การชำระเงินและ PromptPay</Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-primary-fixed transition-colors">การจัดส่งสินค้า (ขนส่ง 1-3)</Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-primary-fixed transition-colors">การเปลี่ยน/คืนสินค้าและคืนเงิน</Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-primary-fixed transition-colors">นโยบายความเป็นส่วนตัว</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: For Sellers */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-primary-fixed">
              สำหรับผู้ขาย (Seller Center)
            </h4>
            <ul className="space-y-2 text-xs text-surface-variant/80">
              <li>
                <Link href="/seller/onboarding" className="hover:text-primary-fixed transition-colors font-bold text-white">
                  เปิดร้านค้ากับ Greeny
                </Link>
              </li>
              <li>
                <Link href="/seller/dashboard" className="hover:text-primary-fixed transition-colors">
                  ร้านค้าของฉัน (Dashboard)
                </Link>
              </li>
              <li>
                <Link href="/seller/products/new" className="hover:text-primary-fixed transition-colors">
                  ลงทะเบียนสินค้า & มาตรฐานเกษตร
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-primary-fixed transition-colors">
                  คู่มือและวิดีโอสอนการใช้งาน
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Socials */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-primary-fixed">
              ติดต่อ Greeny Direct
            </h4>
            <p className="text-xs text-surface-variant/80">
              อีเมล: greeny.service@greeny.co.th <br />
              โทรศัพท์: 02-999-8888 <br />
              จันทร์ - เสาร์ (08:30 - 18:00 น.)
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-8 h-8 rounded-full bg-surface/10 flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container cursor-pointer transition-colors text-xs font-bold font-display">
                f
              </span>
              <span className="w-8 h-8 rounded-full bg-surface/10 flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container cursor-pointer transition-colors text-xs font-bold font-display">
                ig
              </span>
              <span className="w-8 h-8 rounded-full bg-surface/10 flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container cursor-pointer transition-colors text-xs font-bold font-display">
                L8
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-surface-variant/60 gap-3">
          <div>© 2026 Greeny Platform. All rights reserved. มุ่งมั่นสร้างสรรค์เศรษฐกิจสีเขียวไทย</div>
          <div className="flex items-center gap-4">
            <span>มาตรฐานเกษตรอินทรีย์</span>
            <span>•</span>
            <span>มผช. ชุมชน</span>
            <span>•</span>
            <span>GAP / GMP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
