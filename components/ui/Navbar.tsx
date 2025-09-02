'use client'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 px-4 h-14 flex items-center justify-between border-b bg-white/70 dark:bg-neutral-900/70 backdrop-blur">
      <Link href="/" className="font-semibold text-lg">Eventer</Link>
      <div className="flex items-center gap-4">
        <Link 
          href="/events/new"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow hover:opacity-90 transition"
        >
          + New Event
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  )
}
