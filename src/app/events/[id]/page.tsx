import { prisma } from "@/libs/prisma";
import { notFound } from "next/navigation";

type EventPageProps = {
  params: { id: string };
};

export default async function EventPage({ params }: EventPageProps) {
  const event = await prisma.event.findUnique({
    where: { id: params.id },
  });

  if (!event) return notFound();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow p-8 border">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {event.title}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-2 text-lg">
          📍 {event.location}
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {new Date(event.date).toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          This event was created on{" "}
          {new Date(event.createdAt).toLocaleDateString()}.
        </p>
      </div>
    </main>
  );
}
