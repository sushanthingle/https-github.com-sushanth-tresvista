'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'

// YouTube video ID — extracted from the watch URL
const YT_ID = 'Hgg7M3kSqyE'

const LINES = ['Where AI Meets', 'Human Command.']

export default function VideoHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Video scales slightly as you scroll — classic parallax Ken Burns effect
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.15])
  // Content drifts upward and fades out as you scroll away
  const contentY  = useTransform(scrollYProgress, [0, 0.6], ['0%', '-22%'])
  const contentOp = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[680px] overflow-hidden bg-[#020811] flex items-center justify-center"
    >
      {/* ── YouTube background video ── */}
      {/* Scale wrapper gives the Ken-Burns parallax effect */}
      <motion.div
        className="absolute inset-0 origin-center pointer-events-none"
        style={{ scale: videoScale }}
      >
        {/*
          YouTube embed with autoplay + mute + loop + no controls.
          The iframe is intentionally oversized (177vw wide / 100vh tall min)
          so the 16:9 video always covers the full viewport with object-cover behaviour.
        */}
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            transform: 'translate(-50%, -50%)',
            width: 'max(177.78vh, 100vw)',
            height: 'max(100vh, 56.25vw)',
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=${YT_ID}&enablejsapi=1`}
            allow="autoplay; encrypted-media"
            title="Hero background video"
            className="w-full h-full border-0"
            style={{ pointerEvents: 'none' }}
          />
        </div>
      </motion.div>

      {/* ── overlay stack ── */}
      {/* base dark tint */}
      <div className="absolute inset-0 bg-[#020811]/50 pointer-events-none" />
      {/* cinematic vignette gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 30%, rgba(2,8,17,0.75) 100%)',
        }}
      />
      {/* bottom fade to white — seamless into WhoWeAre */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

      {/* subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div className="noise absolute inset-0 pointer-events-none" />

      {/* ── hero content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOp }}
        className="relative z-10 text-center px-6 max-w-[1080px] mx-auto"
      >
        {/* eyebrow with animated lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <motion.span
            className="block h-px bg-white/35"
            initial={{ width: 0 }}
            animate={{ width: 36 }}
            transition={{ delay: 0.55, duration: 0.55 }}
          />
          <span className="text-white/48 text-[11px] font-semibold tracking-[0.26em] uppercase">
            Enterprise Intelligence Orchestration
          </span>
          <motion.span
            className="block h-px bg-white/35"
            initial={{ width: 0 }}
            animate={{ width: 36 }}
            transition={{ delay: 0.55, duration: 0.55 }}
          />
        </motion.div>

        {/* headline — Apple-style clip / line reveal */}
        <div className="mb-10">
          {LINES.map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.5 + i * 0.16,
                  duration: 1.05,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                <span
                  className={`block text-[clamp(3.8rem,9.2vw,10rem)] font-black leading-[0.93] tracking-tight ${
                    i === LINES.length - 1 ? 'gradient-text' : 'text-white'
                  }`}
                >
                  {line}
                </span>
              </motion.div>
            </div>
          ))}
        </div>

        {/* sub */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.9, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="text-white/58 text-lg lg:text-xl max-w-[520px] mx-auto leading-relaxed mb-12"
        >
          Combining advisory, technology infrastructure, and human execution —
          engineered for enterprises that demand precision at scale.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.75 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#eio"
            whileHover={{ scale: 1.04, boxShadow: '0 18px 48px rgba(27,79,190,0.55)' }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center justify-center gap-2.5 px-9 py-[18px] bg-tvblue text-white font-semibold rounded-2xl text-sm overflow-hidden group"
          >
            <motion.span
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.17) 50%, transparent 65%)',
              }}
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.48 }}
            />
            <span className="relative z-10">Explore the EIO Model</span>
            <ArrowRight
              size={16}
              className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.42)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 px-9 py-[18px] border border-white/22 text-white/80 hover:text-white hover:border-white/40 font-medium rounded-2xl text-sm backdrop-blur-sm transition-all duration-200"
          >
            Connect Today
          </motion.a>
        </motion.div>
      </motion.div>

      {/* ── scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1.2 }}
        className="absolute bottom-[52px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={15} className="text-white/28" />
        </motion.div>
        <span className="text-white/22 text-[9px] tracking-[0.28em] uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}
