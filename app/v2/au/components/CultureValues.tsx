'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'

const HEADLINE_LINES = ['THE FRAMEWORK', 'FOR ENDURING', 'VALUE']

const PACT = [
  {
    letter: 'P',
    name: 'People',
    color: '#00327B',
    description:
      'We recognize and value that people are unique and multifaceted. We give people the freedom to contribute to the improvement of the organization. We encourage creativity and support enthusiasm.',
  },
  {
    letter: 'A',
    name: 'Action',
    color: '#347EF6',
    description:
      'We encourage active decision-making and getting the job done. We act rather than react.',
  },
  {
    letter: 'C',
    name: 'Clients',
    color: '#00327B',
    description:
      'We strive to be close to the customer. We learn from the people we serve to continuously improve our quality.',
  },
  {
    letter: 'T',
    name: 'Team',
    color: '#347EF6',
    description: 'We succeed together.',
  },
]

export default function CultureValues() {
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
      id="culture"
      ref={sectionRef}
      style={{ backgroundColor: '#F4F7FB', borderRadius: '64px 64px 0 0', marginTop: '-64px', position: 'relative', zIndex: 3 }}
      className="overflow-hidden py-28 lg:py-36"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(7,18,43,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(7,18,43,0.015) 1px,transparent 1px)',
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
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-tvblue">02</span>
          <motion.span
            className="h-px bg-tvblue/40 block"
            initial={{ width: 0 }}
            animate={inView ? { width: 32 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <span className="text-navy/30 text-[11px] font-bold tracking-[0.18em] uppercase">Culture &amp; Values</span>
        </motion.div>

        {/* Two-column: headline + right content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20 lg:mb-28">

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
                    className="block text-navy font-bold"
                    style={{ fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
                  >
                    {line}
                  </span>
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* Right: purpose label + subheading + quote */}
          <motion.div style={{ y: bodyY }} className="flex flex-col gap-6 lg:pt-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-[11px] font-bold tracking-[0.22em] uppercase text-navy/30"
            >
              Our Collective Purpose
            </motion.p>

            <motion.p
              initial={{ opacity: 0, filter: 'blur(6px)', y: 10 }}
              animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
              transition={{ delay: 0.38, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              className="text-navy/65 text-lg leading-relaxed"
            >
              The internal architecture that informs our judgment and directs our execution.
            </motion.p>

            {/* Quote card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.52, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="rounded-2xl p-6"
              style={{ backgroundColor: '#ffffff', borderLeft: '3px solid #00327B' }}
            >
              <p className="text-navy/80 text-base leading-relaxed">
                "To be the platform that delivers enduring value through sophisticated solutions that continually elevate our members."
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* PACT section */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-[11px] font-bold tracking-[0.22em] uppercase text-navy/30 mb-8"
          >
            The PACT
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PACT.map(({ letter, name, color, description }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.65 + i * 0.1, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                whileHover="hovered"
                className="rounded-[24px] p-7 flex flex-col gap-4 relative overflow-hidden cursor-default group"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 16px rgba(7,18,43,0.06)' }}
              >
                {/* Top accent bar */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[3px] origin-left rounded-full"
                  initial={{ scaleX: 0 }}
                  variants={{ hovered: { scaleX: 1 } }}
                  transition={{ duration: 0.3 }}
                  style={{ background: color }}
                />

                {/* Big letter */}
                <motion.span
                  className="font-bold leading-none select-none"
                  initial={{ color: 'rgba(7,18,43,0.12)' }}
                  variants={{ hovered: { color } }}
                  transition={{ duration: 0.25 }}
                  style={{ fontSize: 'clamp(3rem, 5vw, 4rem)' }}
                >
                  {letter}
                </motion.span>

                <div className="flex flex-col gap-2 flex-1">
                  <p className="text-navy font-bold text-lg">{name}</p>
                  <motion.p
                    className="text-sm leading-relaxed"
                    initial={{ color: 'rgba(7,18,43,0.45)' }}
                    variants={{ hovered: { color: 'rgba(7,18,43,0.70)' } }}
                    transition={{ duration: 0.25 }}
                  >
                    {description}
                  </motion.p>
                </div>

                {/* Hover shadow */}
                <motion.div
                  className="absolute inset-0 rounded-[24px] pointer-events-none"
                  initial={{ boxShadow: '0 2px 16px rgba(7,18,43,0.06)' }}
                  variants={{ hovered: { boxShadow: '0 12px 40px rgba(7,18,43,0.14)' } }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
