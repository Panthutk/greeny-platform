"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useLocale } from "@/context/LocaleContext";

interface GreenyChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "AI" | "SUPPORT";
}

interface RecommendedProduct {
  id: string;
  name: string;
  image: string;
  retailPrice: number;
  storeName: string;
  rating: number;
  soldCount: number;
  highlight: string;
}

interface Message {
  id: string;
  sender: "USER" | "AI" | "SUPPORT";
  text: string;
  translatedText?: string;
  recommendedProducts?: RecommendedProduct[];
  timestamp: string;
}

const AI_KNOWLEDGE_BASE: Record<string, { analysis: string; products: RecommendedProduct[] }> = {
  glass: {
    analysis:
      "สำหรับสินค้าเปราะบาง เช่น ขวดแก้ว เซรามิก แนะนำ 'ขุยมะพร้าวอัดแผ่นกันกระแทก' ผ่านการทดสอบรับแรงตกกระทบและแรงกดทับสูงสุด 15 กิโลกรัม ย่อยสลายได้ 100% ภายใน 120 วัน หรือใช้ 'ถาดชานอ้อยขึ้นรูป' ล็อคคอขวดเพื่อความปลอดภัยสูงสุด",
    products: [
      {
        id: "prod-coir-1",
        name: "ขุยมะพร้าวอัดแผ่นกันกระแทก (ต้านแรงกด 15 kg)",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop",
        retailPrice: 75.0,
        storeName: "Green Living Crafts Thailand",
        rating: 4.98,
        soldCount: 2150,
        highlight: "ต้านแรงกดทับ 15 kg ผ่านการทดสอบขวดแก้วสมบูรณ์",
      },
      {
        id: "prod-bagasse-1",
        name: "ถาดชานอ้อยขึ้นรูปกันกระแทกสำหรับขวดแก้ว",
        image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop",
        retailPrice: 65.0,
        storeName: "สวนดินดี ออร์แกนิค",
        rating: 4.85,
        soldCount: 1670,
        highlight: "ล็อคคอขวดและก้นขวด ป้องกันการสั่นสะเทือน",
      },
      {
        id: "prod-mycelium-1",
        name: "แผ่นโฟมเห็ดชีวมวลกันกระแทก (Mycelium)",
        image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop",
        retailPrice: 89.0,
        storeName: "Green Living Crafts Thailand",
        rating: 4.92,
        soldCount: 540,
        highlight: "โฟมชีวภาพ แข็งแรงเทียบเท่า EPS ย่อยสลาย 45 วัน",
      },
    ],
  },
  default: {
    analysis:
      "สำหรับพัสดุทั่วไป แนะนำ 'ผักตบชวาอบแห้ง' หรือ 'โฟมแป้งข้าวโพดละลายน้ำ' น้ำหนักเบา ป้องกันการขยับของสินค้าได้ดีเยี่ยม และเป็นมิตรต่อสิ่งแวดล้อม 100%",
    products: [
      {
        id: "prod-hyacinth-1",
        name: "ผักตบชวาอบแห้งกันกระแทก 1 กิโลกรัม",
        image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800&auto=format&fit=crop",
        retailPrice: 59.0,
        storeName: "สวนดินดี ออร์แกนิค",
        rating: 4.95,
        soldCount: 1420,
        highlight: "สะอาด ไร้ฝุ่น อบแสงอาทิตย์ ย่อยสลาย 60 วัน",
      },
      {
        id: "prod-cornstarch-1",
        name: "โฟมแป้งข้าวโพดละลายน้ำ (Bio Peanuts)",
        image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop",
        retailPrice: 49.0,
        storeName: "Green Living Crafts Thailand",
        rating: 4.96,
        soldCount: 3100,
        highlight: "ละลายน้ำได้ใน 1 นาที ไร้สารพิษ ปลอดภัย",
      },
      {
        id: "prod-honeycomb-1",
        name: "กระดาษคราฟท์รังผึ้งย่อยสลายได้ (Honeycomb)",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop",
        retailPrice: 69.0,
        storeName: "Green Living Crafts Thailand",
        rating: 4.94,
        soldCount: 2800,
        highlight: "ยืดเป็นโครงสร้างรังผึ้ง ล็อคตัวเองไม่ต้องใช้กาว",
      },
    ],
  },
};

export function GreenyChatModal({ isOpen, onClose, initialMode = "AI" }: GreenyChatModalProps) {
  const [mode, setMode] = useState<"AI" | "SUPPORT">(initialMode);
  const [inputText, setInputText] = useState("");
  const { addToCart } = useCart();
  const { formatPrice } = useLocale();

  const [aiMessages, setAiMessages] = useState<Message[]>([
    {
      id: "msg-ai-1",
      sender: "AI",
      text: "สวัสดีครับ! ผมคือ Greeny Chat AI ผู้ช่วยด้านบรรจุภัณฑ์รักษ์โลก คุณต้องการคำแนะนำเกี่ยวกับวัสดุกันกระแทกสำหรับการจัดส่งสินค้าประเภทใดครับ?",
      timestamp: "เมื่อสักครู่",
    },
  ]);

  const [supportMessages, setSupportMessages] = useState<Message[]>([
    {
      id: "msg-sup-1",
      sender: "SUPPORT",
      text: "ยินดีต้อนรับสู่ศูนย์บริการลูกค้า Greeny เจ้าหน้าที่พร้อมช่วยเหลือคุณในภาษาไทยและภาษาอังกฤษ",
      translatedText: "Welcome to Greeny Help Center. We provide real-time bilingual support.",
      timestamp: "10:30",
    },
    {
      id: "msg-sup-2",
      sender: "USER",
      text: "How to order products?",
      translatedText: "สั่งซื้อสินค้าอย่างไร?",
      timestamp: "10:31",
    },
    {
      id: "msg-sup-3",
      sender: "SUPPORT",
      text: "คุณสามารถเลือกสินค้าลงใน 'รถเข็นหิ้วๆ' และเลือกชำระเงินผ่าน PromptPay หรือบัตรเครดิตได้เลยครับ",
      translatedText: "You can find out how to order here via Express Cart with PromptPay QR.",
      timestamp: "10:32",
    },
  ]);

  const [isAiThinking, setIsAiThinking] = useState(false);

  if (!isOpen) return null;

  const handleSendAi = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isAiThinking) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "USER",
      text: query,
      timestamp: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
    };

    setAiMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsAiThinking(true);

    try {
      const res = await fetch("/api/chat/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error("API call failed");

      const data = await res.json();
      const aiReply: Message = {
        id: `ai-${Date.now()}`,
        sender: "AI",
        text: data.analysis || "ระบบได้วิเคราะห์บรรจุภัณฑ์ที่เหมาะสมสำหรับสินค้าของคุณเรียบร้อยแล้ว",
        recommendedProducts: data.recommendedProducts || [],
        timestamp: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
      };

      setAiMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      // Fallback in case of network issue
      const isFragile = query.includes("แก้ว") || query.includes("แตก") || query.includes("15kg");
      const knowledge = isFragile ? AI_KNOWLEDGE_BASE.glass : AI_KNOWLEDGE_BASE.default;

      const aiReply: Message = {
        id: `ai-${Date.now()}`,
        sender: "AI",
        text: knowledge.analysis,
        recommendedProducts: knowledge.products,
        timestamp: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
      };

      setAiMessages((prev) => [...prev, aiReply]);
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleSendSupport = () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: `usr-sup-${Date.now()}`,
      sender: "USER",
      text: inputText,
      translatedText: inputText.includes("?") ? "Bilingual translation auto-generated" : undefined,
      timestamp: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
    };

    setSupportMessages((prev) => [...prev, userMsg]);
    setInputText("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-2xl rounded-3xl shadow-2xl border border-outline-variant/30 flex flex-col h-[650px] overflow-hidden">
        {/* Header */}
        <div className="px-space-md py-3 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-space-xs bg-surface-container-lowest p-1 rounded-full shadow-2xs border border-outline-variant/30">
            <button
              onClick={() => setMode("AI")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                mode === "AI"
                  ? "bg-primary-container text-on-primary-container shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">smart_toy</span>
              Greeny Chat AI
            </button>
            <button
              onClick={() => setMode("SUPPORT")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                mode === "SUPPORT"
                  ? "bg-forest-slate text-white shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">support_agent</span>
              แชทกับเรา (Support)
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-space-md space-y-4 bg-surface">
          {mode === "AI" ? (
            <>
              {aiMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "USER" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "AI" && (
                    <div className="w-8 h-8 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-2`}>
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.sender === "USER"
                          ? "bg-primary-container text-on-primary-container font-medium rounded-tr-xs"
                          : "bg-surface-container-lowest text-on-surface shadow-xs border border-outline-variant/30 rounded-tl-xs"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Recommended Product Cards from AI */}
                    {msg.recommendedProducts && (
                      <div className="space-y-2 mt-2 pt-1">
                        <div className="text-[11px] font-bold text-primary flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">recommend</span>
                          สินค้าแนะนำที่ผ่านการรับรองความแข็งแรง (3 ร้านค้า):
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {msg.recommendedProducts.map((p) => (
                            <div
                              key={p.id}
                              className="bg-surface-container-lowest p-2.5 rounded-xl border border-outline-variant/30 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow group"
                            >
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-full aspect-square object-cover rounded-lg bg-surface-container-low mb-1.5"
                              />
                              <div>
                                <h5 className="font-bold text-[11px] text-on-surface line-clamp-1 leading-tight">
                                  {p.name}
                                </h5>
                                <div className="text-[9px] text-on-surface-variant truncate">{p.storeName}</div>
                                <div className="text-[9px] text-primary font-semibold mt-0.5 line-clamp-1">
                                  {p.highlight}
                                </div>
                              </div>
                              <div className="mt-2 pt-1 border-t border-outline-variant/20 flex items-center justify-between">
                                <span className="font-display font-bold text-xs text-primary">
                                  {formatPrice(p.retailPrice)}
                                </span>
                                <button
                                  onClick={() =>
                                    addToCart({
                                      id: p.id,
                                      name: p.name,
                                      image: p.image,
                                      retailPrice: p.retailPrice,
                                      wholesaleTiers: [],
                                      storeName: p.storeName,
                                    })
                                  }
                                  className="p-1 rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary transition-colors"
                                  title="เพิ่มลงรถเข็น"
                                >
                                  <span className="material-symbols-outlined text-[14px]">add_shopping_cart</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-[10px] text-outline text-right">{msg.timestamp}</div>
                  </div>
                </div>
              ))}

              {isAiThinking && (
                <div className="flex gap-3 justify-start animate-in fade-in duration-200">
                  <div className="w-8 h-8 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-xs">
                    <span className="material-symbols-outlined text-[18px] animate-spin">smart_toy</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-surface-container-lowest text-on-surface shadow-xs border border-outline-variant/30 rounded-tl-xs flex items-center gap-2 text-xs">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary animate-ping"></span>
                    <span>Greeny AI กำลังวิเคราะห์คุณสมบัติวัสดุและค้นหาผลิตภัณฑ์ที่เหมาะสม...</span>
                  </div>
                </div>
              )}

              {/* Quick AI Suggestion Chips */}
              <div className="pt-2 border-t border-outline-variant/20">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">
                  คำถามยอดนิยม (Suggested Prompts):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() =>
                      handleSendAi("ฉันต้องการกันกระแทกแบบโฟมรับแรงกดทับได้ดี สำหรับส่งขวดแก้ว 15kg")
                    }
                    className="text-[11px] bg-surface-container-lowest hover:bg-surface-container-high px-2.5 py-1 rounded-full border border-outline-variant/40 text-on-surface text-left transition-colors flex items-center gap-1 shadow-2xs"
                  >
                    <span>🍾 ขวดแก้ว (ต้านแรงกด 15 kg)</span>
                  </button>
                  <button
                    onClick={() =>
                      handleSendAi("แนะนำบรรจุภัณฑ์ย่อยสลายได้สำหรับร้านเบเกอรี่และของขวัญ")
                    }
                    className="text-[11px] bg-surface-container-lowest hover:bg-surface-container-high px-2.5 py-1 rounded-full border border-outline-variant/40 text-on-surface text-left transition-colors flex items-center gap-1 shadow-2xs"
                  >
                    <span>🥐 เบเกอรี่ & คุกกี้รักษ์โลก</span>
                  </button>
                  <button
                    onClick={() => handleSendAi("วัสดุที่ละลายน้ำได้ใน 1 นาที มีอะไรบ้าง?")}
                    className="text-[11px] bg-surface-container-lowest hover:bg-surface-container-high px-2.5 py-1 rounded-full border border-outline-variant/40 text-on-surface text-left transition-colors flex items-center gap-1 shadow-2xs"
                  >
                    <span>💧 โฟมละลายน้ำได้</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Bilingual Support Chat */}
              <div className="p-2.5 rounded-xl bg-surface-container-low border border-primary/20 text-xs text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">translate</span>
                <span>ระบบเปิดใช้งานการแปลอัตโนมัติ 2 ภาษา (Real-time Thai ↔ English Translation active)</span>
              </div>

              {supportMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "USER" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender !== "USER" && (
                    <div className="w-8 h-8 rounded-xl bg-forest-slate text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">support_agent</span>
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-1`}>
                    <div
                      className={`p-3 rounded-2xl text-xs sm:text-sm ${
                        msg.sender === "USER"
                          ? "bg-primary-container text-on-primary-container font-medium rounded-tr-xs"
                          : "bg-surface-container-lowest text-on-surface shadow-xs border border-outline-variant/30 rounded-tl-xs"
                      }`}
                    >
                      <div>{msg.text}</div>
                      {msg.translatedText && (
                        <div className="mt-1 pt-1 border-t border-outline-variant/20 text-[11px] text-primary italic flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">translate</span>
                          {msg.translatedText}
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] text-outline text-right">{msg.timestamp}</div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-space-md bg-surface-container-low border-t border-outline-variant/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (mode === "AI") handleSendAi();
              else handleSendSupport();
            }}
            className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1.5 rounded-full border border-outline-variant/40 shadow-inner"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                mode === "AI"
                  ? "พิมพ์ถามคำแนะนำ เช่น วัสดุรับแรงกด 15kg สำหรับขวดแก้ว..."
                  : "พิมพ์ข้อความสอบถามเจ้าหน้าที่ (Type in Thai or English)..."
              }
              className="flex-1 bg-transparent text-xs sm:text-sm text-on-surface placeholder:text-outline focus:outline-none px-2"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary flex items-center justify-center transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
