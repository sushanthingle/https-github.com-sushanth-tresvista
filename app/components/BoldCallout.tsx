'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const HEADLINE = ['Beyond', 'the', 'Limits', 'of', 'Fragmentation.']

const STATS = [
  { value: 20,   suffix: '+',  label: 'Years of Excellence'   },
  { value: 1500, suffix: '+',  label: 'Firms Served'          },
  { value: 5000, suffix: '+',  label: 'Domain Experts'        },
  { value: 24,   suffix: '/7', label: 'Operational Support'   },
]

function Counter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count,   setCount]   = useState(0)
  const started               = useRef(false)

  useEffect(() => {
    if (!active || started.current) return
    started.current = true
    const steps = 52
    const delay = 1500 / steps
    let step = 0
    const id = setInterval(() => {
      step++
      const eased = 1 - Math.pow(1 - step / steps, 2.2)
      setCount(Math.round(eased * target))
      if (step >= steps) clearInterval(id)
    }, delay)
    return () => clearInterval(id)
  }, [active, target])

  return <>{count}{suffix}</>
}

export default function BoldCallout() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative bg-tvblue overflow-hidden py-24 lg:py-32">
      {/* subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      {/* radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[440px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.12) 0%, transparent 65%)' }}
      />

      <div ref={ref} className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-16 text-center">

        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="h-px w-8 bg-white/35 block" />
          <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/55">The TresVista Difference</span>
          <span className="h-px w-8 bg-white/35 block" />
        </motion.div>

        {/* headline */}
        <h2 className="text-[clamp(2.4rem,6vw,5.4rem)] font-bold leading-[1.06] tracking-tight text-white mb-8 flex flex-wrap justify-center gap-x-[0.22em]">
          {HEADLINE.map((word, i) => (
            <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
              <motion.span
                className="inline-block"
                initial={{ y: '110%', opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: i * 0.08, duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>

        {/* sub-line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.65 }}
          className="text-white/60 text-base lg:text-lg max-w-[520px] mx-auto leading-relaxed mb-14"
        >
          One partner. Advisory, technology infrastructure, and execution — orchestrated end-to-end.
        </motion.p>

        {/* stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map(({ value, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 + i * 0.08, duration: 0.55 }}
              className="text-center"
            >
              <p className="text-[clamp(1.9rem,3.8vw,3rem)] font-bold text-white leading-none tabular-nums mb-2.5">
                <Counter target={value} suffix={suffix} active={inView} />
              </p>
              <div className="h-[2px] w-6 bg-white/35 mx-auto mb-2" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
