# 🌱 Greeny Eco-Commerce Platform
### Agricultural Byproduct & Bio-Packaging E-Commerce and Social Commerce Platform

[![Next.js 15](https://img.shields.io/badge/Next.js-15.0.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Supabase](https://img.shields.io/badge/Supabase-Cloud-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-1.5%20Flash-4285F4?style=for-the-badge&logo=google)](https://aistudio.google.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

---

## 📖 About The Project

**Greeny Eco Platform** is a modern, high-performance e-commerce and social commerce application designed to convert **Thai agricultural byproducts** (such as water hyacinth, rice straw, sugarcane bagasse, coconut coir, banana stems, cornstarch, and mycelium mushroom fibers) into **100% biodegradable shockproof packaging**.

The platform directly empowers local farming communities, SMEs, and export businesses by providing sustainable alternatives to single-use plastic bubble wraps and EPS styrofoam. 

Built on a **Serverless Cloud Architecture**, the system guarantees **24/7 uptime** hosted on **Vercel + Supabase + Google Gemini**, completely free of dependency on personal computer hardware.

---

## ✨ Key Features & Capabilities

### 1. 🌿 Authentic Agricultural Bio-Packaging Catalog
* Explores 9 certified circular bio-packaging innovations:
  * **Dried Water Hyacinth:** Cleaned and sun-dried, dust-free, fully degrades in 60 days.
  * **Coconut Coir Pads (15 kg Crush Resistance):** Engineered shock absorption tested for fragile glassware.
  * **Mycelium Bio-Foam:** Rigid, custom-molded EPS alternative tailored for appliances.
  * **Water-Soluble Cornstarch Peanuts:** Dissolves in water within 60 seconds with zero toxicity.
  * **Molded Sugarcane Bagasse Trays:** Ergonomic bottle neck locking inserts.
* Displays authentic Thai certifications: **Organic Thailand, OTOP, GAP/GMP, and District Agricultural Office stamps**.

### 2. 🤖 Packaging AI Advisor (Google Gemini 1.5 Flash Cloud)
* Powered by **Google Gemini 1.5 Flash**.
* Analyzes product fragility, dimensions, and shipping conditions (e.g., glassware, cosmetics, fresh fruits, electronics).
* Computes real-time crush resistance (kg) and biodegradation timeframes, recommending exact matched packaging materials straight to the customer's cart.

### 3. 📦 Express Cart Drawer & Automatic Wholesale Tiers
* **Wholesale Volume Tiers:** Automatic volume-based pricing discounts calculated instantly (e.g., 3 units at -17%, 6 units at -28%, 12 units at -40%).
* **Express Drawer:** Interactive slide-out cart calculating real-time carbon offsets and shipping estimates.

### 4. 💳 Dynamic PromptPay QR Payment & Express Checkout
* Automatically synthesizes EMVCo-compliant Thai PromptPay QR codes with dynamic net totals.
* Scannable by any mobile banking application across Thailand.
* Synchronizes orders directly into **Supabase PostgreSQL** with automated fulfillment pipelines.

### 5. 🎥 Social Commerce, UGC Reviews & Live Streaming
* Farmer-to-consumer livestream broadcasts with live viewer counts, floating hearts, and real-time chat.
* 1-Click purchase drawer enabling seamless in-stream buying without leaving the video broadcast.
* User-Generated Content (UGC) review feeds integrated with external citation links (Lemon8).

### 6. 🌍 Live Carbon Offset Calculator
* Computes real-time carbon sequestration and plastic pollution savings (`kg CO₂e`) with each transaction compared to conventional petroleum-based packaging.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 15 (App Router) + React 19 | Server Components, Streaming SSR, Turbopack |
| **Styling & Design System** | Tailwind CSS 3.4 + Vanilla CSS Tokens | Curated Material Design 3 eco-palette (Forest, Clay, Palm, Coral) |
| **Database & ORM** | Supabase PostgreSQL + Prisma ORM 5.22 | Connection Pooling (PgBouncer port 6543) & Direct Session (port 5432) |
| **Cloud Hosting** | Vercel Serverless Edge | Global CDN distribution, 24/7 uptime without local machine dependency |
| **AI Intelligence** | Google Gemini 1.5 Flash REST API | Low-latency bio-material analysis & packaging recommendations |
| **Authentication** | Supabase Auth | Supports Email/Password, LINE, Google, and Facebook OAuth |
| **Payment Gateway** | PromptPay QR (EMVCo Compatible) | Instant mobile banking payment flow |

---

## 📁 Project Directory Structure

```text
greeny-platform/
├── prisma/
│   ├── schema.prisma          # Database schema (PostgreSQL / Supabase)
│   └── seed.ts                # Seed script (3 stores, 9 eco products, live streams)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/ai/       # Google Gemini 1.5 Flash Packaging AI API
│   │   │   ├── orders/checkout/ # Order persistence & PromptPay QR generator
│   │   │   ├── products/      # Catalog API fetching from Supabase
│   │   │   └── health/cloud/  # Cloud services diagnostic endpoint
│   │   ├── checkout/          # Express checkout & PromptPay QR screen
│   │   ├── login/             # Supabase Auth login & registration
│   │   ├── me/                # Buyer profile & order fulfillment status
│   │   ├── seller/            # Merchant center, wallet & KYC certification upload
│   │   ├── page.tsx           # Homepage with hero, flash sales & carbon counter
│   │   └── layout.tsx         # Root layout with fonts and context providers
│   ├── components/
│   │   ├── chat/              # GreenyChatModal (AI & bilingual live agent support)
│   │   ├── cart/              # Slide-out express cart drawer
│   │   ├── home/              # HeroBanner, FlashSales, LivesCarousel
│   │   └── product/           # ProductCard, WholesaleTierSelector
│   ├── context/
│   │   ├── CartContext.tsx    # Cart state & real-time wholesale discount calculations
│   │   └── LocaleContext.tsx  # Dynamic currency switcher (THB / JPY / USD)
│   └── lib/
│       ├── prisma.ts          # Singleton Prisma client instance
│       └── supabase.ts        # Supabase client, auth helpers & bucket constants
├── .env.example               # Environment variables configuration guide
├── INSTALLATION.md            # Detailed installation and Vercel cloud deployment guide
├── package.json
└── vercel.json                # Vercel build configuration
```

---

## 🚦 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env
```
*(The repository includes a built-in **Sandbox Fallback Mode**, allowing you to run, inspect, and test the entire UI locally even before entering cloud API credentials).*

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## ☁️ Cloud Deployment (24/7 Availability)

To make your platform available globally 24 hours a day **without keeping your local computer powered on**:

1. **Database Setup (Supabase):** Sign up for a free tier at [supabase.com](https://supabase.com). Add database connection strings to `.env` and execute:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```
2. **AI Specialist (Gemini):** Retrieve a free API Key from [Google AI Studio](https://aistudio.google.com) and assign it to `GEMINI_API_KEY`.
3. **Deploy to Vercel:** Push your repository to GitHub, import it into [vercel.com](https://vercel.com), and copy your `.env` variables into Vercel Project Settings. Once deployed, the platform is live and operational 24/7!

> 📖 **For step-by-step setup instructions and screenshots, refer to:** [INSTALLATION.md](file:///c:/Users/USER/Downloads/project-econ/greeny-platform/INSTALLATION.md)

---

## 🔍 System Health Check (Cloud Diagnostics)
Inspect the active connection status of all integrated third-party services via:
* Local: `http://localhost:3000/api/health/cloud`
* Production: `https://your-domain.vercel.app/api/health/cloud`

---

## 📄 License & Mission
Developed to foster the Bio-Circular-Green (BCG) economic model and empower sustainable agricultural innovation in Thailand 🇹🇭.
