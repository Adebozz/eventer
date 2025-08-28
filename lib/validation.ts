import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  location: z.string().min(2, "Location is required"),
  slug: z.string().optional(), // 🔧 auto-generated if missing
});
