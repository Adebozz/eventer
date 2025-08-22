'use client'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'


export default function Navbar() {
return (
<nav className="sticky top-0 z-40 px-4 h-14 flex items-center justify-between border-b">
<Link href="/" className="font-semibold">eventer</Link>
<div className="flex items-center gap-2">
<ThemeToggle />
</div>
</nav>
)
}