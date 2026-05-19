'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 0,
    eyebrow: 'The EIO Model',
    headline: ['Enterprise', 'Intelligence', 'Orchestration'],
    sub: 'Combining advisory, technology infrastructure, and execution to orchestrate workflows across the enterprise.',
    cta: { label: 'Explore the EIO Model', href: '#eio' },
    accent: '#1B4FBE',
    tag: '01 / 03',
  },
  {
    id: 1,
    eyebrow: 'AI Governance',
    headline: ['Governed AI.', 'Continuously', 'Improving.'],
    sub: 'An embedded function that keeps your AI stack governed, evaluated, and effective over time.',
    cta: { label: 'Connect Today', href: '#contact' },
    accent: '#EF8014',
    tag: '02 / 03',
  },
  {
    id: 2,
    eyebrow: 'Human-in-Command',
    headline: ['Human-in-', 'Command.'],
    sub: 'Every AI output is governed, validated, and executed by experts embedded directly in your operating model.',
    cta: { label: 'Who We Work With', href: '#who-we-work-with' },
    accent: '#2E78E8',
    tag: '03 / 03',
  },
]

/* floating particle positions – fixed to avoid SSR mismatch */
const PARTICLES = [
  { x: '14%', y: '22%', size: 2,   delay: 0,    dur: 7  },
  { x: '76%', y: '14%', size: 1.5, delay: 1.2,  dur: 9  },
  { x: '88%', y: '68%', size: 2.5, delay: 0.6,  dur: 8  },
  { x: '8%',  y: '78%', size: 1.5, delay: 2.0,  dur: 10 },
  { x: '54%', y: '88%', size: 2,   delay: 1.5,  dur: 6  },
  { x: '44%', y: '8%',  size: 1,   delay: 0.3,  dur: 11 },
  { x: '93%', y: '38%', size: 2,   delay: 1.8,  dur: 7.5},
  { x: '28%', y: '58%', size: 1.5, delay: 0.9,  dur: 9  },
]

/* word reveal — blur + y + opacity */
const wordVariants = {
  hidden: {
    opacity: 0,
    y: 52,
    filter: 'blur(12px)',
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.13, duration: 0.80, ease: [0.76, 0, 0.24, 1] },
  }),
  exit: {
    opacity: 0,
    y: -36,
    filter: 'blur(8px)',
    transition: { duration: 0.38, ease: [0.76, 0, 0.24, 1] },
  },
}

const slideVariants = {
  enter:  { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.55 } },
  exit:   { opacity: 0, transition: { duration: 0.38 } },
}

export default function HeroSlider() {
  const [current,  setCurrent]  = useState(0)
  const [paused,   setPaused]   = useState(false)
  const [progress, setProgress] = useState(0)

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), [])
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), [])

  useEffect(() => {
    if (paused) return
    setProgress(0)
    const interval = 6000
    const tick     = 50
    let elapsed    = 0
    const timer = setInterval(() => {
      elapsed += tick
      setProgress((elapsed / interval) * 100)
      if (elapsed >= interval) { next(); elapsed = 0 }
    }, tick)
    return () => clearInterval(timer)
  }, [current, paused, next])

  const slide = slides[current]

  return (
    <section
      className="relative h-screen min-h-[680px] flex flex-col justify-center overflow-hidden bg-[#030B1A]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── aurora background ── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* primary blob — changes color with slide */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -40, 0],
            background: [
              `radial-gradient(circle, ${slide.accent}38 0%, transparent 68%)`,
              `radial-gradient(circle, ${slide.accent}28 0%, transparent 72%)`,
              `radial-gradient(circle, ${slide.accent}38 0%, transparent 68%)`,
            ],
          }}
          transition={{ x: { duration: 18, repeat: Infinity, ease: 'easeInOut' }, y: { duration: 14, repeat: Infinity, ease: 'easeInOut' }, background: { duration: 1.2 } }}
          className="blob absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-80"
        />
        {/* secondary blob */}
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 50, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="blob absolute -bottom-48 -right-24 w-[580px] h-[580px] rounded-full opacity-60"
          style={{ background: 'radial-gradient(circle, #EF801430 0%, transparent 68%)' }}
        />
        {/* tertiary mid-glow */}
        <motion.div
          animate={{ scale: [1, 1.22, 1], opacity: [0.10, 0.18, 0.10] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, #1B4FBE 0%, transparent 58%)' }}
        />
        {/* diagonal accent streak */}
        <motion.div
          animate={{ opacity: [0.04, 0.09, 0.04], x: ['-5%', '5%', '-5%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, transparent 30%, ${slide.accent}12 50%, transparent 70%)`,
          }}
        />
        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.038]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        {/* noise */}
        <div className="noise absolute inset-0 pointer-events-none" />
      </div>

      {/* ── floating particles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              background: slide.accent,
              boxShadow: `0 0 ${p.size * 3}px ${slide.accent}`,
            }}
            animate={{ y: [0, -18, 0], opacity: [0.25, 0.65, 0.25] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* ── slide content ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 lg:px-16 pt-24">
        <AnimatePresence mode="wait">
          <motion.div key={slide.id} variants={slideVariants} initial="enter" animate="center" exit="exit">

            {/* eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08, duration: 0.5 }}
              className="flex items-center gap-3 mb-7"
            >
              <motion.span
                className="block h-[2px]"
                style={{ background: slide.accent }}
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              />
              <span className="text-white/50 text-sm font-medium tracking-[0.15em] uppercase">
                {slide.eyebrow}
              </span>
            </motion.div>

            {/* headline with blur-reveal */}
            <div className="overflow-visible mb-8">
              <h1 className="text-[clamp(3.2rem,7vw,7rem)] font-extrabold leading-[1.02] tracking-tight text-white">
                {slide.headline.map((word, i) => (
                  <motion.span
                    key={`${slide.id}-${i}`}
                    custom={i}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="block"
                    style={{ display: 'block' }}
                  >
                    {i === 0 ? (
                      <>
                        <span className="text-white">{word.split(' ')[0]}</span>
                        {word.split(' ').length > 1 && (
                          <span style={{ color: slide.accent }}> {word.split(' ').slice(1).join(' ')}</span>
                        )}
                      </>
                    ) : i === slide.headline.length - 1 ? (
                      <span style={{ color: slide.accent }}>{word}</span>
                    ) : (
                      <span className="text-white">{word}</span>
                    )}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* sub */}
            <motion.p
              initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.58, duration: 0.65 }}
              className="text-white/58 text-lg lg:text-xl max-w-[560px] leading-relaxed mb-10"
            >
              {slide.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.52 }}
              className="flex flex-wrap gap-4"
            >
              {/* primary CTA with shimmer */}
              <motion.a
                href={slide.cta.href}
                whileHover={{ scale: 1.04, boxShadow: `0 14px 36px ${slide.accent}55` }}
                whileTap={{ scale: 0.97 }}
                className="relative inline-flex items-center gap-2 px-7 py-4 text-white font-semibold rounded-xl text-sm overflow-hidden"
                style={{ background: slide.accent }}
              >
                {/* shimmer sweep */}
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)',
                    width: '200%',
                    left: '-100%',
                  }}
                  animate={{ left: ['−100%', '100%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.8, ease: 'easeInOut' }}
                />
                <span className="relative z-10">{slide.cta.label}</span>
                <ArrowRight size={16} className="relative z-10" />
              </motion.a>

              {/* secondary CTA */}
              <motion.a
                href="#who-we-are"
                whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.45)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-4 border border-white/18 text-white/75 hover:text-white font-medium rounded-xl text-sm backdrop-blur-sm transition-colors duration-200"
              >
                Learn Our Story
              </motion.a>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* vertical slide counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute right-16 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4"
        >
          <div className="text-white/28 text-xs font-mono tracking-widest" style={{ writingMode: 'vertical-rl' }}>
            {slide.tag}
          </div>
          <div className="flex flex-col gap-2.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-500 ${
                  i === current ? 'h-10 w-[3px]' : 'h-4 w-[3px] hover:h-6'
                }`}
                style={{ background: i === current ? slide.accent : 'rgba(255,255,255,0.18)' }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── bottom nav + progress ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pb-8 flex items-center justify-between">
          <div className="flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="rounded-full transition-all duration-400"
                style={{
                  width: i === current ? '32px' : '8px',
                  height: '8px',
                  background: i === current ? slide.accent : 'rgba(255,255,255,0.22)',
                }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              className="w-10 h-10 rounded-full border border-white/14 flex items-center justify-center text-white/55 hover:border-white/38 hover:text-white transition-all"
            >
              <ChevronLeft size={18} />
            </motion.button>
            <motion.button
              onClick={next}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              className="w-10 h-10 rounded-full border border-white/14 flex items-center justify-center text-white/55 hover:border-white/38 hover:text-white transition-all"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>
        {/* gradient progress track */}
        <div className="h-[2px] w-full bg-white/6">
          <motion.div
            className="h-full progress-bar"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 pointer-events-none"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/28 to-transparent animate-float" />
        <span className="text-white/28 text-[10px] tracking-[0.22em] uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}
