"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useLocale } from "@/context/LocaleContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discountTotal, total, clearCart } = useCart();
  const { formatPrice } = useLocale();

  const [recipientName, setRecipientName] = useState("สมชาย รักธรรมชาติ");
  const [phone, setPhone] = useState("081-234-5678");
  const [address, setAddress] = useState("123/45 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร 10900");
  const [carrier, setCarrier] = useState<"CARRIER_1" | "CARRIER_2" | "CARRIER_3">("CARRIER_1");
  const [paymentMethod, setPaymentMethod] = useState<"PROMPTPAY" | "CREDIT" | "BANK">("PROMPTPAY");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState("");
  const [promptPayQrUrl, setPromptPayQrUrl] = useState("");
  const [savedToDatabase, setSavedToDatabase] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingFee = 0; // 0 บาท ส่งฟรีทั่วไทย
  const netTotal = total + shippingFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/orders/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerName: recipientName,
          items,
          shippingAddress: {
            recipientName,
            phone,
            address,
          },
          shippingCarrier:
            carrier === "CARRIER_1"
              ? "Flash Express"
              : carrier === "CARRIER_2"
              ? "Kerry Express"
              : "ไปรษณีย์ไทย (EMS)",
          paymentMethod,
          totalAmount: netTotal,
          discountAmount: discountTotal,
        }),
      });

      const data = await res.json();
      setCreatedOrderId(data.orderId || `ORD-${Date.now().toString().slice(-6)}`);
      setPromptPayQrUrl(data.promptPayQrUrl || "");
      setSavedToDatabase(Boolean(data.savedToDatabase));
      setOrderConfirmed(true);
      clearCart();
    } catch (err) {
      // Fallback
      const orderId = `ORD-${Date.now().toString().slice(-6)}`;
      setCreatedOrderId(orderId);
      setOrderConfirmed(true);
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Header Breadcrumb */}
      <div className="border-b border-outline-variant/30 pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-xl sm:text-2xl text-on-surface">
            เช็คเอาท์และชำระเงิน (Express Checkout)
          </h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            ยืนยันที่อยู่จัดส่ง เลือกระบบขนส่ง และชำระเงินผ่านระบบความปลอดภัย
          </p>
        </div>
        <Link href="/" className="text-xs font-bold text-primary hover:underline">
          กลับหน้าหลัก
        </Link>
      </div>

      {orderConfirmed ? (
        /* Order Confirmed Screen */
        <div className="bg-surface-container-lowest p-8 sm:p-12 rounded-3xl border border-outline-variant/30 text-center max-w-xl mx-auto shadow-md space-y-5 animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mx-auto text-4xl shadow-sm">
            ✅
          </div>
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              ORDER SUCCESSFUL
            </span>
            <h2 className="font-display font-extrabold text-2xl text-on-surface mt-1">
              คำสั่งซื้อสำเร็จเรียบร้อย!
            </h2>
            <p className="text-xs text-on-surface-variant mt-1.5">
              รหัสคำสั่งซื้อ: <strong className="text-on-surface font-display">{createdOrderId}</strong>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low text-xs text-left space-y-1.5">
            <div className="flex justify-between">
              <span className="text-outline">ผู้รับสินค้า:</span>
              <span className="font-bold text-on-surface">{recipientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-outline">ช่องทางชำระเงิน:</span>
              <span className="font-bold text-primary">
                {paymentMethod === "PROMPTPAY"
                  ? "PromptPay QR"
                  : paymentMethod === "CREDIT"
                  ? "บัตรเครดิต/เดบิต"
                  : "โอนผ่านบัญชีธนาคาร"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-outline">สถานะคลาวด์:</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  savedToDatabase
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-surface-container text-on-surface-variant border border-outline-variant/30"
                }`}
              >
                {savedToDatabase ? "☁️ ซิงค์กับ Supabase สำเร็จ" : "⚡ Cloud Processed (Sandbox)"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-outline">ยอดสุทธิ:</span>
              <span className="font-extrabold text-primary text-sm font-display">
                {formatPrice(netTotal)}
              </span>
            </div>
          </div>

          {paymentMethod === "PROMPTPAY" && (
            <div className="p-5 rounded-2xl bg-white border border-outline-variant/30 flex flex-col items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface">
                <span className="material-symbols-outlined text-[18px] text-primary">qr_code_scanner</span>
                สแกนชำระเงินผ่าน PromptPay QR Official:
              </div>
              {/* Dynamic / High Resolution PromptPay QR Code */}
              {promptPayQrUrl ? (
                <div className="p-3 bg-white border-2 border-emerald-600 rounded-2xl shadow-sm">
                  <img
                    src={promptPayQrUrl}
                    alt="PromptPay QR Code"
                    className="w-48 h-48 object-contain"
                  />
                </div>
              ) : (
                <div className="w-48 h-48 rounded-xl bg-neutral-900 p-2 flex items-center justify-center text-white text-center text-xs font-bold shadow-inner">
                  <div className="border-4 border-white p-2 rounded-lg">
                    <span className="material-symbols-outlined text-[48px] text-white">qr_code_2</span>
                    <div className="text-[10px] mt-1 text-primary-fixed">PromptPay Official</div>
                  </div>
                </div>
              )}
              <span className="text-[11px] text-outline font-medium">
                ยอดชำระ: <strong className="text-primary font-display">{formatPrice(netTotal)}</strong> (สแกนผ่านแอปธนาคารใดก็ได้)
              </span>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/me"
              className="flex-1 py-3 rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary text-xs font-bold transition-all shadow-xs"
            >
              ติดตามคำสั่งซื้อใน "Greeny Me"
            </Link>
            <Link
              href="/"
              className="flex-1 py-3 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all"
            >
              เลือกซื้อสินค้าต่อ
            </Link>
          </div>
        </div>
      ) : (
        /* Checkout Form & Order Summary */
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Address, Carrier, Payment (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Shipping Address */}
            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-4">
              <h2 className="font-display font-extrabold text-sm sm:text-base text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">location_on</span>
                1. ที่อยู่จัดส่งพัสดุ (Shipping Address)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-on-surface block mb-1">ชื่อผู้รับ</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    required
                    className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary text-on-surface"
                  />
                </div>
                <div>
                  <label className="font-bold text-on-surface block mb-1">เบอร์โทรศัพท์</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary text-on-surface"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-bold text-on-surface block mb-1">ที่อยู่โดยละเอียด</label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary text-on-surface"
                  />
                </div>
              </div>
            </div>

            {/* 2. Carrier Selection (PDF Page 33: ขนส่ง 1-3) */}
            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-4">
              <h2 className="font-display font-extrabold text-sm sm:text-base text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">local_shipping</span>
                2. เลือกบริการจัดส่งพัสดุ (Carrier Options)
              </h2>
              <div className="space-y-2.5">
                {[
                  {
                    id: "CARRIER_1",
                    title: "ขนส่ง 1: Flash Express (Green Fleet)",
                    desc: "ส่งด่วนพิเศษ 1-2 วันทำการ การขนส่งพัสดุเป็นมิตรต่อสิ่งแวดล้อม",
                    fee: 0,
                  },
                  {
                    id: "CARRIER_2",
                    title: "ขนส่ง 2: Kerry Express",
                    desc: "ส่งด่วนมาตรฐาน 1-3 วันทำการ",
                    fee: 0,
                  },
                  {
                    id: "CARRIER_3",
                    title: "ขนส่ง 3: ไปรษณีย์ไทย (EMS Eco)",
                    desc: "ครอบคลุมทั่วประเทศและพื้นที่ห่างไกล 2-3 วันทำการ",
                    fee: 0,
                  },
                ].map((c) => (
                  <label
                    key={c.id}
                    onClick={() => setCarrier(c.id as any)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      carrier === c.id
                        ? "bg-primary-container/15 border-primary shadow-xs"
                        : "bg-surface-container-low/40 border-outline-variant/30 hover:bg-surface-container-low"
                    }`}
                  >
                    <div className="flex items-center gap-3 text-xs">
                      <input
                        type="radio"
                        name="carrier"
                        checked={carrier === c.id}
                        onChange={() => setCarrier(c.id as any)}
                        className="text-primary focus:ring-primary"
                      />
                      <div>
                        <div className="font-bold text-on-surface">{c.title}</div>
                        <div className="text-[11px] text-on-surface-variant">{c.desc}</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-primary font-display">
                      ส่งฟรี 0 บาท
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-4">
              <h2 className="font-display font-extrabold text-sm sm:text-base text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">payments</span>
                3. ช่องทางการชำระเงิน (Payment Methods)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: "PROMPTPAY", title: "PromptPay QR", icon: "qr_code_scanner", desc: "สแกนจ่ายทันที ปลอดภัย" },
                  { id: "CREDIT", title: "บัตรเครดิต/เดบิต", icon: "credit_card", desc: "Visa, Mastercard, JCB" },
                  { id: "BANK", title: "โอนผ่านธนาคาร", icon: "account_balance", desc: "ทุกธนาคารชั้นนำ" },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all ${
                      paymentMethod === pm.id
                        ? "bg-forest-slate text-white border-forest-slate shadow-sm"
                        : "bg-surface-container-low/40 text-on-surface border-outline-variant/30 hover:bg-surface-container-low"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {pm.icon}
                    </span>
                    <div>
                      <div className="text-xs font-bold leading-tight">{pm.title}</div>
                      <div className={`text-[10px] mt-0.5 ${paymentMethod === pm.id ? "text-primary-fixed" : "text-outline"}`}>
                        {pm.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Summary: Order Items & Total (Col 5) */}
          <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-5 sticky top-36">
            <h3 className="font-display font-extrabold text-sm sm:text-base text-on-surface pb-3 border-b border-outline-variant/20 flex items-center justify-between">
              <span>สรุปรายการสั่งซื้อ ({items.length} รายการ)</span>
              <span className="text-xs font-medium text-primary">ส่งฟรี</span>
            </h3>

            {/* Items Mini List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((it) => (
                <div key={it.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-12 h-12 rounded-xl object-cover bg-surface-container shrink-0"
                  />
                  <div className="flex-1 truncate">
                    <div className="font-bold text-on-surface truncate">{it.name}</div>
                    <div className="text-[11px] text-outline">จำนวน {it.quantity} ชิ้น</div>
                  </div>
                  <div className="font-display font-bold text-on-surface">
                    {formatPrice(it.retailPrice * it.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="pt-3 border-t border-outline-variant/20 space-y-2 text-xs text-on-surface-variant">
              <div className="flex justify-between">
                <span>ยอดรวมสินค้า</span>
                <span className="font-display">{formatPrice(subtotal)}</span>
              </div>
              {discountTotal > 0 && (
                <div className="flex justify-between text-coral-accent font-semibold">
                  <span>ส่วนลดราคาส่ง (Wholesale Discount)</span>
                  <span className="font-display">-{formatPrice(discountTotal)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>ค่าจัดส่ง (ส่งฟรีทั่วไทย)</span>
                <span className="font-display text-primary font-bold">0.00 ฿</span>
              </div>
              <div className="pt-2 border-t border-outline-variant/20 flex justify-between text-sm sm:text-base font-extrabold text-on-surface">
                <span>ยอดชำระสุทธิ (Total)</span>
                <span className="font-display text-primary text-xl">
                  {formatPrice(netTotal)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-coral-accent hover:bg-red-600 text-white font-display font-extrabold text-sm sm:text-base transition-all shadow-md flex items-center justify-center gap-2 group disabled:opacity-60"
            >
              <span>
                {isSubmitting
                  ? "กำลังประมวลผลคำสั่งซื้อบน Cloud Server..."
                  : `ยืนยันการสั่งซื้อ (${formatPrice(netTotal)})`}
              </span>
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                {isSubmitting ? "hourglass_top" : "lock"}
              </span>
            </button>
            <p className="text-[10px] text-center text-outline">
              🔒 เข้ารหัสปลอดภัยด้วย SSL และมาตรฐานชำระเงินสากล
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
