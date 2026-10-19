import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      buyerId,
      buyerName = "สมชาย รักธรรมชาติ",
      items = [],
      shippingAddress = {},
      shippingCarrier = "Flash Express",
      paymentMethod = "PROMPTPAY",
      totalAmount = 0,
      discountAmount = 0,
    } = body;

    const orderCode = `ORD-${Date.now().toString().slice(-8)}`;
    let savedToDatabase = false;

    try {
      // Find or create default buyer if DB is connected
      const buyer = await prisma.user.upsert({
        where: { email: "somchai@greeny.co.th" },
        update: {},
        create: {
          id: buyerId || "usr-buyer-01",
          email: "somchai@greeny.co.th",
          name: buyerName,
          phone: "0897773333",
          role: "BUYER",
        },
      });

      // Find store
      const store = await prisma.store.findFirst();
      const storeId = store?.id || "store-01";

      const createdOrder = await prisma.order.create({
        data: {
          id: orderCode,
          buyerId: buyer.id,
          storeId: storeId,
          itemsJson: items,
          shippingAddressJson: shippingAddress,
          shippingCarrier: shippingCarrier,
          paymentMethod:
            paymentMethod === "CREDIT"
              ? "CREDIT_CARD"
              : paymentMethod === "BANK"
              ? "BANK_TRANSFER"
              : "PROMPTPAY",
          totalAmount: totalAmount,
          discountAmount: discountAmount,
          status: "TO_PAY",
        },
      });

      savedToDatabase = true;
    } catch (dbError) {
      console.warn("Supabase/Prisma database write deferred (sandbox mode):", (dbError as any)?.message);
    }

    // Generate standard PromptPay payment link (PromptPay QR CDN format)
    const promptPayPhoneNumber = "0819991111"; // Greeny Official Store PromptPay
    const promptPayQrUrl = `https://promptpay.io/${promptPayPhoneNumber}/${Number(totalAmount).toFixed(2)}.png`;

    return NextResponse.json(
      {
        success: true,
        orderId: orderCode,
        status: "TO_PAY",
        shippingCarrier: shippingCarrier,
        paymentMethod: paymentMethod,
        totalAmount: totalAmount,
        savedToDatabase,
        promptPayQrUrl,
        promptPayAccount: promptPayPhoneNumber,
        createdAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process checkout transaction" },
      { status: 500 }
    );
  }
}
