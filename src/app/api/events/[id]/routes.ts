import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma"; // ✅ Prisma singleton
import { eventSchema } from "../../../../../lib/validation"; // ✅ Zod schema

// ✅ GET /api/events/[id]
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 });
  }
}

// ✅ PUT /api/events/[id]
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const parsed = eventSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.format() }, { status: 400 });
    }

    const updatedEvent = await prisma.event.update({
      where: { id: params.id },
      data: parsed.data,
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

// ✅ DELETE /api/events/[id]
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.event.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
