'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'

const navItems = [
  { label: 'About Us',      href: '/au/',             dropdown: null },
  { label: 'Our Solutions', href: '/our-solution/',    dropdown: null },
  {
    label: 'Who We Serve', href: '#who-we-work-with',
    dropdown: ['Private Equity', 'Investment Banks', 'Corporates & Hedge Funds'],
  },
  {
    label: 'Insights', href: '#',
    dropdown: ['TresVista Talk', 'TresVista Perspective', 'Case Studies'],
  },
  {
    label: 'Careers', href: '#',
    dropdown: ['Many Faces One TresVista', 'Explore Careers'],
  },
  {
    label: 'Press Room', href: '#',
    dropdown: ['Press Releases', 'In The News', 'Sponsorships'],
  },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen,   setMobileOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_2px_32px_rgba(7,18,43,0.10)] border-b border-navy/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src="/logo-white.svg"
            alt="TresVista"
            className={`h-9 w-auto transition-opacity duration-300 ${scrolled ? 'opacity-0 absolute' : 'opacity-100'}`}
          />
          <img
            src="/logo-dark.svg"
            alt="TresVista"
            className={`h-9 w-auto transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0 absolute'}`}
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a
                href={item.href}
                className={`flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 ${
                  scrolled
                    ? 'text-navy/65 hover:text-navy hover:bg-surface'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
                {item.dropdown && (
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`}
                  />
                )}
              </a>

              <AnimatePresence>
                {item.dropdown && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-[0_8px_40px_rgba(7,18,43,0.12)] border border-navy/5 overflow-hidden"
                  >
                    {item.dropdown.map((sub) => (
                      <a
                        key={sub}
                        href="#"
                        className="block px-5 py-3 text-sm text-navy/65 hover:text-navy hover:bg-surface transition-colors duration-150 border-b border-navy/4 last:border-0"
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
        <div className="hidden lg:flex items-center">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 bg-tvblue text-white text-sm font-semibold rounded-lg hover:bg-tvblue-light transition-colors duration-200 shadow-[0_4px_14px_rgba(0,50,123,0.30)]"
          >
            Contact Us
          </motion.a>
        </div>

        {/* Mobile burger */}
        <button
          className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-navy' : 'text-white'}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="lg:hidden bg-white border-t border-navy/5 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3 py-3 text-sm font-medium text-navy/65 hover:text-navy hover:bg-surface rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-3 px-5 py-3 bg-tvblue text-white text-sm font-semibold rounded-lg text-center"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
