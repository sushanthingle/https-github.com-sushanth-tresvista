'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react'

const SLIDES = [
  {
    kicker: 'EIO Model',
    lines: ['ENTERPRISE', 'INTELLIGENCE', 'ORCHESTRATION'],
    description: 'The struggle with disconnected systems, fragmented workflows, and too many vendors owning too little accountability ends here.',
    cta: { label: 'Discover the Framework', href: '#eio' },
    accent: '#00327B',
  },
  {
    kicker: 'Workflows',
    lines: ['WORKFLOWS SHOULD', 'DRIVE DECISION', 'WITHOUT DELAYS.'],
    description: 'Governed workflows across investment teams, corporate functions, advisory workflows, research operations, portfolio monitoring, and strategic decision-making.',
    cta: { label: 'Find Your Workflow', href: '#workflows' },
    accent: '#347EF6',
  },
  {
    kicker: 'Human-in-Command',
    lines: ['INTELLIGENCE', 'LED BY HUMANS.', 'ACCELERATED BY AI.'],
    description: 'Domain experts validate outputs, govern decisions, identify blind spots, and drive strategic action combined by every intelligence workflow.',
    cta: { label: 'Connect with Us', href: '#contact' },
    accent: '#00327B',
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
  const sectionRef = useRef<HTMLElement>(null)
  const [active,  setActive]  = useState(0)
  const [prog,    setProg]    = useState(0)
  const [dir,     setDir]     = useState(1)
  const [paused,  setPaused]  = useState(false)
  const [loaded,  setLoaded]  = useState(false)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const videoScale  = useTransform(scrollYProgress, [0, 1], [1.0, 1.12])
  const rawContentY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const rawFadeOut  = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const rawStatsY   = useTransform(scrollYProgress, [0, 1], ['0%', '-5%'])

  const contentY = useSpring(rawContentY, { stiffness: 80, damping: 25 })
  const fadeOut  = useSpring(rawFadeOut,  { stiffness: 80, damping: 30 })
  const statsY   = useSpring(rawStatsY,   { stiffness: 80, damping: 25 })

  useEffect(() => { setLoaded(true) }, [])

  useEffect(() => {
    if (paused) return
    const tick = 40
    const id = setInterval(() => {
      setProg(p => {
        if (p >= 100) { setDir(1); setActive(a => (a + 1) % SLIDES.length); return 0 }
        return p + (tick / SLIDE_MS) * 100
      })
    }, tick)
    return () => clearInterval(id)
  }, [paused, active])

  function goTo(i: number) { setDir(i > active ? 1 : -1); setActive(i); setProg(0) }

  const slide = SLIDES[active]

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col pt-[72px] overflow-hidden"
      style={{ backgroundColor: '#07122B', minHeight: '100svh' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Video background */}
      <motion.div
        className="absolute inset-0 origin-center pointer-events-none overflow-hidden"
        style={{ scale: videoScale }}
      >
        <iframe
          src="https://www.youtube.com/embed/s9xk77X4m5c?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=s9xk77X4m5c&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3"
          allow="autoplay; encrypted-media"
          title="Background video"
          className="absolute pointer-events-none"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '100vw', height: '56.25vw', minHeight: '100%', minWidth: 'calc(100% * 16 / 9)', border: 'none' }}
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-[#020811]/62 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(2,8,17,0.82) 0%, rgba(2,8,17,0.55) 45%, rgba(2,8,17,0.18) 75%, transparent 100%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(2,8,17,0.45) 0%, transparent 40%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(2,8,17,0.55) 0%, transparent 35%)' }} />

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity: fadeOut }}
        className="relative z-10 flex-1 flex flex-col justify-center max-w-[1400px] mx-auto w-full px-6 lg:px-16 py-16 lg:py-20"
      >
        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={loaded ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
          className="flex items-center gap-3 mb-10"
        >
          <motion.span
            className="block h-px"
            style={{ background: slide.accent }}
            initial={{ width: 0 }}
            animate={loaded ? { width: 32 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <AnimatePresence mode="wait">
            <motion.span
              key={slide.kicker}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-[11px] font-bold tracking-[0.28em] uppercase"
              style={{ color: slide.accent }}
            >
              {slide.kicker}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Headline + description */}
        <div className="mb-14" style={{ minHeight: 'clamp(280px, 44vh, 440px)' }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-10">
                {slide.lines.map((line, i) => (
                  <div key={`${active}-${i}`} style={{ overflow: 'hidden' }}>
                    <motion.div
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, delay: i * 0.12, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <span
                        className="block text-white font-bold"
                        style={{ fontSize: 'clamp(3rem, 7.5vw, 8rem)', lineHeight: 0.95, letterSpacing: '-0.035em' }}
                      >
                        {line}
                      </span>
                    </motion.div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start gap-8 max-w-[680px]">
                <motion.p
                  initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  transition={{ delay: 0.45, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                  className="text-white/55 text-lg leading-relaxed max-w-[400px]"
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  className="flex-shrink-0"
                >
                  <a
                    href={slide.cta.href}
                    className="inline-flex items-center gap-2.5 px-7 py-4 text-white text-sm font-semibold rounded-2xl hover:opacity-90 transition-all duration-200 group shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
                    style={{ backgroundColor: slide.accent }}
                  >
                    {slide.cta.label}
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide controls */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <button onClick={() => goTo((active - 1 + SLIDES.length) % SLIDES.length)}
            className="w-9 h-9 rounded-[8px] border border-white/12 hover:border-white/30 hover:bg-white/8 flex items-center justify-center transition-all duration-200 text-white/40 hover:text-white">
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button key={i} onClick={() => goTo(i)}
                className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
                style={{ width: i === active ? 36 : 14, background: 'rgba(255,255,255,0.15)' }}
              >
                {i === active && (
                  <motion.div
                    className="absolute inset-y-0 left-0"
                    style={{ width: `${prog}%`, backgroundColor: s.accent }}
                  />
                )}
              </button>
            ))}
            <span className="text-[10px] font-bold tracking-[0.22em] text-white/25 ml-1">
              0{active + 1} / 0{SLIDES.length}
            </span>
          </div>
          <button onClick={() => goTo((active + 1) % SLIDES.length)}
            className="w-9 h-9 rounded-[8px] border border-white/12 hover:border-white/30 hover:bg-white/8 flex items-center justify-center transition-all duration-200 text-white/40 hover:text-white">
            <ChevronRight size={16} />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ opacity: fadeOut }}
        className="absolute bottom-36 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={14} className="text-white/25" />
        </motion.div>
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/20">Scroll</span>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        style={{ y: statsY, borderTop: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(2,8,17,0.45)' }}
        className="relative z-10"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.0 + i * 0.08, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className={`py-8 flex flex-col gap-2 ${i > 0 ? 'pl-8 border-l border-white/8' : ''}`}
            >
              <div style={{ overflow: 'hidden' }}>
                <motion.p
                  className="text-white font-bold leading-none"
                  initial={{ y: '110%' }}
                  animate={loaded ? { y: 0 } : {}}
                  transition={{ delay: 1.1 + i * 0.08, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
                >
                  {value}
                </motion.p>
              </div>
              <div className="h-[2px] w-6 bg-tvblue-light" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">{label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
