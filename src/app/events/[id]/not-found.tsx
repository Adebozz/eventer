export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold text-red-500 mb-2">
        Event Not Found
      </h1>
      <p className="text-gray-500 dark:text-gray-400">
        The event you are looking for doesn’t exist or was removed.
      </p>
    </main>
  );
}
