# Feature Specification: Greeny Eco-Friendly Agricultural Packaging E-Commerce & Social Commerce Platform

**Feature Branch**: `001-eco-commerce-platform`

**Created**: 2026-10-17

**Status**: Draft

**Input**: User description: "Build the complete Greeny Eco-Friendly Agricultural Packaging E-Commerce & Social Commerce web application by combining the Stitch HTML mockups in `./econfushion/econ lg phase1-3` and `./econfushion/econ phase 4` with the 56-page PDF specification: Phase 1 (Core Buyer E-Commerce), Phase 2 (Greeny AI Chat & Social Community), Phase 3 (Auth, Buyer Dashboard & Content Creation), Phase 4 (Seller Center & Back-Office Data)."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Core Buyer Catalog, Search & Express Checkout (Priority: P1)

A consumer or commercial business packaging buyer visits Greeny to discover, filter, evaluate, and purchase sustainable agricultural packaging materials (dried water hyacinth, rice straw, pressed mycelium, cassava cornstarch, banana stem, sugarcane bagasse, and coconut coir) in both single-unit retail (`ขายปลีก`) and bulk wholesale (`ขายส่ง`) volume tiers, completing an express checkout with localized carriers and payment rails.

**Why this priority**: Represents the core commercial monetization loop of the Greeny platform. Without a working buyer storefront, product details, wholesale tier pricing, and checkout pipeline, no transactions can take place.

**Independent Test**: A user can navigate from the homepage to search results for `ผักตบกันกระแทก`, inspect the dual retail/wholesale prices on the product detail page, select a 3-unit wholesale tier, add to `รถเข็นหิ้วๆ`, proceed to checkout, select `ขนส่ง 1` and `PromptPay`, and place a confirmed order delivering an order confirmation token.

**Acceptance Scenarios**:

1. **Given** a buyer on the Homepage (`greeny_desktop_web_homepage`, PDF Pages 3 & 10), **When** they view the header, **Then** they see the brand logo with leaf icon, search bar with camera prompt, tri-lingual/currency switcher (🇹🇭 THB, 🇯🇵 JPY, 🌐 USD), cart icon with badge (`12`), order tracking link, and "เปิดร้านค้า" link.
2. **Given** a buyer viewing promotional sections, **When** they scroll the homepage, **Then** they encounter the Hero banner with carbon savings indicator (`1,480,250 kg CO₂`), the "Greeny Lives" preview cards with pulsing LIVE indicators and viewer counts, the "Greeny Review" carousel, the "Force Sales" flash deal countdown clocks (`00:60:00`, `24:00:00`, special day, clearance), and category cards.
3. **Given** a buyer searching for packaging materials (`greeny_desktop_search_results`, PDF Pages 23–24), **When** they type `กันกระแทก` or click a category pill (`ผักตบ`, `ฟางข้าว`, `เห็ด`, `ชานอ้อย`, `แป้งข้าวโพด`, `ก้านกล้วย`, `ขุยมะพร้าว`), **Then** the catalog displays verified `Mall` badges, discount tags (`-10%`), sales counters (`ขายแล้ว 1พัน+`), and origin tags (`Thailand`).
4. **Given** a buyer visiting a merchant storefront (`greeny_desktop_seller_storefront`, PDF Page 27), **When** they view the store catalog, **Then** they can filter by price, quantity (2–10 pieces), dimensions, color, and brand, and toggle between `ขายปลีก` (single unit) and `ขายส่ง` (tiered discounts for 3, 6, and 12 units).
5. **Given** a buyer on the Product Detail Page (`greeny_desktop_product_detail_review`, PDF Pages 28–31), **When** they inspect the product, **Then** they can view high-resolution imagery, toggle between the 3 review tabs (`รายละเอียด` [Specs], `รีวิวคะแนน` [Star ratings with photo/video sub-filters for ขนส่ง/สินค้า/ร้านค้า], and `รีวิวจากที่อื่น` [Cross-platform Lemon8/social upcycling reviews]), click "Shop Chat", or click "รถเข็นหิ้วๆ" to open the slide-out cart.
6. **Given** a buyer in Checkout (`greeny_desktop_checkout`, PDF Page 33), **When** they finalize an order, **Then** they select or enter a shipping address, choose from 3 logistics carriers (`ขนส่ง 1-3`), select a payment method (Credit/Debit Card, Bank Transfer, or PromptPay QR), and review a sticky breakdown of item subtotal, shipping fee, eco-voucher discount, and total THB.

---

### User Story 2 - Greeny Seller Center, Catalog Management & Eco-Certifications (Priority: P2)

An agricultural producer, eco-artisan cooperative, or packaging vendor registers an official store, uploads products with certified agricultural standards, tracks pending orders across fulfillment stages, manages wholesale volume discounts, and views earnings in the Greeny Wallet.

**Why this priority**: Without merchant onboarding and catalog creation, the marketplace lacks inventory. Sustainable packaging buyers require rigorous verification of eco-standards (GAP, GMP, Organic Thailand, Community Enterprise).

**Independent Test**: An authenticated merchant can complete store onboarding (`greeny_seller_desktop_seller_onboarding`, PDF Page 36), submit an agricultural packaging product with wholesale quantity discounts and an uploaded standard certificate (`greeny_seller_desktop_add_product`, PDF Page 37), and verify that the product appears in their Seller Dashboard (`greeny_seller_desktop_seller_dashboard`, PDF Pages 38–39) and public storefront.

**Acceptance Scenarios**:

1. **Given** a new vendor clicking "เปิดร้านค้า" (`greeny_seller_desktop_seller_onboarding`, PDF Page 36), **When** they fill out the registration form, **Then** the system captures seller identity (Full Name/Company, Tax ID, Citizen ID), tax invoice address, store details, and payout channels (PromptPay ID, Bank Account, or Credit/Debit).
2. **Given** a registered seller adding a product (`greeny_seller_desktop_add_product`, PDF Page 37), **When** they input product data, **Then** they can upload product images (with label guide prompts), define title, retail price, wholesale volume tiers (3, 6, 12 units), promotional tags (BOGO / ส่งฟรี / Flash Sale countdown), nutritional/material composition, usage instructions, and safety warnings.
3. **Given** a seller adding an agricultural product, **When** they reach the compliance section, **Then** they can check relevant agricultural certification badges (`สำนักงานเกษตรอำเภอ`, `มาตรฐานเกษตรอินทรีย์`, `มาตรฐานผลิตภัณฑ์ชุมชน (มผช.)`, `อย.`, `GAP/GMP`, `HACCP`, `อื่นๆ ระบุ`) and upload scanned certificate documents (PDF/PNG/JPG).
4. **Given** an active seller accessing the Seller Dashboard (`greeny_seller_desktop_seller_dashboard`, PDF Pages 38–39), **When** they review daily operations, **Then** they see their Greeny Wallet balance (`฿ 45,820.50`), carbon reduction metric (`ลดคาร์บอน 342 kgCO2e`), order status counters (`ต้องจัดส่ง`, `จัดส่งแล้ว`, `คำขอคืนเงิน/คืนสินค้า/ยกเลิก`), quick-response chat bar, and stock toggles for retail (`ขายปลีก`) and wholesale (`ขายส่ง`).
5. **Given** a store manager or platform admin, **When** they navigate to Back-Office Data Export (PDF Page 55), **Then** they can generate a structured CSV/Excel export matching the 11 operational dimensions: Seller Username, Affiliate ID, Affiliate Fee, Product Specs, Certifications, Ad Fee, Selling Fee, Buyer Info, Payment Channel, Cancellation State, and Carrier.

---

### User Story 3 - Greeny AI Chat & Interactive Live Commerce (Priority: P3)

A buyer seeks technical packaging advice from the specialized Greeny AI Assistant regarding material compression strengths, or joins interactive Greeny Lives streams to watch live physical packaging durability demonstrations, interact with presenters in real-time chat, and purchase featured products directly inside the broadcast view.

**Why this priority**: Eco-packaging requires experiential proof. Buyers need immediate answers regarding load-bearing capacity (e.g. glass bottle shipping), and social live streams provide proof-of-work that natural materials replace petrochemical bubble wrap.

**Independent Test**: A user can open Greeny Chat (`PDF Pages 25–26`), ask a compression question in Thai or English, receive an AI response highlighting compressive limits (e.g., coconut coir up to 15kg) with 3 recommended product cards, navigate to a Greeny Lives stream (`PDF Pages 4–7`), view the live chat feed, and trigger the "กำลังไลฟ์" slide-up drawer to add the live-demonstrated item directly to cart.

**Acceptance Scenarios**:

1. **Given** a user opening Greeny Chat (`PDF Pages 25–26, 32`), **When** they select "AI" mode, **Then** they can submit natural language inquiries (e.g., "ฉันต้องการกันกระแทกแบบโฟมรับแรงกดทับได้ดี สำหรับส่งขวดแก้ว"), and the AI returns a summarized material recommendation ("ขุยมะพร้าวกันกระแทก ผ่านการทดสอบขนส่งขวดแก้วได้สมบูรณ์ ต้านแรงกดทับสูงสุด 15 กิโลกรัม") along with 3 interactive merchant product cards.
2. **Given** a buyer chatting with a seller or support agent in "แชทกับเรา" mode (`PDF Pages 26 & 32`), **When** messages are sent in English or Thai, **Then** the chat displays dual-language auto-translation ("How to order products?" / "สั่งซื้อสินค้าอย่างไร").
3. **Given** a user in the Greeny Lives section (`greeny_lives_desktop`, PDF Pages 4–7), **When** they enter an active stream, **Then** the interface renders the video player, presenter profile (`GreenyBKK`), live viewer counter, heart reactions counter, scrolling chat comments, and a floating "กำลังไลฟ์" product card showing current promotional price.
4. **Given** a viewer watching a live stream, **When** they click the floating product or the bottom shopping bag icon, **Then** a drawer slides up displaying featured stream products with 1-click "ซื้อ" (Buy Now) buttons without interrupting stream playback.
5. **Given** a user exploring Greeny Review (`greeny_review_desktop_1`, PDF Pages 8–9, 49–50), **When** they open a review post, **Then** they can view multi-media galleries (photos/videos), read community upcycling experiences, like (`🤍`), bookmark, and post comments or replies.

---

### User Story 4 - Buyer Account, Social Profiles & UGC Creator Studio (Priority: P4)

A registered buyer logs into Greeny via multi-channel auth, tracks order fulfillment across 4 lifecycle stages in "Greeny Me", manages their Greeny Wallet, publishes unboxing reviews or live stream broadcasts via Creator Studio, and configures privacy and notification settings.

**Why this priority**: Retains users, drives viral UGC (User-Generated Content), establishes customer order accountability, and allows buyers to become eco-affiliates or content creators.

**Independent Test**: A user can authenticate via email or mock OTP (`PDF Page 12`), view their order progress in "Greeny Me" (`PDF Page 13`), open the Creator Studio (`PDF Pages 19–20`), create a new photo review with agricultural tags, and verify that the post appears under their public social profile tab.

**Acceptance Scenarios**:

1. **Given** an unauthenticated visitor (`PDF Page 12`), **When** they click "ลงชื่อเข้าใช้", **Then** they can choose between Email/Password login, Phone SMS OTP login, or social OAuth (Google, LINE, Facebook).
2. **Given** an authenticated user accessing "Greeny Me" (`PDF Pages 11, 13`), **When** they inspect their dashboard, **Then** they see their profile photo, Greeny Wallet balance, carbon offset tally, 4 order status tabs (`ต้องชำระเงิน`, `เตรียมจัดส่ง`, `ต้องได้รับ`, `รีวิวคะแนน`), and 4 history filters (`ถูกใจสินค้า`, `ดูสินค้า`, `ซื้อสินค้า`, `ซื้อสินค้าซ้ำ`).
3. **Given** a user visiting their public profile (`PDF Pages 14–15`), **When** they view their storefront/creator space, **Then** they see follower counts, following counts, bio, and 4 content tabs: Posts (`รูปถ่าย/วิดีโอ`), Products (`สินค้า`), Eco Reposts (`รีโพสต์`), and Private Bookmarks.
4. **Given** a user clicking the Creator Studio "+" button (`greeny_creator_studio_desktop`, PDF Pages 19–20), **When** they create content, **Then** they can upload up to 10 photos or video clips, tag related eco-products, write title and description, assign hashtags, and publish to the live feed.
5. **Given** a user managing account security (`PDF Pages 16–17, 51–54`), **When** they navigate to settings, **Then** they can toggle push notifications, chat alerts, review policy documents, and submit support tickets to Greeny Direct.

---

### Edge Cases

- **Mixed Retail & Wholesale Cart**: When a buyer adds 1 retail item (`ขายปลีก`) and 10 wholesale items (`ขายส่ง`) from different merchants, the cart MUST calculate shipping rates per seller and apply wholesale discounts only to qualifying tiers without corrupting retail line items.
- **Dynamic Multi-Currency Conversion**: When the user switches the header switcher from 🇹🇭 THB to 🇯🇵 JPY or 🌐 USD, all rendered prices across catalog, cards, and cart MUST convert deterministically using stored conversion rates without causing React hydration mismatches.
- **Missing or Expired Agricultural Certifications**: If a seller submits unverified certificates or certificates expire, the system MUST flag the product badge as "Pending Verification" (`รอการตรวจสอบ`) and withhold the verified `Mall` green badge.
- **Zero-Cost Supabase Connection Pooling**: High concurrent traffic on Vercel serverless functions MUST route through Supabase Transaction Pooler (port 6543) with prepared statements disabled to avoid hitting connection limits.
- **Media Upload Size Enforcement**: Uploads in Creator Studio and Seller Onboarding MUST reject files exceeding 10MB and automatically compress raster images into WebP before saving to Supabase Storage.

---

## Requirements *(mandatory)*

### Functional Requirements

#### Catalog & E-Commerce Core (Phase 1)
- **FR-001**: System MUST provide a responsive global navigation header containing brand logo, search input with camera trigger, tri-lingual/currency dropdown (THB/JPY/USD), order tracker, cart drawer trigger with item badge, and "เปิดร้านค้า" portal link.
- **FR-002**: System MUST render a promotional Hero Banner displaying the cumulative carbon offset metric (`ยอดลดคาร์บอนสะสม`) in kg CO₂.
- **FR-003**: System MUST display "Greeny Lives" and "Greeny Review" interactive carousels with video badges, live viewer counts, and creator avatars.
- **FR-004**: System MUST render "Force Sales" flash deal sections supporting 4 distinct countdown types: 1-hour flash (`00:60:00`), daily deal (`24:00:00`), special campaign day, and clearance stock.
- **FR-005**: System MUST provide search and faceted filtering by eco-material category (`ผักตบชวา`, `ฟางข้าว`, `เส้นใยเห็ด mycelium`, `ชานอ้อย`, `แป้งข้าวโพด`, `ก้านกล้วย`, `ขุยมะพร้าว`).
- **FR-006**: System MUST support dual-pricing display on product cards and storefronts, clearly differentiating Retail (`ขายปลีก` - 1 unit) and Wholesale (`ขายส่ง` - 3, 6, 12+ bulk tiers).
- **FR-007**: System MUST render 3 tabbed sections on product detail pages: Product Specifications (`รายละเอียด`), Star Ratings (`รีวิวคะแนน` with sub-scores for สินค้า, ขนส่ง, and ร้านค้า), and External Social Reviews (`รีวิวจากที่อื่น`).
- **FR-008**: System MUST support express slide-out cart (`รถเข็นหิ้วๆ`) allowing instant quantity adjustment and discount voucher entry.
- **FR-009**: System MUST provide a checkout view supporting delivery address management, 3 carrier selection options (`ขนส่ง 1-3`), and 3 payment methods (Credit/Debit Card, Bank Transfer, PromptPay QR).

#### AI Assistant & Live Social Commerce (Phase 2)
- **FR-010**: System MUST provide Greeny Chat with a dual-mode toggle between "AI" (automated eco consultant) and "แชทกับเรา" (direct merchant/support chat).
- **FR-011**: In AI Chat mode, the system MUST process packaging inquiries and return technical durability answers (compressive crush strength, moisture resistance) paired with 3 recommended product cards.
- **FR-012**: In Support/Store Chat mode, the system MUST provide bilingual auto-translation between Thai and English.
- **FR-013**: System MUST render a live stream player with stream title, presenter info, live viewer counter, heart reactions, and scrolling chat messages.
- **FR-014**: System MUST provide a slide-up "กำลังไลฟ์" product drawer inside the live player enabling in-stream checkout without pausing playback.
- **FR-015**: System MUST render social review feeds with multi-image/video support, like counts, and threaded discussion comments.

#### Authentication, Buyer Account & Creator Studio (Phase 3)
- **FR-016**: System MUST authenticate users via Email/Password, Phone OTP, and Social OAuth (Google, LINE, Facebook) integrated with Supabase Auth.
- **FR-017**: System MUST provide a "Greeny Me" dashboard displaying Greeny Wallet balance, carbon offset achievements, and 4 order status trackers (`ต้องชำระเงิน`, `เตรียมจัดส่ง`, `ต้องได้รับ`, `รีวิวคะแนน`).
- **FR-018**: System MUST maintain 4 user activity history lists: Liked (`ถูกใจสินค้า`), Viewed (`ดูสินค้า`), Purchased (`ซื้อสินค้า`), and Re-ordered (`ซื้อสินค้าซ้ำ`).
- **FR-019**: System MUST provide user and merchant social profile pages with follower/following counters and 4 tab views (Posts, Products, Reposts, Private).
- **FR-020**: System MUST provide a Creator Studio allowing users to upload up to 10 images/videos, tag catalog products, apply hashtags, and publish UGC reviews.
- **FR-021**: System MUST provide user notification feeds and privacy/security settings controls.

#### Seller Center, Compliance & Administration (Phase 4)
- **FR-022**: System MUST provide a multi-step Seller Onboarding form capturing seller identity, company tax registration, physical tax invoice address, and payout details.
- **FR-023**: System MUST provide an Add Product interface with image upload guides, retail price, wholesale tiered brackets, and promotional flags (BOGO, Free Shipping, Flash Sale).
- **FR-024**: System MUST allow sellers to select standard agricultural certifications (`สำนักงานเกษตรอำเภอ`, `มาตรฐานเกษตรอินทรีย์`, `มาตรฐานผลิตภัณฑ์ชุมชน`, `อย.`, `GAP/GMP`, `HACCP`) and upload verification documents.
- **FR-025**: System MUST provide a Seller Dashboard displaying Greeny Wallet balance, carbon savings metrics, order fulfillment pipelines (`ต้องจัดส่ง`, `จัดส่งแล้ว`, `คำขอคืนเงิน/คืนสินค้า/ยกเลิก`), and quick response chat tools.
- **FR-026**: System MUST generate an Admin/Seller operational export in CSV/Excel format containing the 11 dimensions defined on PDF Page 55: Seller Username, Affiliate ID, Affiliate Fee, Product Specs, Certifications, Ad Fee, Selling Fee, Buyer Info, Payment Channel, Cancellation State, and Carrier.
- **FR-027**: System MUST render Help Center, Service Policies, Privacy Terms, and Contact Us forms.

---

### Key Entities

- **User**: Represents platform buyers, creators, and sellers. Attributes: `id`, `email`, `phone`, `full_name`, `avatar_url`, `role` (BUYER, SELLER, ADMIN), `carbon_saved_kg`, `locale`, `currency`.
- **MerchantProfile**: Represents registered vendor stores. Attributes: `id`, `user_id`, `store_name`, `tax_id`, `tier` (`Green Mall Lvl 1-5`), `sustainability_score`, `payout_channel`, `payout_account`, `verified_at`.
- **EcoCertification**: Verified agricultural and eco credentials. Attributes: `id`, `merchant_id`, `cert_type` (ORGANIC_TH, GAP_GMP, COMMUNITY_ENTERPRISE, FDA_TH, HACCP), `document_url`, `status` (PENDING, APPROVED, REJECTED), `valid_until`.
- **Product**: Physical agricultural packaging item. Attributes: `id`, `merchant_id`, `title`, `description`, `material_type` (HYACINTH, RICE_STRAW, MYCELIUM, BAGASSE, CORNSTARCH, BANANA_STEM, COCONUT_COIR), `retail_price`, `stock_qty`, `is_mall`, `bogo_eligible`, `free_shipping`, `images`.
- **WholesaleTier**: Bulk discount pricing bracket. Attributes: `id`, `product_id`, `min_qty`, `unit_price`, `discount_pct`.
- **Order**: Purchase transaction. Attributes: `id`, `buyer_id`, `merchant_id`, `status` (PENDING_PAYMENT, PACKED, SHIPPED, DELIVERED, CANCELLED, REFUNDED), `carrier_id`, `tracking_code`, `total_amount`, `currency`, `payment_method`, `carbon_offset_kg`.
- **LiveStream**: Video demonstration session. Attributes: `id`, `merchant_id`, `title`, `stream_url`, `is_live`, `viewer_count`, `pinned_product_id`.
- **Review**: Customer UGC rating and feedback. Attributes: `id`, `product_id`, `user_id`, `rating_product`, `rating_shipping`, `rating_shop`, `content`, `media_urls`.
- **ExternalReview**: Curated cross-platform review. Attributes: `id`, `product_id`, `platform_name` (LEMON8, TIKTOK, INSTAGRAM), `author_name`, `external_url`, `excerpt`, `media_url`.
- **WalletTransaction**: Payout and earnings records. Attributes: `id`, `user_id`, `amount`, `type` (SALE_PROCEEDS, WITHDRAWAL, REFUND), `status`.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: End-to-end buyer journey (Homepage → Search → Product Detail → Wholesale Tier Selection → Express Checkout) can be completed in under 90 seconds.
- **SC-002**: Greeny AI Chat returns material recommendations with compressive crush strength data and product cards in under 1.5 seconds.
- **SC-003**: 100% of generated layouts adhere strictly to Stitch design tokens (Fresh Leaf Green `#2EB82E`, Force Sales Coral `#F04A42`, Forest Slate `#142918`, `Plus Jakarta Sans`, and `Be Vietnam Pro`).
- **SC-004**: Tri-lingual header switcher instantly updates all monetary symbols, currency conversions, and UI labels without page reload.
- **SC-005**: Live stream player allows opening the "กำลังไลฟ์" shopping drawer and checking out without causing video stutter or stream disconnection.
- **SC-006**: Seller Onboarding and Add Product forms validate 100% of required agricultural certification files and wholesale volume tiers before publishing.
- **SC-007**: Admin CSV/Excel export generates clean tabular data matching all 11 columns defined on PDF Page 55.
- **SC-008**: Entire application operates with 0 infrastructure cost on Vercel Hobby Tier and Supabase Free Tier quotas.

---

## Assumptions

- **Mock Stream Video Feed**: Live streaming player integrates with standard HLS/MP4 mock feeds or YouTube/Mux embeds that adhere to zero-cost free tiers.
- **AI Consultation Mock / Endpoint**: Greeny Chat AI queries can be serviced via Google Gemini Free API tier or client-side rule-based eco heuristics during offline testing.
- **Carrier Rates**: Shipping carriers (`ขนส่ง 1-3`) represent standard Thai logistics providers (Flash Express, Kerry, Thailand Post) with predefined rate cards.
- **Currency Exchange Baseline**: Multi-currency conversion uses fixed standard reference rates (1 USD = 36.5 THB, 100 JPY = 24.5 THB) for instant client-side rendering.
- **Data Persistence**: Initial seed data contains sample agricultural products for all 7 cushioning types, 3 verified seller stores, and sample live streams.
