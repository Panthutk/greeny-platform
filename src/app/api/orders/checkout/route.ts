import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { buyerId, storeId, items, shippingAddress, shippingCarrier, paymentMethod } = body;

    const orderId = `ORD-${Date.now().toString().slice(-8)}`;

    return NextResponse.json(
      {
        success: true,
        orderId,
        status: "TO_PAY",
        shippingCarrier: shippingCarrier || "ขนส่ง 1 (Flash Express)",
        paymentMethod: paymentMethod || "PROMPTPAY",
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
