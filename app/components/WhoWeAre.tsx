'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const stats = [
  { value: 19,   suffix: '+', label: 'Years of Expertise' },
  { value: 2000, suffix: '+', label: 'Domain Experts' },
  { value: 1000, suffix: '+', label: 'Global Clients' },
]

const MARQUEE_ITEMS = [
  'AI Governance',
  'Data Engineering',
  'Workflow Orchestration',
  'Investment Research',
  'Financial Modeling',
  'Technology Transformation',
  'Human-in-Command',
  'Enterprise Intelligence',
  'Embedded Expertise',
  'Operational Excellence',
  'Business Intelligence',
  'Portfolio Analytics',
]

function Counter({
  target,
  suffix,
  trigger,
}: {
  target: number
  suffix: string
  trigger: boolean
}) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    const steps = 80
    const inc = target / steps
    let cur = 0
    const t = setInterval(() => {
      cur += inc
      if (cur >= target) {
        setCount(target)
        clearInterval(t)
      } else {
        setCount(Math.floor(cur))
      }
    }, 2200 / steps)
    return () => clearInterval(t)
  }, [trigger, target])
  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  )
}

export default function WhoWeAre() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const statsRef    = useRef<HTMLDivElement>(null)

  const headlineInView = useInView(headlineRef, { once: true, margin: '-80px' })
  const statsInView    = useInView(statsRef,    { once: true, margin: '-60px' })

  // Subtle parallax on decorative rules
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const rulesY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section ref={sectionRef} id="who-we-are" className="relative bg-white overflow-hidden py-28 lg:py-40">

      {/* decorative horizontal rules — very Apple */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: rulesY }}>
        <div className="absolute left-0 right-0 top-[18%] h-px bg-gradient-to-r from-transparent via-navy/5 to-transparent" />
        <div className="absolute left-0 right-0 top-[72%] h-px bg-gradient-to-r from-transparent via-navy/5 to-transparent" />
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-8 h-[2px] bg-tvorange block" />
          <span className="text-tvorange text-xs font-bold tracking-[0.18em] uppercase">Who We Are</span>
        </motion.div>

        {/* ── headline — Apple clip reveal ── */}
        <div ref={headlineRef} className="mb-16 lg:mb-20">
          {['Where Strategy', 'Meets Execution.'].map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '106%' }}
                animate={headlineInView ? { y: 0 } : {}}
                transition={{ delay: i * 0.13, duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
              >
                <h2
                  className={`text-[clamp(2.8rem,6.5vw,6.5rem)] font-black leading-[0.97] tracking-tight ${
                    i === 1 ? 'gradient-text' : 'text-navy'
                  }`}
                >
                  {line}
                </h2>
              </motion.div>
            </div>
          ))}
        </div>

        {/* ── two columns: description left / stats right ── */}
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-16 lg:gap-28 items-start mb-0">

          {/* left: description + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="text-navy/68 text-lg leading-relaxed mb-5">
              Traditional models create gaps between strategy and execution.{' '}
              <strong className="text-navy font-semibold">We close them.</strong>
            </p>
            <p className="text-navy/55 text-[15px] leading-relaxed mb-10">
              One embedded partner. Full accountability across the value chain — from
              data infrastructure and AI governance to human-led execution at every
              stage of the workflow.
            </p>
            <motion.a
              href="#eio"
              whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(7,18,43,0.18)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-7 py-4 bg-navy text-white text-sm font-semibold rounded-2xl transition-all duration-200 group"
            >
              Learn Our Story
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </motion.a>
          </motion.div>

          {/* right: stats — Apple minimal (no cards, just huge numbers) */}
          <div ref={statsRef} className="flex flex-col">
            {stats.map((stat, i) => (
              <div key={stat.label} className="relative">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={statsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.13, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                  className="flex items-center justify-between py-8"
                >
                  <div
                    className="text-[clamp(3.2rem,5.5vw,5rem)] font-black text-navy leading-none tracking-tight tabular-nums"
                  >
                    <Counter target={stat.value} suffix={stat.suffix} trigger={statsInView} />
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-navy/28 uppercase tracking-[0.14em] mb-1.5">
                      0{i + 1}
                    </div>
                    <div className="text-sm font-medium text-navy/58">{stat.label}</div>
                  </div>
                </motion.div>
                {/* animated gradient bottom rule */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px"
                  initial={{ width: 0 }}
                  animate={statsInView ? { width: '100%' } : {}}
                  transition={{ delay: 0.25 + i * 0.13, duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
                  style={{
                    background: `linear-gradient(90deg, ${
                      i === 1 ? '#EF801465' : '#1B4FBE45'
                    }, transparent)`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── capabilities marquee strip ── */}
      <div className="relative mt-20 overflow-hidden border-t border-b border-navy/[0.06] py-[14px]">
        {/* edge fades */}
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
              <span className="w-[3px] h-[3px] rounded-full bg-tvorange/50 flex-shrink-0" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
