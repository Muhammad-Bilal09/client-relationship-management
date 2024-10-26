import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma";

export const GET = async (request: NextRequest) => {
  try {
    const users = await prisma?.user?.findMany();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Failed to fetch items", { status: 500 });
  }
};
