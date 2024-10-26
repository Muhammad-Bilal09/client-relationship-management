import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma";
import bcrypt from "bcrypt";

export const POST = async (request: NextRequest) => {
  try {
    const { userId, currentPassword, newPassword } = await request.json();

    if (!userId || !currentPassword || !newPassword) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const user = await prisma?.user?.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return new NextResponse("Current password is incorrect", { status: 401 });
    }

    const hashedPassword = await bcrypt?.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return new NextResponse("Password changed successfully", { status: 200 });
  } catch (error: any) {
    return new NextResponse("Failed to change password", { status: 500 });
  }
};
