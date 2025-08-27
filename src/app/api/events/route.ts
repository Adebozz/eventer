import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { z } from "zod";

// ✅ Define schema with Zod
const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  location: z.string().min(2, "Location must be at least 2 characters"),
});

// ✅ Get all events
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

// ✅ Create new event with Zod validation
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔍 Validate request
    const parsed = eventSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors.map((e) => e.message) },
        { status: 400 }
      );
    }

    const { title, date, location } = parsed.data;

    const newEvent = await prisma.event.create({
      data: {
        title,
        date: new Date(date),
        location,
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
