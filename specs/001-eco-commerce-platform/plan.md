# Implementation Plan: Greeny Eco-Commerce Platform

**Branch**: `001-eco-commerce-platform` | **Date**: 2026-10-17 | **Spec**: [spec.md](./spec.md)

**Input**: User description from `/specs/001-eco-commerce-platform/spec.md` and explicit user guidance for Next.js 15, Supabase (`greeny_eco_db`), Prisma ORM, and Vercel.

---

## Summary

Build the production-ready Greeny Eco-Friendly Agricultural Packaging E-Commerce & Social Commerce web application by integrating the 9 Stitch HTML mockups (Phases 1–4) with the 56-page PDF specification. The system is architected as a Next.js 15 (App Router, TypeScript) application hosted on Vercel Hobby Free Tier and backed by a Supabase Free Tier PostgreSQL database (`greeny_eco_db`) managed via Prisma ORM with connection pooling, Supabase Auth, and Supabase Storage.

---

## Technical Context

- **Framework & Language**: Next.js 15 (App Router), React 19, TypeScript (Strict mode).
- **Styling & Design Tokens**: Tailwind CSS customized with exact tokens from `./econfushion/econ phase 4/stitch_greeny_eco_e_commerce_platform/eco_natural_commerce/DESIGN.md` (Leaf Green `#2EB82E`, Coral Red `#F04A42`, Forest Slate `#142918`, surface `#EFFDEF`, Plus Jakarta Sans + Be Vietnam Pro).
- **Database Engine**: Supabase Hosted PostgreSQL Free Tier (`greeny_eco_db`) via Prisma ORM.
- **Connection Architecture**: Dual-connection configuration — `DATABASE_URL` via Supabase PgBouncer Transaction Pooler (port 6543) for serverless queries; `DIRECT_URL` (port 5432) for DDL migrations and seeding.
- **Storage**: Supabase Storage buckets: `product-media`, `certification-docs`, and `social-posts`.
- **Target Hosting**: Vercel Hobby Free Tier with zero runtime operational cost.
- **Performance Targets**: <1.5s time-to-first-byte (TTFB), <150kB client JS bundle on catalog routes, <1.5s AI packaging response time.

---

## Constitution Check

*GATE: Verified against [constitution.md](../../.specify/memory/constitution.md) (v1.0.0).*

- [x] **Principle I (Source of Truth Hierarchy):** All 9 Stitch HTML prototypes and the 56-page PDF blueprint are directly mapped to components, routes, and data models.
- [x] **Principle II (Zero-Cost Production Stack):** Next.js 15 on Vercel Hobby Tier + Supabase Free Tier PostgreSQL + Prisma + Supabase Storage operates 100% within perpetual free limits.
- [x] **Principle III (Stitch Design Token Fidelity):** Color tokens, surface tints, typography pairings, and Material Symbols Outlined strictly match `DESIGN.md`.
- [x] **Principle IV (Native Thai UI & Multilingual Switcher):** Authentic Thai commercial vocabulary preserved alongside header switcher for 🇹🇭 THB (฿), 🇯🇵 JPY (¥), and 🌐 USD ($).
- [x] **Principle V (Dual-Commerce Architecture):** Native support for retail (`ขายปลีก`) and volume wholesale (`ขายส่ง` 3, 6, 12 units) across schema, checkout, and inventory.
- [x] **Principle VI (Social Commerce & AI):** Greeny Lives live streaming, UGC reviews with Lemon8 external citations, and Greeny Chat AI compression consultant integrated into core application flows.
- [x] **Principle VII (Type-Safe Schema & Quality Gates):** Prisma client type safety, zero `any` allocations, and build scripts configured for deployment.

---

## Project Structure

### Documentation (this feature)

```text
specs/001-eco-commerce-platform/
├── plan.md              # Master Implementation Plan (this document)
├── research.md          # Technical research & architectural decisions
├── data-model.md        # Relational schema specification & ERD
├── quickstart.md        # Developer setup, seed commands & deployment runbook
├── checklists/
│   └── requirements.md  # Requirements quality evaluation (18/18 verified)
└── contracts/
    ├── schema.prisma              # Production Prisma schema with connection pooling
    ├── api-routes.contract.md     # REST endpoints & server action schemas
    └── ui-components.contract.md  # Component hierarchy & 9 Stitch screen mappings
```

### Source Code Architecture (Target Workspace)

```text
greeny-platform/
├── prisma/
│   ├── schema.prisma              # Prisma ORM schema (greeny_eco_db)
│   └── seed.ts                    # Pre-populated Thai packaging products, stores & posts
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with Plus Jakarta Sans & Be Vietnam Pro fonts
│   │   ├── page.tsx               # Homepage (greeny_desktop_web_homepage, PDF Pages 3 & 10)
│   │   ├── landing/page.tsx       # Brand Landing Page (greeny_landing_page)
│   │   ├── search/page.tsx        # Search & Category Grid (greeny_desktop_search_results)
│   │   ├── store/[id]/page.tsx    # Seller Storefront (greeny_desktop_seller_storefront)
│   │   ├── product/[id]/page.tsx  # Product Detail & Reviews (greeny_desktop_product_detail_review)
│   │   ├── checkout/page.tsx      # Express Checkout (greeny_desktop_checkout)
│   │   ├── seller/
│   │   │   ├── onboarding/page.tsx# Seller Onboarding (greeny_seller_desktop_seller_onboarding)
│   │   │   ├── dashboard/page.tsx # Seller Dashboard (greeny_seller_desktop_seller_dashboard)
│   │   │   └── products/new/page.tsx# Add Product & Certifications (greeny_seller_desktop_add_product)
│   │   └── api/
│   │       ├── products/route.ts  # Filtered catalog API
│   │       ├── chat/ai/route.ts   # Greeny AI Packaging Consultant endpoint
│   │       ├── orders/checkout/route.ts # Order placement & PromptPay QR generator
│   │       └── admin/export/route.ts    # 11-column operational CSV export (PDF Page 55)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx         # Global navbar with search, cart, and region switcher
│   │   │   ├── HeaderRegionSwitcher.tsx # 🇹🇭 THB / 🇯🇵 JPY / 🌐 USD selector
│   │   │   └── Footer.tsx         # Greeny Eco footer with Help Center links
│   │   ├── home/
│   │   │   ├── HeroBanner.tsx     # Hero banner with carbon ticker
│   │   │   ├── LivesCarousel.tsx  # Greeny Lives preview cards
│   │   │   ├── ReviewsCarousel.tsx# Greeny Review cards
│   │   │   └── FlashSalesSection.tsx # Force Sales countdown clocks
│   │   ├── product/
│   │   │   ├── ProductCard.tsx    # Retail & Wholesale card with Mall badge
│   │   │   ├── WholesaleTierSelector.tsx # 3, 6, 12 pcs volume discount selector
│   │   │   └── ReviewTabs.tsx     # Specs, Star Ratings, External Lemon8 reviews
│   │   ├── cart/
│   │   │   └── CartDrawer.tsx     # Slide-out express cart ("รถเข็นหิ้วๆ")
│   │   ├── chat/
│   │   │   └── GreenyChatModal.tsx# AI & Merchant support chat dialog
│   │   └── social/
│   │       └── LiveStreamModal.tsx# Live player with "กำลังไลฟ์" shopping drawer
│   ├── context/
│   │   ├── CartContext.tsx        # Persistent client shopping cart state
│   │   └── LocaleContext.tsx      # Language & Currency conversion provider
│   └── lib/
│       ├── prisma.ts              # Global Prisma client singleton
│       └── utils.ts               # Formatting, carbon calculation & currency helpers
├── public/                        # Static assets, fallback thumbnails & SVGs
├── tailwind.config.ts             # Tailwind theme with DESIGN.md color tokens & fonts
├── vercel.json                    # Vercel zero-cost build configuration
├── .env.example                   # Supabase & Prisma environment variables template
└── package.json                   # Next.js 15, Prisma, Tailwind dependencies
```

---

## Implementation Phases

### Phase 1: Foundation, Design Tokens & Project Scaffolding
- Initialize Next.js 15 with TypeScript and Tailwind CSS.
- Configure `tailwind.config.ts` with design tokens from `DESIGN.md`.
- Setup Google Fonts (`Plus Jakarta Sans`, `Be Vietnam Pro`, `Material Symbols Outlined`).
- Setup `LocaleContext` (THB/JPY/USD) and `CartContext`.

### Phase 2: Database Schema & Seeding (`greeny_eco_db`)
- Implement `prisma/schema.prisma` from `contracts/schema.prisma`.
- Configure `DATABASE_URL` (pooler) and `DIRECT_URL` (direct).
- Create and execute `prisma/seed.ts` with all 9 Thai packaging materials, stores, and sample live posts.

### Phase 3: Core Buyer Marketplace & Stitch UI Migration
- Implement `Header` with `HeaderRegionSwitcher` and category nav.
- Build Homepage (`greeny_desktop_web_homepage`) with Hero, Lives carousel, Reviews carousel, and Force Sales timers.
- Build Search Results (`greeny_desktop_search_results`) with faceted filters.
- Build Seller Storefront (`greeny_desktop_seller_storefront`) with retail vs. wholesale views.
- Build Product Detail & Reviews (`greeny_desktop_product_detail_review`) with specs, star ratings, and external Lemon8 reviews.
- Build `CartDrawer` and Checkout page (`greeny_desktop_checkout`) with PromptPay QR payment.

### Phase 4: Social Commerce, Greeny Chat AI & Livestreaming
- Implement `GreenyChatModal` with AI packaging compression advice (`/api/chat/ai`) and bilingual support chat.
- Implement `LiveStreamModal` with interactive chat, hearts, and slide-up "กำลังไลฟ์" shopping drawer.

### Phase 5: Seller Center, Onboarding & Admin Export
- Build Seller Onboarding (`greeny_seller_desktop_seller_onboarding`).
- Build Add Product form with agricultural certifications checklist (`greeny_seller_desktop_add_product`).
- Build Seller Dashboard (`greeny_seller_desktop_seller_dashboard`) with Wallet balance and order pipelines.
- Implement Admin CSV/Excel export (`/api/admin/export`, PDF Page 55).

### Phase 6: Vercel Zero-Cost Deployment Verification
- Configure `vercel.json` with build script `prisma generate && next build`.
- Create `.env.example`.
- Verify build and bundle output (<150kB initial load).
