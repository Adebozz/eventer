"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewEventPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, location, date }),
    });

    setLoading(false);
    if (res.ok) {
      router.push("/"); // redirect back to homepage
    } else {
      alert("Failed to create event");
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Create a New Event
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow border"
      >
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Event title"
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="e.g. New York City"
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow hover:opacity-90 disabled:opacity-50 transition"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </main>
  );
}
