'use client'
import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { Users, LayoutGrid, Building2, ChevronLeft, ChevronRight } from 'lucide-react'

const STAT_CARDS = [
  { value: '20+',    label: 'Years of Operation'  },
  { value: '1,800+', label: 'Experts Worldwide'   },
  { value: '1,000+', label: 'Client Firms Served' },
  { value: 'Global', label: 'Coverage'            },
]

type Milestone = {
  year: string
  event: string
  employees: string
  lines: number
  sqft: string
  current?: boolean
}

const MILESTONES: Milestone[] = [
  { year: '2018', event: 'Launched Pune Office',                                              employees: '400+',   lines: 5, sqft: '52k'  },
  { year: '2019', event: 'Expanded Pune Office',                                              employees: '500+',   lines: 5, sqft: '72k'  },
  { year: '2020', event: 'Relaunched BDS under PSS',                                          employees: '700+',   lines: 5, sqft: '72k'  },
  { year: '2021', event: 'Launched Bengaluru Office, Achieved the 1k Milestone, Launched LS', employees: '1,000+', lines: 6, sqft: '101k' },
  { year: '2022', event: 'Expanded Pune & Bengaluru Office, Launched FPS',                    employees: '1,400+', lines: 7, sqft: '180k' },
  { year: '2024', event: 'Launched Delhi NCR Office',                                         employees: '1,500+', lines: 7, sqft: '199k' },
  { year: '2025', event: 'Journey Continues',                                                 employees: '1,800+', lines: 7, sqft: '199k', current: true },
]

const HEADLINE_LINES = ['WHO', 'WE ARE']

export default function WhoWeAreAbout() {
  const sectionRef = useRef<HTMLElement>(null)
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const rawHeadlineY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const rawBodyY     = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])
  const headlineY    = useSpring(rawHeadlineY, { stiffness: 55, damping: 18 })
  const bodyY        = useSpring(rawBodyY,     { stiffness: 55, damping: 18 })

  const n = MILESTONES.length
  const milestone = MILESTONES[active]

  function goTo(i: number) { setActive(i) }
  function prev() { setActive(a => (a - 1 + n) % n) }
  function next() { setActive(a => (a + 1) % n) }

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
                    style={{ fontSize: 'clamp(3rem, 6vw, 6.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
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
              We are a global enterprise intelligence firm combining deep domain expertise with purpose-built AI to deliver the operational intelligence that drives better decisions.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
              animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              className="text-navy/50 text-base leading-relaxed"
            >
              Across 1,800+ professionals in 7 offices worldwide, we serve investment managers, corporates, and advisors bringing structured, accountable execution to every workflow.
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

        {/* Growth Timeline */}
        <div>
          {/* Timeline header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-navy/30 mb-2">Growth Story</p>
              <div style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '110%' }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.55, ease: [0.76, 0, 0.24, 1] }}
                >
                  <span
                    className="block text-navy font-bold"
                    style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', lineHeight: 0.95, letterSpacing: '-0.025em' }}
                  >
                    A Decade of Building
                  </span>
                </motion.div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-[8px] border border-navy/12 hover:border-navy/30 hover:bg-navy/5 flex items-center justify-center transition-all duration-200 text-navy/40 hover:text-navy"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-[8px] border border-navy/12 hover:border-navy/30 hover:bg-navy/5 flex items-center justify-center transition-all duration-200 text-navy/40 hover:text-navy"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Desktop year track (hidden on mobile) */}
          <div className="hidden md:block mb-10">
            {/* Year nodes */}
            <div className="relative flex items-center justify-between mb-3">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className="flex flex-col items-center gap-2 z-10">
                  <button
                    onClick={() => goTo(i)}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <motion.div
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center relative transition-all duration-300"
                      animate={{
                        backgroundColor: i <= active ? '#00327B' : '#E8EDF5',
                        borderColor:     i <= active ? '#00327B' : '#CBD5E1',
                        scale: i === active ? 1.3 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {m.current && i === active && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                          style={{ background: 'rgba(246,179,67,0.4)' }}
                        />
                      )}
                      {m.current && (
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#F6B343' }} />
                      )}
                    </motion.div>
                  </button>
                  <motion.span
                    className="text-[11px] font-bold tracking-[0.10em]"
                    animate={{ color: i === active ? '#07122B' : 'rgba(7,18,43,0.35)' }}
                    transition={{ duration: 0.25 }}
                  >
                    {m.year}
                  </motion.span>
                </div>
              ))}
              {/* Track line behind nodes */}
              <div className="absolute left-5 right-5 top-5 h-[2px] bg-navy/10 -z-0" />
              <motion.div
                className="absolute left-5 top-5 h-[2px] bg-tvblue -z-0 origin-left"
                style={{ right: 'auto' }}
                animate={{ width: `${(active / (n - 1)) * 100}%` }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>
          </div>

          {/* Active milestone card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              className="rounded-[28px] p-8 lg:p-10"
              style={{ background: 'linear-gradient(135deg, #F4F7FB 0%, #EEF4FF 100%)', border: '1px solid rgba(0,50,123,0.10)' }}
            >
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Left: big year */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <span
                      className="text-tvblue font-bold leading-none"
                      style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', letterSpacing: '-0.04em' }}
                    >
                      {milestone.year}
                    </span>
                    {milestone.current && (
                      <span
                        className="mt-2 inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.14em] uppercase"
                        style={{ background: 'rgba(246,179,67,0.15)', color: '#B8860B' }}
                      >
                        Current
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: event + metrics */}
                <div className="flex flex-col gap-5">
                  <h3 className="text-navy font-bold text-xl lg:text-2xl leading-snug">{milestone.event}</h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { Icon: Users,      label: milestone.employees + ' Employees' },
                      { Icon: LayoutGrid, label: milestone.lines + ' Lines'         },
                      { Icon: Building2,  label: milestone.sqft + ' sq ft'          },
                    ].map(({ Icon, label }, ci) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: ci * 0.08, duration: 0.35 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                        style={{ background: 'rgba(0,50,123,0.08)', color: '#00327B' }}
                      >
                        <Icon size={14} />
                        {label}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile year pills */}
          <div className="md:hidden mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {MILESTONES.map((m, i) => (
              <button
                key={m.year}
                onClick={() => goTo(i)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200"
                style={{
                  background:   i === active ? '#00327B' : 'rgba(7,18,43,0.08)',
                  color:        i === active ? '#ffffff' : 'rgba(7,18,43,0.45)',
                }}
              >
                {m.year}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
