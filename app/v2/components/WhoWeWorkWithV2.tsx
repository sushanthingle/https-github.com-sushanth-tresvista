'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const COLUMNS = [
  {
    category: 'Corporates',
    accent: '#00327B',
    items: [
      { label: 'Public',        href: '/who-we-serve/corporates/public/' },
      { label: 'Private',       href: '/who-we-serve/corporates/private/' },
      { label: 'Entrepreneurs', href: '/who-we-serve/corporates/entrepreneurs/' },
    ],
  },
  {
    category: 'Asset Managers',
    accent: '#F6B343',
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
    accent: '#00327B',
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
    <section id="who-we-work-with" ref={ref} className="relative bg-white py-28 lg:py-40 overflow-hidden">

      <motion.div
        className="absolute left-0 right-0 h-px top-0 pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(7,18,43,0.07) 30%, rgba(7,18,43,0.07) 70%, transparent)' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-tvblue text-xs font-bold tracking-[0.22em] uppercase">04</span>
              <span className="h-px w-8 bg-tvblue/40 block" />
              <span className="text-navy/30 text-xs font-bold tracking-[0.18em] uppercase">Who We Work With</span>
            </div>
            <h2 className="text-[clamp(2.4rem,5vw,4.8rem)] font-black text-navy leading-[0.95] tracking-tight">
              Who We Work With.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.7 }}
            className="text-navy/35 text-[11px] font-bold tracking-[0.18em] uppercase leading-relaxed max-w-[380px]"
          >
            We orchestrate the intelligence system for
          </motion.p>
        </div>

        {/* 3-column grid */}
        <div className="grid sm:grid-cols-3 gap-px bg-navy/6 rounded-2xl overflow-hidden mb-20">
          {COLUMNS.map(({ category, accent, items }, ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 + ci * 0.1, duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
              className="group relative bg-white p-8 lg:p-10 overflow-hidden"
            >
              {/* top accent bar — scaleX reveal on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
                <motion.div
                  className="absolute inset-0 origin-left"
                  style={{ backgroundColor: accent }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                />
              </div>

              <h3 className="text-[13px] font-black uppercase tracking-[0.16em] mb-6"
                style={{ color: accent }}>
                {category}
              </h3>

              <ul className="space-y-1">
                {items.map(({ label, href }, i) => (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + ci * 0.08 + i * 0.04, duration: 0.45 }}
                  >
                    <a href={href}
                      className="flex items-center gap-3 py-2.5 text-sm text-navy/55 hover:text-navy border-b border-navy/5 last:border-0 transition-colors duration-150 group/item"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-200"
                        style={{ background: 'rgba(7,18,43,0.15)' }}
                      />
                      <span className="group-hover/item:translate-x-0.5 transition-transform duration-150">
                        {label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* industry tiles */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px flex-1 bg-navy/6" />
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-navy/25">
              Delivering real impact for your unique needs
            </span>
            <span className="h-px flex-1 bg-navy/6" />
          </div>

          <div className="flex flex-wrap gap-2.5">
            {INDUSTRY_TILES.map((tile, i) => (
              <motion.span
                key={tile}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.55 + i * 0.03, duration: 0.35 }}
                className="px-4 py-2 text-[12px] font-semibold rounded-full border border-navy/10 text-navy/45 hover:border-tvblue/40 hover:text-navy/75 hover:bg-tvblue/4 transition-all duration-200 cursor-default"
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
