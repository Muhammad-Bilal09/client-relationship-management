import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, type, date, description, fileUrl } = body;
    if (!title || !type || !date || !description || !fileUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newDocument = await prisma?.document?.create({
      data: {
        title,
        type,
        date: new Date(date),
        description,
        fileUrl,
      },
    });

    return NextResponse.json(newDocument, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
