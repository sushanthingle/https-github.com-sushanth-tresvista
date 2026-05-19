'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'

/* ─── nav data ───────────────────────────────────────────────────── */
const MEGA_MENU = {
  tabs: [
    {
      label: 'Corporates',
      items: [
        { label: 'Public',          href: '/who-we-serve/corporates/public/' },
        { label: 'Private',         href: '/who-we-serve/corporates/private/' },
        { label: 'Entrepreneurs',   href: '/who-we-serve/corporates/entrepreneurs/' },
      ],
    },
    {
      label: 'Asset Managers',
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
      label: 'Advisers',
      items: [
        { label: 'Investment Banks',         href: '/who-we-serve/advisers/investment-banks/' },
        { label: 'Investment Consultants',   href: '/who-we-serve/advisers/investment-consultants/' },
        { label: 'Placement Agents',         href: '/who-we-serve/advisers/placement-agents/' },
      ],
    },
  ],
}

const navItems = [
  { label: 'About Us',      href: '/au/',            dropdown: null,   mega: false },
  { label: 'Our Solutions', href: '/our-solution/',  dropdown: null,   mega: false },
  { label: 'Who We Serve',  href: '#',               dropdown: null,   mega: true  },
  {
    label: 'Insights', href: '#', mega: false,
    dropdown: [
      { label: 'TresVista Talk',        href: '/tresvista-talk/' },
      { label: 'TresVista Perspective', href: '/tresvista-perspective/' },
      { label: 'Case Studies',          href: '/case-studies/' },
    ],
  },
  {
    label: 'Careers', href: '#', mega: false,
    dropdown: [
      { label: 'Many Faces One TresVista', href: '/many-faces-one-tresvista/' },
      { label: 'Explore Careers',          href: '/careers/' },
    ],
  },
  {
    label: 'Press Room', href: '#', mega: false,
    dropdown: [
      { label: 'Press Releases', href: '/press-releases/' },
      { label: 'In The News',    href: '/in-the-news/' },
      { label: 'Sponsorships',   href: '/sponsorships/' },
    ],
  },
]

/* ─── mega-menu panel ────────────────────────────────────────────── */
function MegaMenu({ activeTab, onTabChange }: { activeTab: number; onTabChange(i: number): void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[640px] bg-white rounded-2xl shadow-[0_12px_48px_rgba(7,18,43,0.14)] border border-navy/6 overflow-hidden"
    >
      {/* tab strip */}
      <div className="flex border-b border-navy/6">
        {MEGA_MENU.tabs.map((tab, i) => (
          <button
            key={tab.label}
            onMouseEnter={() => onTabChange(i)}
            onClick={() => onTabChange(i)}
            className={`flex-1 px-5 py-3.5 text-[12px] font-semibold tracking-wide transition-colors duration-150 ${
              activeTab === i
                ? 'text-tvblue bg-tvblue/5 border-b-2 border-tvblue'
                : 'text-navy/50 hover:text-navy hover:bg-navy/3 border-b-2 border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.14 }}
          className="grid grid-cols-2 gap-1 p-4"
        >
          {MEGA_MENU.tabs[activeTab].items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm text-navy/65 hover:text-navy hover:bg-surface transition-colors duration-150 group"
            >
              <span className="w-1 h-1 rounded-full bg-tvblue/40 group-hover:bg-tvblue transition-colors flex-shrink-0" />
              {item.label}
            </a>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── navbar ─────────────────────────────────────────────────────── */
export default function NavbarV2() {
  const [scrolled,     setScrolled]     = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [megaTab,      setMegaTab]      = useState(0)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [mobileWhoOpen, setMobileWhoOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  function openMenu(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenDropdown(label)
  }
  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-white/97 backdrop-blur-xl shadow-[0_1px_0_rgba(7,18,43,0.07)] border-b border-navy/5'
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">

        <a href="/" className="flex-shrink-0">
          <img src="/logo-dark.svg" alt="TresVista" className="h-9 w-auto" />
        </a>

        {/* desktop nav */}
        <ul className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => openMenu(item.label)}
              onMouseLeave={scheduleClose}
            >
              <a
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 text-navy/60 hover:text-navy hover:bg-navy/4"
              >
                {item.label}
                {(item.dropdown || item.mega) && (
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`}
                  />
                )}
              </a>

              <AnimatePresence>
                {/* mega menu — Who We Serve */}
                {item.mega && openDropdown === item.label && (
                  <MegaMenu activeTab={megaTab} onTabChange={setMegaTab} />
                )}

                {/* standard dropdown */}
                {item.dropdown && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-1.5 w-56 bg-white rounded-2xl shadow-[0_8px_32px_rgba(7,18,43,0.12)] border border-navy/5 overflow-hidden"
                  >
                    {item.dropdown.map((sub) => (
                      <a key={sub.label} href={sub.href}
                        className="block px-5 py-3 text-sm text-navy/65 hover:text-navy hover:bg-surface transition-colors duration-150 border-b border-navy/4 last:border-0">
                        {sub.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <motion.a
            href="/contact-us/"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-tvblue transition-colors duration-250"
          >
            Contact Us
          </motion.a>
        </div>

        <button
          className="lg:hidden p-2 rounded-lg text-navy"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="lg:hidden bg-white border-t border-navy/5 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.mega ? (
                    <>
                      <button
                        className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-navy/65 hover:text-navy rounded-lg hover:bg-surface transition-colors"
                        onClick={() => setMobileWhoOpen(!mobileWhoOpen)}
                      >
                        {item.label}
                        <ChevronDown size={13} className={`transition-transform ${mobileWhoOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileWhoOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden pl-4"
                          >
                            {MEGA_MENU.tabs.map((tab) => (
                              <div key={tab.label} className="mb-2">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-navy/30 px-3 py-1">{tab.label}</p>
                                {tab.items.map((sub) => (
                                  <a key={sub.label} href={sub.href}
                                    className="block px-3 py-2 text-sm text-navy/55 hover:text-navy rounded-lg hover:bg-surface transition-colors"
                                    onClick={() => setMobileOpen(false)}>
                                    {sub.label}
                                  </a>
                                ))}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a href={item.href}
                      className="block px-3 py-3 text-sm font-medium text-navy/65 hover:text-navy rounded-lg hover:bg-surface transition-colors"
                      onClick={() => setMobileOpen(false)}>
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
              <a href="/contact-us/"
                className="mt-3 px-5 py-3 bg-navy text-white text-sm font-semibold rounded-xl text-center"
                onClick={() => setMobileOpen(false)}>
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
