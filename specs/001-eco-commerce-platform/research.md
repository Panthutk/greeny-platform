# Architecture & Technology Research: Greeny Eco-Commerce Platform

**Feature**: `001-eco-commerce-platform` | **Date**: 2026-10-17

---

## 1. Frontend Architecture & Zero-Cost Vercel Hosting

### Decision
Adopt **Next.js 15 (App Router)** with React 19 / React Server Components (RSC) and Tailwind CSS configured directly from `./econfushion/econ phase 4/stitch_greeny_eco_e_commerce_platform/eco_natural_commerce/DESIGN.md`.

### Rationale
- **Zero-Cost Free Tier Compliance:** Vercel Hobby Tier provides 100 GB bandwidth, unlimited serverless function invocations (within 100 edge middleware invocations/day and 10s max execution time). By leveraging React Server Components for catalog pages (`/`, `/search`, `/product/[id]`, `/store/[id]`), data is fetched on the server and streamed as HTML, minimizing client JS bundle sizes (<150kB initial load) and staying well within free execution limits.
- **Dynamic Client Components:** Only interactive leaves require `'use client'`:
  - `HeaderRegionSwitcher`: Manages THB/JPY/USD and TH/EN/JP currency and language state in memory/localStorage.
  - `CartDrawer` (`รถเข็นหิ้วๆ`): Slide-out cart state with optimistic UI updates.
  - `GreenyChatModal`: Dual-mode AI / Store chat interface with streaming message display.
  - `LiveStreamPlayer`: Video playback, floating reactions, live chat comment stream, and slide-up "กำลังไลฟ์" shopping drawer.
  - `SellerOnboardingForm` & `AddProductForm`: Multi-step form validation with client-side image preview and certificate upload.

### Alternatives Considered
- *Vite + SPA (React Single Page App):* Rejected because pure client-side SPAs have poor SEO for agricultural products, lack serverless API routes without a separate backend server (which would break zero-cost hosting), and have slower initial page loads on mobile networks.
- *Remix / React Router v7:* Strong server model, but Next.js 15 has native first-party optimization and automated zero-config deployments on Vercel Hobby Tier.

---

## 2. Supabase Backend, PostgreSQL (`greeny_eco_db`) & Prisma Connection Pooling

### Decision
Connect Prisma ORM to Supabase Free Tier PostgreSQL (`greeny_eco_db`) using dual-connection configuration:
- `DATABASE_URL`: Supabase Transaction Pooler URL (PgBouncer port `6543`) with `?pgbouncer=true&connection_limit=1`.
- `DIRECT_URL`: Supabase Direct Session connection (port `5432`) used strictly for Prisma migrations (`prisma migrate dev`, `prisma db push`) and seeding (`prisma/seed.ts`).

### Rationale
- **Serverless Connection Exhaustion Prevention:** In serverless environments like Vercel, every incoming HTTP request can instantiate a fresh serverless container. Connecting directly to PostgreSQL port 5432 will rapidly exceed Supabase's Free Tier connection pool limit (max ~60 direct connections). Routing serverless queries through PgBouncer on port 6543 in transaction pooling mode allows thousands of requests to share a minimal pool of persistent database connections.
- **Prisma Direct Connection for DDL:** PgBouncer does not support prepared statements across transactions and blocks DDL operations (table creation, schema alterations). Setting `directUrl = env("DIRECT_URL")` in `schema.prisma` enables Prisma CLI to bypass PgBouncer during deployment and development migrations while runtime queries route safely through the pooler.

### Alternatives Considered
- *Supabase JavaScript Client (@supabase/supabase-js) directly in frontend:* Good for client-side queries, but lacks compile-time TypeScript relation checks, automated database migrations, and complex aggregation transactions needed for wholesale tiered pricing and order settlement.
- *Drizzle ORM:* Lightweight, but Prisma provides superior schema declaration clarity, robust foreign-key constraint enforcement, and built-in studio (`npx prisma studio`) for administrative data inspection.

---

## 3. Tailwind CSS & Stitch Design Token Extraction

### Decision
Extend Tailwind CSS directly with the exact color hex codes, surface tiers, radii, and typography scales defined in `./econfushion/econ phase 4/stitch_greeny_eco_e_commerce_platform/eco_natural_commerce/DESIGN.md`:
- **Colors:**
  - `primary`: `#006E0B` (Verified Leaf Green)
  - `primary-container`: `#2EB82E` (Fresh Action Green)
  - `primary-fixed`: `#79FE6C` (Lime Green Accent)
  - `secondary`: `#4D644F` (Herbal Neutral)
  - `secondary-container`: `#CDE7CC` (Soft Botanical Tint)
  - `tertiary`: `#B72020` (System Warning / Alert)
  - `tertiary-container`: `#FF7569` (Urgency Tint)
  - `coral-accent`: `#F04A42` (Flash Sale Ribbon & Force Sales CTA)
  - `forest-slate`: `#142918` (Seller Center Navigation & High-Contrast Typography)
  - `surface`: `#EFFDEF` (Daylight Pale Green Canvas)
  - `surface-container`: `#E4F2E4`
  - `surface-container-low`: `#E9F7EA`
  - `surface-container-lowest`: `#FFFFFF`
- **Typography:**
  - `font-display`: `Plus Jakarta Sans`, sans-serif (Display, Titles, Headings, and Numbers with `font-variant-numeric: tabular-nums`)
  - `font-body`: `Be Vietnam Pro`, sans-serif (Body copy, specs, reviews, and nutritional data)
- **Icons:** Google Material Symbols Outlined loaded via Google Fonts CDN (`Material Symbols Outlined:wght,FILL@100..700,0..1`).

---

## 4. Supabase Storage Architecture & Zero-Cost Quotas

### Decision
Establish 3 dedicated Supabase Storage buckets:
1. `product-media` (Public Bucket): Catalog imagery, product diagrams, and thumbnail assets. Read access is public with cache-control `max-age=31536000, public`. Writes restricted to authenticated `SELLER` and `ADMIN` users.
2. `certification-docs` (Authenticated Restricted Bucket): Official agricultural standard certificates, GAP/GMP proofs, Organic Thailand scans, and tax invoices. Read access restricted to document owner (`storeId`) and platform admins via Supabase RLS policies.
3. `social-posts` (Public Bucket): UGC review photos, short demonstration videos, and live stream snapshot banners. Read access public. Writes allowed for authenticated users.

### File Size & Quota Guardrails:
- Maximum upload size restricted to 10 MB per file.
- Client-side image compression converts uploads to WebP before transmission, reducing average file sizes from ~4 MB to ~250 KB (ensuring the 1 GB free storage easily accommodates >4,000 product and review images).

---

## 5. Multilingual Localization & Regional Multi-Currency Engine

### Decision
Implement a zero-dependency client-side Localization & Currency Context (`LocaleContext`) supporting the 3 regions specified in PDF Pages 23–24 & 26:
- 🇹🇭 **Thailand (`th-TH`):** Primary language Thai, Currency Symbol `฿`, Code `THB`. Exchange multiplier: `1.0`.
- 🇯🇵 **Japan (`ja-JP`):** Language Japanese, Currency Symbol `¥`, Code `JPY`. Exchange multiplier: `4.1` (1 THB ≈ 4.1 JPY).
- 🌐 **Global (`en-US`):** Language English, Currency Symbol `$`, Code `USD`. Exchange multiplier: `0.028` (1 THB ≈ 0.028 USD).

### Rationale
Packaging buyers from Japan (looking to source organic water hyacinth cushioning) or international distributors need real-time price estimation without triggering heavy server recalculations. Storing prices natively in `THB` in the database and applying deterministic client-side conversion ensures consistent checkout calculations while providing instant UI currency switching.

---

## 6. Greeny Chat AI Consultation Engine

### Decision
Implement an intelligent domain-specific Eco Packaging Consultant API route (`/api/chat/ai`) that matches natural language packaging requirements to physical cushioning material specs:
- **Knowledge Base Table:**
  - *ขุยมะพร้าว (Coconut Coir):* Best for heavy/fragile goods (glass bottles, ceramic tableware). Compressive crush resistance up to 15 kg. Moisture absorption: Medium. Biodegradation: 120 days.
  - *ผักตบชวา (Water Hyacinth):* Best for general e-commerce parcels, cosmetic bottles, dried fruit containers. Crush resistance: 8 kg. High shock absorption. Biodegradation: 60 days.
  - *ก้านกล้วย (Banana Stem):* Excellent cushioning wrap for curved objects, wine bottles, and gift boxes. Crush resistance: 6 kg.
  - *ฟางข้าว (Rice Straw):* Lightweight loose-fill cushioning for apparel, books, and dry goods. Crush resistance: 4 kg.
  - *แป้งข้าวโพด (Cornstarch Foam):* 100% water-soluble packaging peanuts. Dissolves in water in 60 seconds.
  - *เส้นใยเห็ด (Mushroom Mycelium):* High-density molded foam replacement for electronics and heavy appliances. Crush resistance: 25+ kg. Fire retardant.
  - *ชานอ้อย (Sugarcane Bagasse):* Rigid molded trays and food-grade takeaway protection.

- **Response Structure:** Returns a structured JSON payload containing:
  1. `analysis`: Summary of recommended material and physical load rating.
  2. `recommendedProducts`: Array of 3 matching in-stock store product cards from the database.
