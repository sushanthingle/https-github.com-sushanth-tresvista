'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  {
    heading:     'Enterprise Intelligence Orchestration',
    description: 'Combining advisory, technology infrastructure, and execution to orchestrate workflows across the enterprise',
    cta:         { label: 'The EIO Model',      href: '#eio' },
  },
  {
    heading:     'Governed AI. Continuously improving.',
    description: 'An embedded function that keeps your AI stack governed, evaluated, and effective over time',
    cta:         { label: 'Connect Today',       href: '#contact' },
  },
  {
    heading:     'Human-in-Command',
    description: 'Every AI output is governed, validated, and executed by experts embedded directly in your operating model',
    cta:         { label: 'Who We Work With',    href: '#who-we-work-with' },
  },
]

const STATS = [
  { value: '20+',   label: 'Years of Excellence'   },
  { value: '1000+', label: 'Firms Served'           },
  { value: '1800+', label: 'Global Experts'         },
  { value: '7',     label: 'Global Offices'         },
]

const SLIDE_MS = 5200

export default function HeroV2() {
  const sectionRef  = useRef<HTMLElement>(null)
  const [active, setActive]   = useState(0)
  const [paused, setPaused]   = useState(false)
  const [dir,    setDir]      = useState(1)
  const [prog,   setProg]     = useState(0)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const contentY  = useTransform(scrollYProgress, [0, 0.65], ['0%', '-18%'])
  const contentOp = useTransform(scrollYProgress, [0, 0.42], [1, 0])
  const bgY       = useTransform(scrollYProgress, [0, 1],    ['0%', '14%'])

  /* auto-advance */
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

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, y: d > 0 ? 40 : -40, filter: 'blur(6px)' }),
    center: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit:  (d: number) => ({ opacity: 0, y: d > 0 ? -24 : 24, filter: 'blur(4px)' }),
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-white overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(7,18,43,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(7,18,43,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* abstract rings — right side parallax */}
      <motion.div
        className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[680px] h-[680px] pointer-events-none"
        style={{ y: bgY }}
      >
        <svg viewBox="0 0 680 680" className="w-full h-full" style={{ opacity: 0.04 }}>
          {[1,2,3,4,5].map(i => (
            <motion.circle key={i}
              cx={340} cy={340} r={60 + i * 55}
              fill="none" stroke="#07122B" strokeWidth="1"
              strokeDasharray={`${8 + i*4} ${16 + i*6}`}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 35 + i * 12, repeat: Infinity, ease: 'linear' }}
              style={{ originX: '340px', originY: '340px' }}
            />
          ))}
          <circle cx={340} cy={340} r={18} fill="none" stroke="#07122B" strokeWidth="1.5" />
          <circle cx={340} cy={340} r={6}  fill="#00327B" />
        </svg>
      </motion.div>

      {/* bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      {/* content */}
      <motion.div
        style={{ y: contentY, opacity: contentOp }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-16 pt-28 pb-16"
      >
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="flex items-center gap-4 mb-12"
        >
          <motion.span
            className="block h-px bg-navy/30"
            initial={{ width: 0 }}
            animate={{ width: 44 }}
            transition={{ delay: 0.55, duration: 0.55 }}
          />
          <span className="text-[11px] font-bold tracking-[0.28em] uppercase text-navy/45">
            Enterprise Intelligence Orchestration
          </span>
          <motion.span
            className="block h-px bg-tvblue/40"
            initial={{ width: 0 }}
            animate={{ width: 24 }}
            transition={{ delay: 0.7, duration: 0.45 }}
          />
        </motion.div>

        {/* slide content — headline + description + CTA */}
        <div className="mb-10 min-h-[260px] lg:min-h-[320px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* headline — split by word groups for line clip */}
              <div className="mb-8">
                {SLIDES[active].heading.split('. ').map((line, li) => (
                  <div key={li} style={{ overflow: 'hidden' }}>
                    <motion.div
                      initial={{ y: '108%' }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.05 + li * 0.12, duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <span className="block text-[clamp(2.8rem,7.5vw,8rem)] font-black leading-[0.90] tracking-tight text-navy">
                        {line}{li < SLIDES[active].heading.split('. ').length - 1 && SLIDES[active].heading.includes('. ') ? '.' : ''}
                      </span>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* description + CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-10">
                <motion.p
                  initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="text-lg lg:text-xl text-navy/50 leading-relaxed max-w-[500px]"
                >
                  {SLIDES[active].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42, duration: 0.55 }}
                  className="flex-shrink-0"
                >
                  <a href={SLIDES[active].cta.href}
                    className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-navy text-white text-sm font-semibold rounded-2xl hover:bg-tvblue transition-colors duration-300 shadow-[0_4px_20px_rgba(7,18,43,0.18)]"
                  >
                    {SLIDES[active].cta.label}
                    <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* slide indicators + nav arrows */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => goTo((active - 1 + SLIDES.length) % SLIDES.length)}
            aria-label="Previous slide"
            className="w-9 h-9 rounded-full flex items-center justify-center border border-navy/15 text-navy/40 hover:border-navy/35 hover:text-navy transition-all duration-200 flex-shrink-0"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-3">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className="relative overflow-hidden rounded-full h-[3px] transition-all duration-300"
                style={{ width: i === active ? 40 : 16, background: 'rgba(7,18,43,0.12)' }}
              >
                {i === active && (
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-tvblue"
                    style={{ width: `${prog}%` }}
                  />
                )}
              </button>
            ))}
            <span className="text-[10px] font-bold tracking-[0.2em] text-navy/25 ml-1">
              0{active + 1} / 0{SLIDES.length}
            </span>
          </div>

          <button
            onClick={() => goTo((active + 1) % SLIDES.length)}
            aria-label="Next slide"
            className="w-9 h-9 rounded-full flex items-center justify-center border border-navy/15 text-navy/40 hover:border-navy/35 hover:text-navy transition-all duration-200 flex-shrink-0"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.65 }}
          className="pt-10 border-t border-navy/7 grid grid-cols-2 sm:grid-cols-4 gap-8"
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="group">
              <p className="text-3xl lg:text-4xl font-black text-navy leading-none mb-2 tabular-nums">{value}</p>
              <div className="h-[2px] w-8 bg-tvblue mb-2 transition-all duration-300 group-hover:w-14" />
              <p className="text-[10px] uppercase tracking-[0.16em] text-navy/38 font-bold">{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
      >
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={13} className="text-navy/22" />
        </motion.div>
        <span className="text-[9px] tracking-[0.28em] uppercase text-navy/20">Scroll</span>
      </motion.div>
    </section>
  )
}
