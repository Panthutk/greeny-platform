# Greenny Eco E-Commerce Platform — Complete Installation & Setup Guide

This guide provides step-by-step instructions for configuring **every single `.env` environment variable**, setting up your database (via Supabase, Docker, or SQLite), and running the **Greenny Eco-Friendly Agricultural Packaging E-Commerce & Social Commerce Platform**.

---

## 📋 Table of Contents
1. [System Prerequisites](#1-system-prerequisites)
2. [Step-by-Step Installation](#2-step-by-step-installation)
3. [Environment Variables Deep Dive (.env)](#3-environment-variables-deep-dive-env)
   - [Option A: Supabase Free Tier (Recommended for Production & Cloud)](#option-a-supabase-free-tier-recommended)
   - [Option B: Local PostgreSQL via Docker (Fast Local Dev)](#option-b-local-postgresql-via-docker)
   - [Option C: Instant Offline SQLite (Zero Installation Needed)](#option-c-instant-offline-sqlite)
4. [Database Migration & Seed Data](#4-database-migration--seed-data)
5. [Running the Application](#5-running-the-application)
6. [Feature Verification & Testing Guide](#6-feature-verification--testing-guide)
7. [Zero-Cost Deployment to Vercel](#7-zero-cost-deployment-to-vercel)
8. [Troubleshooting Common Issues](#8-troubleshooting-common-issues)

---

## 1. System Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **npm** (v10+), **pnpm** (v9+), or **yarn**
- **Git**

---

## 2. Step-by-Step Installation

### Step 2.1: Clone & Navigate to Project Directory

```bash
cd greeny-platform
```

### Step 2.2: Install NPM Dependencies

```bash
npm install
```

This installs:
- Next.js 15 (App Router) & React 19
- Tailwind CSS with custom design tokens from `DESIGN.md`
- Prisma ORM 5.22+
- Supabase Client (`@supabase/supabase-js`)
- Lucide React & Canvas Confetti

---

## 3. Environment Variables Deep Dive (.env)

Create your `.env` file from the provided example template:

```bash
cp .env.example .env
```

Here is the complete breakdown of every `.env` variable, what it does, and where to obtain it:

| Variable Name | Required | Description | Example Value |
| :--- | :--- | :--- | :--- |
| `DATABASE_URL` | **Yes** | Connection string for Prisma queries. In serverless/Supabase, must point to the **Transaction Pooler (Port 6543)** with `?pgbouncer=true`. | `postgresql://postgres.[ref]:[pass]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true` |
| `DIRECT_URL` | **Yes** | Direct connection to the database (Port 5432) used exclusively for Prisma migrations & `db push` (bypassing PgBouncer). | `postgresql://postgres.[ref]:[pass]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres` |
| `NEXT_PUBLIC_SUPABASE_URL` | **Yes** | Public HTTPS endpoint for your Supabase project (used for client-side Auth and Storage). | `https://xyzprojectref.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **Yes** | Safe-for-browser public API key for accessing Supabase Storage and Auth. | `eyJhbGciOiJIUzI1NiIsInR5c...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | Backend elevated secret key (never expose to the browser). | `eyJhbGciOiJIUzI1NiIsInR5c...` |
| `NEXT_PUBLIC_SITE_URL` | Optional | Base URL of your app for OAuth redirects and canonical links. | `http://localhost:3000` |
| `NEXT_PUBLIC_DEFAULT_CURRENCY` | Optional | Default currency (`THB`, `JPY`, or `USD`). Defaults to `THB`. | `THB` |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | Optional | Default language (`th`, `ja`, or `en`). Defaults to `th`. | `th` |

---

### Choose Your Database Setup Mode

Choose **one** of the three options below to configure your `.env` file:

---

### Option A: Supabase Free Tier (Recommended)

This matches the full project specification and is required for cloud deployment on Vercel.

1. **Sign up or Log in** to [Supabase](https://supabase.com) (100% Free Tier).
2. **Create a New Project**:
   - Organization: Select or create your org.
   - Name: `greeny_eco_db`
   - Database Password: *Choose a strong password and save it*.
   - Region: Select **Singapore (`ap-southeast-1`)** for lowest latency from Thailand.
3. **Get Connection Strings**:
   - Go to **Project Settings** (gear icon) → **Database** → Scroll down to **Connection String**.
   - Select **URI** tab.
   - **For `DATABASE_URL`**:
     - Check **"Use connection pooling"** and select **Mode: Transaction (port 6543)**.
     - Copy the string and append `?pgbouncer=true` to the end.
   - **For `DIRECT_URL`**:
     - Uncheck connection pooling (or select **Session mode / port 5432**).
     - Copy the direct connection string.
4. **Get API Keys**:
   - Go to **Project Settings** → **API**.
   - Copy **Project URL** into `NEXT_PUBLIC_SUPABASE_URL`.
   - Copy **anon / public** key into `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   - Copy **service_role** key into `SUPABASE_SERVICE_ROLE_KEY`.

**Your resulting `.env` file:**
```ini
# Supabase PostgreSQL Database (Transaction Pooler port 6543)
DATABASE_URL="postgresql://postgres.yourprojectref:yourpassword@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Supabase Direct Connection (Session port 5432)
DIRECT_URL="postgresql://postgres.yourprojectref:yourpassword@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"

# Supabase Storage & Client API
NEXT_PUBLIC_SUPABASE_URL="https://yourprojectref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_anon_key"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_service_key"

# App Settings
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_DEFAULT_CURRENCY="THB"
NEXT_PUBLIC_DEFAULT_LOCALE="th"
```

5. **Create Storage Buckets** in the Supabase Dashboard under **Storage**:
   - `product-media` (Public: Yes)
   - `certification-docs` (Public: No — Private for seller KYC/GMP documents)
   - `social-posts` (Public: Yes)

---

### Option B: Local PostgreSQL via Docker

If you prefer to run PostgreSQL on your local machine using Docker:

1. **Start PostgreSQL Container**:
```bash
docker run --name greeny-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=greeny_eco_db -p 5432:5432 -d postgres:15-alpine
```

2. **Set `.env`**:
```ini
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/greeny_eco_db"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/greeny_eco_db"

NEXT_PUBLIC_SUPABASE_URL="https://placeholder.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="placeholder-anon-key"
SUPABASE_SERVICE_ROLE_KEY="placeholder-service-role-key"

NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_DEFAULT_CURRENCY="THB"
NEXT_PUBLIC_DEFAULT_LOCALE="th"
```

---

### Option C: Instant Offline SQLite

If you want to test and develop the application locally without running PostgreSQL or setting up Supabase:

1. **Change Provider in `prisma/schema.prisma`**:
   Replace the `datasource db` block at the top of [`prisma/schema.prisma`](file:///c:/work/Greenny/greeny-platform/prisma/schema.prisma):
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

2. **Set `.env`**:
```ini
DATABASE_URL="file:./dev.db"

NEXT_PUBLIC_SUPABASE_URL="https://placeholder.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="placeholder-anon-key"
SUPABASE_SERVICE_ROLE_KEY="placeholder-service-role-key"

NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_DEFAULT_CURRENCY="THB"
NEXT_PUBLIC_DEFAULT_LOCALE="th"
```

---

## 4. Database Migration & Seed Data

Once your `.env` is configured, push the database schema and seed authentic Thai eco-packaging data:

### Step 4.1: Generate Prisma Client

```bash
npx prisma generate
```

### Step 4.2: Push Database Schema

```bash
npx prisma db push
```

*This creates all tables: `User`, `Store`, `Product`, `WholesaleTier`, `AgriculturalCertification`, `Order`, `OrderItem`, `ReviewPost`, and `LiveStream`.*

### Step 4.3: Seed Data (Stores, Products, Live Streams & Reviews)

```bash
npx prisma db seed
```

This populates:
- **3 Verified Thai Stores**: `สวนดินดี ออร์แกนิค`, `Green Living Crafts`, `วิสาหกิจชุมชนบางเลน`
- **9 Authentic Eco-Packaging Materials**:
  1. ผักตบชวาอบแห้งกันกระแทก (Water Hyacinth)
  2. ฟางข้าวอัดเส้นกันกระแทก (Rice Straw)
  3. โฟมเห็ดไมซีเลียมย่อยสลายได้ (Mycelium Foam)
  4. ชานอ้อยขึ้นรูปกันกระแทก (Bagasse Molding)
  5. บับเบิ้ลแป้งข้าวโพดละลายน้ำ (Cornstarch Bio Peanuts)
  6. ก้านกล้วยอบแห้งถักเกลียว (Banana Stem Rope)
  7. ขุยมะพร้าวอัดแผ่นต้านแรงกด 15 kg (Coconut Coir Pad)
  8. กระดาษคราฟท์รังผึ้ง (Honeycomb Paper)
  9. ข้าวโพดคั่วกันกระแทก (Popcorn Packaging)
- **Wholesale Volume Tiers** (Automatic discounts at 3, 6, and 12 units)
- **Active Livestreams** with comments and floating viewer badges
- **UGC Review Posts** with Lemon8 external citation links

---

## 5. Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Hot reloading and Turbopack/Next compiler are active.

### Production Build & Local Preview

To verify that the application compiles with zero TypeScript errors and satisfies the bundle size budgets (<150 kB):

```bash
npm run build
npm run start
```

---

## 6. Feature Verification & Testing Guide

Once the server is running, navigate to the following URLs to test each core user flow:

| Capability | URL | Test Action |
| :--- | :--- | :--- |
| **Marketplace Homepage** | [`/`](http://localhost:3000/) | Check dynamic carbon counter (`1,480,250 kg CO₂`), 4 Force Sales countdowns (`00:60:00`, `24:00:00`, special day, clearance), and currency switcher (THB/JPY/USD). |
| **Search & Filters** | [`/search?q=ผักตบ`](http://localhost:3000/search?q=ผักตบ) | Filter by 7 Thai agricultural materials (`ผักตบ`, `ฟางข้าว`, `เห็ด`, `ชานอ้อย`, `แป้งข้าวโพด`, `ก้านกล้วย`, `ขุยมะพร้าว`). |
| **Wholesale Tier Pricing** | [`/product/cm-hyacinth-1kg`](http://localhost:3000/product/cm-hyacinth-1kg) | Click `3 ชิ้น (-17%)`, `6 ชิ้น (-28%)`, or `12 ชิ้น (-40%)` and verify the unit price dynamically discounts. |
| **Slide-Out Express Cart** | Click 🛒 in Header | Open `รถเข็นหิ้วๆ` drawer, adjust item quantities, and observe real-time wholesale discount calculations. |
| **Express Checkout** | [`/checkout`](http://localhost:3000/checkout) | Select carrier (`ขนส่ง 1`, `ขนส่ง 2`, `ขนส่ง 3`), choose PromptPay, and click "สั่งซื้อสินค้า" to generate the PromptPay QR code modal. |
| **Greeny AI Packaging Consultant** | Click `Greeny Chat` in Header | Ask: *"ต้องการส่งขวดแก้ว 10 กิโล ไม่ให้แตก แนะนำอะไรดี"* — AI Consultant returns the 15kg coconut coir recommendation with 3 product cards. |
| **Live Stream Commerce** | Click any Live stream card on `/` | Opens video overlay with real-time viewer count, comments, and slide-up "ซื้อ" drawer for 1-click in-stream checkout. |
| **Creator Studio** | [`/creator/new`](http://localhost:3000/creator/new) | Toggle between "สร้างโพสต์รีวิว" and "ถ่ายทอดสด (Go Live)", test camera/mic pickers, and tag catalog products. |
| **Seller Center & Dashboard** | [`/seller/dashboard`](http://localhost:3000/seller/dashboard) | View Greeny Wallet balance (`฿45,820.50`), carbon footprint tracker (`342 kgCO2e`), and fulfillment orders pipeline. |
| **Add Product with Certifications** | [`/seller/products/new`](http://localhost:3000/seller/products/new) | Test agricultural certification checkboxes (`สำนักงานเกษตรอำเภอ`, `Organic Thailand`, `มผช.`, `อย.`, `GAP/GMP`, `HACCP`). |
| **Buyer Account ("Greeny Me")** | [`/me`](http://localhost:3000/me) | View order tabs (`ต้องชำระเงิน`, `เตรียมจัดส่ง`, `ต้องได้รับ`, `รีวิวคะแนน`) and history filters. |
| **Back-Office 11-Column CSV Export** | [`/api/admin/export`](http://localhost:3000/api/admin/export) | Click to download CSV. Open in Microsoft Excel and confirm that Thai text renders without mojibake (UTF-8 BOM `\uFEFF`). |

---

## 7. Zero-Cost Deployment to Vercel

The platform is designed for zero-cost operation on the **Vercel Hobby Free Tier**:

1. Push your repository to **GitHub** or **GitLab**.
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"** → Import your repository.
3. In **Project Settings** → **Environment Variables**, add:
   - `DATABASE_URL` (Supabase port 6543 with `?pgbouncer=true`)
   - `DIRECT_URL` (Supabase port 5432)
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (Set to your Vercel deployment URL, e.g. `https://greeny-eco.vercel.app`)
4. Verify **Build Settings**:
   - Framework Preset: `Next.js`
   - Build Command: `prisma generate && next build`
   - Output Directory: `.next`
5. Click **"Deploy"**.

---

## 8. Troubleshooting Common Issues

### Issue 1: `Error: P1001: Can't reach database server at localhost:5432`
- **Cause**: `.env` is pointing to `localhost:5432`, but no local PostgreSQL server is active.
- **Fix**: Either:
  1. Fill in your remote Supabase connection strings in `.env` (Option A above).
  2. Start a local PostgreSQL container using Docker (Option B above).
  3. Switch to SQLite in `prisma/schema.prisma` (Option C above).

### Issue 2: `Error: prepared statement already exists` (PgBouncer)
- **Cause**: Connecting directly to port 6543 without instructing Prisma to disable prepared statement caching.
- **Fix**: Ensure your `DATABASE_URL` ends with `?pgbouncer=true`. Keep `DIRECT_URL` on port 5432 without `?pgbouncer=true`.

### Issue 3: Thai Characters Displaying as Question Marks in Excel
- **Cause**: Excel on Windows defaulting to ANSI/ASCII when opening CSV files without a BOM.
- **Fix**: Already solved in `src/app/api/admin/export/route.ts` via `\uFEFF` UTF-8 BOM encoding. If generating other CSVs, prepend `\uFEFF` before file contents.

### Issue 4: `useSearchParams() should be wrapped in a suspense boundary`
- **Cause**: Next.js App Router client-side bailout on static prerendering.
- **Fix**: Wrap the component reading `useSearchParams()` in `<Suspense fallback={...}>`. All pages in this project (including `/search`) are already wrapped in Suspense.
