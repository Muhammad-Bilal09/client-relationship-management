import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma";

export const GET = async (request: NextRequest) => {
  try {
    const items = await prisma?.order?.findMany();
    return new NextResponse(JSON.stringify(items), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to fetch order", { status: 500 });
  }
};
