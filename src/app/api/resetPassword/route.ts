import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/config/prisma";

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request?.json();

    if (!token || !password) {
      return new NextResponse("Token and new password are required", {
        status: 400,
      });
    }

    const resetToken = await prisma?.resetToken?.findUnique({
      where: { token },
    });

    if (!resetToken || resetToken?.expiry < new Date()) {
      return new NextResponse("Invalid or expired token", { status: 400 });
    }

    const user = await prisma?.user?.findUnique({
      where: { id: resetToken?.userId },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma?.user?.update({
      where: { id: user?.id },
      data: { password: hashedPassword },
    });

    await prisma?.resetToken?.delete({ where: { token } });

    return new NextResponse("Password successfully reset", { status: 200 });
  } catch (error) {
    return new NextResponse(`Internal Server Error`, {
      status: 500,
    });
  }
}
