'use client'

import { motion } from 'framer-motion'
import { accentText, helloLanguages } from '@/lib/yatra-data'
import { cn } from '@/lib/utils'
import { Eyebrow, RevealLines } from './primitives'

export function LanguageProblem() {
  return (
    <section id="explore" className="relative overflow-hidden px-5 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>The language problem</Eyebrow>

        <RevealLines
          className="mt-10 font-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.9] font-extrabold tracking-tight"
          lines={['INDIA HAS', 'MANY WAYS', 'TO SAY', 'HELLO.']}
          lineClassName={(i) => (i === 3 ? 'text-saffron' : i === 1 ? 'text-stroke' : '')}
        />

        <div className="mt-24 flex flex-wrap items-baseline gap-x-10 gap-y-6 md:gap-x-16 md:gap-y-10">
          {helloLanguages.map((lang, i) => (
            <motion.span
              key={lang.text}
              initial={{ opacity: 0, x: lang.from.x, y: lang.from.y, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1.2, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.06 }}
              className={cn(
                'cursor-default font-display leading-none font-bold transition-colors duration-500 hover:text-foreground',
                lang.size,
                lang.accent ? accentText[lang.accent] : 'text-foreground/30',
              )}
            >
              {lang.text}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-28 grid gap-8 border-t border-foreground/10 pt-10 md:grid-cols-[1fr_2fr]"
        >
          <span className="text-[11px] tracking-[0.3em] text-muted-foreground">22 SCHEDULED LANGUAGES · 1,600+ DIALECTS</span>
          <p className="font-display text-3xl leading-tight font-medium text-balance md:text-5xl">
            {'"Travel shouldn\'t require a '}
            <span className="text-electric">translation manual</span>
            {'."'}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
