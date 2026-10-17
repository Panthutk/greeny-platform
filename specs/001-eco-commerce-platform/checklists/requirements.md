# Requirements Quality Checklist: Greeny Eco-Commerce Platform

**Purpose**: Validate specification completeness, wireframe alignment, design token fidelity, and architectural feasibility for `001-eco-commerce-platform`.
**Created**: 2026-10-17
**Feature**: [spec.md](../spec.md)

**Review Ownership**: Requirements-quality review artifact.
**Marker Semantics**: `[x]` means the criterion has been reviewed and satisfied for requirements quality.

---

## 1. Source of Truth & Wireframe Completeness

- [x] CHK001 All 56 pages of the specification PDF `./econfushion/แพลตฟอร์ม_เว็บไซต์(อัพเดท_ครั้ง2)_261017_195629.pdf` are mapped to user stories and functional requirements.
- [x] CHK002 Phase 1–3 buyer mockups in `./econfushion/econ lg phase1-3/stitch_greeny_eco_e_commerce_platform/` (homepage, search, product detail, checkout, lives, review, me) are referenced with exact UI routes.
- [x] CHK003 Phase 4 seller mockups in `./econfushion/econ phase 4/stitch_greeny_eco_e_commerce_platform/` (seller onboarding, add product, seller dashboard) are explicitly mapped.
- [x] CHK004 Design token rules in `./econfushion/econ phase 4/stitch_greeny_eco_e_commerce_platform/eco_natural_commerce/DESIGN.md` are integrated into UI fidelity requirements.

## 2. Zero-Cost Production Architecture & Stack

- [x] CHK005 Hosting architecture is specified for Next.js (App Router, TypeScript, Tailwind CSS) deployed on Vercel Hobby Free Tier.
- [x] CHK006 Database layer specifies Supabase Free Tier PostgreSQL (`greeny_eco_db`) utilizing Prisma ORM and connection pooling.
- [x] CHK007 Authentication layer defines Supabase Auth supporting Email, Phone OTP, and Social OAuth with Row-Level Security (RLS).
- [x] CHK008 Storage architecture defines isolated Supabase Storage buckets for `product-media`, `review-media`, and `eco-certifications`.

## 3. Dual-Commerce & Domain Fidelity

- [x] CHK009 Clear distinction between single-unit Retail (`ขายปลีก`) and volume-bracket Wholesale (`ขายส่ง` 3, 6, 12 units) is modeled across catalog, cart, and seller inventory.
- [x] CHK010 Agricultural standard certifications (`สำนักงานเกษตรอำเภอ`, `มาตรฐานเกษตรอินทรีย์`, `มผช.`, `อย.`, `GAP/GMP`, `HACCP`) are explicitly modeled with document upload flows.
- [x] CHK011 Back-Office Excel/CSV export matches the 11 operational columns specified on PDF Page 55.

## 4. UI Design System, Tokens & Localization

- [x] CHK012 Color palettes strictly preserve Fresh Leaf Green (`#2EB82E`), Force Sales Coral Red (`#F04A42`), Forest Slate (`#142918`), and daylight pale green surface `#EFFDEF`.
- [x] CHK013 Typography standards specify `Plus Jakarta Sans` for titles, buttons, and tabular numerals, and `Be Vietnam Pro` for body copy.
- [x] CHK014 Native Thai UI terminology (`ขายปลีก`, `ขายส่ง`, `กันกระแทก`, `กำลังไลฟ์`, `รถเข็นหิ้วๆ`, `ยอดลดคาร์บอนสะสม`) is preserved.
- [x] CHK015 Header region/currency switcher supports 🇹🇭 TH (THB ฿), 🇯🇵 JP (JPY ¥), and 🌐 EN (USD $).

## 5. Social Commerce & AI Assistant

- [x] CHK016 Greeny Lives live stream shopping with in-stream "กำลังไลฟ์" instant checkout drawer is specified.
- [x] CHK017 Greeny Review includes cross-platform external social reviews (`รีวิวจากที่อื่น`).
- [x] CHK018 Greeny Chat AI handles packaging compression load calculations and returns recommended store cards.

---

## Notes

- Requirements quality evaluation complete; all 18 criteria verified and satisfied.
- Ready for plan generation via `/speckit.plan`.
