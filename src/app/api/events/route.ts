import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { eventSchema } from "../../../../lib/validation";
import { generateSlug } from "../../../../lib/utils";

// ✅ GET /api/events
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

// ✅ POST /api/events
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

    const slug = parsed.data.slug || generateSlug(parsed.data.title);

    const newEvent = await prisma.event.create({
      data: {
        ...parsed.data,
        slug,
        date: new Date(parsed.data.date),
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
