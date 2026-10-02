'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const words = ['नमस्ते', 'నమస్కారం', 'வணக்கம்', 'নমস্কার', 'HELLO']

export function Preloader() {
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (index < words.length - 1) {
      const t = setTimeout(() => setIndex((i) => i + 1), 300)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setDone(true), 550)
    return () => clearTimeout(t)
  }, [index])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-6">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.22 }}
                className="font-display text-5xl font-bold text-foreground md:text-7xl"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
            <div className="h-px w-48 overflow-hidden bg-foreground/10">
              <motion.div
                className="h-full bg-saffron"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.7, ease: 'easeInOut' }}
              />
            </div>
            <span className="text-[10px] tracking-[0.4em] text-muted-foreground">YATRA · INITIALISING LENS</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
