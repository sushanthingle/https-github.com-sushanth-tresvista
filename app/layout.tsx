import type { Metadata } from 'next'
import { Montserrat, Bebas_Neue, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  weight: ['400'],
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TresVista — Enterprise Intelligence Orchestration',
  description: 'Combining advisory, technology infrastructure, and execution to orchestrate workflows across the enterprise.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${bebasNeue.variable} ${ibmPlexMono.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-white text-navy overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
