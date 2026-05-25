'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle, ArrowRight, Globe, Users, Award, Zap, DollarSign } from 'lucide-react'

const valueProps = [
  { icon: Globe,       text: 'Servicing across industries' },
  { icon: Users,       text: 'Experience with lean teams and large corporates' },
  { icon: Award,       text: 'Dedicated 3-tier team bringing unmatched expertise' },
  { icon: Zap,         text: 'Specialized talent across outsourcing functions' },
  { icon: DollarSign,  text: 'High cost efficiencies on projects and long-term engagements' },
]

const sources  = ['Referral', 'News and Content', 'Events and Conferences', 'Promotions', 'Others']
const inquiries = ['Service Inquiry', 'Careers', 'General']

type FormState = 'idle' | 'loading' | 'success'

export default function Contact() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [agreed, setAgreed] = useState(false)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    setTimeout(() => setFormState('success'), 1600)
  }

  const inputClass = `w-full bg-white border border-surface-dark rounded-xl px-4 py-3.5 text-sm text-navy placeholder:text-slate/50 focus:outline-none focus:border-tvblue focus:ring-2 focus:ring-tvblue/10 transition-all duration-200`

  return (
    <section id="contact" className="bg-white py-28 lg:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* top heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-[2px] bg-tvblue block" />
            <span className="text-tvblue text-xs font-bold tracking-[0.14em] uppercase">Get In Touch</span>
            <span className="w-8 h-[2px] bg-tvblue block" />
          </div>
          <h2 className="text-[clamp(2.2rem,3.8vw,3.8rem)] font-bold text-navy leading-[1.06] tracking-tight mb-4">
            Start the{' '}
            <span className="text-tvblue">Conversation.</span>
          </h2>
          <p className="text-navy/50 text-lg max-w-[480px] mx-auto leading-relaxed">
            A conversation is the first step. Clarity is the first outcome.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[400px_1fr] gap-12 lg:gap-20 items-start">

          {/* left — value props */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="rounded-2xl bg-navy p-8 mb-6 relative overflow-hidden">
              {/* bg grid */}
              <div className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
              <div className="relative z-10">
                <h3 className="text-white font-bold text-xl mb-6 leading-snug">
                  Why organisations choose TresVista
                </h3>
                <div className="space-y-4">
                  {valueProps.map((vp, i) => {
                    const Icon = vp.icon
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -16 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.35 + i * 0.08 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-tvblue/20 border border-tvblue/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon size={14} className="text-tvblue-light" />
                        </div>
                        <span className="text-white/70 text-sm leading-relaxed">{vp.text}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* contact detail */}
            <div className="rounded-2xl border border-surface-dark bg-surface p-6">
              <p className="text-xs font-bold text-slate uppercase tracking-widest mb-3">Direct Contact</p>
              <a
                href="mailto:reachus@tresvista.com"
                className="text-tvblue font-semibold hover:underline transition-all"
              >
                reachus@tresvista.com
              </a>
            </div>
          </motion.div>

          {/* right — form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            {formState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-20 rounded-2xl border border-surface-dark bg-surface"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                  className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mb-5"
                >
                  <CheckCircle size={32} className="text-green-500" />
                </motion.div>
                <h3 className="text-navy font-bold text-xl mb-3">Message Sent</h3>
                <p className="text-slate max-w-xs">
                  Thank you for reaching out. Our team will be in touch within one business day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-navy/60 uppercase tracking-widest mb-2">Name *</label>
                    <input required className={inputClass} placeholder="Jane Smith" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy/60 uppercase tracking-widest mb-2">Organization *</label>
                    <input required className={inputClass} placeholder="Acme Capital" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-navy/60 uppercase tracking-widest mb-2">Email *</label>
                    <input required type="email" className={inputClass} placeholder="jane@firm.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy/60 uppercase tracking-widest mb-2">Phone No.</label>
                    <input type="tel" className={inputClass} placeholder="+1 (000) 000-0000" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-navy/60 uppercase tracking-widest mb-2">Source</label>
                    <select className={`${inputClass} appearance-none cursor-pointer`}>
                      <option value="">How did you hear about us?</option>
                      {sources.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy/60 uppercase tracking-widest mb-2">Inquiry Type</label>
                    <select className={`${inputClass} appearance-none cursor-pointer`}>
                      <option value="">Select inquiry type</option>
                      {inquiries.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy/60 uppercase tracking-widest mb-2">Message</label>
                  <textarea
                    className={`${inputClass} resize-none min-h-[120px]`}
                    placeholder="Tell us about your goals and how we can help…"
                  />
                </div>

                {/* privacy consent */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div
                    onClick={() => setAgreed(!agreed)}
                    className={`mt-0.5 w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-all duration-200 ${agreed ? 'bg-tvblue border-tvblue' : 'border-surface-dark bg-white group-hover:border-tvblue/50'}`}
                  >
                    {agreed && (
                      <motion.svg
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        width="10" height="10" viewBox="0 0 10 10" fill="none"
                      >
                        <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                      </motion.svg>
                    )}
                  </div>
                  <span className="text-sm text-slate leading-relaxed">
                    I agree to TresVista's{' '}
                    <a href="#" className="text-tvblue hover:underline">Privacy Policy</a>{' '}
                    and consent to being contacted regarding my inquiry.
                  </span>
                </label>

                <motion.button
                  type="submit"
                  disabled={formState === 'loading'}
                  whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(27,79,190,0.35)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-tvblue text-white font-semibold rounded-xl text-sm transition-all duration-200 disabled:opacity-70"
                >
                  {formState === 'loading' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>Send Message <ArrowRight size={16} /></>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
