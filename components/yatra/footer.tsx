'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { Arrow, MagneticButton, RevealLines } from './primitives'

export function FinalSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '0%'])

  return (
    <section id="journey" ref={ref} className="relative overflow-hidden">
      <motion.div className="absolute inset-0 -top-[15%]" style={{ y: bgY }}>
        <Image src="/images/final-bg.png" alt="" fill sizes="100vw" className="object-cover opacity-60" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-[30vh] px-5 py-[25vh] md:px-10">
        <RevealLines
          className="font-display text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.9] font-extrabold tracking-tight"
          lines={['THE WORLD', 'IS FULL OF', 'PLACES.']}
          lineClassName={(i) => (i === 2 ? 'text-saffron' : '')}
        />
        <RevealLines
          className="self-end text-right font-display text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.9] font-extrabold tracking-tight"
          lines={["DON'T LET", 'LANGUAGE', 'BECOME THE', 'WALL.']}
          lineClassName={(i) => (i === 1 ? 'text-stroke' : i === 3 ? 'text-electric' : '')}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <span className="font-display text-[clamp(5rem,18vw,16rem)] leading-none font-extrabold tracking-tight">
            YATRA<span className="text-saffron">.</span>
          </span>
          <p className="mt-4 text-sm tracking-[0.45em] text-muted-foreground">TRAVEL BEYOND LANGUAGE.</p>
          <MagneticButton href="#top" className="mt-12">
            START YOUR JOURNEY <Arrow />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="relative border-t border-foreground/10 px-5 py-8 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-[10px] tracking-[0.3em] text-muted-foreground md:flex-row">
        <span className="font-display text-sm font-extrabold tracking-[0.25em] text-foreground">
          YATRA<span className="text-saffron">.</span>
        </span>
        <span>OCR · ASR · MT · TTS · VISION</span>
        <span>{'MADE FOR INDIA · © 2026'}</span>
      </div>
    </footer>
  )
}
