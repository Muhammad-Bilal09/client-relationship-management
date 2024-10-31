import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma";

export const POST = async (request: NextRequest) => {
  try {
    const { userId, newName, newEmail } = await request.json();

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const updateData: any = {};

    if (newName) {
      updateData.name = newName;
    }
    if (newEmail) {
      updateData.email = newEmail;
    }

    if (Object?.keys(updateData)?.length === 0) {
      return new NextResponse("No fields provided to update", { status: 400 });
    }
    const updatedUser = await prisma?.user?.update({
      where: { id: userId },
      data: updateData,
    });
    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to update user", { status: 500 });
  }
};
