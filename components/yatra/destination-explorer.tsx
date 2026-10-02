'use client'

import { motion, type MotionValue, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { destinations } from '@/lib/yatra-data'
import { Eyebrow } from './primitives'

function DestinationCard({
  d,
  index,
  progress,
}: {
  d: (typeof destinations)[number]
  index: number
  progress: MotionValue<number>
}) {
  const imgX = useTransform(progress, [0, 1], ['-6%', '6%'])

  return (
    <article className="group relative h-[68vh] w-[78vw] shrink-0 overflow-hidden rounded-2xl border border-foreground/10 sm:w-[48vw] lg:w-[30vw]">
      <motion.div className="absolute -inset-x-[8%] inset-y-0" style={{ x: imgX }}>
        <Image
          src={d.image}
          alt={`${d.name.toLowerCase()} at dusk`}
          fill
          sizes="(min-width: 1024px) 34vw, 80vw"
          className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <div className="absolute inset-0 border border-saffron/0 transition-colors duration-500 group-hover:border-saffron/60" />

      <div className="absolute inset-x-5 top-5 flex justify-between text-[10px] tracking-[0.3em] text-foreground/70">
        <span>{String(index + 1).padStart(2, '0')} / {String(destinations.length).padStart(2, '0')}</span>
        <span className="translate-y-[-150%] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">{d.coords}</span>
      </div>

      <div className="absolute inset-x-5 bottom-5 transition-transform duration-500 group-hover:-translate-y-2">
        <span className="text-xs tracking-[0.15em] text-saffron">{d.languages}</span>
        <h3 className="mt-2 font-display text-4xl leading-none font-extrabold tracking-tight md:text-5xl">{d.name}</h3>
        <p className="mt-3 text-sm font-light text-foreground/80">{`"${d.tagline}"`}</p>
        <a
          href="#journey"
          className="mt-5 inline-flex translate-y-4 items-center gap-2 text-[11px] tracking-[0.3em] text-saffron opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
        >
          EXPLORE <span aria-hidden="true">→</span>
          <span className="sr-only">{d.name}</span>
        </a>
      </div>
    </article>
  )
}

export function DestinationExplorer() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const [height, setHeight] = useState<number | null>(null)

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      const d = Math.max(0, track.scrollWidth - window.innerWidth)
      setDistance(d)
      setHeight(d + window.innerHeight)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="destinations" ref={sectionRef} className="relative" style={{ height: height ?? '300vh' }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-6 px-5 md:px-10">
          <div className="flex w-[78vw] shrink-0 flex-col justify-between self-stretch py-4 sm:w-[48vw] lg:w-[32vw]">
            <Eyebrow>Destinations</Eyebrow>
            <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.88] font-extrabold tracking-tight">
              GO WHERE
              <br />
              THE <span className="text-saffron">STORIES</span>
              <br />
              ARE.
            </h2>
            <p className="max-w-xs text-sm font-light text-muted-foreground">
              Seven cities, fourteen languages, one companion that speaks them all. Scroll to travel.
            </p>
          </div>
          {destinations.map((d, i) => (
            <DestinationCard key={d.name} d={d} index={i} progress={scrollYProgress} />
          ))}
          <div className="w-[10vw] shrink-0" />
        </motion.div>

        <div className="mx-5 mt-8 h-px bg-foreground/10 md:mx-10">
          <motion.div className="h-full bg-saffron" style={{ width: bar }} />
        </div>
      </div>
    </section>
  )
}
