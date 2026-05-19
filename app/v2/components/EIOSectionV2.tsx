'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent } from 'framer-motion'
import { Cpu, Users, Globe2 } from 'lucide-react'

/* ─── data ─────────────────────────────────────────────────────── */
const PILLARS = [
  {
    id: 0, num: '01', label: 'Technological Transformation', icon: Cpu,
    tvTitle: 'Technological Transformation',
    tvDesc: 'The answers to your biggest questions are in your data. We build the bridge to find them.',
    dsTitle: 'Descrial Data Platform',
    dsDesc: 'Orchestrate data, workflows, and AI — connecting insight to execution.',
    pairs: [
      { tv: 'Master data model design and governance for AI deployment', ds: 'Unified data layer connecting all enterprise sources'  },
      { tv: 'Data engineering and custom data lake construction',        ds: 'AI-ready pipelines with automated quality assurance'   },
      { tv: 'Dashboard development and business intelligence',           ds: 'Real-time dashboards grounded in your semantic model'  },
    ],
  },
  {
    id: 1, num: '02', label: 'Human-in-Command', icon: Users,
    tvTitle: 'Human-in-Command',
    tvDesc: 'Our experts on the front line, managing your data, running your workflows, and ensuring the quality of every result.',
    dsTitle: 'Governed AI Workflows',
    dsDesc: 'Every AI output validated and executed by embedded experts — no black box.',
    pairs: [
      { tv: 'Investment & finance professionals executing across the value chain', ds: 'Multi-step AI workflows with human approval gates'       },
      { tv: 'Data migration and managed technology services',                     ds: 'Full audit trail and accountability at every handoff'    },
      { tv: 'AI output validation and quality sign-off',                          ds: 'Expert-in-the-loop validation before every delivery'    },
    ],
  },
  {
    id: 2, num: '03', label: 'Operational Excellence (ODEx)', icon: Globe2,
    tvTitle: 'Operational Excellence (ODEx)',
    tvDesc: 'Deploy the most advanced AI with the confidence of enterprise-grade validation.',
    dsTitle: 'AI Tool Stack & Evaluation',
    dsDesc: 'Continuously researched, validated, and curated for your enterprise workflows.',
    pairs: [
      { tv: 'Continuous research and evaluation of AI vendors and platforms', ds: 'Best-in-class AI stack selected and integrated for you' },
      { tv: 'Rigorous testing & enterprise-grade validation',                 ds: 'Structured red-teaming and performance benchmarking'   },
      { tv: 'Curated AI tool stack for client workflows',                    ds: 'Ongoing optimisation as models and tools evolve'        },
    ],
  },
]

/* ─── connection grid (the 1-to-1 panel) ──────────────────────── */
function ConnectionGrid({ pillar, hoveredPair, onHover, onLeave }: {
  pillar: typeof PILLARS[0]
  hoveredPair: number | null
  onHover(i: number): void
  onLeave(): void
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pillar.id}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* column headers */}
        <div className="grid grid-cols-[1fr_60px_1fr] gap-4 mb-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-tvblue/70 block mb-1">TresVista</span>
            <h4 className="text-navy font-extrabold text-base leading-snug">{pillar.tvTitle}</h4>
            <p className="text-navy/45 text-sm mt-1 leading-relaxed">{pillar.tvDesc}</p>
          </div>
          <div className="flex flex-col items-center pt-4 gap-2">
            {/* vertical connector thread */}
            <motion.div
              className="w-px flex-1"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(27,79,190,0.25), transparent)', transformOrigin: 'top' }}
            />
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-tvorange/70 block mb-1">Descrial</span>
            <h4 className="text-navy font-extrabold text-base leading-snug">{pillar.dsTitle}</h4>
            <p className="text-navy/45 text-sm mt-1 leading-relaxed">{pillar.dsDesc}</p>
          </div>
        </div>

        {/* divider */}
        <div className="h-px bg-navy/7 mb-6" />

        {/* 1-to-1 pair rows */}
        <div className="space-y-3">
          {pillar.pairs.map((pair, i) => {
            const active = hoveredPair === i
            const dim    = hoveredPair !== null && !active
            return (
              <div
                key={i}
                className="grid grid-cols-[1fr_60px_1fr] gap-4 items-center group"
                onMouseEnter={() => onHover(i)}
                onMouseLeave={onLeave}
              >
                {/* TV item */}
                <div
                  className="rounded-xl p-4 border transition-all duration-250"
                  style={{
                    background:  active ? 'rgba(27,79,190,0.06)' : 'rgba(7,18,43,0.02)',
                    borderColor: active ? 'rgba(27,79,190,0.25)'  : 'rgba(7,18,43,0.07)',
                    opacity:     dim ? 0.35 : 1,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5 transition-all duration-250"
                      style={{
                        background: active ? '#1B4FBE' : 'rgba(27,79,190,0.12)',
                        color:      active ? '#fff'    : '#1B4FBE',
                      }}
                    >{i + 1}</span>
                    <span className="text-sm leading-snug text-navy/70" style={{ fontWeight: active ? 500 : 400 }}>
                      {pair.tv}
                    </span>
                  </div>
                </div>

                {/* connector */}
                <div className="flex flex-col items-center gap-1">
                  <motion.div
                    className="w-full h-px"
                    animate={{ scaleX: active ? 1 : 0.4, opacity: active ? 1 : 0.3 }}
                    transition={{ duration: 0.25 }}
                    style={{ background: active ? '#1B4FBE' : 'rgba(7,18,43,0.18)', transformOrigin: 'center' }}
                  />
                  <motion.span
                    className="text-[9px] font-black tracking-widest"
                    animate={{ opacity: active ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ color: '#1B4FBE' }}
                  >↔</motion.span>
                  <motion.div
                    className="w-full h-px"
                    animate={{ scaleX: active ? 1 : 0.4, opacity: active ? 1 : 0.3 }}
                    transition={{ duration: 0.25 }}
                    style={{ background: active ? '#EF8014' : 'rgba(7,18,43,0.18)', transformOrigin: 'center' }}
                  />
                </div>

                {/* DS item */}
                <div
                  className="rounded-xl p-4 border transition-all duration-250"
                  style={{
                    background:  active ? 'rgba(239,128,20,0.06)' : 'rgba(7,18,43,0.02)',
                    borderColor: active ? 'rgba(239,128,20,0.25)'  : 'rgba(7,18,43,0.07)',
                    opacity:     dim ? 0.35 : 1,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5 transition-all duration-250"
                      style={{
                        background: active ? '#EF8014' : 'rgba(239,128,20,0.12)',
                        color:      active ? '#fff'    : '#EF8014',
                      }}
                    >{i + 1}</span>
                    <span className="text-sm leading-snug text-navy/70" style={{ fontWeight: active ? 500 : 400 }}>
                      {pair.ds}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center mt-6 text-[11px] text-navy/25 font-medium">
          Hover any row to reveal its 1-to-1 connection
        </p>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─── sticky scroll shell ──────────────────────────────────────── */
export default function EIOSectionV2() {
  const containerRef             = useRef<HTMLDivElement>(null)
  const headerRef                = useRef(null)
  const headerInView             = useInView(headerRef, { once: true, margin: '-80px' })
  const [activePillar, setActive] = useState(0)
  const [hoveredPair,  setHover]  = useState<number | null>(null)

  /* scroll → active pillar */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v < 0.34)      setActive(0)
    else if (v < 0.67) setActive(1)
    else               setActive(2)
  })

  const pillar = PILLARS[activePillar]

  return (
    <section id="eio" className="bg-white">

      {/* non-sticky section header */}
      <div ref={headerRef} className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-tvblue text-xs font-bold tracking-[0.22em] uppercase">03</span>
            <span className="h-px w-8 bg-tvblue/40 block" />
            <span className="text-navy/35 text-xs font-bold tracking-[0.18em] uppercase">Our Integrated Model</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <h2 className="text-[clamp(2.2rem,4.5vw,4.2rem)] font-black text-navy leading-[0.95] tracking-tight">
              Enterprise Intelligence{' '}
              <span className="gradient-text">Orchestration (EIO)</span>
            </h2>
            <div className="space-y-5">
              <p className="text-navy/50 text-lg leading-relaxed max-w-[480px]">
                TresVista and Descrial are two components of one integrated model. Our experts
                use Descrial to orchestrate data, workflows, and AI — connecting insight to execution.
              </p>
              <a href="/our-solution/"
                className="inline-flex items-center gap-2 text-sm font-bold text-tvblue hover:text-navy transition-colors duration-200 group"
              >
                Explore Our Solution
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* sticky scroll container — 3 × 100vh gives time to cycle all 3 pillars */}
      <div ref={containerRef} style={{ height: '320vh' }} className="relative">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-white">

          {/* inner layout */}
          <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
            <div className="grid lg:grid-cols-[280px_1fr] gap-16 items-start">

              {/* LEFT: pillar list — vertical chapter navigator */}
              <div className="hidden lg:block">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy/30 mb-8">Three Pillars</p>
                <div className="space-y-1">
                  {PILLARS.map((p, i) => {
                    const Icon   = p.icon
                    const isAct  = activePillar === i
                    return (
                      <motion.button
                        key={p.id}
                        onClick={() => { setActive(i); setHover(null) }}
                        className="w-full flex items-center gap-4 py-4 px-4 rounded-2xl text-left transition-all duration-300 group"
                        style={{
                          background: isAct ? 'rgba(27,79,190,0.06)' : 'transparent',
                        }}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.18 }}
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                          style={{
                            background: isAct ? '#1B4FBE' : 'rgba(7,18,43,0.06)',
                          }}
                        >
                          <Icon size={15} style={{ color: isAct ? '#fff' : '#64748B' }} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                            style={{ color: isAct ? '#1B4FBE' : 'rgba(7,18,43,0.35)' }}>
                            {p.num}
                          </p>
                          <p className="text-sm font-semibold leading-tight truncate"
                            style={{ color: isAct ? '#07122B' : 'rgba(7,18,43,0.45)' }}>
                            {p.label}
                          </p>
                        </div>
                        {isAct && (
                          <motion.div
                            layoutId="activePillarBar"
                            className="ml-auto w-1 h-8 rounded-full"
                            style={{ background: '#1B4FBE' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 38 }}
                          />
                        )}
                      </motion.button>
                    )
                  })}
                </div>

                {/* scroll hint */}
                <div className="mt-12 flex items-center gap-2">
                  <motion.div
                    className="w-5 h-8 rounded-full border border-navy/15 flex items-start justify-center pt-1.5"
                  >
                    <motion.div
                      className="w-1 h-2 rounded-full bg-navy/30"
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </motion.div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-navy/30 font-semibold">Scroll through</span>
                </div>
              </div>

              {/* RIGHT: connection grid — changes per pillar */}
              <div className="bg-white rounded-3xl border border-navy/7 p-8 shadow-[0_4px_32px_rgba(7,18,43,0.05)]">

                {/* mobile pillar tabs */}
                <div className="flex gap-2 mb-8 lg:hidden">
                  {PILLARS.map((p, i) => {
                    const Icon = p.icon
                    const isAct = activePillar === i
                    return (
                      <button key={p.id}
                        onClick={() => { setActive(i); setHover(null) }}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                        style={{
                          background: isAct ? 'rgba(27,79,190,0.08)' : 'rgba(7,18,43,0.04)',
                          color:      isAct ? '#1B4FBE'               : 'rgba(7,18,43,0.45)',
                          border:     `1px solid ${isAct ? 'rgba(27,79,190,0.25)' : 'transparent'}`,
                        }}
                      >
                        <Icon size={12} />
                        <span className="hidden sm:inline">{p.label}</span>
                        <span className="sm:hidden">{p.num}</span>
                      </button>
                    )
                  })}
                </div>

                {/* pillar label strip */}
                <div className="flex items-center gap-3 mb-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePillar}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.28 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-[10px] font-black tracking-[0.2em] uppercase text-tvblue">{pillar.num}</span>
                      <span className="h-px w-6 bg-tvblue/40 block" />
                      <span className="text-sm font-bold text-navy/60 uppercase tracking-[0.1em]">{pillar.label}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <ConnectionGrid
                  pillar={pillar}
                  hoveredPair={hoveredPair}
                  onHover={setHover}
                  onLeave={() => setHover(null)}
                />
              </div>

            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
