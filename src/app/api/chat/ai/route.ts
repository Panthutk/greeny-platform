import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = (body.query || "").toLowerCase();

    const isFragile =
      query.includes("ขวดแก้ว") ||
      query.includes("แก้ว") ||
      query.includes("แตก") ||
      query.includes("15kg") ||
      query.includes("15 กก") ||
      query.includes("glass");

    if (isFragile) {
      return NextResponse.json({
        analysis:
          "สำหรับสินค้าแตกหักง่าย เช่น ขวดแก้ว เซรามิก แนะนำ 'ขุยมะพร้าวอัดแผ่นกันกระแทก' ผ่านการทดสอบรับแรงตกกระทบและแรงกดทับสูงสุด 15 กิโลกรัม ย่อยสลายได้ 100% ภายใน 120 วัน หรือใช้ 'ถาดชานอ้อยขึ้นรูป' ล็อคคอขวดเพื่อความปลอดภัยสูงสุด",
        materialRecommended: "COCONUT_COIR",
        crushResistanceKg: 15,
        biodegradableDays: 120,
        recommendedProducts: [
          {
            id: "prod-coir-1",
            name: "ขุยมะพร้าวอัดแผ่นกันกระแทก (ต้านแรงกด 15 kg)",
            retailPrice: 75.0,
            storeName: "Green Living Crafts Thailand",
            rating: 4.98,
            soldCount: 2150,
            highlight: "ต้านแรงกดทับ 15 kg ผ่านการทดสอบขวดแก้วสมบูรณ์",
            image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop",
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
          },
        ],
      });
    }

    return NextResponse.json({
      analysis:
        "สำหรับพัสดุทั่วไป แนะนำ 'ผักตบชวาอบแห้ง' หรือ 'โฟมแป้งข้าวโพดละลายน้ำ' น้ำหนักเบา ป้องกันการขยับของสินค้าได้ดีเยี่ยม และเป็นมิตรต่อสิ่งแวดล้อม 100%",
      materialRecommended: "HYACINTH",
      crushResistanceKg: 8,
      biodegradableDays: 60,
      recommendedProducts: [
        {
          id: "prod-hyacinth-1",
          name: "ผักตบชวาอบแห้งกันกระแทก 1 กิโลกรัม",
          retailPrice: 59.0,
          storeName: "สวนดินดี ออร์แกนิค",
          rating: 4.95,
          soldCount: 1420,
          highlight: "สะอาด ไร้ฝุ่น อบแสงอาทิตย์ ย่อยสลาย 60 วัน",
          image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800&auto=format&fit=crop",
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
        },
      ],
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process AI query" }, { status: 500 });
  }
}
