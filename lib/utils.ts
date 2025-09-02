import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// 🔹 Shadcn helper for merging Tailwind class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 🔹 Your slug generator
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with dash
    .replace(/(^-|-$)+/g, "");   // trim leading/trailing dash
}
