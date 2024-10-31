import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma";

export const POST = async (request: NextRequest) => {
  try {
    const { name, quantity, price, category, image } = await request.json();

    if (!name || !quantity || !price || !category) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const parsedQuantity = parseInt(quantity, 10);
    const parsedPrice = parseFloat(price);

    if (isNaN(parsedQuantity) || isNaN(parsedPrice)) {
      return new NextResponse("Invalid number format", { status: 400 });
    }

    const item = await prisma?.item?.create({
      data: {
        name,
        quantity: parsedQuantity,
        price: parsedPrice,
        category,
        image: image || "",
      },
    });
    return new NextResponse("Item added successfully", { status: 200 });
  } catch (error) {
    return new NextResponse(`Failed to create item`, {
      status: 500,
    });
  }
};
