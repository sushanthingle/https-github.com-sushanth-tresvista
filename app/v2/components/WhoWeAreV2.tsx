'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const CAPABILITIES = [
  'AI Governance', 'Data Engineering', 'Workflow Orchestration', 'Investment Research',
  'Financial Modeling', 'Technology Transformation', 'Human-in-Command',
  'Enterprise Intelligence', 'Embedded Expertise', 'Operational Excellence',
  'Business Intelligence', 'Portfolio Analytics',
]

const STATS = [
  { value: 19,  suffix: '+', label: 'Years',   desc: 'Over 19 years of consistent, trusted client delivery.' },
  { value: 2000, suffix: '+', label: 'Experts',  desc: 'A multidisciplinary team spanning finance, tech, and AI.' },
  { value: 1000, suffix: '+', label: 'Clients',  desc: 'Serving PE firms, corporates, and fund managers worldwide.' },
  { value: 7,    suffix: '',  label: 'Offices',  desc: 'A truly global footprint across key financial hubs.' },
]

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1400
    const step = 16
    const increment = target / (duration / step)
    const id = setInterval(() => {
      start += increment
      if (start >= target) { setDisplay(target); clearInterval(id) }
      else setDisplay(Math.floor(start))
    }, step)
    return () => clearInterval(id)
  }, [inView, target])
  return <>{display}{suffix}</>
}

const HEADLINE_LINES = ['ONE', 'EMBEDDED', 'PARTNER.']

export default function WhoWeAreV2() {
  const sectionRef = useRef<HTMLElement>(null)
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const rawHeadlineY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const rawBodyY     = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])
  const rawStatsY    = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])
  const rawBgScale   = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 0.97])

  const headlineY = useSpring(rawHeadlineY, { stiffness: 60, damping: 20 })
  const bodyY     = useSpring(rawBodyY,     { stiffness: 60, damping: 20 })
  const statsY    = useSpring(rawStatsY,    { stiffness: 60, damping: 20 })
  const bgScale   = useSpring(rawBgScale,   { stiffness: 40, damping: 18 })

  return (
    <section
      id="who-we-are"
      ref={sectionRef}
      style={{
        backgroundColor: '#000000',
        borderRadius: '64px 64px 0 0',
        marginTop: '-64px',
        position: 'relative',
        zIndex: 2,
      }}
      className="overflow-hidden pb-24 lg:pb-36"
    >
      {/* Capabilities marquee */}
      <div className="border-b border-white/[0.06] py-[14px] mb-20 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #000, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #000, transparent)' }} />
        <motion.div
          className="flex gap-0 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[...CAPABILITIES, ...CAPABILITIES].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 flex-shrink-0 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/25 px-5">
              {item}
              <span className="w-[3px] h-[3px] rounded-full flex-shrink-0" style={{ background: '#d1ffca', opacity: 0.5 }} />
            </span>
          ))}
        </motion.div>
      </div>

      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase" style={{ color: '#d1ffca', fontFamily: 'var(--font-ibm-plex-mono, monospace)' }}>01</span>
          <motion.span
            className="h-px block"
            initial={{ width: 0 }}
            animate={inView ? { width: 32 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ background: 'rgba(209,255,202,0.4)' }}
          />
          <span className="text-white/30 text-[11px] font-bold tracking-[0.18em] uppercase">Who We Are</span>
        </motion.div>

        {/* Two-column */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: headline — parallax + line clip */}
          <motion.div style={{ y: headlineY }}>
            <div className="mb-8">
              {HEADLINE_LINES.map((line, i) => (
                <div key={line} style={{ overflow: 'hidden' }}>
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={inView ? { y: 0 } : {}}
                    transition={{ duration: 0.9, delay: 0.05 + i * 0.14, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <span
                      className="block text-white"
                      style={{
                        fontFamily: 'var(--font-bebas-neue, sans-serif)',
                        fontSize: 'clamp(4rem, 7.5vw, 8rem)',
                        lineHeight: 0.90,
                        letterSpacing: '-0.025em',
                      }}
                    >
                      {line}
                    </span>
                  </motion.div>
                </div>
              ))}
            </div>
            <motion.div
              className="h-[2px]"
              initial={{ width: 0 }}
              animate={inView ? { width: 56 } : {}}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.76, 0, 0.24, 1] }}
              style={{ background: '#d1ffca' }}
            />
          </motion.div>

          {/* Right: body + CTA — parallax + blur reveal */}
          <motion.div style={{ y: bodyY }} className="flex flex-col gap-8 lg:pt-10">
            <motion.p
              initial={{ opacity: 0, filter: 'blur(6px)', y: 10 }}
              animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="text-white/35 text-[12px] font-bold tracking-[0.16em] uppercase leading-relaxed"
            >
              Uniting advisory, technology, and execution under a single, accountable relationship.
            </motion.p>

            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
                animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                className="text-white/75 text-lg leading-relaxed"
              >
                Traditional models create gaps between strategy and execution.{' '}
                <span className="text-white font-semibold">We close them.</span>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
                animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.52, ease: [0.76, 0, 0.24, 1] }}
                className="text-white/45 text-base leading-relaxed"
              >
                One embedded partner. Full accountability across the value chain, from data infrastructure
                and AI governance to human-led execution at every stage of the workflow.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.76, 0, 0.24, 1] }}
            >
              <a
                href="/au/"
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-white text-black text-sm font-semibold rounded-[8px] hover:bg-[#d1ffca] transition-colors duration-200 group"
              >
                Learn Our Story
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats grid — parallax up */}
        <motion.div
          style={{ y: statsY, background: 'rgba(255,255,255,0.06)', borderRadius: '20px', overflow: 'hidden' }}
          className="mt-20 lg:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-px"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
            {STATS.map(({ value, suffix, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 36, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.75 + i * 0.1, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                className="bg-black p-8 lg:p-10 group hover:bg-[#0a0a0a] transition-colors duration-300"
              >
                <div style={{ overflow: 'hidden' }}>
                  <motion.p
                    className="text-white leading-none tabular-nums mb-4"
                    initial={{ y: '110%' }}
                    animate={inView ? { y: 0 } : {}}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                    style={{
                      fontFamily: 'var(--font-bebas-neue, sans-serif)',
                      fontSize: 'clamp(2.8rem, 5vw, 5rem)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    <AnimatedCounter target={value} suffix={suffix} inView={inView} />
                  </motion.p>
                </div>
                <motion.div
                  className="h-[2px] mb-4 transition-all duration-300 group-hover:w-14"
                  initial={{ width: 0 }}
                  animate={inView ? { width: 32 } : {}}
                  transition={{ delay: 0.9 + i * 0.1, duration: 0.6 }}
                  style={{ background: '#d1ffca' }}
                />
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/35 mb-2">{label}</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.0 + i * 0.1, duration: 0.5 }}
                  className="text-sm text-white/35 leading-relaxed"
                >
                  {desc}
                </motion.p>
              </motion.div>
            ))}
        </motion.div>

      </div>
    </section>
  )
}
