'use client'
import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const VALUE_PROPS = [
  'Servicing across industries',
  'Experience in working with lean teams and corporates',
  'Dedicated 3-tier team bringing unmatched expertise',
  'Specialised talent across different outsourcing functions',
  'High cost efficiencies on projects and long-term engagements',
]

const SOURCE_OPTIONS = ['Referral', 'News and Content', 'Events and Conferences', 'Promotions', 'Others']

const HEADLINE_LINES = ['START THE', 'CONVERSATION.']

export default function ContactV2() {
  const sectionRef = useRef<HTMLElement>(null)
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const rawHeadlineY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const rawFormY     = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])
  const rawLeftY     = useTransform(scrollYProgress, [0, 1], ['3%', '-3%'])
  const headlineY    = useSpring(rawHeadlineY, { stiffness: 55, damping: 18 })
  const formY        = useSpring(rawFormY,     { stiffness: 50, damping: 17 })
  const leftY        = useSpring(rawLeftY,     { stiffness: 50, damping: 17 })

  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [org,     setOrg]     = useState('')
  const [phone,   setPhone]   = useState('')
  const [source,  setSource]  = useState('')
  const [message, setMessage] = useState('')
  const [privacy, setPrivacy] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!privacy) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1400)
  }

  const inputCls = "bg-surface border border-navy/10 rounded-[8px] px-4 py-3 text-sm text-navy placeholder-navy/30 outline-none focus:border-tvblue/40 focus:ring-2 focus:ring-tvblue/8 transition-all duration-200 w-full"
  const labelCls = "block mb-1.5 text-[11px] font-bold tracking-[0.14em] uppercase text-navy/50"

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ backgroundColor: '#ffffff', borderRadius: '64px 64px 0 0', marginTop: '-64px', position: 'relative', zIndex: 8 }}
      className="overflow-hidden py-24 lg:py-36"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(7,18,43,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(7,18,43,0.018) 1px,transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16 lg:mb-20">
          <motion.div style={{ y: headlineY }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-tvblue">08</span>
              <motion.span
                className="h-px bg-tvblue/40 block"
                initial={{ width: 0 }}
                animate={inView ? { width: 32 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <span className="text-navy/30 text-[11px] font-bold tracking-[0.18em] uppercase">Start the Conversation</span>
            </motion.div>
            {HEADLINE_LINES.map((line, i) => (
              <div key={line} style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '110%' }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.08 + i * 0.14, ease: [0.76, 0, 0.24, 1] }}
                >
                  <span
                    className="block text-navy"
                    style={{ fontFamily: 'var(--font-montserrat, sans-serif)', fontWeight: 800, fontSize: 'clamp(3rem, 6.5vw, 6.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
                  >
                    {line}
                  </span>
                </motion.div>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
            animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="text-navy/45 text-[13px] font-semibold tracking-[0.14em] uppercase leading-relaxed max-w-[340px]"
          >
            A conversation is the first step. Clarity is the first outcome.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1fr_520px] gap-12 lg:gap-20">

          {/* Left: value props */}
          <motion.div style={{ y: leftY }} className="flex flex-col gap-10">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-[11px] font-bold tracking-[0.22em] uppercase text-navy/30 mb-6"
              >
                Why TresVista
              </motion.p>
              <ul className="space-y-4">
                {VALUE_PROPS.map((prop, i) => (
                  <motion.li
                    key={prop}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.38 + i * 0.09, duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                    className="flex items-start gap-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: 0.42 + i * 0.09, duration: 0.4, type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle2 size={16} className="text-tvblue/40 flex-shrink-0 mt-0.5" />
                    </motion.div>
                    <span className="text-navy/65 text-sm leading-relaxed">{prop}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.85, duration: 0.55 }}
              className="border-t border-navy/8 pt-8"
            >
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-navy/25 mb-4">Direct Contact</p>
              <a href="mailto:reachus@tresvista.com" className="text-sm text-navy/55 hover:text-tvblue transition-colors duration-200">
                reachus@tresvista.com
              </a>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            style={{ y: formY, backgroundColor: '#ffffff', border: '1px solid rgba(0,50,123,0.08)', boxShadow: '0 8px 48px rgba(7,18,43,0.07)' }}
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="rounded-[32px] p-8 lg:p-10"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="min-h-[500px] flex flex-col items-center justify-center text-center gap-5"
                >
                  <motion.div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: '#EEF4FF' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 18, delay: 0.1 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <motion.path d="M5 12l5 5L19 7" stroke="#00327B" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ duration: 0.55, delay: 0.2 }} />
                    </svg>
                  </motion.div>
                  <h3 className="text-navy text-xl font-bold">Message sent.</h3>
                  <p className="text-navy/50 text-sm leading-relaxed max-w-[260px]">
                    Our team will be in touch within one business day. We look forward to connecting.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Full Name</label>
                      <input type="text" required value={name} onChange={e => setName(e.target.value)}
                        placeholder="John Smith" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Business Email</label>
                      <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="john@acmecapital.com" className={inputCls} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Your Organisation</label>
                      <input type="text" required value={org} onChange={e => setOrg(e.target.value)}
                        placeholder="Acme Capital" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Number</label>
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                        placeholder="+1 212 555 0100" className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Source</label>
                    <select value={source} onChange={e => setSource(e.target.value)}
                      className={`${inputCls} appearance-none cursor-pointer`}>
                      <option value="">How did you hear about us?</option>
                      {SOURCE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className={labelCls}>Message</label>
                    <textarea rows={4} value={message} onChange={e => setMessage(e.target.value)}
                      placeholder="Tell us about your goals and how we can help..."
                      className={`${inputCls} resize-none`} />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={privacy}
                      onClick={() => setPrivacy(p => !p)}
                      className={`w-5 h-5 rounded-[4px] flex-shrink-0 mt-0.5 border transition-all duration-200 flex items-center justify-center ${
                        privacy ? 'bg-tvblue border-tvblue' : 'bg-white border-navy/20 group-hover:border-navy/40'
                      }`}
                    >
                      {privacy && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                    <span className="text-[12px] text-navy/50 leading-relaxed">
                      I have read the{' '}
                      <a href="/privacy-policy/" className="text-tvblue underline underline-offset-2 hover:no-underline transition-all">
                        TresVista Privacy Statement
                      </a>
                    </span>
                  </label>

                  <motion.button
                    type="submit"
                    disabled={loading || !privacy}
                    whileHover={!loading && privacy ? { scale: 1.02 } : {}}
                    whileTap={!loading && privacy ? { scale: 0.97 } : {}}
                    className="mt-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-tvblue text-white text-sm font-semibold rounded-[8px] hover:bg-tvblue-light transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_2px_12px_rgba(0,50,123,0.22)]"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit
                        <ArrowRight size={14} />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
