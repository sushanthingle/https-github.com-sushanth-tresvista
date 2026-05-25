'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  {
    kicker: 'EIO Model',
    heading: 'ENTERPRISE\nINTELLIGENCE\nORCHESTRATION',
    description: 'Combining advisory, technology infrastructure, and execution to orchestrate workflows across the enterprise.',
    cta: { label: 'Explore the Model', href: '#eio' },
  },
  {
    kicker: 'Governed AI',
    heading: 'GOVERNED AI.\nCONTINUOUSLY\nIMPROVING.',
    description: 'An embedded function that keeps your AI stack governed, evaluated, and effective over time.',
    cta: { label: 'Connect Today', href: '#contact' },
  },
  {
    kicker: 'Human-in-Command',
    heading: 'HUMAN-\nIN-COMMAND.',
    description: 'Every AI output is governed, validated, and executed by experts embedded directly in your operating model.',
    cta: { label: 'Who We Work With', href: '#who-we-work-with' },
  },
]

const STATS = [
  { value: '19+',   label: 'Years of Excellence' },
  { value: '2000+', label: 'Global Experts'       },
  { value: '1000+', label: 'Firms Served'          },
  { value: '7',     label: 'Global Offices'        },
]

const SLIDE_MS = 5500

export default function HeroV2() {
  const [active, setActive] = useState(0)
  const [prog,   setProg]   = useState(0)
  const [dir,    setDir]    = useState(1)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const tick = 40
    const id = setInterval(() => {
      setProg(p => {
        if (p >= 100) {
          setDir(1)
          setActive(a => (a + 1) % SLIDES.length)
          return 0
        }
        return p + (tick / SLIDE_MS) * 100
      })
    }, tick)
    return () => clearInterval(id)
  }, [paused, active])

  function goTo(i: number) {
    setDir(i > active ? 1 : -1)
    setActive(i)
    setProg(0)
  }

  const variants = {
    enter:  (d: number) => ({ opacity: 0, y: d > 0 ? 40 : -40 }),
    center: { opacity: 1, y: 0 },
    exit:   (d: number) => ({ opacity: 0, y: d > 0 ? -24 : 24 }),
  }

  return (
    <section
      className="relative flex flex-col pt-16 overflow-hidden"
      style={{ backgroundColor: '#e5e7eb', minHeight: '100svh' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.035) 1px,transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Geometric blocks — right side decoration */}
      <div className="absolute right-0 top-16 bottom-32 w-[48%] pointer-events-none hidden lg:block overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg viewBox="0 0 580 520" className="w-full max-w-[520px]">
            <motion.rect x="60" y="40" width="240" height="240" rx="32"
              fill="#2f2f2f"
              animate={{ y: [40, 28, 40] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.rect x="280" y="20" width="170" height="170" rx="28"
              fill="#d1ffca"
              animate={{ y: [20, 34, 20] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
            />
            <motion.rect x="40" y="280" width="150" height="150" rx="24"
              fill="#fff100"
              animate={{ y: [280, 268, 280] }}
              transition={{ duration: 7.0, repeat: Infinity, ease: 'easeInOut', delay: 1.3 }}
            />
            <motion.rect x="210" y="305" width="130" height="130" rx="22"
              fill="#f6b343"
              animate={{ y: [305, 318, 305] }}
              transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            />
            <motion.rect x="365" y="215" width="105" height="105" rx="18"
              fill="#979797"
              animate={{ y: [215, 228, 215] }}
              transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
            />
            <motion.rect x="410" y="95" width="72" height="72" rx="14"
              fill="#000000" opacity={0.10}
              animate={{ y: [95, 82, 95] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 2.1 }}
            />
            {/* Specular highlights */}
            <rect x="64" y="44" width="232" height="28" rx="14" fill="rgba(255,255,255,0.07)" />
            <rect x="284" y="24" width="162" height="20" rx="10" fill="rgba(255,255,255,0.38)" />
            <rect x="44" y="284" width="142" height="18" rx="9"  fill="rgba(255,255,255,0.32)" />
          </svg>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1400px] mx-auto w-full px-6 lg:px-12 py-16 lg:py-20">

        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-8 h-px bg-black/35 block" />
          <AnimatePresence mode="wait">
            <motion.span
              key={SLIDES[active].kicker}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#444444]"
              style={{ fontFamily: 'var(--font-ibm-plex-mono, monospace)' }}
            >
              {SLIDES[active].kicker}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Slide content */}
        <div className="mb-14" style={{ minHeight: 'clamp(300px, 48vh, 460px)' }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.58, ease: [0.76, 0, 0.24, 1] }}
            >
              <h1
                className="text-black mb-10"
                style={{
                  fontFamily: 'var(--font-bebas-neue, sans-serif)',
                  fontSize: 'clamp(4.5rem, 10vw, 9.5rem)',
                  lineHeight: 0.90,
                  letterSpacing: '-0.03em',
                  whiteSpace: 'pre-line',
                }}
              >
                {SLIDES[active].heading}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-start gap-8 max-w-[680px]">
                <p className="text-[#444444] text-[17px] leading-relaxed max-w-[400px]">
                  {SLIDES[active].description}
                </p>
                <div className="flex-shrink-0">
                  <a
                    href={SLIDES[active].cta.href}
                    className="inline-flex items-center gap-2.5 px-5 py-3 bg-black text-white text-sm font-semibold rounded-[8px] hover:bg-[#2f2f2f] transition-colors duration-200 group"
                  >
                    {SLIDES[active].cta.label}
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => goTo((active - 1 + SLIDES.length) % SLIDES.length)}
            className="w-9 h-9 rounded-[8px] border border-black/15 hover:border-black/35 hover:bg-black/6 flex items-center justify-center transition-all duration-200 text-black/45 hover:text-black"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
                style={{ width: i === active ? 36 : 14, background: 'rgba(0,0,0,0.18)' }}
              >
                {i === active && (
                  <motion.div className="absolute inset-y-0 left-0 bg-black" style={{ width: `${prog}%` }} />
                )}
              </button>
            ))}
            <span
              className="text-[10px] font-bold tracking-[0.22em] text-black/25 ml-1"
              style={{ fontFamily: 'var(--font-ibm-plex-mono, monospace)' }}
            >
              0{active + 1} / 0{SLIDES.length}
            </span>
          </div>

          <button
            onClick={() => goTo((active + 1) % SLIDES.length)}
            className="w-9 h-9 rounded-[8px] border border-black/15 hover:border-black/35 hover:bg-black/6 flex items-center justify-center transition-all duration-200 text-black/45 hover:text-black"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative z-10 border-t border-black/10 bg-black/[0.025]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 + i * 0.08, duration: 0.5 }}
              className={`py-8 flex flex-col gap-2 ${i > 0 ? 'pl-8 border-l border-black/10' : ''}`}
            >
              <p
                className="text-black leading-none"
                style={{
                  fontFamily: 'var(--font-bebas-neue, sans-serif)',
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                {value}
              </p>
              <div className="h-[2px] w-6" style={{ background: '#d1ffca', outline: '1px solid rgba(0,0,0,0.18)' }} />
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#444444]">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
