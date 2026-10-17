# API Routes & Server Actions Contract: Greeny Eco-Commerce Platform

**Feature**: `001-eco-commerce-platform` | **Date**: 2026-10-17

---

## 1. REST Endpoints & Route Handlers

### `GET /api/products`
Fetch paginated catalog products with filtering.
- **Query Parameters:**
  - `category` (`string`, optional): Material filter (e.g. `HYACINTH`, `RICE_STRAW`)
  - `q` (`string`, optional): Search query
  - `storeId` (`string`, optional): Filter by merchant
  - `isMall` (`boolean`, optional): Mall verified products only
  - `isFlashSale` (`boolean`, optional): Active flash sale items only
  - `mode` (`'retail' | 'wholesale'`, optional)
- **Response `200 OK`:**
  ```json
  {
    "products": [
      {
        "id": "uuid",
        "name": "ผักตบชวาอบแห้งกันกระแทก 1 กก.",
        "retailPrice": 59.00,
        "wholesaleTiers": [
          { "minQty": 3, "unitPrice": 49.00, "discountPct": 17 },
          { "minQty": 6, "unitPrice": 42.00, "discountPct": 28 },
          { "minQty": 12, "unitPrice": 35.00, "discountPct": 40 }
        ],
        "images": ["https://..."],
        "isMall": true,
        "soldCount": 1250,
        "rating": 4.95,
        "store": { "id": "store-1", "storeName": "สวนดินดี ออร์แกนิค", "isMallVerified": true }
      }
    ],
    "total": 140
  }
  ```

---

### `POST /api/chat/ai`
Greeny AI Packaging Consultant query endpoint.
- **Request Body:**
  ```json
  {
    "query": "ฉันต้องการกันกระแทกแบบโฟมรับแรงกดทับได้ดี สำหรับส่งขวดแก้ว",
    "sessionId": "session-xyz"
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "analysis": "สำหรับขวดแก้วที่แตกหักง่าย แนะนำ 'ขุยมะพร้าวกันกระแทก' ผ่านการทดสอบขนส่งขวดแก้วได้สมบูรณ์ ต้านแรงกดทับสูงสุด 15 กิโลกรัม ย่อยสลายได้ 100% ใน 120 วัน",
    "recommendedProducts": [
      {
        "id": "prod-coir-1",
        "name": "ขุยมะพร้าวอัดแผ่นกันกระแทก",
        "retailPrice": 45.00,
        "storeName": "Green Living Crafts",
        "rating": 5.0,
        "soldCount": 1400
      }
    ]
  }
  ```

---

### `POST /api/orders/checkout`
Create a confirmed purchase transaction.
- **Request Body:**
  ```json
  {
    "buyerId": "user-uuid",
    "storeId": "store-uuid",
    "items": [
      { "productId": "prod-1", "quantity": 3, "unitPrice": 49.00 }
    ],
    "shippingAddress": {
      "recipientName": "สมชาย รักธรรมชาติ",
      "phone": "0812345678",
      "address": "123/45 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900"
    },
    "shippingCarrier": "ขนส่ง 1 (Flash Express)",
    "paymentMethod": "PROMPTPAY"
  }
  ```
- **Response `201 Created`:**
  ```json
  {
    "orderId": "ORD-20261017-0091",
    "totalAmount": 147.00,
    "qrCodePayload": "00020101021129370016A000000677010111011300668123456785802TH53037645406147.006304ABCD",
    "status": "TO_PAY"
  }
  ```

---

### `GET /api/admin/export`
Generate and download the operational Excel/CSV export matching PDF Page 55.
- **Query Parameters:** `startDate`, `endDate`, `storeId`
- **Response `200 OK`:** Content-Type `text/csv; charset=utf-8` containing the 11 columns:
  1. `Seller_Username` (ชื่อผู้ขาย)
  2. `Affiliate_ID` (รหัส Affiliate)
  3. `Affiliate_Fee` (ค่าคอมมิชชั่น Affiliate)
  4. `Product_Specs` (สเปคสินค้า & วัตถุดิบ)
  5. `Certifications` (มาตรฐานและใบรับรอง)
  6. `Ad_Fee` (ค่าโฆษณา)
  7. `Selling_Fee` (ค่าธรรมเนียมการขาย)
  8. `Buyer_Info` (ข้อมูลผู้ซื้อ)
  9. `Payment_Channel` (ช่องทางการชำระเงิน)
  10. `Cancellation_Status` (สถานะการยกเลิก/คืนสินค้า)
  11. `Carrier` (ผู้ให้บริการขนส่ง)
