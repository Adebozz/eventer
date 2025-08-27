import { NextResponse } from "next/server";
import prisma from "@/src/libs/prisma"; // ✅ ensure correct prisma import
import { eventSchema } from "@/lib/validation"; // ✅ shared schema

// ✅ GET /api/events → fetch all
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: "asc" },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// ✅ POST /api/events → create new
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = eventSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const newEvent = await prisma.event.create({
      data: {
        ...parsed.data,
        date: new Date(parsed.data.date), // 🔧 ensure Date object
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
