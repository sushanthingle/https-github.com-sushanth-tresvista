'use client'
import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const HEADLINE_LINES = ['STAY AHEAD OF HOW', 'INTELLIGENCE IS EVOLVING']

export default function NewsletterV2() {
  const sectionRef = useRef<HTMLElement>(null)
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-80px' })
  const [email,    setEmail]    = useState('')
  const [sent,     setSent]     = useState(false)
  const [loading,  setLoading]  = useState(false)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const rawY  = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  const sectY = useSpring(rawY, { stiffness: 55, damping: 18 })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1200)
  }

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      style={{ backgroundColor: '#00327B', borderRadius: '64px 64px 0 0', marginTop: '-64px', position: 'relative', zIndex: 7 }}
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

      <motion.div ref={ref} style={{ y: sectY }} className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-12 text-center">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <span className="text-[11px] font-bold tracking-[0.24em] uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>07</span>
          <motion.span
            className="h-px block"
            initial={{ width: 0 }}
            animate={inView ? { width: 32 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ background: 'rgba(255,255,255,0.3)' }}
          />
          <span className="text-white/30 text-[11px] font-bold tracking-[0.18em] uppercase">Newsletter</span>
        </motion.div>

        {HEADLINE_LINES.map((line, i) => (
          <div key={line} style={{ overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.08 + i * 0.13, ease: [0.76, 0, 0.24, 1] }}
            >
              <span
                className="block text-white"
                style={{ fontWeight: 700, fontSize: 'clamp(2.2rem, 4vw, 4rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
              >
                {line}
              </span>
            </motion.div>
          </div>
        ))}

        <motion.p
          initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="text-white/55 text-lg leading-relaxed mt-6 mb-10 max-w-[600px] mx-auto"
        >
          Get operator-level insights on AI, operating models, and how leading firms are turning intelligence into execution.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3"
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <motion.path d="M5 12l5 5L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.15 }} />
                  </svg>
                </motion.div>
                <p className="text-white font-semibold text-lg">You're in. Welcome to the intelligence edge.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-[520px] mx-auto"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3.5 rounded-[10px] text-sm text-navy placeholder-navy/35 outline-none focus:ring-2 focus:ring-tvblue-light/40 transition-all duration-200"
                  style={{ backgroundColor: 'rgba(255,255,255,0.90)', border: '1px solid rgba(255,255,255,0.20)' }}
                />
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3.5 bg-white text-tvblue text-sm font-bold rounded-[10px] hover:bg-surface transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                  ) : (
                    <>
                      Subscribe to our Newsletter
                      <ArrowRight size={14} />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  )
}
