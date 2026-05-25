'use client'
import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { Cpu, Users, Globe2, ArrowRight } from 'lucide-react'

const PILLARS = [
  {
    num: '01', label: 'Technological Transformation', icon: Cpu,
    tvTitle: 'TresVista',
    tvDesc: 'The answers to your biggest questions are in your data. We build the bridge to find them.',
    dsTitle: 'Descrial',
    dsDesc: 'Orchestrate data, workflows, and AI, connecting insight to execution.',
    pairs: [
      { tv: 'Master data model design and governance for AI deployment', ds: 'Unified data layer connecting all enterprise sources'  },
      { tv: 'Data engineering and custom data lake construction',        ds: 'AI-ready pipelines with automated quality assurance'   },
      { tv: 'Dashboard development and business intelligence',           ds: 'Real-time dashboards grounded in your semantic model'  },
    ],
  },
  {
    num: '02', label: 'Human-in-Command', icon: Users,
    tvTitle: 'TresVista',
    tvDesc: 'Our experts on the front line, managing your data, running your workflows, and ensuring the quality of every result.',
    dsTitle: 'Descrial',
    dsDesc: 'Every AI output validated and executed by embedded experts, no black box.',
    pairs: [
      { tv: 'Investment and finance professionals executing across the value chain', ds: 'Multi-step AI workflows with human approval gates'    },
      { tv: 'Data migration and managed technology services',                       ds: 'Full audit trail and accountability at every handoff' },
      { tv: 'AI output validation and quality sign-off',                            ds: 'Expert-in-the-loop validation before every delivery'  },
    ],
  },
  {
    num: '03', label: 'Operational Excellence (ODEx)', icon: Globe2,
    tvTitle: 'TresVista',
    tvDesc: 'Deploy the most advanced AI with the confidence of enterprise-grade validation.',
    dsTitle: 'Descrial',
    dsDesc: 'Continuously researched, validated, and curated for your enterprise workflows.',
    pairs: [
      { tv: 'Continuous research and evaluation of AI vendors and platforms', ds: 'Best-in-class AI stack selected and integrated for you' },
      { tv: 'Rigorous testing and enterprise-grade validation',               ds: 'Structured red-teaming and performance benchmarking'   },
      { tv: 'Curated AI tool stack for client workflows',                    ds: 'Ongoing optimisation as models and tools evolve'        },
    ],
  },
]

const HEADLINE_LINES = ['ENTERPRISE', 'INTELLIGENCE', 'ORCHESTRATION']

function PillarCard({ pillar, index, inView }: { pillar: typeof PILLARS[0]; index: number; inView: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = pillar.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.14, ease: [0.76, 0, 0.24, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
      className="rounded-[32px] overflow-hidden"
      style={{ backgroundColor: '#000000', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="p-8 lg:p-10">
        <div className="flex items-start justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-10 h-10 rounded-[12px] flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.08)' }}
              whileHover={{ scale: 1.1, background: 'rgba(209,255,202,0.15)' }}
              transition={{ duration: 0.2 }}
            >
              <Icon size={18} style={{ color: '#d1ffca' }} />
            </motion.div>
            <div>
              <span
                className="block mb-0.5"
                style={{ color: '#d1ffca', fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'var(--font-ibm-plex-mono, monospace)' }}
              >
                {pillar.num}
              </span>
              <span className="text-white/35 text-[11px] font-bold tracking-[0.14em] uppercase">{pillar.label}</span>
            </div>
          </div>

          <motion.button
            onClick={() => setExpanded(e => !e)}
            className="w-9 h-9 rounded-[8px] flex items-center justify-center text-white/40 hover:text-white transition-colors duration-200 flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.06)' }}
            whileHover={{ scale: 1.08, background: 'rgba(255,255,255,0.12)' }}
            whileTap={{ scale: 0.94 }}
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            <motion.span
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
              className="text-xl font-light leading-none select-none"
            >
              +
            </motion.span>
          </motion.button>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <motion.h3
            className="text-white mb-8"
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.14, ease: [0.76, 0, 0.24, 1] }}
            style={{
              fontFamily: 'var(--font-bebas-neue, sans-serif)',
              fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
              lineHeight: 0.90,
              letterSpacing: '-0.02em',
            }}
          >
            {pillar.label}
          </motion.h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.42 + index * 0.14 }}
          >
            <p
              className="mb-2"
              style={{ color: 'rgba(209,255,202,0.65)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-ibm-plex-mono, monospace)' }}
            >
              {pillar.tvTitle}
            </p>
            <p className="text-white/50 text-sm leading-relaxed">{pillar.tvDesc}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 + index * 0.14 }}
          >
            <p
              className="mb-2"
              style={{ color: 'rgba(255,241,0,0.65)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-ibm-plex-mono, monospace)' }}
            >
              {pillar.dsTitle}
            </p>
            <p className="text-white/50 text-sm leading-relaxed">{pillar.dsDesc}</p>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden"
          >
            <div className="px-8 lg:px-10 py-6 space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {pillar.pairs.map((pair, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="grid grid-cols-[1fr_40px_1fr] gap-3 items-center"
                >
                  <div className="rounded-xl p-3.5" style={{ background: 'rgba(209,255,202,0.04)', border: '1px solid rgba(209,255,202,0.12)' }}>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-black" style={{ background: 'rgba(209,255,202,0.15)', color: '#d1ffca' }}>{i + 1}</span>
                      <span className="text-white/55 text-[13px] leading-snug">{pair.tv}</span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <span className="text-white/20 text-sm">↔</span>
                  </div>
                  <div className="rounded-xl p-3.5" style={{ background: 'rgba(255,241,0,0.04)', border: '1px solid rgba(255,241,0,0.12)' }}>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-black" style={{ background: 'rgba(255,241,0,0.15)', color: '#fff100' }}>{i + 1}</span>
                      <span className="text-white/55 text-[13px] leading-snug">{pair.ds}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function EIOSectionV2() {
  const sectionRef = useRef<HTMLElement>(null)
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const rawHeadlineY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const rawCardsY    = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])

  const headlineY = useSpring(rawHeadlineY, { stiffness: 55, damping: 18 })
  const cardsY    = useSpring(rawCardsY,    { stiffness: 55, damping: 18 })

  return (
    <section
      id="eio"
      ref={sectionRef}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '64px 64px 0 0',
        marginTop: '-64px',
        position: 'relative',
        zIndex: 3,
      }}
      className="overflow-hidden py-24 lg:py-36"
    >
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase" style={{ color: '#000', fontFamily: 'var(--font-ibm-plex-mono, monospace)' }}>02</span>
          <motion.span
            className="h-px bg-black/25 block"
            initial={{ width: 0 }}
            animate={inView ? { width: 32 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <span className="text-black/30 text-[11px] font-bold tracking-[0.18em] uppercase">Our Integrated Model</span>
        </motion.div>

        {/* Headline + description */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-16 lg:mb-20">
          <motion.div style={{ y: headlineY }}>
            {HEADLINE_LINES.map((line, i) => (
              <div key={line} style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '110%' }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.05 + i * 0.13, ease: [0.76, 0, 0.24, 1] }}
                >
                  <span
                    className="block text-black"
                    style={{
                      fontFamily: 'var(--font-bebas-neue, sans-serif)',
                      fontSize: 'clamp(3rem, 6.5vw, 6.5rem)',
                      lineHeight: 0.90,
                      letterSpacing: '-0.025em',
                    }}
                  >
                    {line}
                  </span>
                </motion.div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
            animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.38, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col gap-5 justify-end pb-3"
          >
            <p className="text-[#444444] text-lg leading-relaxed max-w-[480px]">
              TresVista and Descrial are two components of one integrated model. Our experts use Descrial
              to orchestrate data, workflows, and AI, connecting insight to execution.
            </p>
            <motion.a
              href="/our-solution/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-[#444444] transition-colors duration-200 group"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              Explore Our Solution
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </motion.a>
          </motion.div>
        </div>

        {/* Pillar cards — subtle parallax lift */}
        <motion.div style={{ y: cardsY }} className="space-y-4">
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.num} pillar={pillar} index={i} inView={inView} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
