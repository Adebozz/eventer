"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Loader2, Pencil, Trash2 } from "lucide-react";

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
};

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // ✅ Delete event
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await fetch(`/api/events/${id}`, { method: "DELETE" });
      setEvents(events.filter((event) => event.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">📅 Upcoming Events</h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/events/new">+ Create Event</Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : events.length === 0 ? (
        <p className="text-gray-500 text-center">No events found. Create one!</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((event) => (
            <Card
              key={event.id}
              className="shadow-md border border-gray-200 dark:border-gray-800"
            >
              <CardContent className="p-6 space-y-3">
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-gray-600">
                  📍 {event.location} <br />
                  📆 {new Date(event.date).toLocaleDateString()}
                </p>

                <div className="flex justify-end gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/events/${event.id}/edit`}>
                      <Pencil className="h-4 w-4 mr-1" /> Edit
                    </Link>
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
