'use client'
import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'

const WORKFLOW_DATA = {
  Corporates: {
    personas: ['Public', 'Private', 'Entrepreneurs'],
    color: '#00327B',
  },
  'Asset Managers': {
    personas: ['Private Equity', 'Family Office', 'Real Estate', 'Private Credit', 'Public Credit', 'Secondaries', 'Venture Capital'],
    color: '#347EF6',
  },
  Advisors: {
    personas: ['Investment Banks', 'Consultants', 'Investment Consultants', 'Placement Agents'],
    color: '#F6B343',
  },
} as const

type WorkflowKey = keyof typeof WORKFLOW_DATA

const HEADLINE_LINES = ['PUT TRESVISTA\'S', 'CAPABILITIES TO WORK', 'ON YOUR MANDATE']

export default function WorkflowsV2() {
  const sectionRef = useRef<HTMLElement>(null)
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-80px' })

  const [step,     setStep]     = useState(1)
  const [workflow, setWorkflow] = useState<WorkflowKey | null>(null)
  const [persona,  setPersona]  = useState<string | null>(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const rawHeadlineY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const rawCardY     = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])
  const headlineY    = useSpring(rawHeadlineY, { stiffness: 55, damping: 18 })
  const cardY        = useSpring(rawCardY,     { stiffness: 50, damping: 17 })

  function selectWorkflow(w: WorkflowKey) {
    setWorkflow(w)
    setPersona(null)
    setStep(2)
  }

  function selectPersona(p: string) {
    setPersona(p)
    setStep(3)
  }

  function reset() {
    setStep(1)
    setWorkflow(null)
    setPersona(null)
  }

  const STEP_LABELS = ['Select Your Workflow', 'Choose Your Persona', 'Find Your Capability']

  return (
    <section
      id="workflows"
      ref={sectionRef}
      style={{ backgroundColor: '#F4F7FB', borderRadius: '64px 64px 0 0', marginTop: '-64px', position: 'relative', zIndex: 3 }}
      className="overflow-hidden py-24 lg:py-36"
    >
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-tvblue">02</span>
          <motion.span
            className="h-px bg-tvblue/40 block"
            initial={{ width: 0 }}
            animate={inView ? { width: 32 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <span className="text-navy/30 text-[11px] font-bold tracking-[0.18em] uppercase">Workflows</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: headline */}
          <motion.div style={{ y: headlineY }}>
            {HEADLINE_LINES.map((line, i) => (
              <div key={line} style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '110%' }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.05 + i * 0.13, ease: [0.76, 0, 0.24, 1] }}
                >
                  <span
                    className="block text-navy"
                    style={{ fontFamily: 'var(--font-montserrat, sans-serif)', fontWeight: 800, fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
                  >
                    {line}
                  </span>
                </motion.div>
              </div>
            ))}

            <motion.p
              initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
              animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="text-navy/50 text-base leading-relaxed mt-8 max-w-[380px]"
            >
              Select your workflow category and persona to discover how TresVista delivers intelligence at every stage of your operating model.
            </motion.p>
          </motion.div>

          {/* Right: 3-step selector */}
          <motion.div style={{ y: cardY }}>
            {/* Step indicators */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-2 mb-8"
            >
              {STEP_LABELS.map((label, i) => {
                const n    = i + 1
                const done = step > n
                const curr = step === n
                return (
                  <div key={label} className="flex items-center gap-2">
                    <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300"
                      style={{
                        background: done ? '#347EF6' : curr ? '#00327B' : 'rgba(7,18,43,0.06)',
                        color:      done || curr ? '#fff' : 'rgba(7,18,43,0.35)',
                      }}
                    >
                      <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black"
                        style={{ background: done || curr ? 'rgba(255,255,255,0.25)' : 'rgba(7,18,43,0.10)' }}>
                        {n}
                      </span>
                      <span className="hidden sm:inline">{label}</span>
                    </div>
                    {i < 2 && <ChevronRight size={12} className="text-navy/20 flex-shrink-0" />}
                  </div>
                )
              })}
            </motion.div>

            {/* Step content */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.42, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              className="rounded-[28px] p-8 lg:p-10"
              style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,50,123,0.08)', boxShadow: '0 4px 40px rgba(7,18,43,0.07)' }}
            >
              <AnimatePresence mode="wait">

                {/* Step 1: Choose workflow */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-navy/35 mb-5">Step 1 of 3</p>
                    <h3 className="text-navy font-bold text-xl mb-6">Select Your Workflow</h3>
                    <div className="space-y-3">
                      {(Object.keys(WORKFLOW_DATA) as WorkflowKey[]).map((w, i) => (
                        <motion.button
                          key={w}
                          onClick={() => selectWorkflow(w)}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08, duration: 0.4 }}
                          whileHover={{ x: 4, transition: { duration: 0.2 } }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-between p-4 rounded-xl text-left transition-all duration-200 group"
                          style={{ background: 'rgba(7,18,43,0.03)', border: '1px solid rgba(7,18,43,0.07)' }}
                          onMouseEnter={e => {
                            const el = e.currentTarget as HTMLElement
                            el.style.borderColor = `${WORKFLOW_DATA[w].color}40`
                            el.style.background = `${WORKFLOW_DATA[w].color}08`
                          }}
                          onMouseLeave={e => {
                            const el = e.currentTarget as HTMLElement
                            el.style.borderColor = 'rgba(7,18,43,0.07)'
                            el.style.background = 'rgba(7,18,43,0.03)'
                          }}
                        >
                          <span className="text-navy font-semibold text-sm">{w}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-navy/30 text-xs">{WORKFLOW_DATA[w].personas.length} personas</span>
                            <ChevronRight size={14} className="text-navy/30 transition-transform duration-200 group-hover:translate-x-0.5" />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Choose persona */}
                {step === 2 && workflow && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <button onClick={reset} className="text-[11px] font-bold tracking-[0.18em] uppercase text-navy/30 hover:text-navy/55 transition-colors">Back</button>
                      <span className="text-navy/20">/</span>
                      <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-navy/35">Step 2 of 3</p>
                    </div>
                    <div className="flex items-center gap-2 mb-6">
                      <span className="w-2 h-2 rounded-full" style={{ background: WORKFLOW_DATA[workflow].color }} />
                      <h3 className="text-navy font-bold text-xl">{workflow}</h3>
                    </div>
                    <p className="text-navy/45 text-sm mb-5">Choose your persona:</p>
                    <div className="flex flex-wrap gap-2.5">
                      {WORKFLOW_DATA[workflow].personas.map((p, i) => (
                        <motion.button
                          key={p}
                          onClick={() => selectPersona(p)}
                          initial={{ opacity: 0, scale: 0.88 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05, duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                          style={{ background: 'rgba(7,18,43,0.04)', border: `1px solid ${WORKFLOW_DATA[workflow].color}25`, color: 'rgba(7,18,43,0.70)' }}
                          onMouseEnter={e => {
                            const el = e.currentTarget as HTMLElement
                            el.style.background = `${WORKFLOW_DATA[workflow].color}12`
                            el.style.borderColor = `${WORKFLOW_DATA[workflow].color}55`
                            el.style.color = WORKFLOW_DATA[workflow].color
                          }}
                          onMouseLeave={e => {
                            const el = e.currentTarget as HTMLElement
                            el.style.background = 'rgba(7,18,43,0.04)'
                            el.style.borderColor = `${WORKFLOW_DATA[workflow].color}25`
                            el.style.color = 'rgba(7,18,43,0.70)'
                          }}
                        >
                          {p}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Result */}
                {step === 3 && workflow && persona && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                    className="flex flex-col items-center text-center py-6 gap-5"
                  >
                    <motion.div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: `${WORKFLOW_DATA[workflow].color}15` }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.1 }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <motion.path
                          d="M5 12l5 5L19 7"
                          stroke={WORKFLOW_DATA[workflow].color}
                          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        />
                      </svg>
                    </motion.div>
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-navy/35 mb-2">{workflow} / {persona}</p>
                      <h3 className="text-navy font-bold text-lg mb-2">TresVista Can Help</h3>
                      <p className="text-navy/50 text-sm leading-relaxed max-w-[280px] mx-auto">
                        Connect with our team to get a tailored capability map for your specific mandate and workflows.
                      </p>
                    </div>
                    <div className="flex gap-3 flex-wrap justify-center">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-[8px] transition-all duration-200 group"
                        style={{ backgroundColor: WORKFLOW_DATA[workflow].color }}
                      >
                        Connect with an Expert
                        <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                      </a>
                      <button
                        onClick={reset}
                        className="px-5 py-2.5 text-navy/55 hover:text-navy text-sm font-semibold rounded-[8px] transition-colors duration-200"
                        style={{ background: 'rgba(7,18,43,0.05)', border: '1px solid rgba(7,18,43,0.08)' }}
                      >
                        Start Over
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
