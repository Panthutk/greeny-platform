import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const hasSupabaseUrl = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
  );
  const hasSupabaseAnonKey = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes("placeholder")
  );
  const hasGeminiKey = Boolean(
    process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0
  );
  const hasDatabaseUrl = Boolean(
    process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("placeholder")
  );

  let dbConnection = "not_tested";
  let productCount = 0;

  if (hasDatabaseUrl) {
    try {
      productCount = await prisma.product.count();
      dbConnection = "connected";
    } catch (e: any) {
      dbConnection = `error: ${e?.message?.slice(0, 80)}`;
    }
  } else {
    dbConnection = "mock_mode";
  }

  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    services: {
      supabaseAuth: {
        status: hasSupabaseUrl && hasSupabaseAnonKey ? "configured" : "sandbox",
        provider: "Supabase Auth (Google / LINE / Facebook / Email)",
      },
      supabaseDatabase: {
        status: dbConnection,
        provider: "Supabase PostgreSQL via Prisma ORM",
        records: productCount,
      },
      supabaseStorage: {
        status: hasSupabaseUrl ? "configured" : "sandbox",
        buckets: ["product-media", "certification-docs", "social-posts", "payment-slips"],
      },
      packagingAI: {
        status: hasGeminiKey ? "cloud_gemini_active" : "local_expert_fallback",
        provider: hasGeminiKey ? "Google Gemini 1.5 Flash" : "Local Expert Rule-Engine",
      },
      paymentGateway: {
        status: "active",
        provider: "PromptPay Official QR (EMVCo Compatible)",
      },
      webHosting: {
        status: process.env.VERCEL ? "vercel_cloud" : "local_dev_ready",
        target: "Vercel Zero-Config Deployment",
      },
    },
  });
}
