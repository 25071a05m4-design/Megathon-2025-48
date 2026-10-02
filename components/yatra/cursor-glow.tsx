'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export function CursorGlow() {
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 80, damping: 20 })
  const sy = useSpring(y, { stiffness: 80, damping: 20 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[1] size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12] mix-blend-screen"
      style={{
        x: sx,
        y: sy,
        background: 'radial-gradient(circle, var(--saffron) 0%, transparent 60%)',
      }}
    />
  )
}
