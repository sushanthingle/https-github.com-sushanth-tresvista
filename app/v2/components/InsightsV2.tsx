'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, BookOpen, Play, FileText } from 'lucide-react'

const INSIGHTS = [
  {
    type: 'Perspective',
    icon: FileText,
    title: 'The Case for Enterprise Intelligence Orchestration',
    description: 'Why disconnected systems are the hidden cost behind underperforming investment operations.',
    cta: 'Read More',
    color: '#00327B',
  },
  {
    type: 'TresVista Talk',
    icon: Play,
    title: 'Human-in-Command: The AI Governance Imperative',
    description: 'Our experts discuss why governance is not a constraint on AI adoption but the foundation for it.',
    cta: 'Watch',
    color: '#347EF6',
  },
  {
    type: 'Case Study',
    icon: BookOpen,
    title: 'How a Leading PE Firm Automated Their Reporting Workflow',
    description: 'From 40-hour manual cycles to real-time portfolio intelligence through embedded expertise and Descrial.',
    cta: 'Read More',
    color: '#00327B',
  },
]

const HEADLINE_LINES = ['INSIGHTS &', 'PERSPECTIVES']

export default function InsightsV2() {
  const sectionRef = useRef<HTMLElement>(null)
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const rawHeadlineY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const rawCardsY    = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])
  const headlineY    = useSpring(rawHeadlineY, { stiffness: 55, damping: 18 })
  const cardsY       = useSpring(rawCardsY,    { stiffness: 50, damping: 17 })

  return (
    <section
      id="insights"
      ref={sectionRef}
      style={{ backgroundColor: '#07122B', borderRadius: '64px 64px 0 0', marginTop: '-64px', position: 'relative', zIndex: 5 }}
      className="overflow-hidden py-28 lg:py-36"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-tvblue-light">05</span>
          <motion.span
            className="h-px block"
            initial={{ width: 0 }}
            animate={inView ? { width: 32 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ background: 'rgba(52,126,246,0.4)' }}
          />
          <span className="text-white/30 text-[11px] font-bold tracking-[0.18em] uppercase">Insights</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16 lg:mb-20">
          <motion.div style={{ y: headlineY }}>
            {HEADLINE_LINES.map((line, i) => (
              <div key={line} style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '110%' }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.05 + i * 0.13, ease: [0.76, 0, 0.24, 1] }}
                >
                  <span
                    className="block text-white"
                    style={{ fontWeight: 700, fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
                  >
                    {line}
                  </span>
                </motion.div>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, filter: 'blur(6px)', y: 16 }}
            animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-white/40 text-[13px] font-semibold tracking-[0.14em] uppercase leading-relaxed max-w-[300px]"
          >
            Operator-level thinking on AI, intelligence, and the future of enterprise operations.
          </motion.p>
        </div>

        {/* Insight cards */}
        <motion.div style={{ y: cardsY }} className="grid lg:grid-cols-3 gap-5">
          {INSIGHTS.map(({ type, icon: Icon, title, description, cta, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 48, scale: 0.94 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.76, 0, 0.24, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
              className="rounded-[24px] p-7 flex flex-col gap-5 group relative overflow-hidden cursor-pointer"
              style={{ backgroundColor: '#0D1F3C', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* Top accent on hover */}
              <motion.div
                className="absolute top-0 left-6 right-6 h-[2px] rounded-full origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ background: color }}
              />

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[8px] flex items-center justify-center" style={{ background: `${color}20` }}>
                  <Icon size={14} style={{ color }} />
                </div>
                <span className="text-[10px] font-bold tracking-[0.20em] uppercase" style={{ color: `${color}CC` }}>{type}</span>
              </div>

              <div className="flex-1">
                <div style={{ overflow: 'hidden' }}>
                  <motion.h3
                    className="text-white font-bold text-lg leading-snug mb-3"
                    initial={{ y: '110%' }}
                    animate={inView ? { y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.25 + i * 0.12, ease: [0.76, 0, 0.24, 1] }}
                  >
                    {title}
                  </motion.h3>
                </div>
                <motion.p
                  initial={{ opacity: 0, filter: 'blur(6px)' }}
                  animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
                  transition={{ delay: 0.38 + i * 0.12, duration: 0.6 }}
                  className="text-white/40 text-sm leading-relaxed"
                >
                  {description}
                </motion.p>
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 group-hover:gap-3"
                style={{ color }}
              >
                {cta}
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
