'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)

  const sx = useSpring(mx, { stiffness: 220, damping: 24, mass: 0.5 })
  const sy = useSpring(my, { stiffness: 220, damping: 24, mass: 0.5 })

  // Lagged ring — heavier spring for trail effect
  const rx = useSpring(mx, { stiffness: 90, damping: 18, mass: 1 })
  const ry = useSpring(my, { stiffness: 90, damping: 18, mass: 1 })

  const rafRef = useRef<number>(0)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const down  = () => setClicked(true)
    const up    = () => setClicked(false)
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    const trackHover = () => {
      const els = document.querySelectorAll<HTMLElement>(
        'a, button, [data-cursor="pointer"], input, textarea, select, label[for]'
      )
      const on  = () => setHovered(true)
      const off = () => setHovered(false)
      els.forEach(el => {
        el.addEventListener('mouseenter', on)
        el.addEventListener('mouseleave', off)
      })
      return () => els.forEach(el => {
        el.removeEventListener('mouseenter', on)
        el.removeEventListener('mouseleave', off)
      })
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup',   up)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)

    const cleanup = trackHover()
    const obs = new MutationObserver(trackHover)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup',   up)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
      cleanup()
      obs.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [mx, my, visible])

  const dotSize   = clicked ? 6  : hovered ? 10 : 8
  const ringSize  = clicked ? 28 : hovered ? 48 : 36
  const ringBorder = hovered ? '1.5px solid rgba(46,120,232,0.85)' : '1.5px solid rgba(46,120,232,0.55)'

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
      {/* inner dot — tracks exactly */}
      <motion.div
        style={{
          x: sx,
          y: sy,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          width:  dotSize,
          height: dotSize,
          borderRadius: '50%',
          background: '#2E78E8',
          mixBlendMode: 'difference',
          opacity: visible ? 1 : 0,
          transition: 'width 0.18s ease, height 0.18s ease, opacity 0.25s ease',
          boxShadow: '0 0 8px rgba(46,120,232,0.8)',
        }}
      />

      {/* outer ring — spring-lagged */}
      <motion.div
        style={{
          x: rx,
          y: ry,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          width:  ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: ringBorder,
          mixBlendMode: 'difference',
          opacity: visible ? 0.8 : 0,
          transition: 'width 0.22s ease, height 0.22s ease, border 0.18s ease, opacity 0.25s ease',
          backdropFilter: hovered ? 'blur(2px)' : 'none',
        }}
      />
    </div>
  )
}
