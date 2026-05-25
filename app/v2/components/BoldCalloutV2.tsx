'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function Counter({ to, inView }: { to: number; inView: boolean }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const dur = 1400
    const step = 16
    const inc = to / (dur / step)
    let curr = 0
    const id = setInterval(() => {
      curr += inc
      if (curr >= to) { setVal(to); clearInterval(id) }
      else setVal(Math.floor(curr))
    }, step)
    return () => clearInterval(id)
  }, [inView, to])
  return <>{val}</>
}

const STATS = [
  { num: 20,   suffix: '+',  label: 'Years of client\npartnership and trust'    },
  { num: 1500, suffix: '+',  label: 'Leading firms\nserved worldwide'            },
  { num: 5000, suffix: '+',  label: 'Global team of\nintegrated experts'         },
  { num: 24,   suffix: '/7', label: 'Continuous\nglobal operations'              },
]

/* split headline into individual words for stagger reveal */
const WORDS = ['Beyond', 'the', 'Limits', 'of', 'Fragmentation']

export default function BoldCalloutV2() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <section ref={ref} className="relative bg-white py-32 lg:py-44 overflow-hidden">

      {/* thin accent lines */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ top: '48px', background: 'linear-gradient(to right, transparent, rgba(7,18,43,0.07) 30%, rgba(7,18,43,0.07) 70%, transparent)' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.2, duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ bottom: '48px', background: 'linear-gradient(to right, transparent, rgba(7,18,43,0.07) 30%, rgba(7,18,43,0.07) 70%, transparent)' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.35, duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* section label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-tvblue text-xs font-bold tracking-[0.22em] uppercase">02</span>
          <span className="h-px w-8 bg-tvblue/40 block" />
          <span className="text-navy/30 text-xs font-bold tracking-[0.18em] uppercase">Our Advantage</span>
        </motion.div>

        {/* eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-navy/35 text-[11px] font-bold tracking-[0.18em] uppercase mb-10 max-w-[520px] leading-relaxed"
        >
          Uniting advisory, technology, and execution under a single, accountable relationship.
        </motion.p>

        {/* word-by-word headline reveal */}
        <div className="flex flex-wrap gap-x-5 gap-y-1 mb-8">
          {WORDS.map((word, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="block text-[clamp(2.8rem,6.5vw,7.5rem)] font-black leading-[0.90] tracking-tight text-navy"
              >
                {word}
              </motion.span>
            </div>
          ))}
        </div>

        {/* description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.65 }}
          className="text-navy/45 text-base lg:text-lg leading-relaxed max-w-[580px] mb-16"
        >
          While traditional models create gaps between strategy and execution, we close them.
          The result is a single, embedded partner accountable for the outcome, from initial
          data to the final decision.
        </motion.p>

        {/* 4-stat strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-navy/7 rounded-2xl overflow-hidden">
          {STATS.map(({ num, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.75 + i * 0.08, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="bg-white p-8 group"
            >
              <p className="text-[clamp(2rem,3.5vw,3.5rem)] font-black text-navy leading-none tabular-nums mb-3">
                <Counter to={num} inView={inView} />{suffix}
              </p>
              <div className="h-[2px] w-6 bg-tvblue mb-3 transition-all duration-300 group-hover:w-12" />
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-navy/35 whitespace-pre-line leading-relaxed">
                {label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
