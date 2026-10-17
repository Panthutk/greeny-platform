# UI Components Contract & Screen Mapping: Greeny Eco-Commerce Platform

**Feature**: `001-eco-commerce-platform` | **Date**: 2026-10-17

---

## 1. Screen-to-Component Mapping Matrix

| # | Stitch Reference Screen & Path | Target Next.js Route | Component Type | Primary Purpose |
| :- | :--- | :--- | :--- | :--- |
| **1** | `./econfushion/econ lg phase1-3/.../greeny_desktop_web_homepage` | `/` | Server (Page) + Client (Carousels/Timer) | Main marketplace, Hero with Carbon ticker, Greeny Lives, Review carousel, Force Sales, Category grid. |
| **2** | `./econfushion/econ lg phase1-3/.../greeny_landing_page` | `/landing` | Server Component | Eco brand intro, sustainability mission, and direct "Start Shopping" portal. |
| **3** | `./econfushion/econ lg phase1-3/.../greeny_desktop_search_results` | `/search` | Server (Data) + Client (Filters) | Material search (`ผักตบ`, `ฟางข้าว`, `เห็ด`, `ชานอ้อย`, etc.), Mall filters, sales counters. |
| **4** | `./econfushion/econ lg phase1-3/.../greeny_desktop_seller_storefront` | `/store/[id]` | Server (Data) + Client (Tabs) | Store profile, sustainability badge, sidebar filters, dual `ขายปลีก` vs `ขายส่ง` catalog. |
| **5** | `./econfushion/econ lg phase1-3/.../greeny_desktop_product_detail_review` | `/product/[id]` | Server (Data) + Client (Tabs/Cart) | Image gallery, wholesale tier calculator, 3 review tabs (Specs, Star Ratings, External Lemon8 reviews). |
| **6** | `./econfushion/econ lg phase1-3/.../greeny_desktop_checkout` | `/checkout` | Client Component | Shipping address selector, 3 logistics carriers, payment methods (Credit, Bank, PromptPay), sticky summary. |
| **7** | `./econfushion/econ phase 4/.../greeny_seller_desktop_seller_onboarding` | `/seller/onboarding` | Client Component | Merchant KYC, Company/Citizen Tax ID, tax address, and payout configuration. |
| **8** | `./econfushion/econ phase 4/.../greeny_seller_desktop_add_product` | `/seller/products/new` | Client Component | Product form with agricultural certifications checklist (`GAP`, `อย.`, `Organic`), image guide, and wholesale tiers. |
| **9** | `./econfushion/econ phase 4/.../greeny_seller_desktop_seller_dashboard` | `/seller/dashboard` | Server (Data) + Client (Actions) | Store Wallet (`฿ 45,820.50`), order status counters (`ต้องจัดส่ง`, `จัดส่งแล้ว`), inventory management. |

---

## 2. Global Shared Components Contract

### `Header` (`components/layout/Header.tsx`)
- **Render Mode:** Client Component (`'use client'`)
- **Tokens:** Glassmorphic background `bg-surface-container-lowest/95 backdrop-blur-xl`, border-b `rgba(20,41,24,0.04)`.
- **Children:**
  - `BrandLogo`: Green leaf badge icon with `Greeny Eco Thailand` title.
  - `HeaderRegionSwitcher`: Dropdown for 🇹🇭 THB, 🇯🇵 JPY, 🌐 USD with country flags.
  - `SearchBar`: Pill container `bg-surface-container-low` with camera icon and search button.
  - `HeaderNavLinks`: Orders link (`receipt_long`), Cart trigger (`shopping_cart`) with badge count, Seller link (`storefront` "เปิดร้านค้า"), Notifications, User Avatar / Login trigger.
  - `CategoryNavBar`: Horizontal scrolling pills with active indicator `bg-primary-container text-on-primary-container`.

### `CartDrawer` (`components/cart/CartDrawer.tsx`)
- **Render Mode:** Client Component
- **Props:** `isOpen: boolean`, `onClose: () => void`
- **Features:** Slide-out right panel (`รถเข็นหิ้วๆ`), item quantity stepper, wholesale discount auto-calculation, checkout CTA button.

### `GreenyChatModal` (`components/chat/GreenyChatModal.tsx`)
- **Render Mode:** Client Component
- **Props:** `isOpen: boolean`, `onClose: () => void`, `initialMode?: 'AI' | 'SUPPORT'`
- **Features:** Mode toggle ("AI" vs "แชทกับเรา"), compression load query assistant, bilingual translation cards, 3 interactive product recommendation cards.

### `LiveStreamModal` (`components/social/LiveStreamModal.tsx`)
- **Render Mode:** Client Component
- **Props:** `streamId: string`, `isOpen: boolean`, `onClose: () => void`
- **Features:** Responsive video view, live viewer counter, heart particle animation on click, real-time comment chat, slide-up "กำลังไลฟ์" product drawer with instant 1-click purchase button.
