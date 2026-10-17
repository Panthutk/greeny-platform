"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLocale, LOCALE_CONFIGS, SupportedLocale } from "@/context/LocaleContext";

export function HeaderRegionSwitcher() {
  const { currentLocale, config, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-surface-container-low hover:bg-surface-container px-3 py-1.5 rounded-full text-on-secondary-fixed text-xs font-semibold transition-colors shadow-2xs border border-outline-variant/30"
        title="เลือกภาษาและสกุลเงิน (Change Language & Currency)"
        type="button"
      >
        <span className="text-sm">{config.flag}</span>
        <span className="hidden sm:inline">{config.label}</span>
        <span className="material-symbols-outlined text-[16px] text-outline">
          {isOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 border-b border-outline-variant/20 mb-1">
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
              ภูมิภาคและสกุลเงิน (Region & Currency)
            </span>
          </div>

          {(Object.keys(LOCALE_CONFIGS) as SupportedLocale[]).map((loc) => {
            const item = LOCALE_CONFIGS[loc];
            const isSelected = currentLocale === loc;
            return (
              <button
                key={loc}
                onClick={() => {
                  setLocale(loc);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-colors ${
                  isSelected
                    ? "bg-primary-container/15 text-primary font-bold"
                    : "text-on-surface hover:bg-surface-container-low font-medium"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{item.flag}</span>
                  <div>
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-[10px] text-on-surface-variant">
                      สกุลเงิน: {item.currency} ({item.symbol})
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
