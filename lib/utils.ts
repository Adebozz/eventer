export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with dash
    .replace(/(^-|-$)+/g, "");   // trim leading/trailing dash
}
