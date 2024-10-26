import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma";

export const POST = async (request: NextRequest) => {
  try {
    const order = await request?.json();

    if (
      !order?.items ||
      !order?.status ||
      !order?.date ||
      !order?.country ||
      !order?.name ||
      !order?.address ||
      !order?.phone
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const savedOrder = await prisma?.order?.create({
      data: {
        items: order?.items,
        status: order?.status,
        email: order?.email,
        date: order?.date,
        country: order?.country,
        name: order?.name,
        address: order?.address,
        phone: order?.phone,
      },
    });
    return new NextResponse(
      JSON.stringify({
        message: "Order added successfully",
        order: savedOrder,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(`Failed to create order: ${error.message}`, {
      status: 500,
    });
  }
};
