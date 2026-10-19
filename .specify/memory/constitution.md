<!--
Sync Impact Report:
- Version change: 0.0.0 (Unratified Template) -> 1.0.0 (Initial Ratification)
- Core Principles Established:
  * Principle I: Canonical Source-of-Truth Hierarchy & Spec-First Fidelity
  * Principle II: Zero-Cost Production Infrastructure & Edge Readiness
  * Principle III: Stitch Design Token Fidelity & Component Aesthetics
  * Principle IV: Native Thai UI & Multilingual Regional Switcher Fidelity
  * Principle V: Dual-Commerce Retail & Wholesale Tiered Pricing
  * Principle VI: Live Stream Commerce, Social Video Reviews & AI Assistance
  * Principle VII: Type-Safe Schema Enforcement & Strict Quality Gates
- Added Sections:
  * Zero-Cost Production Tech Stack & Architecture Constraints
  * Design System Tokens & Visual Asset Guidelines
  * Localization, Currency & Regional Configuration Matrix
  * Domain Data Models & Storage Bucket Architecture
  * Development Workflow, Testing & Quality Gates
- Deferred items / TODOs: None
-->

# Greeny Eco E-Commerce Platform Constitution

## Core Principles

### Principle I: Canonical Source-of-Truth Hierarchy & Spec-First Fidelity

All engineering specifications, data models, interaction flows, and user interfaces MUST strictly originate from and align with the canonical design and specification assets. Before proposing or implementing any feature, the relevant reference assets MUST be consulted:

1. **Functional Wireframes & App Flows (Canonical Master):** The 56-page system blueprint `./econfushion/แพลตฟอร์ม_เว็บไซต์(อัพเดท_ครั้ง2)_261017_195629.pdf` (and visual page extractions `./econfushion/pdf_pages/` or `./econ fushion/`) governs page hierarchies, interaction routes, search parameters, modal flows, and administrative processes.
2. **Phase 1–3 Buyer & Interactive Mockups:** All Stitch HTML/Tailwind templates and screenshots located in `./econfushion/econ lg phase1-3/stitch_greeny_eco_e_commerce_platform/` (covering Web Homepage, Search Results, Product Detail & Review, Express Checkout, Greeny Lives, Greeny Review, Profile/Me, Greeny Chat AI, and Creator Studio).
3. **Phase 4 Seller Portal & Design Tokens:** All merchant UI templates and the design system token specification `./econfushion/econ phase 4/stitch_greeny_eco_e_commerce_platform/eco_natural_commerce/DESIGN.md` (covering Seller Onboarding, Storefront, Add Product with Eco-Certifications, Seller Dashboard, and Wallet).

*Rationale:* The Greeny Eco Platform represents a deeply specialized eco-agricultural commerce system. Disregarding the pre-validated wireframes and Stitch mockups introduces architectural drift, breaks conversion-optimized UX patterns, and damages brand trust.

### Principle II: Zero-Cost Production Infrastructure & Edge Readiness

The entire production deployment MUST operate reliably within perpetual free-tier resource boundaries without incurring monthly infrastructure or runtime operational costs:

- **Application & Edge Hosting:** Next.js (App Router, TypeScript, Tailwind CSS) configured for zero-cost deployment on Vercel's Hobby/Free Tier. Routes MUST leverage React Server Components (RSC) and static page pre-rendering where feasible to stay within serverless compute duration quotas.
- **Database Engine:** Supabase Free Tier managing a single hosted PostgreSQL instance named `greeny_eco_db`. Connection pooling (Transaction mode via Supabase connection pooler / PgBouncer port 6543) MUST be utilized for serverless route handlers to prevent connection exhaustion.
- **Data Access Layer:** Prisma ORM MUST be used for type-safe schema modeling, relational integrity, migrations, and query generation.
- **Authentication & Security:** Supabase Auth handles email/password, magic link, and OAuth sessions. Row-Level Security (RLS) policies MUST be enforced on all PostgreSQL tables to prevent unauthorized data access across Buyer and Seller roles.
- **Blob & Media Storage:** Supabase Storage Free Tier (within the 1 GB quota) partitioned into dedicated public/restricted buckets.

*Rationale:* Sustainable commercial software for local agricultural collectives and eco-merchants demands rock-solid financial discipline. The architecture must guarantee zero hosting costs during development, beta validation, and early-stage production.

### Principle III: Stitch Design Token Fidelity & Component Aesthetics

User interfaces MUST strictly preserve the color palettes, typography scales, border radii, elevations, and Tailwind class hierarchies defined in `./econfushion/econ phase 4/stitch_greeny_eco_e_commerce_platform/eco_natural_commerce/DESIGN.md` and the Phase 1–3 Stitch prototypes:

- **Color Roles & Accents:**
  - *Buyer Primary & Eco Credentials:* Fresh Leaf Green `#2EB82E` / `#006E0B` (lime green accents `#8CE62E` / `#79FE6C` for badges and sustainability progress meters).
  - *Urgency, Flash Deals & Force Sales:* Coral Red `#F04A42` / `#F25C54` / `#B72020` for countdown ribbons, discount badges, and "Buy Now" CTAs.
  - *Seller Center & Structural Neutrals:* Forest Slate `#142918` for merchant portal sidebars, primary titles, and active nav states.
  - *Surfaces & Wells:* Base canvas `#FAFAFA`, tinted surface `#EFFDEF`, card surface `#FFFFFF`, and product well `#F2F5F2` / `#F5F8F5`.
- **Typography:** Display, headlines, button labels, and numerical/monetary values MUST use `Plus Jakarta Sans` (`font-variant-numeric: tabular-nums`). Body copy, item descriptions, and nutritional specifications MUST use `Be Vietnam Pro`.
- **Iconography & Shapes:** Use Google Material Symbols Outlined (`material-symbols-outlined`). Corners follow token radii (`rounded-xl` for cards, `rounded-full` for CTAs, chips, and search bars).

*Rationale:* Consistency across buyer and seller viewports reinforces brand credibility, separates commercial urgency from ecological trust, and prevents ad-hoc CSS fragmentation.

### Principle IV: Native Thai UI & Multilingual Regional Switcher Fidelity

The platform is built native-first for the Thai agricultural and eco-packaging market while providing immediate cross-border commerce support:

- **Authentic Thai UI Copy:** Exact commercial terminology from the PDF and Stitch mockups MUST be used, including:
  - `ขายปลีก` (Retail / Individual item purchase)
  - `ขายส่ง` (Wholesale / Tiered volume pricing)
  - `กันกระแทก` (Eco Cushioning: ผักตบชวาอบแห้ง, แป้งข้าวโพด, ก้านกล้วย, ชานอ้อย, ขุยมะพร้าว, ฟางข้าว, เส้นใยเห็ด mycelium)
  - `กำลังไลฟ์` (Currently Live broadcasting)
  - `รถเข็นฟิ้วๆ` (Express quick cart / fast-checkout drawer)
  - `ยอดลดคาร์บอนสะสม` (Cumulative Carbon Offset Metric, e.g., kg CO₂e saved)
  - `ดีลพิเศษ Force Sales` (Time-delimited campaign sales)
- **Header Regional Switcher:** The global header MUST feature a persistent locale/region dropdown as demonstrated in PDF Pages 23–24 & 26:
  - 🇹🇭 **ไทย (TH):** Language Thai, Currency บาท (THB ฿), local delivery & PromptPay.
  - 🇯🇵 **Japan (JP):** Language Japanese, Currency 円 (JPY ¥), cross-border freight options.
  - 🌐 **Global / English (EN):** Language English, Currency USD ($), international card rails.

*Rationale:* Greeny connects domestic Thai rural eco-producers directly with domestic urban consumers and international sustainability buyers. Preserving exact Thai commercial idioms and multi-currency switching is central to market adoption.

### Principle V: Dual-Commerce Retail & Wholesale Tiered Pricing

The product catalog, checkout pipeline, and inventory management MUST support dual transaction modes:

- **Retail (`ขายปลีก`):** Single-unit consumer sales, standard cart mechanics, consumer vouchers, and retail parcel shipping.
- **Wholesale (`ขายส่ง`):** B2B volume pricing with clear quantity break tiers (e.g., Tier 1: 1 unit standard; Tier 2: 3–5 units -10%; Tier 3: 6–11 units -15%; Tier 4: 12+ units -25%) as specified in PDF Pages 38–39. Wholesale orders display packaging dimensions, bundle weight, and bulk pallet logistics calculations.

*Rationale:* Agricultural packaging producers (e.g., water hyacinth cushion makers, molded cassava starch packagers) rely on bulk orders from commercial e-commerce shops to achieve operational scale.

### Principle VI: Live Stream Commerce, Social Video Reviews & AI Assistance

Greeny is a social and content-driven eco-marketplace:

- **Greeny Lives:** Video livestreaming channels (PDF Pages 4, 47–48) featuring real-time presenter demonstrations, pinned products ("กำลังไลฟ์"), viewer counts, heart reactions, and 1-click in-stream purchasing.
- **Greeny Review & External Aggregator:** UGC photo/video reviews (PDF Pages 28–30, 49–50) with sub-ratings for product quality (`สินค้า`), merchant service (`ร้านค้า`), and eco-delivery packaging (`ขนส่ง`), accompanied by external cross-platform reviews (`รีวิวจากที่อื่น`).
- **Greeny Chat AI:** Embedded AI assistant (PDF Pages 25–26) capable of recommending specific natural cushioning materials based on compressive strength (e.g., coconut coir padding tested up to 15 kg for glass shipping) and bilingual customer support.

*Rationale:* Video demonstration is vital to prove that natural organic packaging performs as effectively as petroleum plastics.

### Principle VII: Type-Safe Schema Enforcement & Strict Quality Gates

All code contributions MUST pass automated checks:

- Strict TypeScript (`strict: true`, zero `any` allocations in domain entities).
- Prisma schema migrations with foreign key constraints, indexes on high-frequency search fields (material type, eco-certifications, merchant ID), and audit timestamps.
- Zero-warning ESLint / Tailwind CSS formatting.
- Unit and contract tests for critical paths: pricing calculations, wholesale tier discount resolution, carbon savings metrics, and checkout order creation.

*Rationale:* High transaction reliability and zero data corruption are mandatory for seller payouts and buyer order fulfillment.

---

## Zero-Cost Production Tech Stack & Architecture Constraints

### 1. Compute & Framework

| Component | Technology | Free Tier Allocation & Guardrails |
| :------------------- | :------------------- | :------------------------------------------------------ |
| **Framework** | Next.js (App Router) | React Server Components, server actions, route handlers |
| **Language** | TypeScript | Strict null checks, zero unchecked runtime conversions |
| **Styling** | Tailwind CSS v3/v4 | Custom theme extended with `DESIGN.md` tokens |
| **Deployment** | Vercel Hobby Tier | Zero cost, edge middleware, static ISR where applicable |

### 2. Database & Data Access

| Component          | Technology                              | Free Tier Allocation & Guardrails                     |
| :----------------- | :-------------------------------------- | :---------------------------------------------------- |
| **Database** | Supabase PostgreSQL (`greeny_eco_db`) | 500 MB database, connection pooling via port 6543     |
| **ORM**      | Prisma ORM                              | Automated migrations, typed client, schema validation |
| **Auth**     | Supabase Auth                           | Up to 50,000 MAU free, RLS policies on all tables     |
| **Storage**  | Supabase Storage                        | 1 GB shared across dedicated buckets                  |

### 3. Supabase Storage Buckets

1. `product-media`: Product catalog imagery, packaging diagrams, and thumbnail assets.
2. `review-media`: Customer unboxing photos and video shorts for Greeny Review.
3. `eco-certifications`: Seller legal documents, GAP/GMP certificates, Organic Thailand stamps, and agricultural cooperative verification letters.
4. `live-thumbnails`: Stream preview cards and seller studio banners.

---

## UI Design System, Visual Fidelity & Token Standards

The styling engine MUST align with the tokens extracted from `./econfushion/econ phase 4/stitch_greeny_eco_e_commerce_platform/eco_natural_commerce/DESIGN.md`:

```css
/* Core Color Palette Tokens */
--color-primary: #006E0B;             /* Verified Eco Forest Green */
--color-primary-container: #2EB82E;   /* Fresh Leaf Green Primary CTA */
--color-primary-fixed: #79FE6C;       /* Lime Green Accent */
--color-secondary: #4D644F;           /* Herbal Neutral */
--color-secondary-container: #CDE7CC; /* Soft Botanical Tint */
--color-tertiary: #B72020;            /* Urgency & System Warning */
--color-tertiary-container: #FF7569;  /* Force Sales Coral */
--color-surface: #EFFDEF;             /* Daylight Pale Green Canvas */
--color-surface-container-lowest: #FFFFFF; /* Pure Card White */
--color-on-surface: #131E16;          /* High-Contrast Charcoal Green */
--color-forest-slate: #142918;        /* Seller Portal Anchor & Typography */
--color-coral-accent: #F04A42;        /* Flash Deal & Countdown Ribbons */
```

### Component Guidelines

- **Primary Buttons:** Background `#2EB82E`, text `#FFFFFF`, rounded pill (`rounded-full`), hover brightness `#279F27`.
- **Urgent / Buy Now Buttons:** Background `#F04A42` or `#F25C54`, text `#FFFFFF`, font weight bold.
- **Eco Verification Badges:** Container `#EAF8EB`, text `#142918`, with leaf icon (`eco` / `verified`).
- **Product Listing Cards:** Clean white `#FFFFFF` surface, 16px radius (`rounded-xl`), 1px vegetal border `rgba(20, 41, 24, 0.06)`, and `#F5F8F5` product image background wells.

---

## Localization, Currency & Regional Configuration Matrix

| Locale Code | Country / Region          | Currency Symbol | Currency Code | Primary Languages       | Target Market                            |
| :---------- | :------------------------ | :-------------- | :------------ | :---------------------- | :--------------------------------------- |
| `th-TH`   | Thailand 🇹🇭             | ฿              | THB           | Thai (Primary), English | Domestic Thai consumer & SME packaging   |
| `ja-JP`   | Japan 🇯🇵                | ¥              | JPY           | Japanese, English       | Export of organic hyacinth & craft goods |
| `en-US`   | Global / International 🌐 | $               | USD           | English                 | Global sustainable B2B buyers            |

---

## Domain Data Models & Core Schemas

The Prisma schema for `greeny_eco_db` MUST model the following bounded contexts:

1. **Users & Profiles:** Buyer and Seller roles, carbon offset counter (`carbon_saved_kg`), language/currency preference.
2. **Merchants & Stores:** Store name, verification tier (`Green Mall Lvl 1-5`), sustainability score, official registration documents.
3. **Products & Variants:** SKU, category (cushioning, tableware, bags, raw fibers), retail price, wholesale tiered price brackets (`min_qty`, `unit_price`, `discount_pct`), eco-certifications (Organic Thailand, GAP, GMP, HACCP, Community Enterprise).
4. **Orders & Shipments:** Dual-mode order tracking (`pending`, `packed`, `shipped`, `delivered`, `return_requested`), tracking number, eco-packaging verification.
5. **Livestreams & Products:** Stream URL/status, pinned live products, live chat comments, live view metrics.
6. **Reviews & Media:** Star ratings (product, shipping, shop), image/video attachment URLs, external source citations (`รีวิวจากที่อื่น`).
7. **Greeny Wallet & Payouts:** Available balance, pending settlement, bank/PromptPay destination details, withdrawal logs.

---

## Development Workflow & Quality Gates

1. **Specification & Plan Prerequisite:** Every non-trivial change MUST start with a Spec Kit specification (`/speckit.specify`) cross-referencing the wireframe page numbers and Stitch prototype directories.
2. **Component Reuse:** Common components (Header, Regional Switcher, ProductCard, WholesaleTierBadge, EcoCertTag, BottomCheckoutBar) MUST live in reusable modules with Storybook/unit tests.
3. **Environmental Metrics Integrity:** Carbon savings calculations (e.g., standard formula: `weight_kg * eco_factor = kgCO2e saved`) MUST be deterministic and unit-tested.
4. **Free Tier Resource Guardrails:**
   - Image assets MUST be compressed (WebP/AVIF) prior to storage upload.
   - Database queries MUST avoid unindexed full table scans.
   - Serverless functions MUST complete within standard 10-second Hobby execution limits.

---

## Governance

- **Supremacy:** This Constitution is the authoritative engineering rulebook for the Greeny Eco E-Commerce Platform. Code, schemas, and PRs inconsistent with this document MUST NOT be approved or merged.
- **Amendments:** Modifying principles or architecture constraints requires updating this file with a semantic version increment, updated ratification metadata, and an explicit Sync Impact Report detailing the amendment rationale.
- **Audit Cadence:** Before each development milestone or deployment phase, the active implementation MUST be audited against this constitution for token preservation, tech stack compliance, and wireframe fidelity.

**Version**: 1.0.0 | **Ratified**: 2026-10-17 | **Last Amended**: 2026-10-17
