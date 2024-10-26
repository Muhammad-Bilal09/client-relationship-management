import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma";

export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new NextResponse("Email and password are required", {
        status: 400,
      });
    }

    const user = await prisma?.user?.findUnique({
      where: { email },
    });

    if (!user) {
      return new NextResponse("Invalid email or password", { status: 401 });
    }

    const isPasswordMatch = await bcryptjs?.compare(password, user?.password);

    if (!isPasswordMatch) {
      return new NextResponse("Invalid email or password", { status: 401 });
    }

    return new NextResponse("Login successful", { status: 200 });
  } catch (error: any) {
    return new NextResponse("Login failed", { status: 500 });
  }
};
