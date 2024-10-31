import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma";

export const DELETE = async (request: NextRequest) => {
  try {
    const { id } = await request.json();

    if (!id) {
      return new NextResponse("Missing id", { status: 400 });
    }

    await prisma?.item?.delete({
      where: { id },
    });

    return new NextResponse("Item deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to delete item", { status: 500 });
  }
};
