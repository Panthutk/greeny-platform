"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart, WholesaleTier } from "@/context/CartContext";
import { useLocale } from "@/context/LocaleContext";

export interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  retailPrice: number;
  originalPrice?: number;
  wholesaleTiers?: WholesaleTier[];
  storeName: string;
  soldCount?: number;
  rating?: number;
  isMall?: boolean;
  size?: string;
  isFreeShipping?: boolean;
  isBuyOneGetOne?: boolean;
}

export function ProductCard({
  id,
  name,
  image,
  retailPrice,
  originalPrice,
  wholesaleTiers = [],
  storeName,
  soldCount = 0,
  rating = 5.0,
  isMall = true,
  size,
  isFreeShipping = false,
  isBuyOneGetOne = false,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { formatPrice } = useLocale();
  const [isLiked, setIsLiked] = useState(false);

  // Best wholesale discount calculation
  const bestTier = wholesaleTiers.length > 0
    ? [...wholesaleTiers].sort((a, b) => b.discountPct - a.discountPct)[0]
    : null;

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative">
      {/* Top Image Well */}
      <div className="relative aspect-square w-full bg-surface-container-low/60 overflow-hidden">
        <Link href={`/product/${id}`} className="block w-full h-full">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {isMall && (
            <span className="bg-forest-slate text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-[12px] text-primary-fixed">eco</span>
              Mall
            </span>
          )}
          {isBuyOneGetOne && (
            <span className="bg-coral-accent text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
              1 แถม 1
            </span>
          )}
          {isFreeShipping && (
            <span className="bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[10px]">local_shipping</span>
              ส่งฟรี
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center transition-colors shadow-2xs ${
            isLiked ? "text-coral-accent" : "text-outline hover:text-coral-accent"
          }`}
          aria-label="Wishlist toggle"
        >
          <span
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>

        {/* Wholesale Tier Ribbon (Bottom of Image) */}
        {bestTier && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 to-transparent px-2.5 py-1 text-white flex items-center justify-between text-[10px] font-medium">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px] text-primary-fixed">inventory_2</span>
              ขายส่ง {bestTier.minQty} ชิ้นขึ้นไป
            </span>
            <span className="text-primary-fixed font-bold">-{bestTier.discountPct}%</span>
          </div>
        )}
      </div>

      {/* Card Details */}
      <div className="p-3.5 flex flex-col justify-between flex-1 gap-2">
        <div>
          <div className="flex items-center justify-between text-[11px] text-on-surface-variant mb-1">
            <span className="truncate max-w-[130px] font-medium">{storeName}</span>
            <span className="text-[10px] text-outline font-semibold">Thailand</span>
          </div>

          <Link href={`/product/${id}`}>
            <h3 className="font-title-sm text-xs sm:text-sm font-bold text-on-surface line-clamp-2 hover:text-primary transition-colors leading-snug">
              {name}
            </h3>
          </Link>

          {size && (
            <div className="text-[10px] text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-md mt-1.5 inline-block font-medium">
              ขนาด: {size}
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="pt-2 border-t border-outline-variant/20 flex items-end justify-between">
          <div>
            <div className="text-[10px] text-on-surface-variant font-medium">ขายปลีก (Retail)</div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-extrabold text-base sm:text-lg text-primary leading-none">
                {formatPrice(retailPrice)}
              </span>
              {originalPrice && originalPrice > retailPrice && (
                <span className="text-[11px] line-through text-outline font-display">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
            <div className="text-[10px] text-outline mt-0.5 flex items-center gap-1">
              <span>⭐ {rating.toFixed(1)}</span>
              <span>•</span>
              <span>ขายแล้ว {soldCount >= 1000 ? `${(soldCount / 1000).toFixed(1)}พัน+` : soldCount} ชิ้น</span>
            </div>
          </div>

          <button
            onClick={() =>
              addToCart({
                id,
                name,
                image,
                retailPrice,
                wholesaleTiers,
                storeName,
                size,
                isMall,
              })
            }
            className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary flex items-center justify-center transition-all shadow-2xs hover:scale-105 shrink-0"
            title="เพิ่มลงรถเข็นหิ้วๆ"
            aria-label="Add to cart"
          >
            <span className="material-symbols-outlined text-[19px]">add_shopping_cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
