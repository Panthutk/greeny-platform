"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithProvider,
  signInWithEmailPassword,
  signUpWithEmailPassword,
  isSupabaseConfigured,
} from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"EMAIL" | "PHONE">("EMAIL");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);

  const isConfigured = isSupabaseConfigured();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      if (isSignUp) {
        const { data, error, simulated } = await signUpWithEmailPassword(email, password, name);
        if (error) throw error;

        setMessage({
          text: simulated
            ? "จำลองสมัครสมาชิกสำเร็จ (กำลังเปลี่ยนหน้าไปยังโปรไฟล์ของคุณ...)"
            : "สร้างบัญชีบน Supabase Cloud สำเร็จ! กำลังนำคุณเข้าสู่ระบบ...",
          type: "success",
        });
        setTimeout(() => router.push("/me"), 1000);
      } else {
        const { data, error, simulated } = await signInWithEmailPassword(email, password);
        if (error) throw error;

        setMessage({
          text: simulated
            ? "เข้าสู่ระบบสำเร็จ (โหมดจำลอง)"
            : "เข้าสู่ระบบผ่าน Supabase Auth Cloud สำเร็จ!",
          type: "success",
        });
        setTimeout(() => router.push("/me"), 800);
      }
    } catch (err: any) {
      setMessage({
        text: err?.message || "เกิดข้อผิดพลาดในการตรวจสอบสิทธิ์",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "facebook" | "line") => {
    setIsLoading(true);
    setMessage(null);

    try {
      const res = await signInWithProvider(provider);
      if (res?.simulated) {
        setMessage({
          text: `จำลองการเข้าสู่ระบบด้วย ${provider.toUpperCase()} (กรุณาระบุ Supabase Keys ใน .env เพื่อใช้งานจริง)`,
          type: "info",
        });
        setTimeout(() => router.push("/me"), 1000);
      }
    } catch (err: any) {
      setMessage({
        text: err?.message || `ไม่สามารถเชื่อมต่อ ${provider} ได้`,
        type: "error",
      });
      setIsLoading(false);
    }
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
            {isSignUp ? "สมัครสมาชิก Greeny" : "ลงชื่อเข้าใช้ Greeny"}
          </h1>
          <p className="text-xs text-on-surface-variant">
            เข้าสู่ระบบเพื่อจัดการคำสั่งซื้อ สิทธิประโยชน์ และสะสมยอดลดคาร์บอน
          </p>

          {/* Cloud Auth Status Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border border-outline-variant/30 bg-surface-container-low text-on-surface-variant">
            <span
              className={`w-2 h-2 rounded-full ${
                isConfigured ? "bg-emerald-500 animate-pulse" : "bg-amber-400"
              }`}
            ></span>
            <span>
              {isConfigured
                ? "Supabase Auth Cloud: Connected"
                : "Supabase Auth: Sandbox / Dev Mode"}
            </span>
          </div>
        </div>

        {/* Status Notification Message */}
        {message && (
          <div
            className={`p-3 rounded-2xl text-xs font-medium border animate-in fade-in ${
              message.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : message.type === "error"
                ? "bg-rose-50 border-rose-200 text-rose-800"
                : "bg-amber-50 border-amber-200 text-amber-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Method Toggle: Email vs Phone SMS */}
        {!isSignUp && (
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
        )}

        {/* Login / Sign Up Form */}
        <form onSubmit={handleAuth} className="space-y-4 text-xs">
          {isSignUp && (
            <div>
              <label className="font-bold text-on-surface block mb-1">ชื่อ-นามสกุล / ชื่อร้านค้า</label>
              <input
                type="text"
                placeholder="สมชาย รักธรรมชาติ"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-surface-container-low px-3 py-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary text-on-surface"
              />
            </div>
          )}

          {loginMethod === "EMAIL" || isSignUp ? (
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
              {!isSignUp && (
                <a href="#" className="text-[11px] text-primary hover:underline">
                  ลืมรหัสผ่าน?
                </a>
              )}
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-surface-container-low px-3 py-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary text-on-surface"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary font-display font-extrabold text-sm transition-all shadow-md mt-2 disabled:opacity-50"
          >
            {isLoading
              ? "กำลังประมวลผล..."
              : isSignUp
              ? "สร้างบัญชีใหม่ (Sign Up)"
              : "ลงชื่อเข้าใช้ (Sign In)"}
          </button>
        </form>

        {/* Social OAuth Options (PDF Page 12) */}
        <div className="space-y-3 pt-2 border-t border-outline-variant/20">
          <span className="text-[11px] text-center text-outline block">
            {isSignUp ? "หรือลงทะเบียนด่วนด้วย" : "หรือเข้าสู่ระบบด้วย"}
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleOAuthLogin("line")}
              disabled={isLoading}
              className="py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container font-bold text-xs text-on-surface border border-outline-variant/30 flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <span className="text-[#00B900] font-black">LINE</span>
            </button>
            <button
              onClick={() => handleOAuthLogin("facebook")}
              disabled={isLoading}
              className="py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container font-bold text-xs text-on-surface border border-outline-variant/30 flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <span className="text-[#1877F2] font-black">Facebook</span>
            </button>
            <button
              onClick={() => handleOAuthLogin("google")}
              disabled={isLoading}
              className="py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container font-bold text-xs text-on-surface border border-outline-variant/30 flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <span className="text-[#EA4335] font-black">Google</span>
            </button>
          </div>
        </div>

        <p className="text-[11px] text-center text-on-surface-variant">
          {isSignUp ? "มีบัญชีอยู่แล้ว? " : "ยังไม่มีบัญชีสมาชิก? "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMessage(null);
            }}
            className="text-primary font-bold hover:underline"
          >
            {isSignUp ? "เข้าสู่ระบบ (Sign In)" : "สมัครสมาชิกใหม่"}
          </button>
        </p>
      </div>
    </div>
  );
}
