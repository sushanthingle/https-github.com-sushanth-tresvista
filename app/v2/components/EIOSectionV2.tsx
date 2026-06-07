'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { Cpu, Users, Globe2, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

function hex2rgb(h: string) {
  return `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`
}

const PILLARS = [
  {
    id: 0, num: '01', label: 'Digital Transformation', icon: Cpu, color: '#00327B',
    tvTitle: 'Digital Transformation',
    tvDesc: 'Master data management, business intelligence, custom technology infrastructure, and workflow automation, built around how you operate.',
    dsTitle: 'One Interface for All Data',
    dsDesc: 'One interface for all your data sources, with on-demand queries grounded strictly in your data model.',
    pairs: [
      { tv: 'Scalable master data models designed for AI',    ds: 'One interface for all your data sources'           },
      { tv: 'Unified foundations for seamless data access',   ds: 'On-demand SQL, Python, and BI queries'             },
      { tv: 'Real-time visibility for decision-makers',       ds: 'Answers grounded strictly in your data model'      },
    ],
  },
  {
    id: 1, num: '02', label: 'Human In Command', icon: Users, color: '#347EF6',
    tvTitle: 'Human In Command',
    tvDesc: 'Deep-domain experts driving tasks, managing migrations, and guaranteeing accuracy at every stage of the workflow.',
    dsTitle: 'Agentic Execution',
    dsDesc: 'Complex multi-step process execution with full audit trails and mandatory human oversight before every output goes live.',
    pairs: [
      { tv: 'Deep-domain experts driving tasks',              ds: 'Complex, multi-step process execution'             },
      { tv: 'Seamless migrations and platform management',    ds: 'Full audit trails for every agent action'          },
      { tv: 'Human validation guaranteeing accuracy',         ds: 'Mandatory human oversight before outputs go live'  },
    ],
  },
  {
    id: 2, num: '03', label: 'Operational Excellence', icon: Globe2, color: '#00327B',
    tvTitle: 'Operational Excellence',
    tvDesc: 'Continuous evaluation of AI models, vendors, and tools so your AI stack evolves with the market, not behind it.',
    dsTitle: 'Unified Data Layer',
    dsDesc: 'Seamless integration with your current tools, a consistent data language, and no-code pipelines keeping data instantly current.',
    pairs: [
      { tv: 'Ongoing market scanning of new AI vendors',                   ds: 'Seamless integration with your current tools'       },
      { tv: 'Rigorous security and reliability testing',                   ds: 'A consistent data language across all domains'      },
      { tv: 'Deploying only the best-in-class tools for your workflows',   ds: 'No-code pipelines keeping data instantly current'   },
    ],
  },
]

const PAIR_COLORS = ['#347EF6', '#00327B', '#347EF6']
const SLIDE_MS    = 6500

function ScanBorder({ color, reverse = false }: { color: string; reverse?: boolean }) {
  return (
    <motion.div
      className="absolute top-0 left-0 right-0 h-[1.5px] pointer-events-none"
      style={{ background: `linear-gradient(90deg,transparent,${color},transparent)` }}
      animate={{ x: reverse ? ['100%','-100%'] : ['-100%','100%'] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
    />
  )
}

function OrbitalCircle({ pillar, hoveredPair }: { pillar: typeof PILLARS[0]; hoveredPair: number | null }) {
  const cx = 150, cy = 150, R = 86
  const nodeYs = [110, 150, 190]
  const rgb    = hex2rgb(pillar.color)
  const gid    = `eio${pillar.id}`

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[300px]" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id={`dg-${gid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={pillar.color} stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#E6F0FF"       stopOpacity="1"/>
        </radialGradient>
        <radialGradient id={`ig-${gid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={pillar.color} stopOpacity="0.18"/>
          <stop offset="100%" stopColor={pillar.color} stopOpacity="0"/>
        </radialGradient>
        <filter id={`gl-${gid}`}>
          <feGaussianBlur stdDeviation="2.8" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id={`sg-${gid}`}>
          <feGaussianBlur stdDeviation="8" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <motion.circle
        cx={cx} cy={cy} r={138}
        fill="none" stroke={`rgba(${rgb},0.16)`} strokeWidth="1" strokeDasharray="4 10"
        animate={{ rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        style={{ originX: `${cx}px`, originY: `${cy}px` }}
      />
      <circle cx={cx} cy={cy} r={117}
        fill="none" stroke={`${pillar.color}C0`} strokeWidth="4" strokeLinecap="round"
        strokeDasharray={`${Math.PI*117*0.40} ${Math.PI*117*1.60}`}
        filter={`url(#gl-${gid})`}
      >
        <animateTransform attributeName="transform" type="rotate"
          from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="22s" repeatCount="indefinite"/>
      </circle>
      <circle cx={cx} cy={cy} r={117}
        fill="none" stroke="rgba(52,126,246,0.50)" strokeWidth="3.5" strokeLinecap="round"
        strokeDasharray={`${Math.PI*117*0.24} ${Math.PI*117*1.76}`}
        filter={`url(#gl-${gid})`}
      >
        <animateTransform attributeName="transform" type="rotate"
          from={`180 ${cx} ${cy}`} to={`540 ${cx} ${cy}`} dur="18s" repeatCount="indefinite"/>
      </circle>

      <circle cx={cx} cy={cy} r={R}
        fill={`url(#dg-${gid})`} stroke={`rgba(${rgb},0.25)`} strokeWidth="1.5"/>
      <motion.circle cx={cx} cy={cy} r={R}
        fill={`url(#ig-${gid})`}
        animate={{ opacity: [0.4,1,0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {[0,1].map(i => (
        <line key={i}
          x1={cx-R*0.82} y1={(nodeYs[i]+nodeYs[i+1])/2}
          x2={cx+R*0.82} y2={(nodeYs[i]+nodeYs[i+1])/2}
          stroke="rgba(7,18,43,0.07)" strokeWidth="1"
        />
      ))}

      <text x={cx} y={cy-R-12} textAnchor="middle"
        fill="rgba(7,18,43,0.28)" fontSize="8" fontFamily="Inter,sans-serif"
        fontWeight="700" letterSpacing="0.18em">EIO</text>

      {nodeYs.map((ny, i) => {
        const pc   = PAIR_COLORS[i]
        const pRgb = hex2rgb(pc)
        const isAct = hoveredPair === i
        const isDim = hoveredPair !== null && !isAct
        return (
          <g key={i}>
            <line x1={16} y1={ny} x2={136} y2={ny}
              stroke={pc} strokeWidth={isAct ? 1.8 : 0.8}
              strokeDasharray={isAct ? 'none' : '3 6'}
              opacity={isAct ? 0.90 : (isDim ? 0.08 : 0.30)}
              style={{ transition: 'all 0.28s ease' }}
            />
            <circle cx={16} cy={ny} r={isAct ? 4 : 2.5}
              fill={isAct ? pc : `rgba(${pRgb},${isDim?'0.15':'0.45'})`}
              style={{ transition: 'all 0.25s ease' }}
            />
            <line x1={164} y1={ny} x2={284} y2={ny}
              stroke={pc} strokeWidth={isAct ? 1.8 : 0.8}
              strokeDasharray={isAct ? 'none' : '3 6'}
              opacity={isAct ? 0.90 : (isDim ? 0.08 : 0.30)}
              style={{ transition: 'all 0.28s ease' }}
            />
            <circle cx={284} cy={ny} r={isAct ? 4 : 2.5}
              fill={isAct ? pc : `rgba(${pRgb},${isDim?'0.15':'0.45'})`}
              style={{ transition: 'all 0.25s ease' }}
            />
            {isAct && (
              <>
                <motion.circle cy={ny} r={3} fill={pc} filter={`url(#gl-${gid})`}
                  animate={{ x: [0, 120] }} initial={{ x: 0 }}
                  style={{ originX: 16 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.35 }}
                />
                <motion.circle cy={ny} r={3} fill={pc} filter={`url(#gl-${gid})`}
                  animate={{ x: [0, 120] }} initial={{ x: 0 }}
                  style={{ originX: 164 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.35 }}
                />
              </>
            )}
            {isAct && (
              <circle cx={cx} cy={ny} r={24} fill={pc} fillOpacity="0.10" filter={`url(#sg-${gid})`} />
            )}
            <circle cx={cx} cy={ny}
              r={isAct ? 15 : 12}
              fill={isAct ? pc : (isDim ? 'rgba(7,18,43,0.03)' : 'rgba(7,18,43,0.05)')}
              stroke={isAct ? pc : `rgba(${pRgb},0.40)`}
              strokeWidth="1.5"
              filter={isAct ? `url(#gl-${gid})` : undefined}
              style={{ transition: 'r 0.22s,fill 0.22s,stroke 0.22s' }}
            />
            <text x={cx} y={ny+4} textAnchor="middle"
              fontSize="10.5" fontWeight="700" fontFamily="Inter,system-ui,sans-serif"
              fill={isAct ? '#ffffff' : `rgba(${pRgb},${isDim?'0.30':'0.75'})`}
              style={{ transition: 'fill 0.22s' }}
            >
              {i+1}
            </text>
          </g>
        )
      })}

      <motion.circle cx={cx} cy={cy} r={8}
        fill={`rgba(${rgb},0.18)`}
        animate={{ r:[6,11,6], opacity:[0.3,0.7,0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        filter={`url(#sg-${gid})`}
      />
      <circle cx={cx} cy={cy} r={4} fill={pillar.color} filter={`url(#gl-${gid})`}/>
    </svg>
  )
}

function BulletItem({ text, idx, active, onEnter, onLeave, side }: {
  text: string; idx: number; active: boolean
  onEnter(): void; onLeave(): void; side: 'left'|'right'
}) {
  const pc  = PAIR_COLORS[idx]
  const rgb = hex2rgb(pc)
  return (
    <motion.div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      animate={{ x: active ? (side==='left' ? 4 : -4) : 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-3 p-3 rounded-xl cursor-default"
      style={{
        background: active ? `rgba(${rgb},0.10)` : 'rgba(7,18,43,0.03)',
        border:     `1px solid ${active ? `rgba(${rgb},0.35)` : 'rgba(7,18,43,0.08)'}`,
        transition: 'background 0.22s,border-color 0.22s',
      }}
    >
      <span
        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
        style={{
          background: active ? pc : `rgba(${rgb},0.18)`,
          color:      active ? '#fff' : pc,
          boxShadow:  active ? `0 0 14px rgba(${rgb},0.40)` : 'none',
          transition: 'all 0.22s',
        }}
      >
        {idx+1}
      </span>
      <span
        className="text-sm leading-snug"
        style={{
          color:      active ? 'rgba(7,18,43,0.90)' : 'rgba(7,18,43,0.55)',
          fontWeight: active ? 500 : 400,
          transition: 'color 0.22s',
        }}
      >
        {text}
      </span>
    </motion.div>
  )
}

function BannerSlide({ pillar, hoveredPair, onHover, onLeave }: {
  pillar: typeof PILLARS[0]
  hoveredPair: number|null
  onHover(i:number): void
  onLeave(): void
}) {
  const rgb    = hex2rgb(pillar.color)
  const orgRgb = hex2rgb('#347EF6')
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px_1fr] gap-5 items-center">

      {/* TresVista panel */}
      <div
        className="rounded-2xl p-6 lg:p-8 relative overflow-hidden h-full"
        style={{ background: '#FFFFFF', border: `1px solid rgba(${rgb},0.18)`, boxShadow: '0 2px 24px rgba(7,18,43,0.07)' }}
      >
        <ScanBorder color={pillar.color}/>
        <div className="flex items-center gap-2 mb-5">
          <img src="/logo-dark.svg" className="h-5 w-auto" alt="TresVista" />
          <span className="ml-auto text-[9px] font-bold tracking-widest uppercase" style={{ color:`rgba(${rgb},0.45)` }}>The Talent</span>
        </div>
        <h3 className="text-navy font-bold text-xl leading-snug mb-2">{pillar.tvTitle}</h3>
        <p className="text-sm leading-relaxed mb-6 text-navy/55">{pillar.tvDesc}</p>
        <div className="space-y-2">
          {pillar.pairs.map((p,i) => (
            <BulletItem key={i} text={p.tv} idx={i}
              active={hoveredPair===i} onEnter={() => onHover(i)} onLeave={onLeave} side="left"/>
          ))}
        </div>
        <div className="h-px mt-6" style={{ background:`linear-gradient(to right,rgba(${rgb},0.25),transparent)` }}/>
      </div>

      {/* Orbital diagram */}
      <div className="flex items-center justify-center py-4 lg:py-0">
        <div className="w-full max-w-[360px] rounded-2xl p-4"
          style={{ background: 'linear-gradient(135deg, #EEF4FF 0%, #F8FBFF 100%)', boxShadow: '0 8px 40px rgba(0,50,123,0.10), 0 2px 12px rgba(7,18,43,0.06)', border: '1px solid rgba(0,50,123,0.10)' }}>
          <OrbitalCircle pillar={pillar} hoveredPair={hoveredPair}/>
        </div>
      </div>

      {/* Descrial panel */}
      <div
        className="rounded-2xl p-6 lg:p-8 relative overflow-hidden h-full"
        style={{ background: '#FFFFFF', border: `1px solid rgba(${orgRgb},0.18)`, boxShadow: '0 2px 24px rgba(7,18,43,0.07)' }}
      >
        <ScanBorder color="#347EF6" reverse/>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xl font-bold leading-none" style={{ color: '#347EF6' }}>D</span>
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: '#347EF6' }}>Descrial</span>
          <span className="ml-auto text-[9px] font-bold tracking-widest uppercase" style={{ color:'rgba(52,126,246,0.45)' }}>The Platform</span>
        </div>
        <h3 className="text-navy font-bold text-xl leading-snug mb-2">{pillar.dsTitle}</h3>
        <p className="text-sm leading-relaxed mb-6 text-navy/55">{pillar.dsDesc}</p>
        <div className="space-y-2">
          {pillar.pairs.map((p,i) => (
            <BulletItem key={i} text={p.ds} idx={i}
              active={hoveredPair===i} onEnter={() => onHover(i)} onLeave={onLeave} side="right"/>
          ))}
        </div>
        <div className="h-px mt-6" style={{ background:'linear-gradient(to left,rgba(52,126,246,0.25),transparent)' }}/>
      </div>
    </div>
  )
}

export default function EIOSectionV2() {
  const [activePillar, setActivePillar] = useState(0)
  const [hoveredPair,  setHoveredPair]  = useState<number|null>(null)
  const [paused,       setPaused]       = useState(false)
  const [progress,     setProgress]     = useState(0)
  const [dir,          setDir]          = useState(1)

  const sectionRef = useRef<HTMLElement>(null)
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-80px' })
  const pillar     = PILLARS[activePillar]

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const rawY  = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  const sectionY = useSpring(rawY, { stiffness: 55, damping: 18 })

  useEffect(() => {
    if (paused) return
    setProgress(0)
    const TICK  = 50
    const steps = SLIDE_MS / TICK
    let step    = 0
    const id    = setInterval(() => {
      step++
      setProgress((step/steps)*100)
      if (step >= steps) { setDir(1); setActivePillar(a => (a+1) % PILLARS.length) }
    }, TICK)
    return () => clearInterval(id)
  }, [activePillar, paused])

  const goTo = (i: number) => { setDir(i > activePillar ? 1 : -1); setActivePillar(i); setHoveredPair(null); setProgress(0) }

  const slideVariants = {
    enter:  (d:number) => ({ opacity:0, x: d*90, scale:0.97, filter:'blur(6px)' }),
    center: { opacity:1, x:0, scale:1, filter:'blur(0px)' },
    exit:   (d:number) => ({ opacity:0, x:-d*65, scale:0.98, filter:'blur(3px)' }),
  }

  return (
    <section
      id="eio"
      ref={sectionRef}
      style={{ backgroundColor: '#ffffff', borderRadius: '64px 64px 0 0', marginTop: '-64px', position: 'relative', zIndex: 4 }}
      className="overflow-hidden py-28 lg:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ambient glow */}
      <motion.div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[960px] h-[640px] rounded-full pointer-events-none"
        animate={{ background:`radial-gradient(ellipse, ${pillar.color}0A 0%, transparent 65%)` }}
        transition={{ duration: 0.9 }}
      />

      <motion.div ref={ref} style={{ y: sectionY }} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section header */}
        <motion.div
          initial={{ opacity:0, y:36 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.75, ease:[0.76,0,0.24,1] }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <motion.span className="h-[2px] bg-tvblue/50 block"
              initial={{ width:0 }} animate={inView ? { width:32 } : {}}
              transition={{ delay:0.3, duration:0.5 }}
            />
            <span className="text-tvblue text-xs font-bold tracking-[0.14em] uppercase">Our Integrated Model</span>
            <motion.span className="h-[2px] bg-tvblue/50 block"
              initial={{ width:0 }} animate={inView ? { width:32 } : {}}
              transition={{ delay:0.3, duration:0.5 }}
            />
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="text-navy leading-[1.1] tracking-tight mb-5"
              style={{ fontWeight: 700, fontSize: 'clamp(2.2rem, 3.8vw, 3.8rem)' }}
            >
              Enterprise Intelligence Orchestration
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
            animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-navy/55 text-lg max-w-[640px] mx-auto leading-relaxed"
          >
            By combining our domain experts with a purpose-built technology platform, we deliver one solution that orchestrates intelligence into structured, accountable action at scale.
          </motion.p>
        </motion.div>

        {/* Pillar tab selector */}
        <motion.div
          initial={{ opacity:0, y:18 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ delay:0.2, duration:0.6 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex bg-surface border border-navy/8 rounded-2xl p-1.5 gap-1.5">
            {PILLARS.map((p,i) => {
              const Icon  = p.icon
              const isAct = activePillar === i
              return (
                <motion.button
                  key={p.id}
                  onClick={() => goTo(i)}
                  whileTap={{ scale:0.95 }}
                  className="relative flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold cursor-pointer overflow-hidden"
                  style={{ color: isAct ? '#fff' : 'rgba(7,18,43,0.48)' }}
                >
                  {isAct && (
                    <motion.div
                      layoutId="eioTabV2"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: p.color, border: `1px solid ${p.color}` }}
                      transition={{ type:'spring', stiffness:380, damping:36 }}
                    />
                  )}
                  <Icon size={12} className="relative z-10 flex-shrink-0"/>
                  <span className="relative z-10 hidden sm:inline whitespace-nowrap">{p.label}</span>
                  <span className="relative z-10 font-bold text-[9px] opacity-40">{p.num}</span>
                  {isAct && (
                    <div
                      className="absolute bottom-0 left-0 h-[2px] rounded-full z-10 bg-white/40"
                      style={{ width:`${progress}%`, transition:'width 0.05s linear' }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Main slider */}
        <div className="relative">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={activePillar}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration:0.52, ease:[0.76,0,0.24,1] }}
            >
              <BannerSlide
                pillar={PILLARS[activePillar]}
                hoveredPair={hoveredPair}
                onHover={setHoveredPair}
                onLeave={() => setHoveredPair(null)}
              />
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => goTo((activePillar-1+PILLARS.length) % PILLARS.length)}
            className="absolute -left-4 lg:-left-10 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-navy/4 hover:bg-navy/8 border border-navy/10 hover:border-navy/20 transition-all duration-200"
          >
            <ChevronLeft size={16} className="text-navy/55"/>
          </button>
          <button
            onClick={() => goTo((activePillar+1) % PILLARS.length)}
            className="absolute -right-4 lg:-right-10 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-navy/4 hover:bg-navy/8 border border-navy/10 hover:border-navy/20 transition-all duration-200"
          >
            <ChevronRight size={16} className="text-navy/55"/>
          </button>
        </div>

        {/* Bottom controls */}
        <div className="flex flex-col items-center gap-4 mt-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={activePillar}
              initial={{ opacity:0, y:8 }}
              animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:-8 }}
              transition={{ duration:0.28 }}
              className="text-sm font-semibold tracking-wide"
              style={{ color:`rgba(${hex2rgb(pillar.color)},0.80)` }}
            >
              {pillar.num}. {pillar.label}
            </motion.p>
          </AnimatePresence>

          <div className="flex items-center gap-3">
            {PILLARS.map((p,i) => (
              <button key={i} onClick={() => goTo(i)}
                className="h-[3px] rounded-full transition-all duration-350"
                style={{ width: activePillar===i ? 32 : 12, background: activePillar===i ? p.color : 'rgba(7,18,43,0.15)' }}
              />
            ))}
          </div>

          <p className="text-[11px] text-navy/30">
            Hover any numbered item to illuminate its connection through the diagram
          </p>

          <motion.a
            href="/our-solution/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-tvblue hover:text-tvblue-light transition-colors duration-200 group"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Explore Our Solution
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </motion.a>
        </div>

      </motion.div>
    </section>
  )
}
