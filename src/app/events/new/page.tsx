"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";

// ✅ Zod schema
const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  location: z.string().min(2, "Location is required"),
});

type EventFormData = z.infer<typeof eventSchema>;

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  // ✅ Create new event
  const onSubmit = async (data: EventFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create event");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-lg mx-auto py-10 px-4">
      <Card className="shadow-lg border border-gray-200 dark:border-gray-800">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
            🎉 Create New Event
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <Label className="text-sm font-medium">Title</Label>
              <Input type="text" placeholder="Event Title" {...register("title")} />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <Label className="text-sm font-medium">Date</Label>
              <Input type="date" {...register("date")} />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <Label className="text-sm font-medium">Location</Label>
              <Input
                type="text"
                placeholder="Event Location"
                {...register("location")}
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                </>
              ) : (
                "Create Event"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
