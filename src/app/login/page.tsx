"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<"EMAIL" | "PHONE">("EMAIL");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/me");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 flex flex-col items-center">
      <div className="w-full bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 shadow-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-2xl mx-auto shadow-sm">
            <span className="material-symbols-outlined text-[28px]">eco</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl text-on-surface">
            ลงชื่อเข้าใช้ Greeny
          </h1>
          <p className="text-xs text-on-surface-variant">
            เข้าสู่ระบบเพื่อจัดการคำสั่งซื้อ สิทธิประโยชน์ และสะสมยอดลดคาร์บอน
          </p>
        </div>

        {/* Method Toggle: Email vs Phone SMS */}
        <div className="flex bg-surface-container-low p-1 rounded-full border border-outline-variant/30 text-xs font-bold">
          <button
            type="button"
            onClick={() => setLoginMethod("EMAIL")}
            className={`flex-1 py-1.5 rounded-full transition-all ${
              loginMethod === "EMAIL"
                ? "bg-primary-container text-on-primary-container shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            อีเมล (Email)
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod("PHONE")}
            className={`flex-1 py-1.5 rounded-full transition-all ${
              loginMethod === "PHONE"
                ? "bg-primary-container text-on-primary-container shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            เบอร์โทรศัพท์ (SMS OTP)
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          {loginMethod === "EMAIL" ? (
            <div>
              <label className="font-bold text-on-surface block mb-1">อีเมลผู้ใช้งาน</label>
              <input
                type="email"
                placeholder="example@greeny.co.th"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-surface-container-low px-3 py-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary text-on-surface"
              />
            </div>
          ) : (
            <div>
              <label className="font-bold text-on-surface block mb-1">หมายเลขโทรศัพท์มือถือ</label>
              <input
                type="tel"
                placeholder="08X-XXX-XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-surface-container-low px-3 py-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary text-on-surface"
              />
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-on-surface">รหัสผ่าน</label>
              <a href="#" className="text-[11px] text-primary hover:underline">
                ลืมรหัสผ่าน?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-surface-container-low px-3 py-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary text-on-surface"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary font-display font-extrabold text-sm transition-all shadow-md mt-2"
          >
            ลงชื่อเข้าใช้ (Sign In)
          </button>
        </form>

        {/* Social OAuth Options (PDF Page 12) */}
        <div className="space-y-3 pt-2 border-t border-outline-variant/20">
          <span className="text-[11px] text-center text-outline block">หรือเข้าสู่ระบบด้วย</span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => router.push("/me")}
              className="py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container font-bold text-xs text-on-surface border border-outline-variant/30 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="text-[#00B900] font-black">LINE</span>
            </button>
            <button
              onClick={() => router.push("/me")}
              className="py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container font-bold text-xs text-on-surface border border-outline-variant/30 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="text-[#1877F2] font-black">Facebook</span>
            </button>
            <button
              onClick={() => router.push("/me")}
              className="py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container font-bold text-xs text-on-surface border border-outline-variant/30 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="text-[#EA4335] font-black">Google</span>
            </button>
          </div>
        </div>

        <p className="text-[11px] text-center text-on-surface-variant">
          ยังไม่มีบัญชีสมาชิก?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline">
            สมัครสมาชิกใหม่
          </Link>
        </p>
      </div>
    </div>
  );
}
