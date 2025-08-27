"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(2, "Location must be at least 2 characters"),
})

type EventFormData = z.infer<typeof eventSchema>

export default function EventForm() {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  })

  const onSubmit = async (data: EventFormData) => {
    try {
      setLoading(true)
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Failed to create event")

      reset()
      alert("✅ Event created successfully!")
    } catch (err) {
      console.error(err)
      alert("❌ Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Create Event</h2>

      {/* Title */}
      <div>
        <label className="block font-medium">Title</label>
        <input
          {...register("title")}
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500"
          placeholder="Enter event title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <label className="block font-medium">Date</label>
        <input
          type="date"
          {...register("date")}
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500"
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      {/* Location */}
      <div>
        <label className="block font-medium">Location</label>
        <input
          {...register("location")}
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500"
          placeholder="Enter location"
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Event"}
      </button>
    </form>
  )
}
