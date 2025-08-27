"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

// ✅ Zod schema
const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  location: z.string().min(2, "Location is required"),
});

type EventFormData = z.infer<typeof eventSchema>;

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const eventId = params?.id;

  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<EventFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  // ✅ Fetch existing event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${eventId}`);
        if (!res.ok) throw new Error("Failed to fetch event");
        const data = await res.json();
        const formatted = {
          title: data.title,
          date: new Date(data.date).toISOString().split("T")[0],
          location: data.location,
        };
        setInitialData(formatted);
        reset(formatted);
      } catch (error) {
        console.error(error);
      }
    };
    if (eventId) fetchEvent();
  }, [eventId, reset]);

  // ✅ Update event
  const onSubmit = async (data: EventFormData) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update event");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!initialData) {
    return (
      <p className="text-center py-6 text-gray-500 animate-pulse">
        Loading event...
      </p>
    );
  }

  return (
    <main className="max-w-lg mx-auto py-10 px-4">
      <Card className="shadow-lg border border-gray-200 dark:border-gray-800">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
            ✏️ Edit Event
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <Label className="text-sm font-medium">Title</Label>
              <Input
                type="text"
                placeholder="Event Title"
                {...register("title")}
                defaultValue={initialData.title}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Date */}
            <div>
              <Label className="text-sm font-medium">Date</Label>
              <Input
                type="date"
                {...register("date")}
                defaultValue={initialData.date}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <Label className="text-sm font-medium">Location</Label>
              <Input
                type="text"
                placeholder="Event Location"
                {...register("location")}
                defaultValue={initialData.location}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                </>
              ) : (
                "Update Event"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
