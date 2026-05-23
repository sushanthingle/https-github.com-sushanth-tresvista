import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TresVista — Enterprise Intelligence Orchestration',
  description: 'Combining advisory, technology infrastructure, and execution to orchestrate workflows across the enterprise.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-white text-navy overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
