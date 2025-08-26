import React from "react";
import { prisma } from "@/libs/prisma";

export default async function HomePage() {
  // ✅ Fetch events directly from the database (server component)
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Events</h1>

      {events.length === 0 ? (
        <p className="text-gray-500">No events found.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li
              key={event.id}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-600">
                📍 {event.location} —{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
