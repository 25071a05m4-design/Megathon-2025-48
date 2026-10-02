'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { heroGreetings } from '@/lib/yatra-data'
import { cn } from '@/lib/utils'

function FloatWord({ word }: { word: (typeof heroGreetings)[number] }) {
  const ref = useRef<HTMLSpanElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 120, damping: 12 })
  const y = useSpring(useMotionValue(0), { stiffness: 120, damping: 12 })

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set((e.clientX - r.left - r.width / 2) * 0.4)
    y.set((e.clientY - r.top - r.height / 2) * 0.4)
  }

  return (
    <motion.span
      className="absolute"
      style={{ top: word.top, left: word.left }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, -18, 0] }}
      transition={{
        opacity: { delay: 2.4 + word.delay * 0.3, duration: 1.2 },
        y: { duration: 9 + word.delay, repeat: Infinity, ease: 'easeInOut', delay: word.delay },
      }}
    >
      <motion.span
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => {
          x.set(0)
          y.set(0)
        }}
        style={{ x, y }}
        whileHover={{ scale: 1.35 }}
        className={cn(
          'group relative block cursor-default px-3 py-2 font-display text-foreground/25 transition-[color,text-shadow] duration-500 hover:text-saffron hover:[text-shadow:0_0_24px_var(--saffron)]',
          word.size,
        )}
      >
        {word.text}
        <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 text-[9px] tracking-[0.3em] whitespace-nowrap text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
          {word.lang.toUpperCase()}
        </span>
      </motion.span>
    </motion.span>
  )
}

export function FloatingLanguages() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block [&>*]:pointer-events-auto" aria-hidden="true">
      {heroGreetings.map((w) => (
        <FloatWord key={w.text} word={w} />
      ))}
    </div>
  )
}
