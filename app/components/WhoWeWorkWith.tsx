'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
import { Building2, TrendingUp, Briefcase, ChevronRight } from 'lucide-react'

const categories = [
  {
    id: 0,
    icon: Building2,
    title: 'Corporates',
    color: '#1B4FBE',
    sub: 'Driving enterprise transformation across corporate structures',
    types: ['Public Companies', 'Private Companies', 'Entrepreneurs'],
    tags: ['Portfolio Companies', 'Publicly Listed Companies'],
    desc: 'From large-cap enterprises to founder-led businesses, we embed within your operations to deliver data infrastructure, AI governance, and execution — at the speed your business demands.',
  },
  {
    id: 1,
    icon: TrendingUp,
    title: 'Asset Managers',
    color: '#EF8014',
    sub: 'Full investment lifecycle execution across every strategy',
    types: [
      'Private Equity', 'Public Equity', 'Family Office', 'Real Estate',
      'Private Credit', 'Public Credit', 'Secondaries', 'Venture Capital',
    ],
    tags: ['Institutional LPs', 'Wealth Management'],
    desc: 'We serve the full spectrum of alternative and traditional asset managers — from deal sourcing and portfolio analytics to investor reporting and operational efficiency.',
  },
  {
    id: 2,
    icon: Briefcase,
    title: 'Advisors',
    color: '#2E78E8',
    sub: 'Empowering advisory firms with embedded intelligence',
    types: ['Investment Banks', 'Consultants', 'Investment Consultants', 'Placement Agents'],
    tags: ['Transaction Advisory', 'Strategic Consulting'],
    desc: 'Advisory firms rely on TresVista to extend their teams with domain expertise — delivering research, financial models, and data outputs that meet the highest standards of institutional quality.',
  },
]

const MARQUEE_A = [
  'Private Equity', 'Secondaries', 'Venture Capital', 'Investment Banks',
  'Private Credit', 'Family Offices', 'Institutional LPs', 'Public Equity',
  'Public Credit', 'Wealth Management', 'Placement Agents', 'Transaction Advisory',
  'Strategic Consulting', 'Portfolio Companies', 'Publicly Listed Companies',
]
const MARQUEE_B = [...MARQUEE_A].reverse()

export default function WhoWeWorkWith() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)

  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const cardsInView  = useInView(cardsRef,  { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgShift = useTransform(scrollYProgress, [0, 1], ['0%', '3%'])

  return (
    <section
      ref={sectionRef}
      id="who-we-work-with"
      className="relative bg-[#F4F7FB] py-28 lg:py-40 overflow-hidden"
    >
      {/* parallax background accent */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgShift }}
      >
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.045]"
          style={{ background: 'radial-gradient(circle, #1B4FBE 0%, transparent 65%)' }}
        />
        <div
          className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full opacity-[0.035]"
          style={{ background: 'radial-gradient(circle, #EF8014 0%, transparent 65%)' }}
        />
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* ── section header — clip reveal ── */}
        <div ref={headerRef} className="mb-20 lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div>
            {/* eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="w-8 h-[2px] bg-tvblue block" />
              <span className="text-tvblue text-xs font-bold tracking-[0.18em] uppercase">Our Clients</span>
            </motion.div>

            <div style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '105%' }}
                animate={headerInView ? { y: 0 } : {}}
                transition={{ delay: 0.08, duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
              >
                <h2 className="text-[clamp(2.8rem,5.5vw,5.5rem)] font-bold text-navy leading-[0.97] tracking-tight">
                  Who We{' '}
                  <span className="gradient-text">Work With</span>
                </h2>
              </motion.div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="text-navy/55 text-[15px] leading-relaxed max-w-[380px] mt-6 lg:mt-0"
          >
            Across industries, asset classes, and geographies — serving organisations
            that demand precision, speed, and accountability.
          </motion.p>
        </div>

        {/* ── category cards ── */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-5 mb-16">
          {categories.map((cat, idx) => {
            const Icon = cat.icon
            const isOpen = expanded === cat.id
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 40 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.13, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                layout
                className="bg-white rounded-2xl border border-white/80 overflow-hidden cursor-pointer group"
                style={{
                  boxShadow: isOpen
                    ? `0 20px 60px ${cat.color}18, 0 2px 8px rgba(7,18,43,0.06)`
                    : '0 2px 16px rgba(7,18,43,0.05)',
                  borderColor: isOpen ? `${cat.color}30` : undefined,
                  transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                }}
                onClick={() => setExpanded(isOpen ? null : cat.id)}
                whileHover={{
                  y: -4,
                  boxShadow: `0 24px 64px ${cat.color}14, 0 4px 20px rgba(7,18,43,0.08)`,
                }}
              >
                {/* top accent bar that grows on hover */}
                <motion.div
                  className="h-[3px]"
                  style={{ background: cat.color }}
                  initial={{ scaleX: 0.3, opacity: 0.5 }}
                  animate={cardsInView ? { scaleX: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.4 + idx * 0.12, duration: 0.6 }}
                />

                <div className="p-7 lg:p-8">
                  {/* icon + chevron */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${cat.color}12`, border: `1px solid ${cat.color}25` }}
                    >
                      <Icon size={22} style={{ color: cat.color }} />
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <ChevronRight size={18} className="text-navy/30 mt-1" />
                    </motion.div>
                  </div>

                  <h3 className="text-navy font-bold text-xl mb-2">{cat.title}</h3>
                  <p className="text-navy/50 text-sm mb-6 leading-relaxed">{cat.sub}</p>

                  {/* type pills */}
                  <div className="flex flex-wrap gap-2">
                    {cat.types.slice(0, 4).map(t => (
                      <span
                        key={t}
                        className="text-xs px-3 py-[6px] rounded-full font-medium"
                        style={{ background: `${cat.color}10`, color: cat.color }}
                      >
                        {t}
                      </span>
                    ))}
                    {cat.types.length > 4 && (
                      <span className="text-xs px-3 py-[6px] rounded-full font-medium bg-[#F4F7FB] text-navy/45">
                        +{cat.types.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* expanded detail */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.76, 0, 0.24, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pt-6 border-t border-navy/[0.06]">
                          <p className="text-navy/55 text-sm leading-relaxed mb-4">{cat.desc}</p>
                          <div className="flex flex-wrap gap-2">
                            {[...cat.tags, ...cat.types.slice(4)].map(t => (
                              <span
                                key={t}
                                className="text-xs px-3 py-[6px] rounded-full font-medium"
                                style={{ background: `${cat.color}10`, color: cat.color }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── client type marquees ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={cardsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="rounded-2xl border border-white/80 bg-white overflow-hidden"
          style={{ boxShadow: '0 2px 16px rgba(7,18,43,0.05)' }}
        >
          <div className="px-8 pt-7 pb-2">
            <p className="text-[10px] font-bold text-navy/35 uppercase tracking-[0.18em]">
              All client types we serve
            </p>
          </div>

          {/* marquee row A — left to right */}
          <div className="relative overflow-hidden py-3">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <motion.div
              className="flex whitespace-nowrap"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              {[...MARQUEE_A, ...MARQUEE_A].map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-6 flex-shrink-0 text-sm font-medium text-navy/50 px-4"
                >
                  {item}
                  <span className="w-[3px] h-[3px] rounded-full bg-tvblue/35 flex-shrink-0" />
                </span>
              ))}
            </motion.div>
          </div>

          {/* marquee row B — right to left */}
          <div className="relative overflow-hidden py-3 pb-7">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <motion.div
              className="flex whitespace-nowrap"
              animate={{ x: ['-50%', '0%'] }}
              transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            >
              {[...MARQUEE_B, ...MARQUEE_B].map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-6 flex-shrink-0 text-sm font-medium text-navy/38 px-4"
                >
                  {item}
                  <span className="w-[3px] h-[3px] rounded-full bg-tvorange/35 flex-shrink-0" />
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
