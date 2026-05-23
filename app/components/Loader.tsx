'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const id = setTimeout(() => setShow(false), 2300)
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
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* ── logo mark ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col items-center gap-7"
          >
            <svg width="76" height="68" viewBox="0 0 76 68" fill="none">
              <defs>
                <clipPath id="ll"><rect x="0"  y="0" width="38" height="68"/></clipPath>
                <clipPath id="lr"><rect x="38" y="0" width="38" height="68"/></clipPath>
              </defs>

              {/* left-half fill — blue */}
              <motion.polygon
                points="38,2 74,66 2,66"
                fill="#1B4FBE"
                clipPath="url(#ll)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.35 }}
              />
              {/* right-half fill — orange */}
              <motion.polygon
                points="38,2 74,66 2,66"
                fill="#EF8014"
                clipPath="url(#lr)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.78, duration: 0.35 }}
              />

              {/* stroke outline that draws in then fades once fills appear */}
              <motion.path
                d="M 38 2 L 74 66 L 2 66 Z"
                fill="none"
                stroke="rgba(255,255,255,0.70)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{
                  pathLength: { delay: 0.05, duration: 0.75, ease: 'easeInOut' },
                  opacity:    { delay: 0.75, duration: 0.25, times: [0, 0.8, 1] },
                }}
              />
            </svg>

            {/* wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.88, duration: 0.45 }}
              className="text-center"
            >
              <p className="text-white text-sm font-semibold tracking-[0.38em] uppercase">
                TresVista
              </p>
              <p className="text-white/28 text-[9px] tracking-[0.22em] uppercase mt-1.5">
                Enterprise Intelligence Orchestration
              </p>
            </motion.div>
          </motion.div>

          {/* ── progress bar at bottom ── */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/8">
            <motion.div
              className="h-full bg-tvblue"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.2, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
