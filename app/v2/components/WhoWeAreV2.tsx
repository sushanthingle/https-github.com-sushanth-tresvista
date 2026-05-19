'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function Counter({ to, inView }: { to: number; inView: boolean }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const dur = 1600
    const step = 16
    const inc  = to / (dur / step)
    let curr   = 0
    const id   = setInterval(() => {
      curr += inc
      if (curr >= to) { setVal(to); clearInterval(id) }
      else setVal(Math.floor(curr))
    }, step)
    return () => clearInterval(id)
  }, [inView, to])
  return <>{val}</>
}

const STATS = [
  { num: 19,   suffix: '+', label: 'Years',   desc: 'Over 19 years of consistent, trusted client delivery.' },
  { num: 2000, suffix: '+', label: 'Experts',  desc: 'A multidisciplinary team spanning finance, tech, and AI.' },
  { num: 1000, suffix: '+', label: 'Clients',  desc: 'Serving PE firms, corporates, and fund managers worldwide.' },
]

const CAPABILITIES = [
  'Financial Modelling', 'Data Engineering', 'AI Integration', 'Research & Analytics',
  'Technology Transformation', 'CFO Office Services', 'Workflow Automation', 'Market Intelligence',
  'ESG Advisory', 'Digital Excellence', 'Investment Research', 'Data Infrastructure',
]

export default function WhoWeAreV2() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="who-we-are" ref={ref} className="relative bg-navy overflow-hidden py-28 lg:py-40">

      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      {/* ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(27,79,190,0.14) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-tvblue text-xs font-bold tracking-[0.22em] uppercase">01</span>
              <span className="h-px w-8 bg-tvblue/50 block" />
              <span className="text-white/35 text-xs font-bold tracking-[0.18em] uppercase">Who We Are</span>
            </div>
            <h2 className="text-[clamp(2.4rem,5vw,4.8rem)] font-black text-white leading-[0.95] tracking-tight">
              Who<br />
              <span className="gradient-text">We Are.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.7 }}
            className="max-w-[480px] flex flex-col gap-6"
          >
            <p className="text-white/35 text-[11px] font-bold tracking-[0.18em] uppercase leading-relaxed">
              Uniting advisory, technology, and execution under a single, accountable relationship.
            </p>
            <p className="text-white/50 text-base lg:text-lg leading-relaxed">
              Traditional models create gaps between strategy and execution. We close them.
              One embedded partner. Full accountability across the value chain.
            </p>
            <div>
              <a href="/au/"
                className="inline-flex items-center gap-2 text-sm font-bold text-tvblue hover:text-white transition-colors duration-200 group"
              >
                Learn Our Story
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* stat grid — 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/8 rounded-2xl overflow-hidden mb-20">
          {STATS.map(({ num, suffix, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
              className="bg-navy p-8 lg:p-10 group hover:bg-[#0C1E45] transition-colors duration-300"
            >
              <p className="text-[clamp(2.8rem,5vw,5rem)] font-black text-white leading-none tabular-nums mb-4">
                <Counter to={num} inView={inView} />{suffix}
              </p>
              <div className="h-[2px] w-8 bg-tvblue mb-4 transition-all duration-300 group-hover:w-14" />
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/35 mb-3">{label}</p>
              <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* capabilities marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #07122B, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #07122B, transparent)' }} />

          <motion.div
            className="flex gap-6 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {[...CAPABILITIES, ...CAPABILITIES].map((c, i) => (
              <span key={i} className="inline-flex items-center gap-3 text-[13px] font-semibold text-white/30 uppercase tracking-[0.12em] flex-shrink-0">
                <span className="w-1 h-1 rounded-full bg-tvblue/60 flex-shrink-0" />
                {c}
              </span>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
