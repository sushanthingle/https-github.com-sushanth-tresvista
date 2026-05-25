'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'About Us',      href: '/au/',              dropdown: null },
  { label: 'Our Solutions', href: '/our-solution/',     dropdown: null },
  { label: 'Who We Serve',  href: '#who-we-work-with',  dropdown: ['Private Equity', 'Investment Banks', 'Corporates & Hedge Funds'] },
  { label: 'Insights',      href: '#',                  dropdown: ['TresVista Talk', 'TresVista Perspective', 'Case Studies'] },
  { label: 'Careers',       href: '#',                  dropdown: ['Many Faces One TresVista', 'Explore Careers'] },
  { label: 'Press Room',    href: '#',                  dropdown: ['Press Releases', 'In The News', 'Sponsorships'] },
]

export default function NavbarV2() {
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src="/logo-white.svg" alt="TresVista" className="h-8 w-auto" />
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a
                href={item.href}
                className="flex items-center gap-1 px-3.5 py-2 text-[13px] text-[#979797] hover:text-white transition-colors duration-200 rounded-[12px] hover:bg-white/5"
              >
                {item.label}
                {item.dropdown && (
                  <ChevronDown size={11} className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                )}
              </a>

              <AnimatePresence>
                {item.dropdown && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-1.5 w-52 bg-[#111111] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                  >
                    {item.dropdown.map((sub) => (
                      <a
                        key={sub}
                        href="#"
                        className="block px-4 py-3 text-[13px] text-[#979797] hover:text-white hover:bg-white/5 transition-colors duration-150 border-b border-white/5 last:border-0"
                      >
                        {sub}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex">
          <a
            href="#contact"
            className="px-4 py-2 bg-white text-black text-[13px] font-semibold rounded-[8px] hover:bg-[#d1ffca] transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile burger */}
        <button className="lg:hidden p-2 text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
            className="lg:hidden bg-[#111111] border-t border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3 py-3 text-sm text-[#979797] hover:text-white rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-3 px-5 py-3 bg-white text-black text-sm font-semibold rounded-[8px] text-center"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
