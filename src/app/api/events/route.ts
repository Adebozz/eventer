import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

// Type for incoming request body
interface EventBody {
  title: string;
  date: string;
  location: string;
}

// ✅ Get all events
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// ✅ Create new event
export async function POST(req: Request) {
  try {
    const body: EventBody = await req.json();
    const { title, date, location } = body;

    if (!title || !date || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newEvent = await prisma.event.create({
      data: {
        title,
        date: new Date(date), // convert string → Date
        location,
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
