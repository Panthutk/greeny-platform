import { NextResponse } from "next/server";

const FALLBACK_PRODUCTS = [
  {
    id: "prod-hyacinth-1",
    name: "ผักตบชวาอบแห้งกันกระแทก 1 กิโลกรัม",
    retailPrice: 59.0,
    storeName: "สวนดินดี ออร์แกนิค",
    rating: 4.95,
    soldCount: 1420,
    highlight: "สะอาด ไร้ฝุ่น อบแสงอาทิตย์ ย่อยสลาย 60 วัน",
    image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800&auto=format&fit=crop",
    tags: ["general", "lightweight", "hyacinth"],
  },
  {
    id: "prod-coir-1",
    name: "ขุยมะพร้าวอัดแผ่นกันกระแทก (ต้านแรงกด 15 kg)",
    retailPrice: 75.0,
    storeName: "Green Living Crafts Thailand",
    rating: 4.98,
    soldCount: 2150,
    highlight: "ต้านแรงกดทับ 15 kg ผ่านการทดสอบขวดแก้วสมบูรณ์",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop",
    tags: ["glass", "fragile", "heavy", "15kg"],
  },
  {
    id: "prod-bagasse-1",
    name: "ถาดชานอ้อยขึ้นรูปกันกระแทกสำหรับขวดแก้ว",
    retailPrice: 65.0,
    storeName: "สวนดินดี ออร์แกนิค",
    rating: 4.85,
    soldCount: 1670,
    highlight: "ล็อคคอขวดและก้นขวด ป้องกันการสั่นสะเทือน",
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop",
    tags: ["bottle", "bagasse", "food"],
  },
  {
    id: "prod-cornstarch-1",
    name: "โฟมแป้งข้าวโพดละลายน้ำ (Bio Peanuts)",
    retailPrice: 49.0,
    storeName: "Green Living Crafts Thailand",
    rating: 4.96,
    soldCount: 3100,
    highlight: "ละลายน้ำได้ใน 1 นาที ไร้สารพิษ ปลอดภัย",
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop",
    tags: ["peanut", "cornstarch", "void-fill"],
  },
  {
    id: "prod-mycelium-1",
    name: "แผ่นโฟมเห็ดชีวมวลกันกระแทก (Mycelium Packaging)",
    retailPrice: 89.0,
    storeName: "Green Living Crafts Thailand",
    rating: 4.92,
    soldCount: 540,
    highlight: "โฟมชีวภาพ แข็งแรงเทียบเท่า EPS ย่อยสลาย 45 วัน",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop",
    tags: ["electronics", "mycelium", "heavy"],
  },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = (body.query || "").trim();

    if (!query) {
      return NextResponse.json({ error: "Empty query" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If Gemini API key is available, call Google Gemini 1.5 Flash
    if (apiKey && apiKey.trim() !== "") {
      try {
        const systemPrompt = `You are Greeny Eco-Packaging AI Consultant (ผู้เชี่ยวชาญด้านบรรจุภัณฑ์ชีวภาพและวัสดุเหลือใช้ทางการเกษตรไทย สำหรับ Greeny E-Commerce).
The user is asking packaging advice for their item/product: "${query}".

Analyze what material is best suited among Thai agricultural packaging materials:
1. ผักตบชวาอบแห้ง (Water Hyacinth) - for general void fill, lightweight, absorbs shock.
2. ขุยมะพร้าวอัดแผ่น (Coconut Coir Pad) - for heavy items, withstands up to 15 kg crush resistance, excellent for glass, ceramic.
3. ถาดชานอ้อยขึ้นรูป (Bagasse Molding) - custom fitted trays for bottles, cosmetics.
4. โฟมแป้งข้าวโพดละลายน้ำ (Cornstarch Bio Peanuts) - lightweight void fill, dissolves in water in 60s.
5. โฟมเห็ดไมซีเลียม (Mycelium Foam) - premium shock absorption for electronics/appliances, EPS alternative.
6. ฟางข้าวอัดเส้น (Rice Straw) - odorless, zero chemical, natural aesthetic.

You MUST respond ONLY with a valid JSON object strictly matching this schema:
{
  "analysis": "Short professional advice in Thai (2-3 sentences) explaining which material fits best, why, and how to pack it safely.",
  "materialRecommended": "HYACINTH" | "COCONUT_COIR" | "BAGASSE" | "CORNSTARCH" | "MYCELIUM" | "RICE_STRAW",
  "crushResistanceKg": number (e.g. 5, 8, 12, 15),
  "biodegradableDays": number (e.g. 45, 60, 90, 120),
  "recommendedProductIds": string[] (Choose 1 to 3 IDs from: ["prod-hyacinth-1", "prod-coir-1", "prod-bagasse-1", "prod-cornstarch-1", "prod-mycelium-1"])
}`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: systemPrompt }] }],
              generationConfig: {
                temperature: 0.2,
                responseMimeType: "application/json",
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const responseText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (responseText) {
            const parsed = JSON.parse(responseText);
            const matchedProducts = FALLBACK_PRODUCTS.filter((p) =>
              parsed.recommendedProductIds?.includes(p.id)
            );

            return NextResponse.json({
              analysis: parsed.analysis,
              materialRecommended: parsed.materialRecommended || "HYACINTH",
              crushResistanceKg: parsed.crushResistanceKg || 8,
              biodegradableDays: parsed.biodegradableDays || 60,
              recommendedProducts:
                matchedProducts.length > 0
                  ? matchedProducts
                  : [FALLBACK_PRODUCTS[0], FALLBACK_PRODUCTS[1]],
              source: "gemini-cloud-api",
            });
          }
        }
      } catch (geminiError) {
        console.warn("Gemini API call failed, falling back to local expert engine:", geminiError);
      }
    }

    // Fallback engine if GEMINI_API_KEY is not set or network fails
    const lowerQuery = query.toLowerCase();
    const isFragile =
      lowerQuery.includes("แก้ว") ||
      lowerQuery.includes("แตก") ||
      lowerQuery.includes("เซรามิก") ||
      lowerQuery.includes("15kg") ||
      lowerQuery.includes("15 กก") ||
      lowerQuery.includes("glass") ||
      lowerQuery.includes("หนัก");

    if (isFragile) {
      return NextResponse.json({
        analysis:
          "สำหรับสินค้าแตกหักง่าย เช่น ขวดแก้ว เซรามิก แนะนำ 'ขุยมะพร้าวอัดแผ่นกันกระแทก' ผ่านการทดสอบรับแรงตกกระทบและแรงกดทับสูงสุด 15 กิโลกรัม ย่อยสลายได้ 100% ภายใน 120 วัน หรือใช้ 'ถาดชานอ้อยขึ้นรูป' ล็อคคอขวดเพื่อความปลอดภัยสูงสุด",
        materialRecommended: "COCONUT_COIR",
        crushResistanceKg: 15,
        biodegradableDays: 120,
        recommendedProducts: [FALLBACK_PRODUCTS[1], FALLBACK_PRODUCTS[2]],
        source: "local-expert-rules",
      });
    }

    return NextResponse.json({
      analysis:
        "สำหรับพัสดุทั่วไป แนะนำ 'ผักตบชวาอบแห้ง' หรือ 'โฟมแป้งข้าวโพดละลายน้ำ' น้ำหนักเบา ป้องกันการขยับของสินค้าได้ดีเยี่ยม และเป็นมิตรต่อสิ่งแวดล้อม 100%",
      materialRecommended: "HYACINTH",
      crushResistanceKg: 8,
      biodegradableDays: 60,
      recommendedProducts: [FALLBACK_PRODUCTS[0], FALLBACK_PRODUCTS[3]],
      source: "local-expert-rules",
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process AI query" }, { status: 500 });
  }
}
