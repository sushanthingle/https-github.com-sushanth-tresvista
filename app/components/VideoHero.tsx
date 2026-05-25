'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  {
    id: 0,
    lines: ['Enterprise Intelligence', 'Orchestration'],
    description: 'Combining advisory, technology infrastructure, and execution to orchestrate workflows across the enterprise.',
    cta: { label: 'The EIO Model', href: '#eio' },
    ctaSecondary: { label: 'Connect Today', href: '#contact' },
  },
  {
    id: 1,
    lines: ['Governed AI.', 'Continuously improving.'],
    description: 'An embedded function that keeps your AI stack governed, evaluated, and effective over time.',
    cta: { label: 'Connect Today', href: '#contact' },
    ctaSecondary: { label: 'Learn More', href: '#eio' },
  },
  {
    id: 2,
    lines: ['Human-in-Command'],
    description: 'Every AI output is governed, validated, and executed by experts embedded directly in your operating model.',
    cta: { label: 'Who We Work With', href: '#who-we-work-with' },
    ctaSecondary: { label: 'Our Story', href: '#who-we-are' },
  },
]

const STATS = [
  { value: '19+',   label: 'Years of Excellence' },
  { value: '2000+', label: 'Domain Experts'       },
  { value: '1000+', label: 'Global Clients'       },
  { value: '7',     label: 'Global Offices'       },
]

const SLIDE_MS = 5500

const slideVariants = {
  enter:  (d: number) => ({ opacity: 0, y: d > 0 ? 28 : -28, filter: 'blur(4px)' }),
  center: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit:   (d: number) => ({ opacity: 0, y: d > 0 ? -18 : 18, filter: 'blur(2px)' }),
}

export default function VideoHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [dir,    setDir]    = useState(1)
  const [paused, setPaused] = useState(false)
  const [prog,   setProg]   = useState(0)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.12])
  const contentY   = useTransform(scrollYProgress, [0, 0.55], ['0%', '-16%'])
  const contentOp  = useTransform(scrollYProgress, [0, 0.45], [1, 0])

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

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#020811]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── YouTube video background ── */}
      <motion.div
        className="absolute inset-0 origin-center pointer-events-none overflow-hidden"
        style={{ scale: videoScale }}
      >
        <iframe
          src="https://www.youtube.com/embed/s9xk77X4m5c?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=s9xk77X4m5c&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3"
          allow="autoplay; encrypted-media"
          title="Background video"
          className="absolute pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100vw',
            height: '56.25vw',
            minHeight: '100%',
            minWidth: 'calc(100% * 16 / 9)',
            border: 'none',
          }}
        />
      </motion.div>

      {/* ── overlays — layered for strong text contrast ── */}
      {/* base dark fill */}
      <div className="absolute inset-0 bg-[#020811]/62 pointer-events-none" />
      {/* left-heavy directional gradient — keeps headline zone dark */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(2,8,17,0.82) 0%, rgba(2,8,17,0.55) 45%, rgba(2,8,17,0.18) 75%, transparent 100%)' }}
      />
      {/* top vignette — eyebrow + headline always legible */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(2,8,17,0.45) 0%, transparent 40%)' }}
      />
      {/* bottom vignette — stats strip clearly visible */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(2,8,17,0.55) 0%, transparent 35%)' }}
      />

      {/* ── content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOp }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-16 pt-32 pb-10"
      >
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-3 mb-10"
        >
          <motion.span
            className="block h-px bg-white/30"
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <span className="text-[11px] font-medium tracking-[0.28em] uppercase text-white/70">
            Enterprise Intelligence Orchestration
          </span>
        </motion.div>

        {/* ── slide area ── */}
        <div className="min-h-[260px] lg:min-h-[300px] mb-8">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* headline — clean semibold, not ultra-heavy */}
              <div className="mb-7">
                {SLIDES[active].lines.map((line, li) => (
                  <div key={li} style={{ overflow: 'hidden' }}>
                    <motion.div
                      initial={{ y: '106%' }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.04 + li * 0.1, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <span
                        className="block font-bold leading-[1.06] tracking-[-0.01em] text-white"
                        style={{ fontSize: 'clamp(2.8rem,5.5vw,5.5rem)' }}
                      >
                        {line}
                      </span>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* description */}
              <motion.p
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.22, duration: 0.65 }}
                className="text-white/85 text-base lg:text-lg leading-relaxed max-w-[520px] mb-8 font-normal"
              >
                {SLIDES[active].description}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.55 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <a
                  href={SLIDES[active].cta.href}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-tvblue text-white text-sm font-semibold rounded-xl hover:bg-[#2256D8] transition-colors duration-200 group"
                >
                  {SLIDES[active].cta.label}
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={SLIDES[active].ctaSecondary.href}
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white/90 hover:text-white hover:border-white/50 text-sm font-medium rounded-xl transition-all duration-200"
                >
                  {SLIDES[active].ctaSecondary.label}
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── slide progress indicators + nav arrows ── */}
        <div className="flex items-center gap-4 mb-12">
          {/* prev arrow */}
          <button
            onClick={() => goTo((active - 1 + SLIDES.length) % SLIDES.length)}
            aria-label="Previous slide"
            className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 text-white/60 hover:border-white/50 hover:text-white transition-all duration-200 flex-shrink-0"
          >
            <ChevronLeft size={16} />
          </button>

          {/* dot indicators */}
          <div className="flex items-center gap-2.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className="relative h-[2px] rounded-full overflow-hidden transition-all duration-300"
                style={{ width: i === active ? 36 : 14, background: 'rgba(255,255,255,0.20)' }}
              >
                {i === active && (
                  <div
                    className="absolute inset-y-0 left-0 bg-white rounded-full"
                    style={{ width: `${prog}%`, transition: 'width 40ms linear' }}
                  />
                )}
              </button>
            ))}
            <span className="text-[10px] text-white/25 font-medium ml-1 tracking-widest">
              0{active + 1} / 0{SLIDES.length}
            </span>
          </div>

          {/* next arrow */}
          <button
            onClick={() => goTo((active + 1) % SLIDES.length)}
            aria-label="Next slide"
            className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 text-white/60 hover:border-white/50 hover:text-white transition-all duration-200 flex-shrink-0"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* ── stats strip — in the first fold ── */}
        <div className="border-t border-white/15 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-10">
          {STATS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.08, duration: 0.5 }}
              className="group"
            >
              <p className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold text-white leading-none tabular-nums mb-1.5">
                {value}
              </p>
              <div className="h-[2px] w-6 bg-tvblue mb-2 transition-all duration-300 group-hover:w-10" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75">{label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
