import React from "react";
import { prisma } from "@/libs/prisma";

export default async function HomePage() {
  // ✅ Fetch events directly from the database (server component)
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-5xl mx-auto p-8">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        Upcoming Events
      </h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No events available. 🎉
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="group relative p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Accent bar */}
              <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl"></span>

              <h2 className="text-2xl font-semibold mb-2 text-gray-800 group-hover:text-purple-600 transition-colors">
                {event.title}
              </h2>

              <p className="text-gray-600 mb-4">
                📍 {event.location}
              </p>

              <p className="text-sm text-gray-500">
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <button className="mt-4 w-full py-2 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:opacity-90 transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
