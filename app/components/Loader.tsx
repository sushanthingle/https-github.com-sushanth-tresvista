'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const id = setTimeout(() => setShow(false), 2600)
    return () => clearTimeout(id)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#07122B' }}
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* ── logo with shine sweep ── */}
          <div className="relative flex flex-col items-center gap-8">

            <motion.div
              className="relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.88, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            >
              {/* actual TresVista logo SVG */}
              <img
                src="/logo-white.svg"
                alt="TresVista"
                className="w-[280px] h-auto select-none"
                draggable={false}
              />

              {/* shimmer sweep */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
                }}
                initial={{ x: '-150%' }}
                animate={{ x: '200%' }}
                transition={{ delay: 0.7, duration: 0.9, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.45 }}
              className="text-white/28 text-[10px] tracking-[0.28em] uppercase font-medium"
            >
              Enterprise Intelligence Orchestration
            </motion.p>
          </div>

          {/* ── progress bar ── */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.06]">
            <motion.div
              className="h-full bg-tvblue"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.4, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
