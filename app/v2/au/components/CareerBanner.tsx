'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const HEADLINE_LINES = ['BUILD YOUR CAREER', 'AT A GLOBAL', 'ENTERPRISE.']

export default function CareerBanner() {
  const sectionRef = useRef<HTMLElement>(null)
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const rawY  = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  const sectY = useSpring(rawY, { stiffness: 55, damping: 18 })

  return (
    <section
      id="careers-banner"
      ref={sectionRef}
      style={{ backgroundColor: '#00327B', borderRadius: '64px 64px 0 0', marginTop: '-64px', position: 'relative', zIndex: 5 }}
      className="overflow-hidden py-28 lg:py-36"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(52,126,246,0.35) 0%, transparent 65%)',
      }} />

      <motion.div
        ref={ref}
        style={{ y: sectY }}
        className="relative z-10 max-w-[760px] mx-auto px-6 lg:px-12"
      >
        {HEADLINE_LINES.map((line, i) => (
          <div key={line} style={{ overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.08 + i * 0.13, ease: [0.76, 0, 0.24, 1] }}
            >
              <span
                className="block text-white font-bold"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
              >
                {line}
              </span>
            </motion.div>
          </div>
        ))}

        <motion.p
          initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="text-white/60 text-lg leading-relaxed mt-8 mb-10"
        >
          Where expertise is valued and impact is engineered.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <a
            href="/careers/"
            className="inline-flex items-center gap-2.5 px-7 py-4 bg-white text-tvblue text-sm font-bold rounded-2xl hover:bg-surface transition-colors duration-200 group shadow-[0_4px_20px_rgba(0,0,0,0.18)]"
          >
            Join the Team
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
