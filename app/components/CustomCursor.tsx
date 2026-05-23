'use client'
import { useEffect, useState } from 'react'
import { useMotionValue, useSpring, motion } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  /* tight spring — follows closely, no trailing lag */
  const sx = useSpring(mx, { stiffness: 500, damping: 32, mass: 0.3 })
  const sy = useSpring(my, { stiffness: 500, damping: 32, mass: 0.3 })

  useEffect(() => {
    const move  = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); setVisible(true) }
    const down  = () => setClicked(true)
    const up    = () => setClicked(false)
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    const hookHovers = () => {
      const els = document.querySelectorAll<HTMLElement>('a,button,[data-cursor],input,textarea,select')
      const on  = () => setHovered(true)
      const off = () => setHovered(false)
      els.forEach(el => { el.addEventListener('mouseenter', on); el.addEventListener('mouseleave', off) })
      return () => els.forEach(el => { el.removeEventListener('mouseenter', on); el.removeEventListener('mouseleave', off) })
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup',   up)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)

    const cleanup = hookHovers()
    const obs = new MutationObserver(hookHovers)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup',   up)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
      cleanup()
      obs.disconnect()
    }
  }, [mx, my])

  const dotSize  = clicked ? 5  : hovered ? 10 : 7
  const ringSize = clicked ? 22 : hovered ? 44 : 32

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block" aria-hidden>
      {/* dot */}
      <motion.div
        style={{
          x: sx, y: sy,
          translateX: '-50%', translateY: '-50%',
          position: 'fixed',
          width: dotSize, height: dotSize,
          borderRadius: '50%',
          background: '#1B4FBE',
          opacity: visible ? 1 : 0,
          transition: 'width 0.15s ease, height 0.15s ease, opacity 0.2s ease',
        }}
      />
      {/* ring — same spring, no lag */}
      <motion.div
        style={{
          x: sx, y: sy,
          translateX: '-50%', translateY: '-50%',
          position: 'fixed',
          width: ringSize, height: ringSize,
          borderRadius: '50%',
          border: hovered
            ? '1.5px solid rgba(27,79,190,0.65)'
            : '1px solid rgba(27,79,190,0.35)',
          opacity: visible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease, border 0.2s ease',
        }}
      />
    </div>
  )
}
