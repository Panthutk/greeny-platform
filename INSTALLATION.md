# Greenny Eco E-Commerce Platform — Installation & Deployment Guide

This guide details the complete setup, local execution, and production deployment instructions for the **Greenny Eco-Friendly Agricultural Packaging E-Commerce & Social Commerce Platform**.

---

## 📋 System Requirements

- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **Package Manager**: `npm` (v10+), `pnpm` (v9+), or `yarn`
- **Database**: Supabase Free Tier (PostgreSQL 15+)
- **Hosting**: Vercel (Hobby Free Tier)
- **OS**: Windows, macOS, or Linux

---

## 🚀 Quick Start (Local Development)

### 1. Clone & Navigate to Project Directory

```bash
cd greeny-platform
```

### 2. Install Dependencies

```bash
npm install
```

All core packages will be installed, including:
- **Next.js 15 (App Router)** & **React 19**
- **Tailwind CSS** with Design Tokens from `DESIGN.md`
- **Prisma ORM** (v5.22+)
- **@supabase/supabase-js**
- **canvas-confetti** & **lucide-react**

---

## ⚙️ Environment Variables Configuration

Copy the example environment template:

```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:

```ini
# ==============================================================================
# Supabase PostgreSQL Database (Connection Pooling + Direct)
# ==============================================================================
# Transaction Pooler (Port 6543) - Used for serverless queries via PgBouncer
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Session Pooler / Direct Connection (Port 5432) - Used for Prisma migrations and DDL
DIRECT_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"

# ==============================================================================
# Supabase Storage & Client API
# ==============================================================================
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT_REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# ==============================================================================
# Platform URL & Locale
# ==============================================================================
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_DEFAULT_CURRENCY="THB"
NEXT_PUBLIC_DEFAULT_LOCALE="th"
```

> [!IMPORTANT]
> **PgBouncer Pooling**: Always ensure `?pgbouncer=true` is appended to `DATABASE_URL` on port 6543. This prevents connection starvation on Vercel serverless lambdas. `DIRECT_URL` must point to port 5432 without `?pgbouncer=true` for Prisma migrations.

---

## 🗄️ Database Setup & Seeding

### 1. Generate Prisma Client

```bash
npx prisma generate
```

### 2. Push Schema to Supabase

```bash
npx prisma db push
```

### 3. Seed Thai Agricultural Products & Stores

Populate the database with verified stores (`สวนดินดี ออร์แกนิค`, `Green Living Crafts`, `วิสาหกิจชุมชนบางเลน`), 9 Thai eco-cushioning materials, wholesale volume tiers (3, 6, 12 units), live streams, and Lemon8 UGC reviews:

```bash
npx prisma db seed
```
*(Or run `npm run db:seed`)*

---

## 🪣 Supabase Storage Buckets Setup

In your Supabase Dashboard under **Storage**, create 3 buckets:

1. **`product-media`**
   - **Public**: `Yes`
   - **Allowed MIME types**: `image/jpeg`, `image/png`, `image/webp`, `video/mp4`
   - **Max file size**: `10MB`
2. **`certification-docs`**
   - **Public**: `No` (Restricted to authenticated sellers & back-office review)
   - **Allowed MIME types**: `application/pdf`, `image/jpeg`, `image/png`
   - **Max file size**: `25MB`
3. **`social-posts`**
   - **Public**: `Yes`
   - **Allowed MIME types**: `image/jpeg`, `image/png`, `image/webp`, `video/mp4`, `video/quicktime`
   - **Max file size**: `50MB`

---

## 💻 Running the Application

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Test

```bash
npm run build
npm run start
```

---

## 🧪 Validating Key Core Features

| Feature | URL Route | What to Test |
| :--- | :--- | :--- |
| **Marketplace Home** | [`/`](http://localhost:3000/) | Live carbon counter, Force Sales 4 countdown timers (`00:60:00`, `24:00:00`, etc.), Greeny Lives and Review carousels. |
| **Search & Filters** | [`/search`](http://localhost:3000/search?q=ผักตบ) | Filter by 7 Thai eco-materials (`ผักตบ`, `ฟางข้าว`, `เห็ด`, `ชานอ้อย`, `แป้งข้าวโพด`, `ก้านกล้วย`, `ขุยมะพร้าว`). |
| **Storefront** | [`/store/store-1`](http://localhost:3000/store/store-1) | Toggle between `ขายปลีก` (retail) and `ขายส่ง` (wholesale tiered prices). |
| **Product Detail** | [`/product/cm-hyacinth-1kg`](http://localhost:3000/product/cm-hyacinth-1kg) | Click `3 ชิ้น (-17%)`, `6 ชิ้น (-28%)`, or `12 ชิ้น (-40%)` and verify instant discount update. |
| **Express Cart** | Triggered via Header icon | Open `รถเข็นหิ้วๆ` drawer, adjust quantities, verify wholesale discount auto-application. |
| **Express Checkout** | [`/checkout`](http://localhost:3000/checkout) | Select carrier (`ขนส่ง 1-3`), select PromptPay, place order to view QR payload modal. |
| **Greeny AI Consultant** | Header `Greeny Chat` | Ask: *"ต้องการส่งขวดแก้ว 10 กิโล ไม่ให้แตก แนะนำอะไรดี"* — AI recommends 15kg coconut coir with 3 product cards. |
| **Live Stream Player** | Click any Live card on Home | Opens live modal with heart reactions, comments, and slide-up "ซื้อ" drawer. |
| **Creator Studio** | [`/creator/new`](http://localhost:3000/creator/new) | Test live camera/mic pickers, Green Reels vault, catalog tagging with commissions, and hashtag selector. |
| **Seller Center** | [`/seller/dashboard`](http://localhost:3000/seller/dashboard) | Greeny Wallet balance, carbon tracker, and order fulfillment counters. |
| **Add Product with Certs** | [`/seller/products/new`](http://localhost:3000/seller/products/new) | Checklist for `สำนักงานเกษตรอำเภอ`, `Organic Thailand`, `มผช.`, `GAP/GMP`, `HACCP`. |
| **Admin CSV Export** | [`/api/admin/export`](http://localhost:3000/api/admin/export) | Downloads 11-column operational CSV with UTF-8 BOM (`\uFEFF`) for Excel. |

---

## ☁️ Zero-Cost Deployment to Vercel

The platform is designed to run completely inside the **Vercel Hobby Free Tier** ($0/month):

1. **Push your code to GitHub / GitLab**.
2. **Go to [Vercel](https://vercel.com/)** → Click **"Add New Project"** → Select repository.
3. **Configure Environment Variables** in the Vercel Project Settings:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (Set to your Vercel deployment domain, e.g. `https://greeny-eco.vercel.app`)
4. **Build & Development Settings**:
   - Framework Preset: `Next.js`
   - Build Command: `prisma generate && next build`
   - Output Directory: `.next`
5. Click **"Deploy"**.

> [!TIP]
> **Performance & Bundle Validation**:
> All catalog pages maintain a First Load JS of **<120 kB** (well under the 150 kB Vercel budget limit), ensuring instant load times even on mobile connections across Thailand and Southeast Asia.

---

## 🛠️ Common Troubleshooting

### 1. `PrismaClientInitializationError: Can't reach database server`
- Ensure you have whitelisted all IPs in Supabase (`0.0.0.0/0` under Network Restrictions).
- Verify that your Supabase project is active (not paused).
- Ensure your password does not contain unescaped URL special characters (e.g. `@`, `#`, `%`).

### 2. `useSearchParams() should be wrapped in a suspense boundary`
- All client pages using `useSearchParams()` (like `/search`) are wrapped in `<Suspense fallback={...}>`. If you add new search parameters to other pages, ensure they are similarly encapsulated.

### 3. Thai Text in Exported CSV is Garbled in Excel
- The export route at `/api/admin/export` prepends the UTF-8 Byte Order Mark (`\uFEFF`). When opening the CSV in Microsoft Excel, Thai characters render properly without needing manual encoding imports.
