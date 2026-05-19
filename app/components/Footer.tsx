'use client'
import { motion } from 'framer-motion'
import { Linkedin, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  'Our Solution': [{ label: 'Enterprise Intelligence Orchestration (EIO)', href: '#eio' }],
  'Insights': [
    { label: 'TresVista Talk',        href: '#' },
    { label: 'TresVista Perspective', href: '#' },
    { label: 'Case Studies',          href: '#' },
  ],
  'Policies': [
    { label: 'Web Policy',   href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use', href: '#' },
    { label: 'CSR Policy',   href: '#' },
  ],
}

/* Inline SVG brand icons — lucide removed these as deprecated */
function YtIcon({ className }: { className?: string; size?: number }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5v-7l6.25 3.5-6.25 3.5z"/>
    </svg>
  )
}

function IgIcon({ className }: { className?: string; size?: number }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  )
}

const socials = [
  { icon: YtIcon,   href: '#', label: 'YouTube'   },
  { icon: Linkedin, href: '#', label: 'LinkedIn'  },
  { icon: IgIcon,   href: '#', label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer className="bg-[#030B1A] text-white/50 relative overflow-hidden">
      {/* subtle top border gradient */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-tvblue/40 to-transparent" />

      {/* ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #1B4FBE 0%, transparent 70%)' }} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-16 relative z-10">
        <div className="grid lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-14">

          {/* brand col */}
          <div>
            {/* Full logo with tagline — white version for dark footer */}
            <div className="mb-5">
              <img
                src="/logo-white.svg"
                alt="TresVista"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-[260px] mb-6">
              Enterprise Intelligence Orchestration — combining advisory, technology infrastructure, and human execution at scale.
            </p>
            {/* socials */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center hover:bg-tvblue/20 hover:border-tvblue/30 transition-colors duration-200"
                >
                  <Icon size={15} className="text-white/60 hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* nav cols */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white/30 text-xs font-bold uppercase tracking-[0.14em] mb-5">{heading}</h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200 group inline-flex items-center gap-1"
                    >
                      {label}
                      {label.length > 20 && (
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* bottom bar */}
        <div className="border-t border-white/[0.06] pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">© 2025 TresVista. All Rights Reserved.</p>
          <a
            href="mailto:reachus@tresvista.com"
            className="text-xs text-white/35 hover:text-tvblue-light transition-colors duration-200"
          >
            reachus@tresvista.com
          </a>
        </div>
      </div>
    </footer>
  )
}
