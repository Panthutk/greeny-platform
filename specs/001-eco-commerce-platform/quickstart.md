# Quickstart & Developer Runbook: Greeny Eco-Commerce Platform

**Feature**: `001-eco-commerce-platform` | **Date**: 2026-10-17

---

## 1. Prerequisites
- **Node.js**: v18.18+ or v20+
- **Package Manager**: `npm` or `pnpm`
- **Database**: Supabase Free Tier account with PostgreSQL database named `greeny_eco_db`
- **Hosting Target**: Vercel Hobby Free Tier account

---

## 2. Environment Configuration

Create `.env` in the project root:

```bash
# Supabase API & Auth
NEXT_PUBLIC_SUPABASE_URL="https://your-supabase-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOi..."

# Prisma ORM Database Connections
# Transaction Pooler URL (port 6543) with PgBouncer flag for serverless queries
DATABASE_URL="postgres://postgres.your-project:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# Direct Session URL (port 5432) for migrations & seeding
DIRECT_URL="postgres://postgres.your-project:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"

# Optional: Google Gemini API Key for dynamic packaging advice
GEMINI_API_KEY="AIzaSy..."
```

---

## 3. Database Initialization & Seeding

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma Client
npx prisma generate

# 3. Push schema to Supabase PostgreSQL (greeny_eco_db)
npx prisma db push

# 4. Seed database with Thai eco-packaging products, stores, and live streams
npx prisma db seed
```

The seed script automatically populates:
- 3 verified stores (`สวนดินดี ออร์แกนิค`, `Green Living Crafts`, `วิสาหกิจชุมชนบางเลน`)
- 9 authentic eco-packaging catalog items (Water Hyacinth, Rice Straw, Mycelium, Bagasse, Cornstarch, Banana Stem, Coconut Coir, Honeycomb, Popcorn) with dual retail and wholesale volume tiers.
- Active Greeny Lives streaming cards and Greeny Review UGC posts with Lemon8 cross-platform citations.

---

## 4. Local Development Server

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view:
- **Buyer Homepage**: `http://localhost:3000/`
- **Eco Packaging Search**: `http://localhost:3000/search?q=กันกระแทก`
- **Product Detail & Wholesale Tiers**: `http://localhost:3000/product/prod-hyacinth-1`
- **Express Checkout**: `http://localhost:3000/checkout`
- **Greeny Seller Dashboard**: `http://localhost:3000/seller/dashboard`
- **Seller Add Product**: `http://localhost:3000/seller/products/new`
- **Admin CSV/Excel Export**: `http://localhost:3000/api/admin/export`

---

## 5. Vercel Zero-Cost Deployment

Configure `vercel.json`:
```json
{
  "buildCommand": "prisma generate && next build",
  "framework": "nextjs"
}
```

Deploy via CLI:
```bash
npx vercel --prod
```
Ensure `DATABASE_URL` and `DIRECT_URL` are set under Vercel Project Settings > Environment Variables.
