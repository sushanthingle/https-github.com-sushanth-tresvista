'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const STATS = [
  { value: '19+',    label: 'Years of Excellence' },
  { value: '1,800+', label: 'Global Experts'      },
  { value: '1,000+', label: 'Firms Served'         },
  { value: '7',      label: 'Global Offices'       },
]

const HEADLINE_LINES = ['Intelligence is an', 'Engineered Outcome']

export default function HeroAbout() {
  const sectionRef = useRef<HTMLElement>(null)
  const [loaded, setLoaded] = useState(false)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const rawContentY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const rawFadeOut  = useTransform(scrollYProgress, [0, 0.6],  [1, 0])
  const rawStatsY   = useTransform(scrollYProgress, [0, 1], ['0%', '-5%'])

  const contentY = useSpring(rawContentY, { stiffness: 80, damping: 25 })
  const fadeOut  = useSpring(rawFadeOut,  { stiffness: 80, damping: 30 })
  const statsY   = useSpring(rawStatsY,   { stiffness: 80, damping: 25 })

  useEffect(() => { setLoaded(true) }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col overflow-hidden"
      style={{ backgroundColor: '#07122B', minHeight: '85vh', paddingTop: '72px' }}
    >
      {/* Ambient radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 60% 40%, rgba(0,50,123,0.55) 0%, rgba(0,50,123,0.18) 38%, transparent 65%)',
      }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{
        background: 'linear-gradient(to top, rgba(7,18,43,0.7) 0%, transparent 100%)',
      }} />

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity: fadeOut }}
        className="relative z-10 flex-1 flex flex-col justify-center max-w-[1400px] mx-auto w-full px-6 lg:px-16 py-16 lg:py-24"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={loaded ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-8 h-[2px] bg-tvblue-light block" />
          <span className="text-tvblue-light text-xs font-bold tracking-[0.18em] uppercase">About Us</span>
        </motion.div>

        {/* Headline */}
        <div className="mb-10">
          {HEADLINE_LINES.map((line, i) => (
            <div key={line} style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '110%' }}
                animate={loaded ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease: [0.76, 0, 0.24, 1] }}
              >
                <span
                  className="block text-white font-bold"
                  style={{ fontSize: 'clamp(3rem, 7vw, 7.5rem)', lineHeight: 0.95, letterSpacing: '-0.035em' }}
                >
                  {line}
                </span>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Subheading + CTA */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-8 max-w-[720px]">
          <motion.p
            initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
            animate={loaded ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            className="text-white/50 text-lg leading-relaxed max-w-[420px]"
          >
            TVites are the architects of the system that designs, governs, and delivers it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="flex-shrink-0"
          >
            <a
              href="/careers/"
              className="inline-flex items-center gap-2.5 px-7 py-4 bg-tvblue text-white text-sm font-semibold rounded-2xl hover:bg-tvblue-light transition-colors duration-200 group shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
            >
              Become a TVite
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
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
              transition={{ delay: 0.9 + i * 0.08, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className={`py-8 flex flex-col gap-2 ${i > 0 ? 'pl-8 border-l border-white/8' : ''}`}
            >
              <div style={{ overflow: 'hidden' }}>
                <motion.p
                  className="text-white font-bold leading-none"
                  initial={{ y: '110%' }}
                  animate={loaded ? { y: 0 } : {}}
                  transition={{ delay: 1.0 + i * 0.08, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
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
