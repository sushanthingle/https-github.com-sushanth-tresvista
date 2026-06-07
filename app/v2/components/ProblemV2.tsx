'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const DESCRIPTION_PARAS = [
  'Most enterprises already have the talent, technology, and data they need.',
  'The real problem is fragmentation.',
  'Research sits in one system. Reporting happens in another. Deal workflows move across spreadsheets, inboxes, dashboards, and external vendors.',
  'Teams spend more time chasing information, validating numbers, and managing handoffs than making decisions.',
  'Enterprise Intelligence Orchestration (EIO) brings these workflows together into one continuously operating intelligence system.',
  'Through TresVista and Descrial, our experts orchestrate data, workflows, and AI, creating a single source of truth and execution.',
]

const HEADLINE_LINES = ['THE HIGH COST', 'OF FRAGMENTED', 'INTELLIGENCE']

export default function ProblemV2() {
  const sectionRef = useRef<HTMLElement>(null)
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const rawHeadlineY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const rawBodyY     = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])
  const rawStatsY    = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])
  const headlineY    = useSpring(rawHeadlineY, { stiffness: 55, damping: 18 })
  const bodyY        = useSpring(rawBodyY,     { stiffness: 55, damping: 18 })
  const statsY       = useSpring(rawStatsY,    { stiffness: 55, damping: 18 })

  return (
    <section
      id="problem"
      ref={sectionRef}
      style={{ backgroundColor: '#ffffff', borderRadius: '64px 64px 0 0', marginTop: '-64px', position: 'relative', zIndex: 2 }}
      className="overflow-hidden py-28 lg:py-36"
    >
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section label */}
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
          <span className="text-navy/30 text-[11px] font-bold tracking-[0.18em] uppercase">The Problem</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: headline + stats */}
          <motion.div style={{ y: headlineY }}>
            <div className="mb-12">
              {HEADLINE_LINES.map((line, i) => (
                <div key={line} style={{ overflow: 'hidden' }}>
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={inView ? { y: 0 } : {}}
                    transition={{ duration: 0.9, delay: 0.05 + i * 0.13, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <span
                      className="block text-navy"
                      style={{ fontWeight: 700, fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
                    >
                      {line}
                    </span>
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, filter: 'blur(6px)', y: 10 }}
              animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.42, ease: [0.76, 0, 0.24, 1] }}
              className="text-navy/50 text-[13px] font-semibold tracking-[0.14em] uppercase leading-relaxed mb-12 max-w-[380px]"
            >
              Intelligence breaks when workflows operate across disconnected systems, vendors, and teams.
            </motion.p>

            {/* Stats */}
            <motion.div style={{ y: statsY }} className="grid grid-cols-2 gap-4">
              {[
                { value: '1,900+', label: 'Embedded professionals operating across enterprise intelligence functions' },
                { value: '24/7',   label: 'Global workflow continuity across regions and time zones' },
              ].map(({ value, label }, i) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, y: 28, scale: 0.96 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                  className="p-6 rounded-2xl"
                  style={{ backgroundColor: '#F4F7FB', border: '1px solid rgba(0,50,123,0.08)' }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <motion.p
                      className="text-tvblue leading-none mb-3"
                      initial={{ y: '110%' }}
                      animate={inView ? { y: 0 } : {}}
                      transition={{ delay: 0.55 + i * 0.1, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                      style={{ fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
                    >
                      {value}
                    </motion.p>
                  </div>
                  <motion.div
                    className="h-[2px] mb-3"
                    initial={{ width: 0 }}
                    animate={inView ? { width: 24 } : {}}
                    transition={{ delay: 0.65 + i * 0.1, duration: 0.5 }}
                    style={{ background: '#347EF6' }}
                  />
                  <p className="text-navy/55 text-xs leading-relaxed font-medium">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: description paragraphs */}
          <motion.div style={{ y: bodyY }} className="flex flex-col gap-5 lg:pt-4">
            {DESCRIPTION_PARAS.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, filter: 'blur(6px)', y: 16 }}
                animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
                transition={{ delay: 0.18 + i * 0.1, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                className={`leading-relaxed ${
                  i === 1
                    ? 'text-tvblue font-bold text-xl'
                    : i >= 4
                    ? 'text-navy/75 text-base'
                    : 'text-navy/55 text-base'
                }`}
              >
                {para}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.85, duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              className="pt-4"
            >
              <a
                href="/v2/au/"
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-tvblue text-white text-sm font-semibold rounded-2xl hover:bg-tvblue-light transition-colors duration-200 group shadow-[0_2px_12px_rgba(0,50,123,0.22)]"
              >
                Read Our Story
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
