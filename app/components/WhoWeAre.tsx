'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const MARQUEE_ITEMS = [
  'AI Governance', 'Data Engineering', 'Workflow Orchestration', 'Investment Research',
  'Financial Modeling', 'Technology Transformation', 'Human-in-Command',
  'Enterprise Intelligence', 'Embedded Expertise', 'Operational Excellence',
  'Business Intelligence', 'Portfolio Analytics',
]

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null)
  const headRef    = useRef<HTMLDivElement>(null)
  const inView     = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} id="who-we-are" className="relative bg-white overflow-hidden py-28 lg:py-36">

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-8 h-[2px] bg-tvblue block" />
          <span className="text-tvblue text-xs font-bold tracking-[0.18em] uppercase">Who We Are</span>
        </motion.div>

        {/* two-column layout: content left, image right */}
        <div ref={headRef} className="grid lg:grid-cols-[1fr_480px] gap-12 lg:gap-20 items-center">

          {/* ── left: headline + description + CTA ── */}
          <div>
            {['Where Strategy', 'Meets Execution.'].map((line, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '106%' }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                >
                  <h2
                    className={`text-[clamp(2.2rem,3.8vw,3.8rem)] font-bold leading-[1.0] tracking-tight ${
                      i === 1 ? 'text-tvblue' : 'text-navy'
                    }`}
                  >
                    {line}
                  </h2>
                </motion.div>
              </div>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.28, duration: 0.7 }}
              className="text-navy/60 text-lg leading-relaxed mt-8 mb-4"
            >
              Traditional models create gaps between strategy and execution.{' '}
              <strong className="text-navy font-semibold">We close them.</strong>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.36, duration: 0.65 }}
              className="text-navy/50 text-base leading-relaxed mb-10"
            >
              One embedded partner. Full accountability across the value chain — from
              data infrastructure and AI governance to human-led execution at every
              stage of the workflow.
            </motion.p>

            <motion.a
              href="#eio"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.44, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-7 py-4 bg-navy text-white text-sm font-semibold rounded-2xl transition-all duration-200 group"
            >
              Learn Our Story
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </motion.a>
          </div>

          {/* ── right: image ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="relative"
          >
            {/* image container */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[5/4]"
              style={{ boxShadow: '0 24px 80px rgba(7,18,43,0.10)' }}>
              {/* corporate office building — replace with your own image */}
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=960&q=80"
                alt="Corporate headquarters"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* stat overlay — bottom-left badge */}
              <div className="absolute bottom-5 left-5 right-5 flex gap-3">
                {[
                  { v: '19+', l: 'Years' },
                  { v: '2000+', l: 'Experts' },
                  { v: '1000+', l: 'Clients' },
                ].map(({ v, l }) => (
                  <div key={l}
                    className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2.5 text-center"
                    style={{ boxShadow: '0 4px 16px rgba(7,18,43,0.10)' }}>
                    <p className="text-navy font-bold text-base leading-none tabular-nums">{v}</p>
                    <p className="text-navy/40 text-[10px] font-semibold uppercase tracking-wider mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* floating accent badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-5 -right-5 bg-tvblue text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg"
            >
              19+ Years
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* capabilities marquee strip */}
      <div className="relative mt-20 overflow-hidden border-t border-b border-navy/[0.06] py-[14px]">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex gap-0 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-8 flex-shrink-0 text-[13px] font-medium text-navy/35 px-6"
            >
              {item}
              <span className="w-[3px] h-[3px] rounded-full bg-tvblue/50 flex-shrink-0" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
