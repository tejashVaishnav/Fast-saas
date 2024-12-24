// app/api/cron/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils";
import moment from "moment";
export async function GET(request: NextRequest) {
  // Check for authorization
  if (
    request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await prisma.dummy.create({
      data: { name: moment().format("MMM Do YY") },
    });
    return NextResponse.json(
      { message: "Cron job executed successfully", response },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in cron job:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
