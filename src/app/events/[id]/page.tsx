"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ Fetch event by id
  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`/api/events/${params.id}`);
        if (!res.ok) throw new Error("Event not found");
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [params.id]);

  // ✅ Delete event
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await fetch(`/api/events/${params.id}`, { method: "DELETE" });
      router.push("/"); // Redirect to homepage after delete
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (loading) return <p className="p-6">Loading event...</p>;
  if (!event) return <p className="p-6 text-gray-500">Event not found</p>;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-2">
        📍 {event.location}
      </p>
      <p className="text-gray-600 mb-6">
        📅 {new Date(event.date).toLocaleDateString()}
      </p>

      <div className="flex gap-3">
        <Link
          href={`/events/${event.id}/edit`}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          ✏️ Edit
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          🗑️ Delete
        </button>
        <Link
          href="/"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          ⬅ Back
        </Link>
      </div>
    </main>
  );
}
