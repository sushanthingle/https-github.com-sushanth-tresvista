'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const VALUE_PROPS = [
  'Servicing across industries',
  'Experience in working with lean teams and corporates',
  'Dedicated 3-tier team bringing unmatched expertise',
  'Specialised talent across different outsourcing functions',
  'High cost efficiencies on projects and long-term engagements',
]

const SOURCE_OPTIONS = ['Referral', 'News and Content', 'Events and Conferences', 'Promotions', 'Others']
const INQUIRY_TYPES  = ['Service Inquiry', 'Careers', 'General']

export default function ContactV2() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [name,    setName]    = useState('')
  const [org,     setOrg]     = useState('')
  const [email,   setEmail]   = useState('')
  const [phone,   setPhone]   = useState('')
  const [source,  setSource]  = useState('')
  const [inquiry, setInquiry] = useState('')
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

  const inputCls = "bg-white border border-black/12 rounded-[8px] px-4 py-3 text-sm text-black placeholder-black/25 outline-none focus:border-black/40 focus:ring-2 focus:ring-black/6 transition-all duration-200 w-full"
  const labelCls = "block mb-1.5 text-[11px] font-bold tracking-[0.14em] uppercase text-[#444444]"

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        backgroundColor: '#e5e7eb',
        borderRadius: '64px 64px 0 0',
        marginTop: '-64px',
        position: 'relative',
        zIndex: 5,
      }}
      className="overflow-hidden py-24 lg:py-36"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.028) 1px,transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-[11px] font-bold tracking-[0.24em] uppercase"
                style={{ color: '#000', fontFamily: 'var(--font-ibm-plex-mono, monospace)' }}
              >
                04
              </span>
              <span className="h-px w-8 bg-black/25 block" />
              <span className="text-black/30 text-[11px] font-bold tracking-[0.18em] uppercase">Start the Conversation</span>
            </div>
            <h2
              className="text-black"
              style={{
                fontFamily: 'var(--font-bebas-neue, sans-serif)',
                fontSize: 'clamp(3rem, 6.5vw, 6.5rem)',
                lineHeight: 0.90,
                letterSpacing: '-0.025em',
              }}
            >
              START THE<br />CONVERSATION.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.7 }}
            className="text-[#444444] text-[13px] font-bold tracking-[0.16em] uppercase leading-relaxed max-w-[340px]"
          >
            A conversation is the first step. Clarity is the first outcome.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1fr_520px] gap-12 lg:gap-20">

          {/* Left: value props */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col gap-10"
          >
            <div>
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-black/30 mb-6">Why TresVista</p>
              <ul className="space-y-4">
                {VALUE_PROPS.map((prop, i) => (
                  <motion.li
                    key={prop}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.28 + i * 0.07, duration: 0.5 }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle2 size={16} className="text-black/35 flex-shrink-0 mt-0.5" />
                    <span className="text-[#444444] text-sm leading-relaxed">{prop}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="border-t border-black/10 pt-8">
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-black/25 mb-4">Direct Contact</p>
              <a
                href="mailto:reachus@tresvista.com"
                className="text-sm text-[#444444] hover:text-black transition-colors duration-200"
              >
                reachus@tresvista.com
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.28, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            className="rounded-[32px] p-8 lg:p-10"
            style={{ backgroundColor: '#ffffff' }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="min-h-[500px] flex flex-col items-center justify-center text-center gap-5"
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: '#d1ffca' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <motion.path
                        d="M5 12l5 5L19 7"
                        stroke="#000" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                      />
                    </svg>
                  </div>
                  <h3 className="text-black text-xl font-bold">Message sent.</h3>
                  <p className="text-[#444444] text-sm leading-relaxed max-w-[260px]">
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
                      <label className={labelCls}>Name</label>
                      <input type="text" required value={name} onChange={e => setName(e.target.value)}
                        placeholder="John Smith" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Organisation</label>
                      <input type="text" required value={org} onChange={e => setOrg(e.target.value)}
                        placeholder="Acme Capital" className={inputCls} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Email</label>
                      <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="john@acmecapital.com" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Phone No.</label>
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                        placeholder="+1 212 555 0100" className={inputCls} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Source</label>
                      <select value={source} onChange={e => setSource(e.target.value)}
                        className={`${inputCls} appearance-none cursor-pointer`}>
                        <option value="">How did you hear about us?</option>
                        {SOURCE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Inquiry Type</label>
                      <select value={inquiry} onChange={e => setInquiry(e.target.value)}
                        className={`${inputCls} appearance-none cursor-pointer`}>
                        <option value="">Select type...</option>
                        {INQUIRY_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
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
                        privacy ? 'bg-black border-black' : 'bg-white border-black/20 group-hover:border-black/40'
                      }`}
                    >
                      {privacy && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                    <span className="text-[12px] text-[#444444] leading-relaxed">
                      I have read the{' '}
                      <a href="/privacy-policy/" className="text-black underline underline-offset-2 hover:no-underline transition-all">
                        TresVista Privacy Statement
                      </a>
                    </span>
                  </label>

                  <motion.button
                    type="submit"
                    disabled={loading || !privacy}
                    whileHover={!loading && privacy ? { scale: 1.02 } : {}}
                    whileTap={!loading && privacy ? { scale: 0.97 } : {}}
                    className="mt-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-black text-white text-sm font-semibold rounded-[8px] hover:bg-[#2f2f2f] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
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
