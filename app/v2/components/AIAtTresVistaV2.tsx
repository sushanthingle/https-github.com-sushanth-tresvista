'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const PARTNER_LOGOS = [
  'OpenAI', 'Anthropic', 'Google DeepMind', 'Microsoft Azure', 'AWS', 'Snowflake',
  'Databricks', 'Palantir', 'HuggingFace', 'Cohere', 'Mistral', 'LlamaIndex',
]

const HEADLINE_LINES = ['AI AT', 'TRESVISTA']

export default function AIAtTresVistaV2() {
  const sectionRef = useRef<HTMLElement>(null)
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const rawHeadlineY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const rawBodyY     = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])
  const headlineY    = useSpring(rawHeadlineY, { stiffness: 55, damping: 18 })
  const bodyY        = useSpring(rawBodyY,     { stiffness: 55, damping: 18 })

  return (
    <section
      id="ai-tresvista"
      ref={sectionRef}
      style={{ backgroundColor: '#F4F7FB', borderRadius: '64px 64px 0 0', marginTop: '-64px', position: 'relative', zIndex: 6 }}
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
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-tvblue">06</span>
          <motion.span
            className="h-px bg-tvblue/40 block"
            initial={{ width: 0 }}
            animate={inView ? { width: 32 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <span className="text-navy/30 text-[11px] font-bold tracking-[0.18em] uppercase">AI at TresVista</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: headline + body */}
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
                    style={{ fontFamily: 'var(--font-montserrat, sans-serif)', fontWeight: 800, fontSize: 'clamp(3.5rem, 8vw, 8rem)', lineHeight: 0.95, letterSpacing: '-0.035em' }}
                  >
                    {line}
                  </span>
                </motion.div>
              </div>
            ))}

            {/* Partners badge */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.32, duration: 0.6 }}
              className="flex items-center gap-2 mt-4 mb-8"
            >
              <div className="h-[2px] w-8" style={{ background: '#347EF6' }} />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-tvblue-light">Partners</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
              animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
              transition={{ delay: 0.42, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              className="text-navy/65 text-lg leading-relaxed mb-8 max-w-[480px]"
            >
              We didn't just adopt AI. We built our functions around it.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
              animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
              transition={{ delay: 0.52, duration: 0.7 }}
              className="text-navy/45 text-base leading-relaxed mb-8 max-w-[480px]"
            >
              Our AI ecosystem spans the world's leading models, platforms, and infrastructure providers. Every tool is rigorously evaluated, tested, and deployed only when it meets our enterprise-grade standards.
            </motion.p>

            <motion.a
              href="/ai-ecosystem/"
              className="inline-flex items-center gap-2.5 px-5 py-3 bg-tvblue text-white text-sm font-semibold rounded-[8px] hover:bg-tvblue-light transition-colors duration-200 group shadow-[0_2px_12px_rgba(0,50,123,0.22)]"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65, duration: 0.55 }}
            >
              Learn More
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </motion.a>
          </motion.div>

          {/* Right: partner logos marquee */}
          <motion.div style={{ y: bodyY }} className="flex flex-col gap-4">

            {/* Placeholder for GIF */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              className="rounded-2xl overflow-hidden relative"
              style={{ background: 'linear-gradient(135deg, #EEF4FF 0%, #E6F0FF 100%)', border: '1px solid rgba(0,50,123,0.10)', aspectRatio: '16/9' }}
            >
              {/* Animated placeholder for the partners GIF */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(0,50,123,0.08)' }}
                  animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#00327B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
                <p className="text-navy/35 text-xs font-semibold tracking-widest uppercase text-center">Our Partners</p>
              </div>
            </motion.div>

            {/* Partner logo scroll */}
            <div className="relative overflow-hidden rounded-xl py-3" style={{ background: '#ffffff', border: '1px solid rgba(0,50,123,0.08)' }}>
              <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #fff, transparent)' }} />
              <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, #fff, transparent)' }} />
              <motion.div
                className="flex gap-0 whitespace-nowrap"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              >
                {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
                  <span key={i} className="inline-flex items-center gap-4 flex-shrink-0 text-[11px] font-bold uppercase tracking-[0.14em] text-navy/30 px-5">
                    {logo}
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#347EF6', opacity: 0.4 }} />
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
