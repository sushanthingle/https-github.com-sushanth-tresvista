'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const COLUMNS = [
  {
    category: 'Corporates',
    items: [
      { label: 'Public',        href: '/who-we-serve/corporates/public/' },
      { label: 'Private',       href: '/who-we-serve/corporates/private/' },
      { label: 'Entrepreneurs', href: '/who-we-serve/corporates/entrepreneurs/' },
    ],
  },
  {
    category: 'Asset Managers',
    items: [
      { label: 'Private Equity',  href: '/who-we-serve/asset-managers/private-equity/' },
      { label: 'Public Equity',   href: '/who-we-serve/asset-managers/public-equity/' },
      { label: 'Family Offices',  href: '/who-we-serve/asset-managers/family-offices/' },
      { label: 'Real Estate',     href: '/who-we-serve/asset-managers/real-estate/' },
      { label: 'Private Credit',  href: '/who-we-serve/asset-managers/private-credit/' },
      { label: 'Public Credit',   href: '/who-we-serve/asset-managers/public-credit/' },
      { label: 'Secondaries',     href: '/who-we-serve/asset-managers/secondaries/' },
      { label: 'Venture Capital', href: '/who-we-serve/asset-managers/venture-capital/' },
    ],
  },
  {
    category: 'Advisers',
    items: [
      { label: 'Investment Banks',       href: '/who-we-serve/advisers/investment-banks/' },
      { label: 'Investment Consultants', href: '/who-we-serve/advisers/investment-consultants/' },
      { label: 'Placement Agents',       href: '/who-we-serve/advisers/placement-agents/' },
    ],
  },
]

const INDUSTRY_TILES = [
  'Private Equity', 'Secondaries', 'Venture Capital', 'Investment Banks',
  'Private Credit', 'Family Offices', 'Institutional LPs', 'Public Equity',
  'Public Credit', 'Wealth Management', 'Placement Agents', 'Transaction Advisory',
  'Strategic Consulting', 'Portfolio Companies', 'Publicly Listed Companies',
]

export default function WhoWeWorkWithV2() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="who-we-work-with"
      ref={ref}
      style={{
        backgroundColor: '#000000',
        borderRadius: '64px 64px 0 0',
        marginTop: '-64px',
        position: 'relative',
        zIndex: 4,
      }}
      className="overflow-hidden py-24 lg:py-36"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <span
            className="text-[11px] font-bold tracking-[0.24em] uppercase"
            style={{ color: '#d1ffca', fontFamily: 'var(--font-ibm-plex-mono, monospace)' }}
          >
            03
          </span>
          <span className="h-px w-8 block" style={{ background: 'rgba(209,255,202,0.4)' }} />
          <span className="text-white/30 text-[11px] font-bold tracking-[0.18em] uppercase">Who We Work With</span>
        </motion.div>

        {/* Headline */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-16 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="text-white"
            style={{
              fontFamily: 'var(--font-bebas-neue, sans-serif)',
              fontSize: 'clamp(3.5rem, 7vw, 7rem)',
              lineHeight: 0.90,
              letterSpacing: '-0.025em',
            }}
          >
            WHO WE<br />WORK WITH.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/35 text-[13px] font-bold tracking-[0.16em] uppercase leading-relaxed max-w-[380px] flex items-end pb-2"
          >
            We orchestrate the intelligence system for the world's leading financial institutions and corporates.
          </motion.p>
        </div>

        {/* 3 white cards on black */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {COLUMNS.map(({ category, items }, ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12 + ci * 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="rounded-[32px] p-8 group relative overflow-hidden"
              style={{ backgroundColor: '#f3f3f3' }}
            >
              {/* Hover accent line */}
              <div
                className="absolute top-0 left-8 right-8 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ background: '#d1ffca' }}
              />

              <h3
                className="text-black mb-6"
                style={{
                  fontFamily: 'var(--font-bebas-neue, sans-serif)',
                  fontSize: '1.8rem',
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                }}
              >
                {category}
              </h3>

              <ul className="space-y-0">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="flex items-center gap-3 py-2.5 text-sm transition-colors duration-150 group/item"
                      style={{ color: '#444444', borderBottom: '1px solid rgba(0,0,0,0.07)' }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-200"
                        style={{ background: 'rgba(0,0,0,0.18)' }}
                      />
                      <span className="group-hover/item:text-black group-hover/item:translate-x-0.5 transition-all duration-150">
                        {label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Industry tiles */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/20">Industries We Serve</span>
            <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>
          <div className="flex flex-wrap gap-2.5">
            {INDUSTRY_TILES.map((tile, i) => (
              <motion.span
                key={tile}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.55 + i * 0.025, duration: 0.35 }}
                className="px-4 py-2 text-[12px] font-semibold rounded-full cursor-default transition-all duration-200"
                style={{
                  border: '1px solid rgba(255,255,255,0.10)',
                  color: 'rgba(255,255,255,0.35)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(209,255,202,0.35)'
                  el.style.color = 'rgba(255,255,255,0.65)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.10)'
                  el.style.color = 'rgba(255,255,255,0.35)'
                }}
              >
                {tile}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
