import { NextRequest, NextResponse } from "next/server";
import { signOut } from "@/auth";

export const POST = async (request: NextRequest) => {
  try {
    await signOut({ redirect: false });
    return new NextResponse("Logout successful", { status: 200 });
  } catch (error) {
    return new NextResponse("Logout failed", { status: 500 });
  }
};
