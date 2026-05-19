import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'TresVista — Enterprise Intelligence Orchestration',
  description: 'Combining advisory, technology infrastructure, and execution to orchestrate workflows across the enterprise.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-white text-navy overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
