# Greeny Eco Platform — Complete Installation & Cloud Setup Guide
## Comprehensive 24/7 Cloud Architecture & Production Setup Guide

This guide provides step-by-step instructions for configuring the **Greeny Eco-Friendly Agricultural Packaging E-Commerce Platform** to run 100% on **Cloud Third-Party Services (Vercel, Supabase, Google Gemini)** with **24/7 availability**, ensuring the platform remains active and accessible even when your local machine is powered off.

---

## 📋 Table of Contents
1. [Cloud Architecture Overview (24/7 Uptime)](#1-cloud-architecture-overview-247-uptime)
2. [Prerequisites](#2-prerequisites)
3. [Local Development Setup](#3-local-development-setup)
4. [Cloud Third-Party Services Setup](#4-cloud-third-party-services-setup)
   - [4.1 Supabase Cloud (PostgreSQL, Auth, Storage)](#41-supabase-cloud-postgresql-auth-storage)
   - [4.2 Google Gemini AI (Eco-Packaging Specialist)](#42-google-gemini-ai-eco-packaging-specialist)
   - [4.3 PromptPay QR Payment (Production-Ready QR)](#43-promptpay-qr-payment-production-ready-qr)
5. [Deploying to Vercel (24/7 Serverless Cloud Hosting)](#5-deploying-to-vercel-247-serverless-cloud-hosting)
6. [Cloud Health & Diagnostics API](#6-cloud-health--diagnostics-api)
7. [Troubleshooting Common Issues](#7-troubleshooting-common-issues)

---

## 1. Cloud Architecture Overview (24/7 Uptime)

Once fully deployed, the entire platform runs independently of your personal computer:

```text
       [ Global Users (Desktop / Mobile Devices) ]
                          │
                          ▼ HTTPS
       ┌─────────────────────────────────────────┐
       │   Vercel Serverless Edge Platform       │
       │   - Next.js 15 App Router (Frontend)    │
       │   - REST API Routes & Serverless Logic  │
       └─────┬───────────────────┬─────────┬─────┘
             │                   │         │
             ▼                   ▼         ▼
     [ Supabase Cloud ]    [ Google AI ]  [ PromptPay CDN ]
     - PostgreSQL DB       - Gemini 1.5   - Dynamic EMVCo
     - Supabase Auth         Flash API      QR Generation
     - Storage Buckets
```

> [!IMPORTANT]
> **The platform stays online 24/7 even after you turn off your computer.** Once deployed to **Vercel** with **Supabase Cloud** configured, your local machine has zero involvement in serving requests. Anyone worldwide can access, browse, chat with the AI, and place orders anytime.

---

## 2. Prerequisites

Ensure the following tools are installed on your machine:
* **Node.js**: `v20.x` or `v22.x` (LTS recommended)
* **npm** (`v10+`), **pnpm**, or **yarn**
* **Git** installed on your system
* Free accounts on cloud providers:
  1. [GitHub](https://github.com) (for code hosting)
  2. [Vercel](https://vercel.com) (for zero-cost web hosting)
  3. [Supabase](https://supabase.com) (for free cloud database & auth)
  4. [Google AI Studio](https://aistudio.google.com) (for free Gemini API keys)

---

## 3. Local Development Setup

### 3.1 Clone & Navigate to Project Directory
```bash
cd greeny-platform
```

### 3.2 Install NPM Dependencies
```bash
npm install
```
This automatically installs all dependencies and triggers `prisma generate` to compile the database client.

### 3.3 Create Environment File (`.env`)
Copy the provided template:
```bash
cp .env.example .env
```
*(If cloud credentials are not yet populated, the app runs in **Sandbox Fallback Mode**, allowing full offline preview and UI exploration without errors).*

### 3.4 Launch Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 4. Cloud Third-Party Services Setup

### 4.1 Supabase Cloud (PostgreSQL, Auth, Storage)

1. Log in to [Supabase](https://supabase.com) and click **New Project**:
   - **Name:** `greeny_eco_db`
   - **Password:** Choose a secure database password (save it safely).
   - **Region:** Select **Singapore (`ap-southeast-1`)** for minimal latency across Southeast Asia.
2. Retrieve **API Keys**:
   - Go to **Project Settings** (gear icon) ➔ **API**.
   - Copy **Project URL** into `NEXT_PUBLIC_SUPABASE_URL`.
   - Copy **anon public** key into `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   - Copy **service_role** key into `SUPABASE_SERVICE_ROLE_KEY`.
3. Retrieve **Database Connection Strings**:
   - Go to **Project Settings** ➔ **Database** ➔ scroll to **Connection string (URI)**.
   - **`DATABASE_URL`**: Check *"Use connection pooling"* (Transaction mode, port 6543) and append `?pgbouncer=true`.
   - **`DIRECT_URL`**: Uncheck connection pooling (Session mode, port 5432).
4. Update your `.env` file:
   ```ini
   DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
   NEXT_PUBLIC_SUPABASE_URL="https://[ref].supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..."
   ```
5. Push schema and populate authentic seed data:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```
   *This initializes 3 authentic Thai stores and 9 agricultural eco-packaging products.*

---

### 4.2 Google Gemini AI (Eco-Packaging Specialist)

1. Navigate to [Google AI Studio](https://aistudio.google.com/).
2. Click **Get API Key** ➔ **Create API Key**.
3. Add the key to `.env`:
   ```ini
   GEMINI_API_KEY="AIzaSy..."
   ```
4. The built-in `Greeny Chat AI` modal will now forward customer inquiries directly to **Gemini 1.5 Flash**, returning contextual packaging recommendations (crush resistance, degradation timeline, and matching catalog items).

---

### 4.3 PromptPay QR Payment (Production-Ready QR)

* Located in [src/app/api/orders/checkout/route.ts](file:///c:/Users/USER/Downloads/project-econ/greeny-platform/src/app/api/orders/checkout/route.ts).
* Automatically encodes net order totals into EMVCo-compliant PromptPay QR payloads.
* Customers can scan and pay instantly using any Thai Mobile Banking application.

---

## 5. Deploying to Vercel (24/7 Serverless Cloud Hosting)

Follow these steps to deploy the site to the cloud and keep it online 24/7:

1. Push the repository to your **GitHub** account:
   ```bash
   git add .
   git commit -m "feat: complete 24/7 cloud third-party architecture"
   git push origin main
   ```
2. Go to [Vercel](https://vercel.com) and click **Add New...** ➔ **Project**.
3. Import your GitHub repository.
4. Under **Configure Project** ➔ **Environment Variables**, add all keys from `.env`:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_SITE_URL` (Set to your Vercel URL, e.g., `https://greeny-platform.vercel.app`)
5. Click **Deploy**.
6. When deployment finishes, your website is live worldwide. You can close your laptop and turn off your PC—the website remains fully functional 24 hours a day!

---

## 6. Cloud Health & Diagnostics API

Verify your third-party integrations anytime by visiting:
* Local: [http://localhost:3000/api/health/cloud](http://localhost:3000/api/health/cloud)
* Production: `https://your-domain.vercel.app/api/health/cloud`

Sample JSON response:
```json
{
  "status": "ok",
  "services": {
    "supabaseAuth": { "status": "configured", "provider": "Supabase Auth" },
    "supabaseDatabase": { "status": "connected", "records": 9 },
    "packagingAI": { "status": "cloud_gemini_active", "provider": "Google Gemini 1.5 Flash" },
    "paymentGateway": { "status": "active", "provider": "PromptPay Official QR" },
    "webHosting": { "status": "vercel_cloud" }
  }
}
```

---

## 7. Troubleshooting Common Issues

### Issue 1: `Error: P1001: Can't reach database server`
* **Cause**: Incorrect database password or omitted connection pooler suffix.
* **Solution**: Verify credentials in `.env`. Ensure `DATABASE_URL` ends with `?pgbouncer=true` and uses port 6543, while `DIRECT_URL` uses port 5432.

### Issue 2: Website goes down when PC is shut down
* **Cause**: Accessing `localhost:3000` (which is hosted strictly on your local PC hardware).
* **Solution**: You must access via your **Vercel production URL** (e.g., `https://greeny-platform.vercel.app`) as configured in [Section 5](#5-deploying-to-vercel-247-serverless-cloud-hosting).

### Issue 3: Excel Displays Thai Characters Incorrectly in CSV Exports
* **Cause**: Windows Excel defaulting to legacy ANSI encoding when opening CSV files lacking a BOM.
* **Solution**: Resolved in `src/app/api/admin/export/route.ts` with UTF-8 BOM (`\uFEFF`) pre-pended to all CSV downloads.
