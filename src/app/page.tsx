import React from "react";
import { prisma } from "@/libs/prisma";

export default async function HomePage() {
  // ✅ Fetch events directly from DB (server component)
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Upcoming Events
      </h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No events yet. Be the first to create one!
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="group relative p-6 rounded-2xl border shadow-sm bg-white dark:bg-neutral-900 transition hover:shadow-xl hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-purple-400 transition">
                {event.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                📍 {event.location}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {new Date(event.date).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <span className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-blue-500 dark:group-hover:ring-purple-500 transition pointer-events-none" />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
