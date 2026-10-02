'use client'

import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { assistantReplies } from '@/lib/yatra-data'
import { Eyebrow, RevealLines, StatusDot, Waveform, speak } from './primitives'

type Message = { id: number; from: 'you' | 'ai'; text: string }

const initial: Message[] = [
  { id: 1, from: 'you', text: 'What does this sign mean?' },
  { id: 2, from: 'ai', text: 'It says the monument opens at 9:00 AM. Would you like to hear its history?' },
]

function TypedText({ text, onDone }: { text: string; onDone?: () => void }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count >= text.length) {
      onDone?.()
      return
    }
    const t = setTimeout(() => setCount((c) => c + 1), 18)
    return () => clearTimeout(t)
  }, [count, text, onDone])

  return (
    <>
      {text.slice(0, count)}
      {count < text.length && <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-electric align-middle" />}
    </>
  )
}

export function TravelAssistant() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const [messages, setMessages] = useState<Message[]>([])
  const [thinking, setThinking] = useState(false)
  const [typingId, setTypingId] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!inView) return
    const a = setTimeout(() => setMessages([initial[0]]), 300)
    const b = setTimeout(() => setThinking(true), 900)
    const c = setTimeout(() => {
      setThinking(false)
      setMessages(initial)
      setTypingId(2)
    }, 2200)
    return () => [a, b, c].forEach(clearTimeout)
  }, [inView])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, thinking])

  function ask(action: string) {
    if (thinking || typingId !== null) return
    const id = Date.now()
    setMessages((m) => [...m, { id, from: 'you', text: action.charAt(0) + action.slice(1).toLowerCase() }])
    setThinking(true)
    setTimeout(() => {
      setThinking(false)
      setMessages((m) => [...m, { id: id + 1, from: 'ai', text: assistantReplies[action] }])
      setTypingId(id + 1)
      if (action === 'SPEAK') speak(assistantReplies[action])
    }, 1100)
  }

  return (
    <section id="assistant" className="relative overflow-hidden px-5 py-32 md:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div>
          <Eyebrow>AI travel assistant</Eyebrow>
          <RevealLines
            className="mt-8 font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.9] font-extrabold tracking-tight"
            lines={['A COMPANION,', 'NOT A', 'CHATBOT.']}
            lineClassName={(i) => (i === 2 ? 'text-electric' : '')}
          />
          <p className="mt-8 max-w-md text-lg leading-relaxed font-light text-muted-foreground">
            YATRA remembers what you just saw, heard and asked. Every answer is grounded in where you are standing —
            and ready to be read, spoken or mapped.
          </p>
        </div>

        <div ref={ref} className="relative">
          <span
            aria-hidden="true"
            className="absolute -inset-10 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, oklch(0.83 0.13 210 / 0.15), transparent 65%)' }}
          />
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 12 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="drift relative rounded-3xl border border-foreground/10 bg-ink/70 p-6 backdrop-blur-2xl md:p-8"
            style={{ '--dur': '9s' } as React.CSSProperties}
          >
            <header className="flex items-center justify-between border-b border-foreground/10 pb-5">
              <div className="flex items-center gap-3">
                <span className="relative flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-electric">
                  <span className="size-3 rounded-full bg-ink" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold tracking-[0.25em]">YATRA AI</p>
                  <p className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-jade">
                    <StatusDot /> ONLINE
                  </p>
                </div>
              </div>
              <Waveform active={thinking || typingId !== null} bars={14} className="h-5" />
            </header>

            <div ref={scrollRef} className="flex h-[320px] flex-col gap-6 overflow-y-auto py-6 pr-1" aria-live="polite">
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={m.from === 'you' ? 'self-end text-right' : 'self-start'}
                  >
                    <span className={`text-[10px] tracking-[0.3em] ${m.from === 'you' ? 'text-muted-foreground' : 'text-electric'}`}>
                      {m.from === 'you' ? 'YOU' : 'YATRA AI'}
                    </span>
                    <p
                      className={`mt-1.5 max-w-sm leading-relaxed ${
                        m.from === 'you' ? 'font-display text-xl font-semibold' : 'border-l border-electric/40 pl-4 font-light text-foreground/90'
                      }`}
                    >
                      {m.id === typingId ? <TypedText text={m.text} onDone={() => setTypingId(null)} /> : m.text}
                    </p>
                  </motion.div>
                ))}
                {thinking && (
                  <motion.div key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-1.5 self-start pl-1">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="size-1.5 rounded-full bg-electric"
                        animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-foreground/10 pt-5">
              {Object.keys(assistantReplies).map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => ask(action)}
                  className="rounded-full border border-foreground/15 px-4 py-2 text-[10px] tracking-[0.2em] transition-all hover:border-electric hover:bg-electric/10 hover:text-electric"
                >
                  {action}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
