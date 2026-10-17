import { NextResponse } from "next/server";

export async function GET() {
  const headers = [
    "Seller_Username",
    "Affiliate_ID",
    "Affiliate_Fee",
    "Product_Specs",
    "Certifications",
    "Ad_Fee",
    "Selling_Fee",
    "Buyer_Info",
    "Payment_Channel",
    "Cancellation_Status",
    "Carrier",
  ];

  const sampleRows = [
    [
      "din-dee@greeny.co.th (สวนดินดี ออร์แกนิค)",
      "AFF-8921",
      "15.00",
      "ผักตบชวาอบแห้ง 1 กก. (ความชื้น <10%)",
      "Organic Thailand / GAP-GMP",
      "25.00",
      "12.50",
      "สมชาย รักธรรมชาติ (081-234-5678, กทม.)",
      "PROMPTPAY",
      "NONE",
      "Flash Express (ขนส่ง 1)",
    ],
    [
      "green-living@greeny.co.th (Green Living Crafts)",
      "AFF-3412",
      "22.50",
      "ขุยมะพร้าวอัดแผ่น ต้านแรงกด 15kg",
      "HACCP / OTOP",
      "35.00",
      "18.00",
      "วิชัย บรรจุภัณฑ์ไทย (089-888-9999, เชียงใหม่)",
      "CREDIT_CARD",
      "NONE",
      "Kerry Express (ขนส่ง 2)",
    ],
    [
      "din-dee@greeny.co.th (สวนดินดี ออร์แกนิค)",
      "NONE",
      "0.00",
      "ฟางข้าวอัดเส้นกันกระแทก 500g",
      "Organic Thailand",
      "0.00",
      "9.50",
      "ร้านกาแฟรักษ์โลก (082-111-2222, นครปฐม)",
      "PROMPTPAY",
      "NONE",
      "ไปรษณีย์ไทย EMS (ขนส่ง 3)",
    ],
  ];

  const csvContent =
    "\uFEFF" + // UTF-8 BOM for Excel Thai compatibility
    [headers.join(","), ...sampleRows.map((row) => row.map((val) => `"${val.replace(/"/g, '""')}"`).join(","))].join(
      "\r\n"
    );

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="greeny_platform_operations_export_p55.csv"',
    },
  });
}
