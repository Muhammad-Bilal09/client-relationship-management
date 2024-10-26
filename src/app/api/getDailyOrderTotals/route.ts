import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma";

export async function GET() {
  try {
    const results = await prisma?.order?.groupBy({
      by: ["date"],
      _sum: {
        total: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    const dailyTotals = results?.map((item: any) => ({
      date: item?.date,
      total: item?._sum?.total,
    }));

    return NextResponse.json(dailyTotals);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch daily totals" },
      { status: 500 }
    );
  }
}
