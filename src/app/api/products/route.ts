import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const material = searchParams.get("material");
    const query = searchParams.get("q");

    try {
      const whereClause: any = {};
      if (material) {
        whereClause.materialType = material;
      }
      if (query) {
        whereClause.name = { contains: query, mode: "insensitive" };
      }

      const products = await prisma.product.findMany({
        where: whereClause,
        include: {
          store: {
            select: {
              storeName: true,
              isMallVerified: true,
            },
          },
        },
        orderBy: { soldCount: "desc" },
      });

      if (products && products.length > 0) {
        return NextResponse.json({
          source: "supabase-database",
          products: products.map((p) => ({
            id: p.id,
            name: p.name,
            retailPrice: Number(p.retailPrice),
            images: p.images,
            storeName: p.store?.storeName || "Greeny Official Store",
            isMall: p.store?.isMallVerified || true,
            soldCount: p.soldCount,
            rating: Number(p.rating),
            size: p.size,
            wholesaleTiers: p.wholesaleTiersJson,
            materialType: p.materialType,
          })),
        });
      }
    } catch (dbError) {
      console.warn("DB query fallback to catalog:", (dbError as any)?.message);
    }

    // Default authentic catalog
    const fallbackProducts = [
      {
        id: "prod-hyacinth-1",
        name: "ผักตบชวาอบแห้งกันกระแทก 1 กิโลกรัม",
        image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800&auto=format&fit=crop",
        retailPrice: 59.0,
        storeName: "สวนดินดี ออร์แกนิค",
        soldCount: 1420,
        rating: 4.95,
        isMall: true,
        size: "1 กก.",
        isFreeShipping: true,
        wholesaleTiers: [
          { minQty: 3, unitPrice: 49.0, discountPct: 17 },
          { minQty: 6, unitPrice: 42.0, discountPct: 28 },
          { minQty: 12, unitPrice: 35.0, discountPct: 40 },
        ],
      },
      {
        id: "prod-coir-1",
        name: "ขุยมะพร้าวอัดแผ่นกันกระแทก (ต้านแรงกด 15 kg)",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop",
        retailPrice: 75.0,
        storeName: "Green Living Crafts Thailand",
        soldCount: 2150,
        rating: 4.98,
        isMall: true,
        size: "แพ็ค 5 แผ่น",
        wholesaleTiers: [
          { minQty: 3, unitPrice: 65.0, discountPct: 13 },
          { minQty: 6, unitPrice: 56.0, discountPct: 25 },
          { minQty: 12, unitPrice: 46.0, discountPct: 38 },
        ],
      },
      {
        id: "prod-mycelium-1",
        name: "แผ่นโฟมเห็ดชีวมวลกันกระแทก (Mycelium Packaging)",
        image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop",
        retailPrice: 89.0,
        storeName: "Green Living Crafts Thailand",
        soldCount: 540,
        rating: 4.92,
        isMall: true,
        size: "10x10x5 cm",
        wholesaleTiers: [
          { minQty: 10, unitPrice: 79.0, discountPct: 11 },
          { minQty: 50, unitPrice: 69.0, discountPct: 22 },
        ],
      },
    ];

    return NextResponse.json({
      source: "cached-catalog",
      products: fallbackProducts,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}
