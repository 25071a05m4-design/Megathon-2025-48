'use client'

import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Arrow } from './primitives'

const links = [
  { label: 'EXPLORE', href: '#explore' },
  { label: 'AI LENS', href: '#lens' },
  { label: 'LANGUAGES', href: '#languages' },
  { label: 'DESTINATIONS', href: '#destinations' },
]

export function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        aria-label="Main"
        className={cn(
          'flex w-full max-w-6xl items-center justify-between rounded-full border transition-all duration-500',
          scrolled
            ? 'border-foreground/10 bg-background/60 px-5 py-2.5 backdrop-blur-xl'
            : 'border-transparent bg-transparent px-2 py-4',
        )}
      >
        <a href="#top" className="font-display text-lg font-extrabold tracking-[0.25em]">
          YATRA<span className="text-saffron">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-[11px] font-medium tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-saffron transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#journey"
          className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-[11px] font-medium tracking-[0.2em] transition-colors hover:border-saffron hover:text-saffron"
        >
          START JOURNEY <Arrow />
        </a>
      </nav>
    </motion.header>
  )
}
