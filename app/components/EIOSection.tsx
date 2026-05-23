'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Cpu, Users, Globe2, ChevronLeft, ChevronRight } from 'lucide-react'

function hex2rgb(h: string) {
  return `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`
}

const PILLARS = [
  {
    id: 0, num: '01', label: 'Technological Transformation', icon: Cpu, color: '#1B4FBE',
    tvTitle: 'Technological Transformation',
    tvDesc: 'Master data management, business intelligence, custom technology infrastructure, and workflow automation — built around how you operate.',
    dsTitle: 'Natural Language Interface',
    dsDesc: 'Query your enterprise data in plain English and get structured, accurate answers instantly.',
    pairs: [
      { tv: 'Master data model design & governance for AI deployment', ds: 'Conversational interface across all your data sources' },
      { tv: 'Data engineering and custom data lake construction',      ds: 'Auto-generates SQL, Python, and BI queries on demand'  },
      { tv: 'Dashboard development and business intelligence',        ds: 'Context-aware responses grounded in your data model'   },
    ],
  },
  {
    id: 1, num: '02', label: 'Human-in-Command', icon: Users, color: '#EF8014',
    tvTitle: 'Human-in-Command',
    tvDesc: 'AI outputs are only as good as the human intelligence behind them. Our domain experts are embedded in your workflows — not just advising, but executing.',
    dsTitle: 'Agentic Workflow Orchestration',
    dsDesc: 'Multi-agent AI systems that execute complex workflows with human approval at every critical gate.',
    pairs: [
      { tv: 'Investment & finance professionals executing across the value chain', ds: 'Multi-step workflow automation with human checkpoints' },
      { tv: 'Data migration and managed technology services',                     ds: 'Agent handoffs with full audit trail and accountability' },
      { tv: 'AI output validation and quality sign-off',                          ds: 'Approval gates ensuring human oversight at every stage' },
    ],
  },
  {
    id: 2, num: '03', label: 'Operational Excellence (ODEx)', icon: Globe2, color: '#2E78E8',
    tvTitle: 'Operational Excellence (ODEx)',
    tvDesc: 'Continuous evaluation of AI models, vendors, and tools — so your AI stack evolves with the market, not behind it.',
    dsTitle: 'Unified Data Layer',
    dsDesc: 'A single semantic layer connecting all your existing systems — no rip-and-replace required.',
    pairs: [
      { tv: 'Continuous research and evaluation of AI vendors and platforms', ds: 'Connects to 200+ data sources out of the box'  },
      { tv: 'Rigorous testing & enterprise-grade validation',                 ds: 'Unified schema across all business domains'    },
      { tv: 'Curated AI tool stack for client workflows',                    ds: 'Real-time sync with no-code connectors'        },
    ],
  },
]

const PAIR_COLORS = ['#4A9BF5', '#EF8014', '#A78BFA']
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

function OrbitalCircle({
  pillar, hoveredPair,
}: {
  pillar: typeof PILLARS[0]
  hoveredPair: number | null
}) {
  const cx = 150, cy = 150, R = 86
  const nodeYs = [110, 150, 190]
  const rgb    = hex2rgb(pillar.color)
  const gid    = `eio${pillar.id}`

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[300px]" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id={`dg-${gid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={pillar.color} stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#EEF4FF"       stopOpacity="1"/>
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

      {/* outer dashed orbit */}
      <motion.circle
        cx={cx} cy={cy} r={138}
        fill="none" stroke={`rgba(${rgb},0.16)`} strokeWidth="1" strokeDasharray="4 10"
        animate={{ rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        style={{ originX: `${cx}px`, originY: `${cy}px` }}
      />

      {/* accent arcs */}
      <circle cx={cx} cy={cy} r={117}
        fill="none" stroke={`${pillar.color}C0`} strokeWidth="4" strokeLinecap="round"
        strokeDasharray={`${Math.PI*117*0.40} ${Math.PI*117*1.60}`}
        filter={`url(#gl-${gid})`}
      >
        <animateTransform attributeName="transform" type="rotate"
          from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="22s" repeatCount="indefinite"/>
      </circle>
      <circle cx={cx} cy={cy} r={117}
        fill="none" stroke="rgba(46,120,232,0.50)" strokeWidth="3.5" strokeLinecap="round"
        strokeDasharray={`${Math.PI*117*0.24} ${Math.PI*117*1.76}`}
        filter={`url(#gl-${gid})`}
      >
        <animateTransform attributeName="transform" type="rotate"
          from={`180 ${cx} ${cy}`} to={`540 ${cx} ${cy}`} dur="18s" repeatCount="indefinite"/>
      </circle>

      {/* main disc */}
      <circle cx={cx} cy={cy} r={R}
        fill={`url(#dg-${gid})`} stroke={`rgba(${rgb},0.25)`} strokeWidth="1.5"/>
      <motion.circle cx={cx} cy={cy} r={R}
        fill={`url(#ig-${gid})`}
        animate={{ opacity: [0.4,1,0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* horizontal dividers */}
      {[0,1].map(i => (
        <line key={i}
          x1={cx-R*0.82} y1={(nodeYs[i]+nodeYs[i+1])/2}
          x2={cx+R*0.82} y2={(nodeYs[i]+nodeYs[i+1])/2}
          stroke="rgba(7,18,43,0.07)" strokeWidth="1"
        />
      ))}

      {/* EIO label */}
      <text x={cx} y={cy-R-12} textAnchor="middle"
        fill="rgba(7,18,43,0.28)" fontSize="8" fontFamily="Inter,sans-serif"
        fontWeight="700" letterSpacing="0.18em">EIO</text>

      {/* connection nodes */}
      {nodeYs.map((ny, i) => {
        const pc    = PAIR_COLORS[i]
        const pRgb  = hex2rgb(pc)
        const isAct = hoveredPair === i
        const isDim = hoveredPair !== null && !isAct

        return (
          <g key={i}>
            <line
              x1={16} y1={ny} x2={136} y2={ny}
              stroke={pc}
              strokeWidth={isAct ? 1.8 : 0.8}
              strokeDasharray={isAct ? 'none' : '3 6'}
              opacity={isAct ? 0.90 : (isDim ? 0.08 : 0.30)}
              style={{ transition: 'all 0.28s ease' }}
            />
            <circle cx={16} cy={ny} r={isAct ? 4 : 2.5}
              fill={isAct ? pc : `rgba(${pRgb},${isDim?'0.15':'0.45'})`}
              style={{ transition: 'all 0.25s ease' }}
            />
            <line
              x1={164} y1={ny} x2={284} y2={ny}
              stroke={pc}
              strokeWidth={isAct ? 1.8 : 0.8}
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
                  animate={{ x: [0, 120] }}
                  initial={{ x: 0 }}
                  style={{ originX: 16 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.35 }}
                />
                <motion.circle cy={ny} r={3} fill={pc} filter={`url(#gl-${gid})`}
                  animate={{ x: [0, 120] }}
                  initial={{ x: 0 }}
                  style={{ originX: 164 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.35 }}
                />
              </>
            )}
            {isAct && (
              <circle cx={cx} cy={ny} r={24}
                fill={pc} fillOpacity="0.10" filter={`url(#sg-${gid})`}
              />
            )}
            <circle
              cx={cx} cy={ny}
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

      {/* center pulse */}
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

function BulletItem({
  text, idx, active, onEnter, onLeave, side,
}: {
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
        background:  active ? `rgba(${rgb},0.10)` : 'rgba(7,18,43,0.03)',
        border:      `1px solid ${active ? `rgba(${rgb},0.35)` : 'rgba(7,18,43,0.08)'}`,
        transition:  'background 0.22s,border-color 0.22s',
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

function BannerSlide({
  pillar, hoveredPair, onHover, onLeave,
}: {
  pillar: typeof PILLARS[0]
  hoveredPair: number|null
  onHover(i:number): void
  onLeave(): void
}) {
  const rgb    = hex2rgb(pillar.color)
  const orgRgb = hex2rgb('#EF8014')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px_1fr] gap-5 items-center">

      {/* TresVista panel */}
      <div
        className="rounded-2xl p-6 lg:p-8 relative overflow-hidden h-full"
        style={{
          background: '#FFFFFF',
          border:     `1px solid rgba(${rgb},0.18)`,
          boxShadow:  '0 2px 24px rgba(7,18,43,0.07)',
        }}
      >
        <ScanBorder color={pillar.color}/>
        <div className="flex items-center gap-2 mb-5">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <polygon points="0,18 9,0 18,18" fill="#1B4FBE" clipPath={`url(#tvL${pillar.id})`}/>
            <polygon points="0,18 9,0 18,18" fill="#EF8014" clipPath={`url(#tvR${pillar.id})`}/>
            <defs>
              <clipPath id={`tvL${pillar.id}`}><rect x="0" y="0" width="9" height="18"/></clipPath>
              <clipPath id={`tvR${pillar.id}`}><rect x="9" y="0" width="9" height="18"/></clipPath>
            </defs>
          </svg>
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-tvblue">TresVista</span>
          <span className="ml-auto text-[9px] font-bold tracking-widest uppercase"
            style={{ color:`rgba(${rgb},0.45)` }}>The Talent</span>
        </div>

        <h3 className="text-navy font-bold text-lg leading-snug mb-2">{pillar.tvTitle}</h3>
        <p className="text-sm leading-relaxed mb-6 text-navy/55">{pillar.tvDesc}</p>

        <div className="space-y-2">
          {pillar.pairs.map((p,i) => (
            <BulletItem key={i} text={p.tv} idx={i}
              active={hoveredPair===i} onEnter={() => onHover(i)} onLeave={onLeave} side="left"/>
          ))}
        </div>

        <div className="h-px mt-6" style={{ background:`linear-gradient(to right,rgba(${rgb},0.25),transparent)` }}/>
      </div>

      {/* orbital diagram */}
      <div className="flex items-center justify-center py-4 lg:py-0">
        <OrbitalCircle pillar={pillar} hoveredPair={hoveredPair}/>
      </div>

      {/* Descrial panel */}
      <div
        className="rounded-2xl p-6 lg:p-8 relative overflow-hidden h-full"
        style={{
          background: '#FFFFFF',
          border:     `1px solid rgba(${orgRgb},0.18)`,
          boxShadow:  '0 2px 24px rgba(7,18,43,0.07)',
        }}
      >
        <ScanBorder color="#EF8014" reverse/>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xl font-bold leading-none text-tvorange">D</span>
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-tvorange">Descrial</span>
          <span className="ml-auto text-[9px] font-bold tracking-widest uppercase"
            style={{ color:'rgba(239,128,20,0.45)' }}>The Platform</span>
        </div>

        <h3 className="text-navy font-bold text-lg leading-snug mb-2">{pillar.dsTitle}</h3>
        <p className="text-sm leading-relaxed mb-6 text-navy/55">{pillar.dsDesc}</p>

        <div className="space-y-2">
          {pillar.pairs.map((p,i) => (
            <BulletItem key={i} text={p.ds} idx={i}
              active={hoveredPair===i} onEnter={() => onHover(i)} onLeave={onLeave} side="right"/>
          ))}
        </div>

        <div className="h-px mt-6" style={{ background:'linear-gradient(to left,rgba(239,128,20,0.25),transparent)' }}/>
      </div>
    </div>
  )
}

export default function EIOSection() {
  const [activePillar, setActivePillar] = useState(0)
  const [hoveredPair,  setHoveredPair]  = useState<number|null>(null)
  const [paused,       setPaused]       = useState(false)
  const [progress,     setProgress]     = useState(0)
  const [dir,          setDir]          = useState(1)

  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const pillar = PILLARS[activePillar]

  useEffect(() => {
    if (paused) return
    setProgress(0)
    const TICK  = 50
    const steps = SLIDE_MS / TICK
    let step    = 0
    const id    = setInterval(() => {
      step++
      setProgress((step/steps)*100)
      if (step >= steps) {
        setDir(1)
        setActivePillar(a => (a+1) % PILLARS.length)
      }
    }, TICK)
    return () => clearInterval(id)
  }, [activePillar, paused])

  const goTo = (i: number) => {
    setDir(i > activePillar ? 1 : -1)
    setActivePillar(i)
    setHoveredPair(null)
    setProgress(0)
  }

  const slideVariants = {
    enter:  (d:number) => ({ opacity:0, x: d*90, scale:0.97, filter:'blur(6px)' }),
    center: { opacity:1, x:0, scale:1, filter:'blur(0px)' },
    exit:   (d:number) => ({ opacity:0, x:-d*65, scale:0.98, filter:'blur(3px)' }),
  }

  return (
    <section
      id="eio"
      ref={ref}
      className="relative bg-white overflow-hidden py-28 lg:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* very subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-navy/6" />

      {/* ambient glow — light version */}
      <motion.div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[960px] h-[640px] rounded-full pointer-events-none"
        animate={{ background:`radial-gradient(ellipse, ${pillar.color}0A 0%, transparent 65%)` }}
        transition={{ duration: 0.9 }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* section header */}
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
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold text-navy leading-[1.1] tracking-tight mb-5">
            Enterprise Intelligence{' '}
            <span className="gradient-text">Orchestration</span>
          </h2>
          <p className="text-navy/55 text-lg max-w-[640px] mx-auto leading-relaxed">
            TresVista and Descrial are two components of one integrated model. Our experts use Descrial to orchestrate data, workflows, and AI — connecting insight to execution.
          </p>
        </motion.div>

        {/* pillar tab selector */}
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
                      layoutId="eioTab"
                      className="absolute inset-0 rounded-xl"
                      style={{ background:`${p.color}`, border:`1px solid ${p.color}` }}
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

        {/* main slider */}
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

          {/* prev / next arrows */}
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

        {/* bottom: label + dot indicators */}
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
              {pillar.num} — {pillar.label}
            </motion.p>
          </AnimatePresence>

          <div className="flex items-center gap-3">
            {PILLARS.map((p,i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="h-[3px] rounded-full transition-all duration-350"
                style={{
                  width:      activePillar===i ? 32 : 12,
                  background: activePillar===i ? p.color : 'rgba(7,18,43,0.15)',
                }}
              />
            ))}
          </div>

          <p className="text-[11px] text-navy/30">
            Hover any numbered item to illuminate its connection through the diagram
          </p>
        </div>

      </div>
    </section>
  )
}
