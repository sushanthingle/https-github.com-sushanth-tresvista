'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const WORDS = ['One', 'partner.', 'End-to-end', 'accountability.']

export default function BoldCallout() {
  const sectionRef = useRef<HTMLElement>(null)
  const ref        = useRef<HTMLDivElement>(null)
  const inView     = useInView(ref, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Subtle parallax on the ambient glow
  const glowY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#030B1A] overflow-hidden py-28 lg:py-40 flex items-center justify-center"
    >
      {/* ambient glow — parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: glowY }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, rgba(27,79,190,0.13) 0%, rgba(239,128,20,0.05) 55%, transparent 75%)',
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      {/* subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div className="noise absolute inset-0 pointer-events-none" />

      <div
        ref={ref}
        className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-16 text-center"
      >
        {/* eyebrow rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="w-12 h-[2px] bg-gradient-to-r from-tvblue to-tvorange mx-auto mb-10 origin-center"
        />

        {/* headline — word-by-word reveal */}
        <h2 className="text-[clamp(3rem,7.5vw,8rem)] font-black leading-[0.96] tracking-tight text-white mb-8 flex flex-wrap justify-center gap-x-[0.25em]">
          {WORDS.map((word, i) => (
            <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
              <motion.span
                className="inline-block"
                initial={{ y: '110%', opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  delay: i * 0.12,
                  duration: 0.9,
                  ease: [0.76, 0, 0.24, 1],
                }}
                style={
                  i === 2 || i === 3
                    ? {
                        background: 'linear-gradient(135deg, #2E78E8 0%, #EF8014 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }
                    : undefined
                }
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>

        {/* sub line */}
        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: 0.55, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="text-white/42 text-base lg:text-lg max-w-[480px] mx-auto leading-relaxed"
        >
          Advisory · Technology Infrastructure · Human Execution
        </motion.p>
      </div>
    </section>
  )
}
