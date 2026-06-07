'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Heart, RefreshCw } from 'lucide-react'

const PILLARS = [
  {
    Icon: Heart,
    title: 'Contribute',
    color: '#347EF6',
    description:
      'We deploy capital, expertise, and strategic thought to communities and causes that can benefit most. Contribution is systematic, not incidental.',
  },
  {
    Icon: Heart,
    title: 'Serve',
    color: '#00327B',
    description:
      'Service is the operating mode. We partner with organizations that need capacity, perspective, and execution support to deliver meaningful outcomes.',
  },
  {
    Icon: RefreshCw,
    title: 'Reform',
    color: '#347EF6',
    description:
      'Lasting impact requires structural change. We engage with institutions and systems to drive reforms that create durable, scalable social value.',
  },
]

const HEADLINE_LINES = ['CONTRIBUTE.', 'SERVE.', 'REFORM.']

export default function CSRSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const rawHeadlineY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const rawCardsY    = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])
  const headlineY    = useSpring(rawHeadlineY, { stiffness: 55, damping: 18 })
  const cardsY       = useSpring(rawCardsY,    { stiffness: 50, damping: 17 })

  return (
    <section
      id="csr"
      ref={sectionRef}
      style={{ backgroundColor: '#07122B', borderRadius: '64px 64px 0 0', marginTop: '-64px', position: 'relative', zIndex: 4 }}
      className="overflow-hidden py-28 lg:py-36"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-tvblue-light">03</span>
          <motion.span
            className="h-px block"
            initial={{ width: 0 }}
            animate={inView ? { width: 32 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ background: 'rgba(52,126,246,0.4)' }}
          />
          <span className="text-white/30 text-[11px] font-bold tracking-[0.18em] uppercase">CSR</span>
        </motion.div>

        {/* Headline row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16 lg:mb-20">
          <motion.div style={{ y: headlineY }}>
            {HEADLINE_LINES.map((line, i) => (
              <div key={line} style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '110%' }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.05 + i * 0.13, ease: [0.76, 0, 0.24, 1] }}
                >
                  <span
                    className="block text-white font-bold"
                    style={{ fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
                  >
                    {line}
                  </span>
                </motion.div>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, filter: 'blur(6px)', y: 16 }}
            animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="max-w-[360px] text-white/45 leading-relaxed"
            style={{ fontSize: '13px', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}
          >
            This three-part framework guides our community engagement. A system for deploying capital, expertise, and strategic thought where they can deliver the most significant and enduring impact.
          </motion.p>
        </div>

        {/* Pillar cards */}
        <motion.div style={{ y: cardsY }} className="grid lg:grid-cols-3 gap-5 mb-12">
          {PILLARS.map(({ Icon, title, color, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 48, scale: 0.94 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: [0.76, 0, 0.24, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
              className="rounded-[24px] p-7 flex flex-col gap-5 relative overflow-hidden cursor-default"
              style={{ backgroundColor: '#0D1F3C', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* Top accent */}
              <motion.div
                className="absolute top-0 left-6 right-6 h-[2px] rounded-full origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ background: color }}
              />

              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center" style={{ background: `${color}22` }}>
                <Icon size={18} style={{ color }} />
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-white font-bold text-xl">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.55 }}
        >
          <a
            href="/csr/"
            className="inline-flex items-center gap-2.5 px-7 py-4 bg-tvblue text-white text-sm font-semibold rounded-2xl hover:bg-tvblue-light transition-colors duration-200 group shadow-[0_2px_12px_rgba(0,50,123,0.35)]"
          >
            Learn More
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </motion.div>

      </div>
    </section>
  )
}
