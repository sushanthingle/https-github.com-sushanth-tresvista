'use client'
import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const STAT_CARDS = [
  { value: '20+',    label: 'Years of Operation'  },
  { value: '1,800+', label: 'Experts Worldwide'   },
  { value: '1,000+', label: 'Client Firms Served' },
  { value: 'Global', label: 'Coverage'            },
]

type Milestone = {
  year: string
  event: string
  employees: number
  empLabel: string
  lines: number
  sqft: number
  sqftLabel: string
  current?: boolean
}

const MILESTONES: Milestone[] = [
  { year: '2018', event: 'Launched Pune Office',                                                employees: 400,  empLabel: '400+',   lines: 5, sqft: 52,  sqftLabel: '52k'  },
  { year: '2019', event: 'Expanded Pune Office',                                                employees: 500,  empLabel: '500+',   lines: 5, sqft: 72,  sqftLabel: '72k'  },
  { year: '2020', event: 'Relaunched BDS under PSS',                                            employees: 700,  empLabel: '700+',   lines: 5, sqft: 72,  sqftLabel: '72k'  },
  { year: '2021', event: 'Launched Bengaluru Office, Achieved the 1k Milestone, Launched LS',  employees: 1000, empLabel: '1,000+', lines: 6, sqft: 101, sqftLabel: '101k' },
  { year: '2022', event: 'Expanded Pune & Bengaluru Office, Launched FPS',                     employees: 1400, empLabel: '1,400+', lines: 7, sqft: 180, sqftLabel: '180k' },
  { year: '2024', event: 'Launched Delhi NCR Office',                                           employees: 1500, empLabel: '1,500+', lines: 7, sqft: 199, sqftLabel: '199k' },
  { year: '2025', event: 'Journey Continues',                                                   employees: 1800, empLabel: '1,800+', lines: 7, sqft: 199, sqftLabel: '199k', current: true },
]

const MAX_EMP  = 1800
const MAX_SQFT = 199

function MetricBar({ label, value, pct, color, delay }: {
  label: string; value: string; pct: number; color: string; delay: number
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-white/45 text-xs font-semibold uppercase tracking-[0.12em]">{label}</span>
        <span className="text-white font-bold text-sm" style={{ letterSpacing: '-0.02em' }}>{value}</span>
      </div>
      <div className="h-[5px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.85, delay, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
    </div>
  )
}

const HEADLINE_LINES = ['WHO', 'WE ARE']

export default function WhoWeAreAbout() {
  const sectionRef = useRef<HTMLElement>(null)
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(6)
  const [dir,    setDir]    = useState(0)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const rawHeadlineY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const rawBodyY     = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])
  const headlineY    = useSpring(rawHeadlineY, { stiffness: 55, damping: 18 })
  const bodyY        = useSpring(rawBodyY,     { stiffness: 55, damping: 18 })

  const n = MILESTONES.length
  const milestone = MILESTONES[active]

  function goTo(i: number) {
    setDir(i > active ? 1 : -1)
    setActive(i)
  }
  function prev() {
    const next = (active - 1 + n) % n
    setDir(-1)
    setActive(next)
  }
  function next() {
    const next = (active + 1) % n
    setDir(1)
    setActive(next)
  }

  const growthMultiple = (milestone.employees / 400).toFixed(1)
  const empPct         = Math.round((milestone.employees / MAX_EMP) * 100)
  const sqftPct        = Math.round((milestone.sqft / MAX_SQFT) * 100)

  const slideVariants = {
    enter:  (d: number) => ({ opacity: 0, x: d * 48, filter: 'blur(6px)' }),
    center: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit:   (d: number) => ({ opacity: 0, x: d * -32, filter: 'blur(4px)' }),
  }

  return (
    <section
      id="who-we-are"
      ref={sectionRef}
      style={{ backgroundColor: '#ffffff', borderRadius: '64px 64px 0 0', marginTop: '-64px', position: 'relative', zIndex: 2 }}
      className="overflow-hidden py-28 lg:py-36"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(7,18,43,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(7,18,43,0.018) 1px,transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-tvblue">01</span>
          <motion.span
            className="h-px bg-tvblue/40 block"
            initial={{ width: 0 }}
            animate={inView ? { width: 32 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <span className="text-navy/30 text-[11px] font-bold tracking-[0.18em] uppercase">Who We Are</span>
        </motion.div>

        {/* Two-column: headline left, description right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16 lg:mb-20">
          <motion.div style={{ y: headlineY }}>
            {HEADLINE_LINES.map((line, i) => (
              <div key={line} style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '110%' }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.05 + i * 0.13, ease: [0.76, 0, 0.24, 1] }}
                >
                  <span
                    className="block text-navy font-bold"
                    style={{ fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
                  >
                    {line}
                  </span>
                </motion.div>
              </div>
            ))}
          </motion.div>

          <motion.div style={{ y: bodyY }} className="flex flex-col gap-5 lg:pt-4">
            <motion.p
              initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
              animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              className="text-navy/60 text-lg leading-relaxed"
            >
              We are a global enterprise intelligence firm combining deep domain expertise with
              purpose-built AI to deliver the operational intelligence that drives better decisions.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
              animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              className="text-navy/50 text-base leading-relaxed"
            >
              Across 1,800+ professionals in 7 offices worldwide, we serve investment managers,
              corporates, and advisors bringing structured, accountable execution to every workflow.
            </motion.p>
          </motion.div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20 lg:mb-28">
          {STAT_CARDS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="rounded-2xl p-6"
              style={{ backgroundColor: '#F4F7FB', border: '1px solid rgba(0,50,123,0.10)' }}
            >
              <div style={{ overflow: 'hidden' }}>
                <motion.p
                  className="text-tvblue leading-none mb-3 font-bold"
                  initial={{ y: '110%' }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ delay: 0.45 + i * 0.1, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.03em' }}
                >
                  {value}
                </motion.p>
              </div>
              <div className="h-[2px] w-6 mb-3" style={{ background: '#347EF6' }} />
              <p className="text-navy/55 text-xs leading-relaxed font-medium uppercase tracking-[0.10em]">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Growth Story ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="rounded-[40px] overflow-hidden"
          style={{ background: '#07122B', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Timeline header */}
          <div className="px-8 lg:px-12 pt-10 pb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.30)' }}>
                Growth Story
              </p>
              <div style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '110%' }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.62, ease: [0.76, 0, 0.24, 1] }}
                >
                  <span
                    className="block text-white font-bold"
                    style={{ fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
                  >
                    A Decade of Building
                  </span>
                </motion.div>
              </div>
            </div>
            <div className="flex items-center gap-2 pb-1">
              <button
                onClick={prev}
                aria-label="Previous year"
                className="w-10 h-10 rounded-[8px] flex items-center justify-center transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.40)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.40)' }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                aria-label="Next year"
                className="w-10 h-10 rounded-[8px] flex items-center justify-center transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.40)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.40)' }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Year track */}
          <div className="px-8 lg:px-12 py-7" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {/* Desktop: dots + labels */}
            <div className="hidden md:block">
              <div className="relative flex items-center justify-between">
                {MILESTONES.map((m, i) => (
                  <div key={m.year} className="flex flex-col items-center gap-2 z-10">
                    <button onClick={() => goTo(i)} className="flex flex-col items-center gap-2 group" aria-label={m.year}>
                      <motion.div
                        className="w-9 h-9 rounded-full border-2 flex items-center justify-center relative transition-all duration-300"
                        animate={{
                          backgroundColor: i <= active ? '#00327B' : 'rgba(255,255,255,0.07)',
                          borderColor:     i <= active ? '#347EF6' : 'rgba(255,255,255,0.15)',
                          scale: i === active ? 1.25 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {m.current && i === active && (
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.9, 0.6] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ background: 'rgba(246,179,67,0.35)' }}
                          />
                        )}
                        {m.current && (
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#F6B343' }} />
                        )}
                        {!m.current && i <= active && (
                          <div className="w-2 h-2 rounded-full bg-white/70" />
                        )}
                      </motion.div>
                    </button>
                    <motion.span
                      className="text-[11px] font-bold tracking-[0.10em]"
                      animate={{ color: i === active ? '#ffffff' : 'rgba(255,255,255,0.30)' }}
                      transition={{ duration: 0.25 }}
                    >
                      {m.year}
                    </motion.span>
                  </div>
                ))}
                {/* Track line */}
                <div className="absolute left-4.5 right-4.5 top-[18px] h-[2px] -z-0" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <motion.div
                  className="absolute left-[18px] top-[18px] h-[2px] origin-left -z-0"
                  style={{ right: 'auto', background: 'linear-gradient(90deg, #00327B, #347EF6)' }}
                  animate={{ width: `calc(${(active / (n - 1)) * 100}% - 0px)` }}
                  transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                />
              </div>
            </div>

            {/* Mobile: scrollable pills */}
            <div className="md:hidden flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {MILESTONES.map((m, i) => (
                <button
                  key={m.year}
                  onClick={() => goTo(i)}
                  className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200"
                  style={{
                    background: i === active ? '#00327B' : 'rgba(255,255,255,0.07)',
                    color:      i === active ? '#ffffff' : 'rgba(255,255,255,0.35)',
                    border:     `1px solid ${i === active ? '#347EF6' : 'rgba(255,255,255,0.10)'}`,
                  }}
                >
                  {m.year}
                </button>
              ))}
            </div>
          </div>

          {/* Active milestone panel */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
              className="px-8 lg:px-12 py-10 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              {/* Left: big year + event */}
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-5">
                  <span
                    className="font-bold leading-none"
                    style={{
                      fontSize: 'clamp(5rem, 10vw, 9rem)',
                      letterSpacing: '-0.05em',
                      color: '#347EF6',
                      lineHeight: 0.85,
                    }}
                  >
                    {milestone.year}
                  </span>
                  <div className="flex flex-col gap-2 pt-2">
                    {milestone.current && (
                      <span
                        className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.14em] uppercase"
                        style={{ background: 'rgba(246,179,67,0.15)', color: '#F6B343', border: '1px solid rgba(246,179,67,0.25)' }}
                      >
                        Current
                      </span>
                    )}
                    {active > 0 && (
                      <span
                        className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.10em]"
                        style={{ background: 'rgba(52,126,246,0.12)', color: '#347EF6', border: '1px solid rgba(52,126,246,0.20)' }}
                      >
                        {growthMultiple}× growth
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />

                <div>
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.30)' }}>
                    Milestone
                  </p>
                  <h3 className="text-white font-bold leading-snug" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}>
                    {milestone.event}
                  </h3>
                </div>
              </div>

              {/* Right: metrics */}
              <div className="flex flex-col gap-7">
                {/* Employee + Sqft bars */}
                <div className="flex flex-col gap-5">
                  <MetricBar
                    label="Team Size"
                    value={milestone.empLabel}
                    pct={empPct}
                    color="linear-gradient(90deg, #00327B, #347EF6)"
                    delay={0.08}
                  />
                  <MetricBar
                    label="Office Space"
                    value={`${milestone.sqftLabel} sq ft`}
                    pct={sqftPct}
                    color="linear-gradient(90deg, #347EF6, #6BA8FF)"
                    delay={0.18}
                  />
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />

                {/* Service lines dots */}
                <div className="flex flex-col gap-3">
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.30)' }}>
                    Service Lines
                  </p>
                  <div className="flex items-center gap-2.5">
                    {Array.from({ length: 7 }).map((_, di) => (
                      <motion.div
                        key={di}
                        className="rounded-full"
                        style={{ width: 10, height: 10 }}
                        animate={{
                          backgroundColor: di < milestone.lines ? '#347EF6' : 'rgba(255,255,255,0.10)',
                          scale: di < milestone.lines ? 1 : 0.75,
                        }}
                        transition={{ duration: 0.3, delay: di * 0.05 }}
                      />
                    ))}
                    <span className="text-white/60 text-xs font-semibold ml-1">{milestone.lines} lines</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}
