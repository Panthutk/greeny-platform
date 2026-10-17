import { PrismaClient, UserRole, PayoutMethod, MaterialType, FlashSaleType, CertificationType, PaymentMethod, OrderStatus, PostType, Visibility } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  console.log("🌱 Starting Greeny Platform database seeding...");

  // 1. Create Sellers & Users
  const sellerUser1 = await prisma.user.upsert({
    where: { email: "din-dee@greeny.co.th" },
    update: {},
    create: {
      id: "usr-seller-01",
      email: "din-dee@greeny.co.th",
      name: "สวนดินดี ออร์แกนิค",
      phone: "0819991111",
      role: UserRole.SELLER,
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRmtW_2gBEijmck1lpmDmR6Xy8J0eW-Yc-44tL8OKaQvd8XvQHFqYpHsEVzEr0uQCuYqRmMa8afjDn7G9PCqH9ETPduyllujJFaOGhsJbHBUECw5UlUFVQWmMsxu3DydQP-a1ld5VY0BctQvyTDhCDDxu1Ca9ZNtYTn_ItjFcCoXNlmDZtPRwj7wP1zKM9UhEEkIOLYeuDYEzaA-51gWaa0LN3YJyrP1gtVJbbfqtiHy5BbjZ02PZC",
      walletBalance: 124580.0,
      carbonSavedKg: 3420.5,
    },
  });

  const sellerUser2 = await prisma.user.upsert({
    where: { email: "green-living@greeny.co.th" },
    update: {},
    create: {
      id: "usr-seller-02",
      email: "green-living@greeny.co.th",
      name: "Green Living Crafts",
      phone: "0828882222",
      role: UserRole.SELLER,
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkN4-Uv7vucXC8jOtVfUpmmk_m0Dh17O6fbTvXle8Bg7mcFtFZfTzRBIM8nmoFx_ITlbRdAhIUSpnF8jEEiV0yXLlOLPtesmF1YgKNnb4Yuc3UVs8NB9NWKKwtVYI7wCwX9w6snEUrZZbBlHLwEZxm5MDmvwr_VqK_qdSDnO_ag_HDj1WpeMVBiwaS4ITx75VTQ-iOmPQZ5W4v1xKrANzJJYG87lJxPSVMmFDb9SgyJhNkQknCImyM",
      walletBalance: 45820.5,
      carbonSavedKg: 1890.0,
    },
  });

  const buyerUser = await prisma.user.upsert({
    where: { email: "somchai@greeny.co.th" },
    update: {},
    create: {
      id: "usr-buyer-01",
      email: "somchai@greeny.co.th",
      name: "สมชาย รักธรรมชาติ",
      phone: "0897773333",
      role: UserRole.BUYER,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
      walletBalance: 2500.0,
      carbonSavedKg: 42.5,
    },
  });

  // 2. Create Stores
  const store1 = await prisma.store.upsert({
    where: { ownerId: sellerUser1.id },
    update: {},
    create: {
      id: "store-01",
      ownerId: sellerUser1.id,
      storeName: "สวนดินดี ออร์แกนิค (Official Store)",
      corporateTaxId: "0105562089123",
      taxAddressJson: {
        addressLine: "88 หมู่ 4 ตำบลลำลูกกาบัว",
        district: "ดอนตูม",
        province: "นครปฐม",
        postalCode: "73150",
        country: "Thailand",
      },
      storeAddressJson: {
        hubName: "คลังสินค้าดินดีภาคกลาง",
        addressLine: "88 หมู่ 4 ตำบลลำลูกกาบัว",
        district: "ดอนตูม",
        province: "นครปฐม",
        postalCode: "73150",
      },
      phone: "0819991111",
      payoutMethod: PayoutMethod.PROMPTPAY,
      payoutAccount: "0819991111",
      isMallVerified: true,
      sustainabilityScore: 99.4,
    },
  });

  const store2 = await prisma.store.upsert({
    where: { ownerId: sellerUser2.id },
    update: {},
    create: {
      id: "store-02",
      ownerId: sellerUser2.id,
      storeName: "Green Living Crafts Thailand",
      corporateTaxId: "0105561044567",
      taxAddressJson: {
        addressLine: "123 ซอยอารีย์สัมพันธ์ 5",
        district: "พญาไท",
        province: "กรุงเทพมหานคร",
        postalCode: "10400",
        country: "Thailand",
      },
      storeAddressJson: {
        hubName: "ศูนย์กระจายสินค้า กทม. อารีย์",
        addressLine: "123 ซอยอารีย์สัมพันธ์ 5",
        district: "พญาไท",
        province: "กรุงเทพมหานคร",
        postalCode: "10400",
      },
      phone: "0828882222",
      payoutMethod: PayoutMethod.BANK,
      payoutAccount: "045-2-99881-2 ธนาคารกสิกรไทย",
      isMallVerified: true,
      sustainabilityScore: 98.8,
    },
  });

  // 3. Create Thai Eco-Packaging Products (PDF Pages 23, 25, 30)
  const productsData = [
    {
      id: "prod-hyacinth-1",
      storeId: store1.id,
      name: "ผักตบชวาอบแห้งกันกระแทก 1 กิโลกรัม",
      description: "ผักตบชวาธรรมชาติ 100% ผ่านกรรมวิธีล้างสะอาด อบแห้งฆ่าเชื้อด้วยตู้อบแสงอาทิตย์ ไร้กลิ่นอับ ไร้สารเคมี ใช้รองก้นกล่อง ห่อหุ้มเครื่องสำอาง เซรามิก และขวดแก้วได้อย่างมั่นใจ ย่อยสลายได้ใน 60 วัน",
      materialType: MaterialType.HYACINTH,
      usageInfo: "ใช้รองก้นกล่องหรืออัดรอบสินค้าเพื่อป้องกันการขยับและรับแรงกระแทกระหว่างขนส่ง",
      warningInfo: "ควรเก็บในที่แห้ง ไม่โดนความชื้นหรือฝน",
      nutritionInfo: "เซลลูโลสธรรมชาติ 100% ย่อยสลายตามธรรมชาติกลายเป็นปุ๋ยบำรุงดิน",
      hashtags: ["#ผักตบชวา", "#กันกระแทก", "#ลดขยะ", "#พลาสติกฟรี", "#GreenMall"],
      images: [
        "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=800&auto=format&fit=crop",
      ],
      retailPrice: 59.0,
      wholesaleTiersJson: [
        { minQty: 3, unitPrice: 49.0, discountPct: 17 },
        { minQty: 6, unitPrice: 42.0, discountPct: 28 },
        { minQty: 12, unitPrice: 35.0, discountPct: 40 },
      ],
      stock: 450,
      size: "ถุงละ 1 กก. (บรรจุ 100 ลิตร)",
      flashSaleType: FlashSaleType.HOURLY,
      flashSaleEndsAt: new Date(Date.now() + 3600 * 1000),
      isBuyOneGetOne: false,
      isFreeShipping: true,
      certifications: [CertificationType.ORGANIC, CertificationType.OTOP, CertificationType.DISTRICT_AGRI],
      certDocUrl: "https://placeholder.supabase.co/storage/v1/object/public/certification-docs/cert-hyacinth-01.pdf",
      soldCount: 1420,
      rating: 4.95,
      carbonOffsetKg: 0.85,
    },
    {
      id: "prod-straw-1",
      storeId: store1.id,
      name: "ฟางข้าวอัดเส้นกันกระแทกปลอดสารพิษ",
      description: "ฟางข้าวหอมมะลิจากแปลงเกษตรอินทรีย์ ปลอดสารเคมี นำมาสางและตัดเส้นรองรับแรงกระแทกเบา เหมาะกับกล่องเบเกอรี่ เสื้อผ้า และของขวัญ",
      materialType: MaterialType.RICE_STRAW,
      usageInfo: "ฉีกเส้นฟางให้ฟูและจัดวางรอบตัวสินค้า",
      warningInfo: "หลีกเลี่ยงประกายไฟและความชื้น",
      nutritionInfo: "ฟางข้าวอินทรีย์ ย่อยสลาย 100%",
      hashtags: ["#ฟางข้าว", "#กันกระแทกอินทรีย์", "#บรรจุภัณฑ์รักษ์โลก"],
      images: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop",
      ],
      retailPrice: 45.0,
      wholesaleTiersJson: [
        { minQty: 3, unitPrice: 38.0, discountPct: 15 },
        { minQty: 6, unitPrice: 32.0, discountPct: 28 },
        { minQty: 12, unitPrice: 26.0, discountPct: 42 },
      ],
      stock: 300,
      size: "ถุงละ 500 กรัม",
      flashSaleType: FlashSaleType.DAILY,
      flashSaleEndsAt: new Date(Date.now() + 86400 * 1000),
      isBuyOneGetOne: true,
      isFreeShipping: true,
      certifications: [CertificationType.ORGANIC, CertificationType.GAP_GMP],
      soldCount: 980,
      rating: 4.88,
      carbonOffsetKg: 0.65,
    },
    {
      id: "prod-coir-1",
      storeId: store2.id,
      name: "ขุยมะพร้าวอัดแผ่นกันกระแทก (ต้านแรงกดทับสูงสุด 15 กก.)",
      description: "นวัตกรรมโฟมธรรมชาติจากขุยมะพร้าวภาคใต้ ผ่านการทดสอบรับแรงตกกระทบและแรงกดทับสูงสุด 15 กิโลกรัม เหมาะอย่างยิ่งสำหรับการขนส่งขวดแก้ว ไวน์ และเซรามิกราคาแพง",
      materialType: MaterialType.COCONUT_COIR,
      usageInfo: "ประกบสินค้าด้านบนและด้านล่างกล่อง รองรับขวดแก้วได้สมบูรณ์",
      warningInfo: "ทนความชื้นได้ปานกลาง ระวังอย่าให้โดนน้ำโดยตรง",
      nutritionInfo: "กากมะพร้าวผสมน้ำยางพาราธรรมชาติ ย่อยสลายใน 120 วัน",
      hashtags: ["#ขุยมะพร้าว", "#ต้านแรงกด15kg", "#ขนส่งขวดแก้ว", "#กันกระแทก"],
      images: [
        "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop",
      ],
      retailPrice: 75.0,
      wholesaleTiersJson: [
        { minQty: 3, unitPrice: 65.0, discountPct: 13 },
        { minQty: 6, unitPrice: 56.0, discountPct: 25 },
        { minQty: 12, unitPrice: 46.0, discountPct: 38 },
      ],
      stock: 600,
      size: "แผ่นขนาด 20x30 ซม. หนา 2 ซม. (แพ็ค 5 แผ่น)",
      flashSaleType: FlashSaleType.SPECIAL,
      flashSaleEndsAt: new Date(Date.now() + 48 * 3600 * 1000),
      isBuyOneGetOne: false,
      isFreeShipping: false,
      certifications: [CertificationType.GAP_GMP, CertificationType.HACCP, CertificationType.OTOP],
      soldCount: 2150,
      rating: 4.98,
      carbonOffsetKg: 1.25,
    },
    {
      id: "prod-mycelium-1",
      storeId: store2.id,
      name: "แผ่นโฟมเห็ดชีวมวลกันกระแทก (Mycelium Packaging)",
      description: "โฟมชีวภาพที่เพาะจากเส้นใยเห็ดและเศษวัสดุเหลือใช้ทางการเกษตร เบา เหนียว ไม่ติดไฟ แข็งแรงทนทานเทียบเท่าโฟม EPS แต่ย่อยสลายได้ในดิน 100% ภายใน 45 วัน",
      materialType: MaterialType.MYCELIUM,
      usageInfo: "ใช้รองรับสินค้าอิเล็กทรอนิกส์และเครื่องใช้ไฟฟ้า",
      warningInfo: "เก็บในที่ร่ม อุณหภูมิห้อง",
      nutritionInfo: "Pure Mushroom Mycelium & Agricultural Byproduct",
      hashtags: ["#เส้นใยเห็ด", "#Mycelium", "#ZeroWaste", "#โฟมชีวภาพ"],
      images: [
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop",
      ],
      retailPrice: 89.0,
      wholesaleTiersJson: [
        { minQty: 3, unitPrice: 79.0, discountPct: 11 },
        { minQty: 6, unitPrice: 69.0, discountPct: 22 },
        { minQty: 12, unitPrice: 59.0, discountPct: 33 },
      ],
      stock: 200,
      size: "ขนาด 15x15x10 cm",
      isBuyOneGetOne: false,
      isFreeShipping: true,
      certifications: [CertificationType.ORGANIC, CertificationType.HACCP],
      soldCount: 540,
      rating: 4.92,
      carbonOffsetKg: 1.8,
    },
    {
      id: "prod-bagasse-1",
      storeId: store1.id,
      name: "ถาดชานอ้อยขึ้นรูปกันกระแทกสำหรับขวดแก้ว",
      description: "ถาดล็อคขวดแก้วขึ้นรูปจากเยื่อชานอ้อยแท้ 100% ล็อคขวดได้แน่นหนา ลดความเสียหายจากการสั่นสะเทือน เหมาะสำหรับขวดน้ำผึ้งและขวดซอส",
      materialType: MaterialType.BAGASSE,
      usageInfo: "วางล็อคคอขวดและก้นขวดก่อนบรรจุลงกล่องกระดาษ",
      warningInfo: "เก็บให้พ้นความชื้นสูง",
      nutritionInfo: "กากอ้อยเหลือใช้จากอุตสาหกรรมน้ำตาล ย่อยสลายได้ 100%",
      hashtags: ["#ชานอ้อย", "#ถาดล็อคขวด", "#ย่อยสลายได้"],
      images: [
        "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop",
      ],
      retailPrice: 65.0,
      wholesaleTiersJson: [
        { minQty: 3, unitPrice: 55.0, discountPct: 15 },
        { minQty: 6, unitPrice: 48.0, discountPct: 26 },
        { minQty: 12, unitPrice: 39.0, discountPct: 40 },
      ],
      stock: 500,
      size: "แพ็ค 10 ชิ้น สำหรับขวดขนาด 250-500ml",
      isBuyOneGetOne: false,
      isFreeShipping: true,
      certifications: [CertificationType.OTOP, CertificationType.FDA],
      soldCount: 1670,
      rating: 4.85,
      carbonOffsetKg: 0.9,
    },
    {
      id: "prod-cornstarch-1",
      storeId: store2.id,
      name: "โฟมแป้งข้าวโพดละลายน้ำ (Bio Peanuts)",
      description: "เม็ดโฟมตัวหนอนทำจากแป้งข้าวโพดธรรมชาติ 100% ละลายน้ำได้ภายใน 1 นาที ปลอดภัยต่อสัตว์เลี้ยงและเด็ก ไม่เป็นภาระต่อสิ่งแวดล้อม",
      materialType: MaterialType.CORNSTARCH,
      usageInfo: "เทเติมเต็มช่องว่างในกล่องพัสดุ ป้องกันสินค้าเคลื่อนที่",
      warningInfo: "ระวังน้ำและความชื้น ห้ามโดนฝน",
      nutritionInfo: "Cornstarch 99% + Water 1%",
      hashtags: ["#โฟมละลายน้ำ", "#แป้งข้าวโพด", "#BioPeanuts"],
      images: [
        "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop",
      ],
      retailPrice: 49.0,
      wholesaleTiersJson: [
        { minQty: 3, unitPrice: 42.0, discountPct: 14 },
        { minQty: 6, unitPrice: 36.0, discountPct: 26 },
        { minQty: 12, unitPrice: 29.0, discountPct: 40 },
      ],
      stock: 400,
      size: "ถุงใหญ่ 50 ลิตร",
      flashSaleType: FlashSaleType.HOURLY,
      flashSaleEndsAt: new Date(Date.now() + 3600 * 1000),
      isBuyOneGetOne: false,
      isFreeShipping: false,
      certifications: [CertificationType.ORGANIC, CertificationType.FDA],
      soldCount: 3100,
      rating: 4.96,
      carbonOffsetKg: 0.5,
    },
    {
      id: "prod-banana-1",
      storeId: store1.id,
      name: "ก้านกล้วยอบแห้งถักเกลียวกันกระแทก",
      description: "ภูมิปัญญาชาวบ้าน นำก้านกล้วยมาตีเกลียวและอบแห้ง นุ่ม ยืดหยุ่น ทนแรงฉุดกระชากได้สูง เหมาะกับการห่อของขวัญและสินค้าแฮนด์เมด",
      materialType: MaterialType.BANANA_STEM,
      usageInfo: "พันรอบตัวสินค้าหรือขดเป็นรังนกรองรับสินค้า",
      warningInfo: "เก็บในที่แห้ง",
      nutritionInfo: "ก้านกล้วยอินทรีย์ 100%",
      hashtags: ["#ก้านกล้วย", "#งานฝีมือ", "#กันกระแทกธรรมชาติ"],
      images: [
        "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=800&auto=format&fit=crop",
      ],
      retailPrice: 55.0,
      wholesaleTiersJson: [
        { minQty: 3, unitPrice: 47.0, discountPct: 14 },
        { minQty: 6, unitPrice: 40.0, discountPct: 27 },
        { minQty: 12, unitPrice: 33.0, discountPct: 40 },
      ],
      stock: 350,
      size: "ม้วนยาว 10 เมตร",
      isBuyOneGetOne: false,
      isFreeShipping: true,
      certifications: [CertificationType.OTOP, CertificationType.DISTRICT_AGRI],
      soldCount: 890,
      rating: 4.82,
      carbonOffsetKg: 0.7,
    },
    {
      id: "prod-honeycomb-1",
      storeId: store2.id,
      name: "กระดาษคราฟท์รังผึ้งย่อยสลายได้ (Honeycomb Paper)",
      description: "กระดาษคราฟท์รีไซเคิล 100% ยืดออกเป็นโครงสร้างรังผึ้งสามมิติ ล็อคตัวเองได้โดยไม่ต้องใช้เทปกาว ปกป้องสินค้าได้อย่างมีสไตล์",
      materialType: MaterialType.HONEYCOMB,
      usageInfo: "ดึงยืดกระดาษเบาๆ ให้กลายเป็นตารังผึ้ง แล้วพันรอบตัวสินค้า ล็อคปลายกระดาษโดยไม่ต้องใช้กาว",
      warningInfo: "หลีกเลี่ยงเปลวไฟ",
      nutritionInfo: "100% Recycled Kraft Paper",
      hashtags: ["#กระดาษรังผึ้ง", "#HoneycombPaper", "#พลาสติกฟรี"],
      images: [
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop",
      ],
      retailPrice: 69.0,
      wholesaleTiersJson: [
        { minQty: 3, unitPrice: 59.0, discountPct: 14 },
        { minQty: 6, unitPrice: 49.0, discountPct: 28 },
        { minQty: 12, unitPrice: 39.0, discountPct: 43 },
      ],
      stock: 550,
      size: "หน้ากว้าง 30 ซม. ยาว 30 เมตร",
      isBuyOneGetOne: false,
      isFreeShipping: true,
      certifications: [CertificationType.GAP_GMP],
      soldCount: 2800,
      rating: 4.94,
      carbonOffsetKg: 1.1,
    },
    {
      id: "prod-popcorn-1",
      storeId: store1.id,
      name: "โฟมป๊อปคอร์นธรรมชาติ (Organic Popcorn Cushion)",
      description: "เมล็ดข้าวโพดดิบคั่วพอง ไม่ปรุงแต่งรสชาติ สำหรับรองพัสดุ ใช้ทดแทนเม็ดพลาสติก ทิ้งลงดินหรือเป็นอาหารปลาได้ทันที",
      materialType: MaterialType.POPCORN,
      usageInfo: "เทลงในกล่องพัสดุเป็นวัสดุรองและกันกระแทก",
      warningInfo: "ระวังมดและแมลง ควรเก็บในถุงซิปล็อค",
      nutritionInfo: "เมล็ดข้าวโพดพันธุ์ไทย 100%",
      hashtags: ["#โฟมป๊อปคอร์น", "#เป็นมิตรต่อสิ่งแวดล้อม", "#อาหารปลา"],
      images: [
        "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=800&auto=format&fit=crop",
      ],
      retailPrice: 39.0,
      wholesaleTiersJson: [
        { minQty: 3, unitPrice: 33.0, discountPct: 15 },
        { minQty: 6, unitPrice: 28.0, discountPct: 28 },
        { minQty: 12, unitPrice: 22.0, discountPct: 43 },
      ],
      stock: 250,
      size: "ถุงละ 20 ลิตร",
      isBuyOneGetOne: true,
      isFreeShipping: false,
      certifications: [CertificationType.ORGANIC, CertificationType.OTOP],
      soldCount: 760,
      rating: 4.79,
      carbonOffsetKg: 0.4,
    },
  ];

  for (const p of productsData) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {},
      create: p,
    });
  }

  // 4. Create Greeny Lives Stream Posts
  await prisma.socialPost.upsert({
    where: { id: "post-live-01" },
    update: {},
    create: {
      id: "post-live-01",
      authorId: sellerUser1.id,
      storeId: store1.id,
      postType: PostType.LIVE,
      title: "สาธิตกันกระแทกจากผักตบชวา อบแห้ง 1 กก.",
      caption: "ชมการทดสอบโยนกล่องพัสดุบรรจุขวดแก้วจากความสูง 1.5 เมตร พร้อมรับโค้ดลดพิเศษ 20% ในไลฟ์สดนี้!",
      mediaUrls: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBRmtW_2gBEijmck1lpmDmR6Xy8J0eW-Yc-44tL8OKaQvd8XvQHFqYpHsEVzEr0uQCuYqRmMa8afjDn7G9PCqH9ETPduyllujJFaOGhsJbHBUECw5UlUFVQWmMsxu3DydQP-a1ld5VY0BctQvyTDhCDDxu1Ca9ZNtYTn_ItjFcCoXNlmDZtPRwj7wP1zKM9UhEEkIOLYeuDYEzaA-51gWaa0LN3YJyrP1gtVJbbfqtiHy5BbjZ02PZC",
      ],
      likesCount: 1240,
      viewsCount: 342,
      taggedProductIds: ["prod-hyacinth-1", "prod-straw-1"],
    },
  });

  await prisma.socialPost.upsert({
    where: { id: "post-live-02" },
    update: {},
    create: {
      id: "post-live-02",
      authorId: sellerUser2.id,
      storeId: store2.id,
      postType: PostType.LIVE,
      title: "ทดสอบการรับแรงกด 15 kg ของขุยมะพร้าวอัดแผ่น",
      caption: "ทดสอบจริงด้วยเครื่องกดน้ำหนักมาตรฐาน มั่นใจได้ว่าส่งขวดแก้วไม่แตกแน่นอน สั่งซื้อวันนี้ส่งฟรี!",
      mediaUrls: [
        "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop",
      ],
      likesCount: 890,
      viewsCount: 215,
      taggedProductIds: ["prod-coir-1", "prod-mycelium-1"],
    },
  });

  // 5. Create UGC & External Lemon8 Reviews (PDF Pages 30–31)
  await prisma.socialPost.upsert({
    where: { id: "post-rev-01" },
    update: {},
    create: {
      id: "post-rev-01",
      authorId: buyerUser.id,
      postType: PostType.EXTERNAL_REVIEW,
      title: "เปลี่ยนมาใช้ผักตบชวาแทนบับเบิ้ล ลูกค้าชมเพียบ! 🌿📦",
      caption: "เปิดร้านขนมออนไลน์มา 3 ปี ลูกค้าชอบมากที่เปลี่ยนมาใช้ผักตบชวา หอมกลิ่นธรรมชาติ ขนมไม่แตกเลยสักกล่อง แถมเอาไปใส่ต้นไม้ต่อได้ด้วย แนะนำสั่งแพ็คราคาส่ง 12 กก. คุ้มมาก!",
      mediaUrls: [
        "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800&auto=format&fit=crop",
      ],
      externalSourceUrl: "https://www.lemon8-app.com/@ecolover_bkk/post/7123982341",
      externalPlatform: "Lemon8",
      likesCount: 456,
      viewsCount: 3200,
      taggedProductIds: ["prod-hyacinth-1"],
    },
  });

  await prisma.socialPost.upsert({
    where: { id: "post-rev-02" },
    update: {},
    create: {
      id: "post-rev-02",
      authorId: buyerUser.id,
      postType: PostType.REVIEW_PHOTO,
      title: "รีวิวโฟมแป้งข้าวโพด ละลายน้ำโชว์ให้ดูจะๆ",
      caption: "ได้รับของแล้ว แกะกล่องมาคือสะอาดมาก เอาไปแช่น้ำ 1 นาทีละลายเกลี้ยง ไม่เหลือขยะให้รกบ้านเลย ประทับใจ 10/10",
      mediaUrls: [
        "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop",
      ],
      likesCount: 312,
      viewsCount: 1850,
      taggedProductIds: ["prod-cornstarch-1"],
    },
  });

  console.log("✅ Seed completed successfully! 3 stores, 9 eco products, 2 lives, and 2 reviews created.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
