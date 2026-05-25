'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const CAPABILITIES = [
  'AI Governance', 'Data Engineering', 'Workflow Orchestration', 'Investment Research',
  'Financial Modeling', 'Technology Transformation', 'Human-in-Command',
  'Enterprise Intelligence', 'Embedded Expertise', 'Operational Excellence',
  'Business Intelligence', 'Portfolio Analytics',
]

export default function WhoWeAreV2() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="who-we-are"
      ref={ref}
      style={{
        backgroundColor: '#000000',
        borderRadius: '64px 64px 0 0',
        marginTop: '-64px',
        position: 'relative',
        zIndex: 2,
      }}
      className="overflow-hidden pb-24 lg:pb-36"
    >
      {/* Capabilities marquee — sits right at the rounded top edge */}
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
            <span
              key={i}
              className="inline-flex items-center gap-6 flex-shrink-0 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/25 px-5"
            >
              {item}
              <span className="w-[3px] h-[3px] rounded-full flex-shrink-0" style={{ background: '#d1ffca', opacity: 0.5 }} />
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase" style={{ color: '#d1ffca' }}>01</span>
          <span className="h-px w-8 block" style={{ background: 'rgba(209,255,202,0.4)' }} />
          <span className="text-white/30 text-[11px] font-bold tracking-[0.18em] uppercase">Who We Are</span>
        </motion.div>

        {/* Two-column */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          >
            <h2
              className="text-white mb-8"
              style={{
                fontFamily: 'var(--font-bebas-neue, sans-serif)',
                fontSize: 'clamp(4rem, 7.5vw, 8rem)',
                lineHeight: 0.90,
                letterSpacing: '-0.025em',
              }}
            >
              ONE<br />EMBEDDED<br />PARTNER.
            </h2>
            <div className="h-[2px] w-14" style={{ background: '#d1ffca' }} />
          </motion.div>

          {/* Right: body + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.22, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col gap-8 lg:pt-10"
          >
            <p className="text-white/35 text-[12px] font-bold tracking-[0.16em] uppercase leading-relaxed">
              Uniting advisory, technology, and execution under a single, accountable relationship.
            </p>

            <div className="space-y-4">
              <p className="text-white/75 text-lg leading-relaxed">
                Traditional models create gaps between strategy and execution.{' '}
                <span className="text-white font-semibold">We close them.</span>
              </p>
              <p className="text-white/45 text-base leading-relaxed">
                One embedded partner. Full accountability across the value chain, from data infrastructure
                and AI governance to human-led execution at every stage of the workflow.
              </p>
            </div>

            <div>
              <a
                href="/au/"
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-white text-black text-sm font-semibold rounded-[8px] hover:bg-[#d1ffca] transition-colors duration-200 group"
              >
                Learn Our Story
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats grid */}
        <div className="mt-20 lg:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '20px', overflow: 'hidden' }}>
          {[
            { value: '19+',   label: 'Years',   desc: 'Over 19 years of consistent, trusted client delivery.' },
            { value: '2000+', label: 'Experts',  desc: 'A multidisciplinary team spanning finance, tech, and AI.' },
            { value: '1000+', label: 'Clients',  desc: 'Serving PE firms, corporates, and fund managers worldwide.' },
            { value: '7',     label: 'Offices',  desc: 'A truly global footprint across key financial hubs.' },
          ].map(({ value, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 + i * 0.09, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="bg-black p-8 lg:p-10 group hover:bg-[#0a0a0a] transition-colors duration-300"
            >
              <p
                className="text-white leading-none tabular-nums mb-4"
                style={{
                  fontFamily: 'var(--font-bebas-neue, sans-serif)',
                  fontSize: 'clamp(2.8rem, 5vw, 5rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                {value}
              </p>
              <div className="h-[2px] w-8 mb-4 transition-all duration-300 group-hover:w-14" style={{ background: '#d1ffca' }} />
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/35 mb-2">{label}</p>
              <p className="text-sm text-white/35 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
