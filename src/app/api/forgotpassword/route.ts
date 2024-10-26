import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/config/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    const user = await prisma?.user?.findUnique({ where: { email } });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }
    const resetToken = uuidv4();
    const resetTokenExpiry = new Date(Date?.now() + 3600000);
    await prisma?.resetToken?.create({
      data: {
        token: resetToken,
        userId: user?.id,
        expiry: resetTokenExpiry,
      },
    });
    const transport = nodemailer?.createTransport({
      service: "gmail",
      auth: {
        user: process?.env?.SMTP_USER,
        pass: process?.env?.SMTP_PASS,
      },
    });

    const resetLink = `${process?.env?.BASE_URL}/auth/resetPassword?token=${resetToken}`;

    await transport.sendMail({
      from: "muhammadbilal0729@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`,
    });

    return new NextResponse("Password reset email sent", { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Internal Server Error: ${error.message}`, {
      status: 500,
    });
  }
}
