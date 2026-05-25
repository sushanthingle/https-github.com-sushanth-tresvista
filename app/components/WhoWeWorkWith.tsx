'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
import { Building2, TrendingUp, Briefcase, ChevronRight, ArrowRight } from 'lucide-react'

const BLUE = '#00327B'

type TypeDetail = { desc: string; href: string }

const categories = [
  {
    id: 0, icon: Building2, title: 'Corporates', color: BLUE,
    sub: 'Driving enterprise transformation across corporate structures',
    types: ['Public Companies', 'Private Companies', 'Entrepreneurs'],
    typeDetails: {
      'Public Companies': {
        desc: 'We support publicly listed organisations with financial reporting automation, data governance, and AI-powered operational workflows.',
        href: '/sectors/public-companies',
      },
      'Private Companies': {
        desc: 'From mid-market to enterprise, we embed within private companies to drive efficiency through intelligent technology and expert human execution.',
        href: '/sectors/private-companies',
      },
      'Entrepreneurs': {
        desc: 'We help founder-led businesses build scalable data infrastructure and AI capabilities, from the ground up.',
        href: '/sectors/entrepreneurs',
      },
    } as Record<string, TypeDetail>,
  },
  {
    id: 1, icon: TrendingUp, title: 'Asset Managers', color: BLUE,
    sub: 'Full investment lifecycle execution across every strategy',
    types: [
      'Private Equity', 'Public Equity', 'Family Office', 'Real Estate',
      'Private Credit', 'Public Credit', 'Secondaries', 'Venture Capital',
    ],
    typeDetails: {
      'Private Equity': {
        desc: 'Deal sourcing, portfolio monitoring, fund administration, and LP reporting, with end-to-end execution for PE firms of every size.',
        href: '/sectors/private-equity',
      },
      'Public Equity': {
        desc: 'Research automation, quantitative analytics, and portfolio intelligence for long-only and long/short strategies.',
        href: '/sectors/public-equity',
      },
      'Family Office': {
        desc: 'Bespoke investment monitoring, consolidated reporting, and multi-asset portfolio operations tailored for family offices.',
        href: '/sectors/family-office',
      },
      'Real Estate': {
        desc: 'Property-level data management, fund performance tracking, and operational intelligence across real estate strategies.',
        href: '/sectors/real-estate',
      },
      'Private Credit': {
        desc: 'Credit underwriting support, loan monitoring, and portfolio reporting for direct lending and private credit funds.',
        href: '/sectors/private-credit',
      },
      'Public Credit': {
        desc: 'Fixed income research, credit analysis automation, and portfolio operations for investment-grade and high-yield strategies.',
        href: '/sectors/public-credit',
      },
      'Secondaries': {
        desc: 'Complex portfolio analysis, pricing support, and fund monitoring capabilities for secondary market specialists.',
        href: '/sectors/secondaries',
      },
      'Venture Capital': {
        desc: 'Portfolio company data aggregation, market intelligence, and operational reporting support for VC firms.',
        href: '/sectors/venture-capital',
      },
    } as Record<string, TypeDetail>,
  },
  {
    id: 2, icon: Briefcase, title: 'Advisors', color: BLUE,
    sub: 'Empowering advisory firms with embedded intelligence',
    types: ['Investment Banks', 'Consultants', 'Investment Consultants', 'Placement Agents'],
    typeDetails: {
      'Investment Banks': {
        desc: 'Research, financial modelling, and execution support for M&A advisory, capital markets, and coverage banking teams.',
        href: '/sectors/investment-banks',
      },
      'Consultants': {
        desc: 'Analysis, benchmarking, and primary research to support management consulting projects and client deliverables.',
        href: '/sectors/consultants',
      },
      'Investment Consultants': {
        desc: 'Manager research, portfolio analytics, and reporting infrastructure for investment consultants and OCIO platforms.',
        href: '/sectors/investment-consultants',
      },
      'Placement Agents': {
        desc: 'Investor research, marketing materials, and data operations to support fundraising and placement mandates.',
        href: '/sectors/placement-agents',
      },
    } as Record<string, TypeDetail>,
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
  const [expanded, setExpanded]     = useState<number | null>(null)
  const [selectedType, setSelectedType] = useState<{ catId: number; type: string } | null>(null)

  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)

  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const cardsInView  = useInView(cardsRef,  { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgShift = useTransform(scrollYProgress, [0, 1], ['0%', '3%'])

  function toggle(id: number) {
    if (expanded === id) {
      setExpanded(null)
      setSelectedType(null)
    } else {
      setExpanded(id)
      setSelectedType(null)
    }
  }

  function pickType(catId: number, type: string) {
    setSelectedType(prev =>
      prev?.catId === catId && prev?.type === type ? null : { catId, type }
    )
  }

  return (
    <section
      ref={sectionRef}
      id="who-we-work-with"
      className="relative bg-[#F4F7FB] py-28 lg:py-40 overflow-hidden"
    >
      {/* parallax accent */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgShift }}>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #1B4FBE 0%, transparent 65%)' }} />
        <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #1B4FBE 0%, transparent 65%)' }} />
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* section header */}
        <div ref={headerRef} className="mb-20 lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div>
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
                <h2 className="text-[clamp(2.2rem,3.8vw,3.8rem)] font-bold text-navy leading-[1.0] tracking-tight">
                  Who We Work With
                </h2>
              </motion.div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="text-navy/55 text-base leading-relaxed max-w-[380px] mt-6 lg:mt-0"
          >
            Across industries, asset classes, and geographies, serving organisations
            that demand precision, speed, and accountability.
          </motion.p>
        </div>

        {/* category cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-5 mb-16">
          {categories.map((cat, idx) => {
            const Icon   = cat.icon
            const isOpen = expanded === cat.id
            const detail = selectedType?.catId === cat.id
              ? cat.typeDetails[selectedType.type]
              : null

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 40 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.13, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                layout
                className="bg-white rounded-2xl border overflow-hidden"
                style={{
                  borderColor: isOpen ? `${BLUE}28` : 'rgba(255,255,255,0.80)',
                  boxShadow: isOpen
                    ? `0 20px 60px ${BLUE}14, 0 2px 8px rgba(7,18,43,0.06)`
                    : '0 2px 16px rgba(7,18,43,0.05)',
                  transition: 'box-shadow 0.3s, border-color 0.3s',
                }}
              >
                {/* colour accent bar */}
                <motion.div
                  className="h-[3px]"
                  style={{ background: BLUE }}
                  initial={{ scaleX: 0.3, opacity: 0.5 }}
                  animate={cardsInView ? { scaleX: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.4 + idx * 0.12, duration: 0.6 }}
                />

                {/* card header — always visible */}
                <button
                  className="w-full text-left p-7 lg:p-8"
                  onClick={() => toggle(cat.id)}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${BLUE}12`, border: `1px solid ${BLUE}25` }}
                    >
                      <Icon size={22} style={{ color: BLUE }} />
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <ChevronRight size={18} className="text-navy/30 mt-1" />
                    </motion.div>
                  </div>

                  <h3 className="text-navy font-bold text-xl mb-2">{cat.title}</h3>
                  <p className="text-navy/50 text-sm mb-5 leading-relaxed text-left">{cat.sub}</p>

                  {/* preview pills (collapsed state) */}
                  {!isOpen && (
                    <div className="flex flex-wrap gap-2">
                      {cat.types.slice(0, 3).map(t => (
                        <span key={t} className="text-xs px-3 py-[6px] rounded-full font-medium"
                          style={{ background: `${BLUE}10`, color: BLUE }}>
                          {t}
                        </span>
                      ))}
                      {cat.types.length > 3 && (
                        <span className="text-xs px-3 py-[6px] rounded-full font-medium bg-[#F4F7FB] text-navy/45">
                          +{cat.types.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </button>

                {/* expanded detail — subtab grid */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.76, 0, 0.24, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-7 lg:px-8 pb-7 lg:pb-8 border-t border-navy/[0.06] pt-5">

                        {/* all type tabs */}
                        <p className="text-[10px] font-bold text-navy/30 uppercase tracking-[0.16em] mb-3">
                          Select a focus area
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {cat.types.map(type => {
                            const isSelected = selectedType?.catId === cat.id && selectedType?.type === type
                            return (
                              <button
                                key={type}
                                onClick={() => pickType(cat.id, type)}
                                className="text-xs px-3 py-[7px] rounded-full font-semibold transition-all duration-200"
                                style={{
                                  background: isSelected ? BLUE : `${BLUE}0D`,
                                  color:      isSelected ? '#fff' : BLUE,
                                  border:     `1px solid ${isSelected ? BLUE : `${BLUE}25`}`,
                                }}
                              >
                                {type}
                              </button>
                            )
                          })}
                        </div>

                        {/* type description + link */}
                        <AnimatePresence mode="wait">
                          {detail && selectedType && (
                            <motion.div
                              key={selectedType.type}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.22 }}
                              className="rounded-xl p-4 mt-1"
                              style={{
                                background: `${BLUE}08`,
                                border: `1px solid ${BLUE}18`,
                              }}
                            >
                              <p className="text-navy/65 text-sm leading-relaxed mb-3">
                                {detail.desc}
                              </p>
                              <a
                                href={detail.href}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-150 group"
                                style={{ color: BLUE }}
                              >
                                Learn More
                                <ArrowRight size={12} className="transition-transform duration-150 group-hover:translate-x-0.5" />
                              </a>
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* marquee strip */}
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

          <div className="relative overflow-hidden py-3">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <motion.div
              className="flex whitespace-nowrap"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              {[...MARQUEE_A, ...MARQUEE_A].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-6 flex-shrink-0 text-sm font-medium text-navy/50 px-4">
                  {item}
                  <span className="w-[3px] h-[3px] rounded-full bg-tvblue/40 flex-shrink-0" />
                </span>
              ))}
            </motion.div>
          </div>

          <div className="relative overflow-hidden py-3 pb-7">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <motion.div
              className="flex whitespace-nowrap"
              animate={{ x: ['-50%', '0%'] }}
              transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            >
              {[...MARQUEE_B, ...MARQUEE_B].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-6 flex-shrink-0 text-sm font-medium text-navy/38 px-4">
                  {item}
                  <span className="w-[3px] h-[3px] rounded-full bg-tvblue/40 flex-shrink-0" />
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
