'use client'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 px-4 h-14 flex items-center justify-between border-b bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md">
      <Link href="/" className="font-bold text-lg tracking-tight">
        eventer
      </Link>

      <div className="flex items-center gap-3">
        {/* + New Event Button */}
        <Link
          href="/events/new"
          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow hover:opacity-90 transition"
        >
          + New Event
        </Link>

        <ThemeToggle />
      </div>
    </nav>
  )
}
