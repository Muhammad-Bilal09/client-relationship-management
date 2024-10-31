import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma";

export const PUT = async (request: NextRequest) => {
  try {
    const { id, name, quantity, price, category } = await request.json();

    if (
      !id ||
      !name ||
      quantity === undefined ||
      price === undefined ||
      !category
    ) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const updatedItem = await prisma?.item?.update({
      where: { id },
      data: {
        name,
        quantity: parseInt(quantity, 10),
        price: parseFloat(price),
        category,
      },
    });

    return new NextResponse(JSON.stringify(updatedItem), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to update item", { status: 500 });
  }
};
