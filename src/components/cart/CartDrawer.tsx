"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLocale } from "@/context/LocaleContext";

export function CartDrawer() {
  const { isCartOpen, closeCart, items, subtotal, discountTotal, total, updateQuantity, removeFromCart } = useCart();
  const { formatPrice } = useLocale();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-2xl flex flex-col justify-between border-l border-outline-variant/30">
          {/* Header */}
          <div className="p-space-md border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
              </div>
              <div>
                <h2 className="font-title-sm text-title-sm text-on-surface font-extrabold flex items-center gap-1.5">
                  รถเข็นหิ้วๆ
                  <span className="bg-primary text-on-primary text-[11px] px-2 py-0.5 rounded-full font-bold">
                    {items.length} รายการ
                  </span>
                </h2>
                <p className="text-[11px] text-on-surface-variant">บรรจุภัณฑ์ธรรมชาติย่อยสลายได้ 100%</p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="w-8 h-8 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors"
              aria-label="Close cart"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-space-md space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-secondary mb-3">
                  <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
                </div>
                <h3 className="font-title-sm text-on-surface font-bold">รถเข็นว่างเปล่า</h3>
                <p className="text-body-sm text-on-surface-variant max-w-xs mt-1">
                  เลือกชมบรรจุภัณฑ์รักษ์โลก ผักตบชวา หรือฟางข้าว แล้วกดเพิ่มลงรถเข็นได้เลย
                </p>
                <button
                  onClick={closeCart}
                  className="mt-4 px-space-lg py-2 rounded-full bg-primary-container text-on-primary-container font-label-md hover:bg-primary hover:text-on-primary transition-all font-bold shadow-sm"
                >
                  เลือกซื้อสินค้าต่อ
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemTotal = item.retailPrice * item.quantity;
                // Check if wholesale discount applied
                const sortedTiers = [...(item.wholesaleTiers || [])].sort((a, b) => b.minQty - a.minQty);
                const matchedTier = sortedTiers.find((t) => item.quantity >= t.minQty);
                const effectiveUnitPrice = matchedTier ? matchedTier.unitPrice : item.retailPrice;
                const effectiveTotal = effectiveUnitPrice * item.quantity;
                const hasDiscount = matchedTier !== undefined;

                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-surface-container-low/40 border border-outline-variant/30 flex gap-3 relative group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover bg-surface-container-low shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          {item.isMall && (
                            <span className="bg-forest-slate text-white text-[9px] font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[10px] text-primary-fixed">eco</span>
                              Mall
                            </span>
                          )}
                          <span className="text-[11px] text-on-surface-variant truncate max-w-[160px]">
                            {item.storeName}
                          </span>
                        </div>
                        <h4 className="font-title-sm text-[13px] font-bold text-on-surface line-clamp-1 leading-snug">
                          {item.name}
                        </h4>
                        {item.size && (
                          <span className="text-[10px] text-on-surface-variant bg-surface-container px-1.5 py-0.2 rounded mt-0.5 inline-block">
                            {item.size}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <div className="font-display font-bold text-sm text-primary flex items-center gap-1">
                            {formatPrice(effectiveTotal)}
                            {hasDiscount && (
                              <span className="text-[10px] line-through text-outline">
                                {formatPrice(itemTotal)}
                              </span>
                            )}
                          </div>
                          {hasDiscount && (
                            <span className="text-[9px] font-bold text-coral-accent bg-tertiary-fixed px-1 rounded">
                              ราคาส่ง -{matchedTier?.discountPct}%
                            </span>
                          )}
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-outline-variant/40 rounded-full bg-surface-container-lowest shadow-2xs">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <span className="material-symbols-outlined text-[14px]">remove</span>
                          </button>
                          <span className="w-8 text-center text-xs font-bold font-display">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                            aria-label="Increase quantity"
                          >
                            <span className="material-symbols-outlined text-[14px]">add</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-2 right-2 text-outline hover:text-tertiary transition-colors"
                      aria-label="Delete item"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Summary & Checkout CTA */}
          {items.length > 0 && (
            <div className="p-space-md bg-surface-container-low/80 border-t border-outline-variant/30 flex flex-col gap-space-sm">
              <div className="space-y-1 text-xs text-on-surface-variant">
                <div className="flex justify-between">
                  <span>ยอดรวมสินค้า</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountTotal > 0 && (
                  <div className="flex justify-between text-coral-accent font-semibold">
                    <span>ส่วนลดราคาส่ง (Wholesale Tier)</span>
                    <span>-{formatPrice(discountTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-on-surface text-sm pt-1 border-t border-outline-variant/20">
                  <span>ยอดสุทธิ (Net Total)</span>
                  <span className="text-primary text-base font-display">{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3 rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary font-bold font-title-sm text-center transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <span>ดำเนินการสั่งซื้อ ({formatPrice(total)})</span>
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
