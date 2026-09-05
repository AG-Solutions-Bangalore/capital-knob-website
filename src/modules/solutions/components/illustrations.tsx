/**
 * Photo-style SVG illustrations that act as drop-in placeholders for the
 * card photography on the home page. Each illustration:
 *   - uses the navy → gold brand gradient
 *   - has rounded corners so it sits nicely in the card frame
 *   - is a self-contained SVG (no external deps, no Tailwind classes inside)
 *
 *  When real photos are generated, replace each <Illustration /> with an
 *  <img src=...> and remove this file.
 */

import type { IllustrationKey } from '../constants'
import type { ReactNode } from 'react'

interface IllustrationProps {
  art: IllustrationKey
  className?: string
}

/* Shared visual tokens — kept inline so the file is portable. */
const SKY_TOP = '#1a3a6e'
const SKY_BOT = '#0f2a47'
const GOLD = '#c9a961'
const GOLD_LIGHT = '#e6cc83'
const WARM = '#f4ead2'
const WINDOW = '#f4d27a'
const WINDOW_GLOW = '#fbe9a0'

function Frame({
  viewBox,
  children,
}: {
  viewBox: string
  children: ReactNode
}) {
  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      role="img"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={SKY_TOP} />
          <stop offset="100%" stopColor={SKY_BOT} />
        </linearGradient>
        <linearGradient id="goldFade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={GOLD} />
          <stop offset="100%" stopColor={GOLD_LIGHT} />
        </linearGradient>
        <linearGradient id="warmFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={WARM} />
          <stop offset="100%" stopColor="#e8d9a8" />
        </linearGradient>
        <linearGradient id="windowGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={WINDOW_GLOW} />
          <stop offset="100%" stopColor={WINDOW} />
        </linearGradient>
      </defs>
      {children}
    </svg>
  )
}

/* -----------------------------------------------------------------------------
   Individuals
   ----------------------------------------------------------------------------- */

function HomeLoansArt() {
  return (
    <Frame viewBox="0 0 600 400">
      <rect width="600" height="400" fill="url(#sky)" />
      {/* ground */}
      <rect y="320" width="600" height="80" fill="#0a1f36" />
      {/* lawn */}
      <ellipse cx="300" cy="340" rx="240" ry="22" fill="#1a3a2a" opacity="0.7" />
      {/* main house body */}
      <rect x="170" y="170" width="260" height="160" fill={WARM} />
      <rect x="170" y="170" width="260" height="160" fill="url(#warmFade)" opacity="0.7" />
      {/* roof */}
      <polygon points="155,180 300,90 445,180" fill="#0a1f36" />
      <polygon points="155,180 300,90 445,180" fill={GOLD} opacity="0.18" />
      {/* chimney */}
      <rect x="370" y="105" width="22" height="50" fill="#0a1f36" />
      {/* door */}
      <rect x="270" y="240" width="60" height="90" fill={GOLD} />
      <circle cx="320" cy="285" r="2.5" fill="#0a1f36" />
      {/* windows */}
      <rect x="200" y="210" width="50" height="50" fill={WINDOW_GLOW} />
      <rect x="200" y="210" width="50" height="50" fill="none" stroke="#0a1f36" strokeWidth="2" />
      <line x1="225" y1="210" x2="225" y2="260" stroke="#0a1f36" strokeWidth="2" />
      <line x1="200" y1="235" x2="250" y2="235" stroke="#0a1f36" strokeWidth="2" />
      <rect x="350" y="210" width="50" height="50" fill={WINDOW_GLOW} />
      <rect x="350" y="210" width="50" height="50" fill="none" stroke="#0a1f36" strokeWidth="2" />
      <line x1="375" y1="210" x2="375" y2="260" stroke="#0a1f36" strokeWidth="2" />
      <line x1="350" y1="235" x2="400" y2="235" stroke="#0a1f36" strokeWidth="2" />
      {/* tree */}
      <rect x="80" y="240" width="10" height="80" fill="#0a1f36" />
      <circle cx="85" cy="225" r="32" fill="#1a3a2a" />
      <circle cx="85" cy="225" r="32" fill={GOLD} opacity="0.1" />
      {/* shrubs */}
      <ellipse cx="135" cy="320" rx="30" ry="14" fill="#1a3a2a" />
      <ellipse cx="470" cy="320" rx="30" ry="14" fill="#1a3a2a" />
      {/* warm sunlight overlay */}
      <ellipse cx="430" cy="120" rx="180" ry="80" fill={GOLD} opacity="0.12" />
    </Frame>
  )
}

function BalanceTransferArt() {
  return (
    <Frame viewBox="0 0 600 400">
      <rect width="600" height="400" fill="url(#sky)" />
      {/* distant skyline */}
      <rect x="0" y="220" width="60" height="180" fill="#0a1f36" opacity="0.6" />
      <rect x="60" y="180" width="50" height="220" fill="#0a1f36" opacity="0.7" />
      <rect x="460" y="200" width="60" height="200" fill="#0a1f36" opacity="0.6" />
      <rect x="520" y="240" width="80" height="160" fill="#0a1f36" opacity="0.7" />
      {/* main tower */}
      <rect x="180" y="60" width="240" height="340" fill="#0a1f36" />
      <rect x="180" y="60" width="240" height="340" fill={WARM} opacity="0.06" />
      {/* vertical gold stripe */}
      <rect x="296" y="60" width="8" height="340" fill={GOLD} opacity="0.4" />
      {/* window grid */}
      {Array.from({ length: 10 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => {
          const lit = (row + col) % 3 === 0
          return (
            <rect
              key={`${row}-${col}`}
              x={188 + col * 19}
              y={75 + row * 32}
              width="14"
              height="22"
              fill={lit ? WINDOW_GLOW : '#0a1f36'}
              opacity={lit ? 0.85 : 0.9}
            />
          )
        }),
      )}
      {/* reflection pool */}
      <rect y="370" width="600" height="30" fill="#061528" />
      <ellipse cx="300" cy="385" rx="280" ry="6" fill={GOLD} opacity="0.25" />
      {/* moon */}
      <circle cx="100" cy="100" r="36" fill={WARM} opacity="0.95" />
      <circle cx="100" cy="100" r="36" fill={GOLD} opacity="0.2" />
    </Frame>
  )
}

function TopUpArt() {
  return (
    <Frame viewBox="0 0 600 400">
      <rect width="600" height="400" fill="url(#warmFade)" />
      {/* wall */}
      <rect width="600" height="260" fill="#e8d9a8" />
      <rect y="260" width="600" height="140" fill="#c8a96a" opacity="0.4" />
      {/* sofa */}
      <rect x="60" y="200" width="480" height="120" rx="14" fill={WARM} />
      <rect x="60" y="200" width="480" height="40" rx="14" fill="#d9c285" />
      {/* three figures */}
      {/* left — father */}
      <g>
        <circle cx="180" cy="160" r="32" fill="#7d5a30" />
        <path d="M148 200 Q148 180 180 180 Q212 180 212 200 L212 250 L148 250 Z" fill={GOLD} />
        <rect x="155" y="250" width="50" height="60" fill="#0a1f36" />
      </g>
      {/* center — child */}
      <g>
        <circle cx="300" cy="180" r="24" fill="#a87b48" />
        <path d="M276 215 Q276 200 300 200 Q324 200 324 215 L324 255 L276 255 Z" fill="#e6cc83" />
        <rect x="282" y="255" width="36" height="55" fill="#1a3a6e" />
      </g>
      {/* right — mother */}
      <g>
        <circle cx="420" cy="160" r="32" fill="#c4a070" />
        <path d="M388 200 Q388 180 420 180 Q452 180 452 200 L452 250 L388 250 Z" fill="#c9a961" />
        <rect x="395" y="250" width="50" height="60" fill="#7d3a30" />
      </g>
      {/* warm sunlight */}
      <ellipse cx="100" cy="60" rx="160" ry="70" fill="#fbe9a0" opacity="0.5" />
      {/* picture frame on wall */}
      <rect x="40" y="60" width="90" height="70" fill="#0a1f36" />
      <rect x="46" y="66" width="78" height="58" fill={GOLD} opacity="0.5" />
      <rect x="470" y="40" width="100" height="80" fill="#0a1f36" />
      <rect x="476" y="46" width="88" height="68" fill={GOLD} opacity="0.4" />
    </Frame>
  )
}

function ConstructionArt() {
  return (
    <Frame viewBox="0 0 600 400">
      <rect width="600" height="400" fill="url(#sky)" />
      <rect y="300" width="600" height="100" fill="#061528" />
      {/* sky clouds */}
      <ellipse cx="120" cy="80" rx="80" ry="20" fill={WARM} opacity="0.35" />
      <ellipse cx="430" cy="60" rx="100" ry="22" fill={WARM} opacity="0.3" />
      {/* building under construction */}
      <rect x="100" y="140" width="280" height="180" fill="#3a4a5a" />
      <rect x="100" y="140" width="280" height="180" fill={GOLD} opacity="0.05" />
      {/* concrete floors */}
      {[160, 200, 240, 280].map((y) => (
        <rect key={y} x="100" y={y} width="280" height="6" fill="#0a1f36" />
      ))}
      {/* scaffolding */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} stroke={GOLD} strokeWidth="2">
          <line x1={120 + i * 70} y1="140" x2={120 + i * 70} y2="320" />
          <line x1={120 + i * 70 + 35} y1="140" x2={120 + i * 70 + 35} y2="320" />
          <line x1={120 + i * 70} y1={170 + i * 15} x2={120 + i * 70 + 35} y2={170 + i * 15} />
        </g>
      ))}
      {/* crane */}
      <g>
        <rect x="430" y="60" width="14" height="260" fill={GOLD} />
        <rect x="430" y="60" width="14" height="260" fill="#0a1f36" opacity="0.3" />
        <rect x="430" y="60" width="80" height="10" fill={GOLD} />
        <line x1="510" y1="70" x2="510" y2="280" stroke={GOLD} strokeWidth="2" />
        <line x1="510" y1="180" x2="540" y2="180" stroke={GOLD} strokeWidth="2" />
        <rect x="535" y="172" width="20" height="16" fill="#0a1f36" />
      </g>
      {/* workers */}
      <g>
        <circle cx="150" cy="295" r="6" fill="#fbe9a0" />
        <rect x="144" y="300" width="12" height="14" fill={GOLD} />
        <circle cx="200" cy="298" r="6" fill="#fbe9a0" />
        <rect x="194" y="303" width="12" height="14" fill="#c9a961" />
      </g>
      {/* warm light */}
      <ellipse cx="500" cy="160" rx="180" ry="80" fill={GOLD} opacity="0.18" />
    </Frame>
  )
}

function RenovationArt() {
  return (
    <Frame viewBox="0 0 600 400">
      <rect width="600" height="400" fill="#0f1f33" />
      {/* accent wall */}
      <rect width="600" height="260" fill="#1a2a44" />
      <rect width="600" height="260" fill={GOLD} opacity="0.06" />
      {/* textured panel strips */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={i * 100} y="0" width="6" height="260" fill="#0a1f36" opacity="0.6" />
      ))}
      {/* TV */}
      <rect x="180" y="60" width="240" height="140" fill="#0a1f36" />
      <rect x="190" y="70" width="220" height="120" fill="#1a3a6e" />
      <rect x="190" y="70" width="220" height="120" fill={WARM} opacity="0.1" />
      {/* TV shelf */}
      <rect x="170" y="200" width="260" height="8" fill={GOLD} />
      {/* sofa */}
      <rect x="60" y="270" width="480" height="90" rx="16" fill={WARM} />
      <rect x="60" y="270" width="480" height="30" rx="16" fill="#e6cc83" />
      {/* cushions */}
      <rect x="90" y="290" width="60" height="50" rx="6" fill={GOLD} />
      <rect x="450" y="290" width="60" height="50" rx="6" fill="#c9a961" />
      {/* floor */}
      <rect y="360" width="600" height="40" fill="#1a2a44" />
      {/* floor lamp */}
      <line x1="540" y1="200" x2="540" y2="360" stroke={GOLD} strokeWidth="3" />
      <circle cx="540" cy="195" r="14" fill={WINDOW_GLOW} />
      {/* plant */}
      <rect x="40" y="320" width="22" height="40" fill={GOLD} />
      <circle cx="51" cy="305" r="22" fill="#1a3a2a" />
      <circle cx="51" cy="305" r="22" fill={GOLD} opacity="0.1" />
    </Frame>
  )
}

function LoanAgainstArt() {
  return (
    <Frame viewBox="0 0 600 400">
      <rect width="600" height="400" fill="url(#sky)" />
      <rect y="320" width="600" height="80" fill="#0a1f36" />
      {/* multiple buildings */}
      <rect x="40" y="180" width="100" height="140" fill="#3a4a5a" />
      <rect x="150" y="140" width="120" height="180" fill={WARM} opacity="0.6" />
      <rect x="150" y="140" width="120" height="180" fill={GOLD} opacity="0.2" />
      <rect x="280" y="200" width="100" height="120" fill="#3a4a5a" />
      <rect x="390" y="100" width="160" height="220" fill="#0a1f36" />
      {/* main building windows */}
      {Array.from({ length: 10 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => (
          <rect
            key={`w-${row}-${col}`}
            x={400 + col * 18}
            y={110 + row * 20}
            width="14"
            height="14"
            fill={(row + col) % 2 === 0 ? WINDOW_GLOW : '#0a1f36'}
            opacity={(row + col) % 2 === 0 ? 0.9 : 0.85}
          />
        )),
      )}
      {/* foreground building windows */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 4 }).map((_, col) => (
          <rect
            key={`b-${row}-${col}`}
            x={158 + col * 28}
            y={160 + row * 30}
            width="22"
            height="22"
            fill={(row + col) % 2 === 0 ? WINDOW_GLOW : '#0a1f36'}
            opacity={(row + col) % 2 === 0 ? 0.85 : 0.85}
          />
        )),
      )}
      {/* trees */}
      <rect x="20" y="280" width="6" height="40" fill="#0a1f36" />
      <circle cx="23" cy="270" r="18" fill="#1a3a2a" />
      <rect x="572" y="280" width="6" height="40" fill="#0a1f36" />
      <circle cx="575" cy="270" r="18" fill="#1a3a2a" />
      {/* sunset */}
      <ellipse cx="300" cy="180" rx="280" ry="50" fill={GOLD} opacity="0.2" />
    </Frame>
  )
}

/* -----------------------------------------------------------------------------
   Businesses & MSMEs
   ----------------------------------------------------------------------------- */

function WorkingCapitalArt() {
  return (
    <Frame viewBox="0 0 600 400">
      <rect width="600" height="400" fill="#1a2a44" />
      {/* glass walls */}
      <rect x="0" y="0" width="600" height="260" fill="#0f1f33" />
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1={i * 75} y1="0" x2={i * 75} y2="260" stroke={GOLD} opacity="0.2" strokeWidth="1" />
      ))}
      {/* city through glass */}
      <rect x="60" y="80" width="40" height="180" fill="#3a4a5a" opacity="0.6" />
      <rect x="110" y="120" width="50" height="140" fill="#3a4a5a" opacity="0.6" />
      <rect x="450" y="60" width="40" height="200" fill="#3a4a5a" opacity="0.6" />
      <rect x="500" y="100" width="60" height="160" fill="#3a4a5a" opacity="0.6" />
      {/* table */}
      <ellipse cx="300" cy="320" rx="280" ry="40" fill={WARM} />
      <ellipse cx="300" cy="320" rx="280" ry="40" fill={GOLD} opacity="0.2" />
      {/* figures around table */}
      {[120, 220, 380, 480].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="240" r="20" fill="#7d5a30" />
          <rect x={x - 22} y="258" width="44" height="60" fill={i % 2 === 0 ? '#0a1f36' : '#1a3a6e'} />
        </g>
      ))}
      {/* laptops on table */}
      <rect x="180" y="305" width="40" height="22" fill="#0a1f36" />
      <rect x="380" y="305" width="40" height="22" fill="#0a1f36" />
      {/* warm light */}
      <ellipse cx="300" cy="200" rx="260" ry="60" fill={GOLD} opacity="0.15" />
    </Frame>
  )
}

function BusinessLoansArt() {
  return (
    <Frame viewBox="0 0 600 400">
      <rect width="600" height="400" fill="url(#sky)" />
      {/* city bokeh */}
      {[80, 180, 460, 520].map((x, i) => (
        <g key={i}>
          <rect x={x} y={60 + i * 30} width="30" height="80" fill="#3a4a5a" opacity="0.7" />
          <rect x={x} y={70 + i * 30} width="6" height="6" fill={WINDOW_GLOW} />
          <rect x={x + 12} y={70 + i * 30} width="6" height="6" fill={WINDOW_GLOW} />
          <rect x={x + 18} y={85 + i * 30} width="6" height="6" fill={WINDOW_GLOW} />
        </g>
      ))}
      {/* subject */}
      <g>
        <circle cx="300" cy="160" r="60" fill="#a87b48" />
        <path d="M210 350 Q210 240 300 240 Q390 240 390 350 Z" fill={GOLD} />
        <path d="M210 350 Q210 240 300 240 Q390 240 390 350 Z" fill="#0a1f36" opacity="0.15" />
        {/* shirt + blazer */}
        <path d="M250 245 L300 250 L350 245 L355 320 L245 320 Z" fill="#ffffff" />
        <path d="M250 245 L300 250 L350 245 L355 320 L245 320 Z" fill="#0a1f36" opacity="0.05" />
        {/* tie */}
        <polygon points="296,250 304,250 308,310 300,320 292,310" fill={GOLD} />
      </g>
      {/* warm spotlight */}
      <ellipse cx="300" cy="140" rx="200" ry="120" fill={WARM} opacity="0.2" />
    </Frame>
  )
}

function SecuredArt() {
  return (
    <Frame viewBox="0 0 600 400">
      <rect width="600" height="400" fill="#0f1f33" />
      {/* ceiling beams */}
      <rect x="0" y="0" width="600" height="40" fill="#1a2a44" />
      {/* floor */}
      <rect y="320" width="600" height="80" fill="#061528" />
      {/* floor markings */}
      {[80, 240, 400].map((x) => (
        <rect key={x} x={x} y="360" width="40" height="6" fill={GOLD} opacity="0.6" />
      ))}
      {/* shelving racks — perspective */}
      <polygon points="60,80 540,80 580,320 20,320" fill="#1a2a44" />
      <polygon points="60,80 540,80 580,320 20,320" fill={GOLD} opacity="0.04" />
      {/* rack frames */}
      <line x1="60" y1="80" x2="20" y2="320" stroke="#3a4a5a" strokeWidth="3" />
      <line x1="540" y1="80" x2="580" y2="320" stroke="#3a4a5a" strokeWidth="3" />
      {[180, 300, 420].map((x) => (
        <line key={x} x1={x} y1="80" x2={x - 60} y2="320" stroke="#3a4a5a" strokeWidth="2" />
      ))}
      {/* horizontal shelves */}
      {[150, 220, 290].map((y) => (
        <line key={y} x1={60 + (y - 80) * 1.15} y1={y} x2={540 - (y - 80) * 1.15} y2={y} stroke={GOLD} strokeWidth="2" opacity="0.6" />
      ))}
      {/* boxes */}
      {[
        { x: 80, y: 145, w: 80, h: 60 },
        { x: 220, y: 145, w: 100, h: 60 },
        { x: 380, y: 145, w: 80, h: 60 },
        { x: 80, y: 215, w: 100, h: 70 },
        { x: 250, y: 215, w: 90, h: 70 },
        { x: 400, y: 215, w: 80, h: 70 },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={WARM} />
          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={GOLD} opacity="0.2" />
          <line x1={b.x + b.w / 2} y1={b.y} x2={b.x + b.w / 2} y2={b.y + b.h} stroke="#0a1f36" strokeWidth="1.5" />
        </g>
      ))}
      {/* overhead light */}
      <ellipse cx="300" cy="50" rx="200" ry="14" fill={WINDOW_GLOW} opacity="0.6" />
    </Frame>
  )
}

function ExpansionArt() {
  return (
    <Frame viewBox="0 0 600 400">
      <rect width="600" height="400" fill="url(#sky)" />
      {/* blurred office bokeh */}
      {[60, 200, 400, 520].map((x, i) => (
        <circle key={i} cx={x} cy={120 + (i % 2) * 80} r="60" fill={GOLD} opacity="0.18" />
      ))}
      {[100, 300, 460].map((x, i) => (
        <circle key={`b-${i}`} cx={x} cy={260 + (i % 2) * 40} r="50" fill={WARM} opacity="0.15" />
      ))}
      {/* desk surface */}
      <rect y="320" width="600" height="80" fill={WARM} opacity="0.4" />
      <rect y="320" width="600" height="80" fill={GOLD} opacity="0.1" />
      {/* two clasped hands */}
      {/* left arm (navy suit) */}
      <path d="M40 360 L200 280 L260 290 L260 360 Z" fill="#0a1f36" />
      {/* right arm (charcoal suit) */}
      <path d="M560 360 L400 280 L340 290 L340 360 Z" fill="#1a2a44" />
      {/* cuffs */}
      <rect x="190" y="270" width="30" height="20" fill="#ffffff" />
      <rect x="380" y="270" width="30" height="20" fill="#ffffff" />
      {/* clasped hand silhouette */}
      <ellipse cx="300" cy="280" rx="50" ry="36" fill="#a87b48" />
      <ellipse cx="300" cy="280" rx="50" ry="36" fill={GOLD} opacity="0.15" />
      <path d="M260 270 Q300 240 340 270 Q340 310 300 320 Q260 310 260 270 Z" fill="#a87b48" opacity="0.85" />
      {/* fingers detail */}
      <path d="M270 280 Q300 250 330 280" stroke="#7d5a30" strokeWidth="1.5" fill="none" />
      <path d="M275 290 Q300 268 325 290" stroke="#7d5a30" strokeWidth="1.5" fill="none" />
      {/* warm spotlight */}
      <ellipse cx="300" cy="200" rx="220" ry="80" fill={GOLD} opacity="0.22" />
    </Frame>
  )
}

function MachineryArt() {
  return (
    <Frame viewBox="0 0 600 400">
      <rect width="600" height="400" fill="#0f1f33" />
      {/* floor */}
      <rect y="320" width="600" height="80" fill="#061528" />
      {/* safety markings */}
      {[80, 220, 380, 520].map((x) => (
        <g key={x}>
          <polygon points={`${x},360 ${x + 16},360 ${x + 8},348`} fill={GOLD} />
        </g>
      ))}
      {/* background pipes */}
      <rect x="0" y="100" width="600" height="14" fill="#3a4a5a" />
      <rect x="0" y="130" width="600" height="6" fill="#3a4a5a" />
      {/* main machinery — left */}
      <rect x="40" y="180" width="180" height="140" fill="#1d4ed8" />
      <rect x="40" y="180" width="180" height="140" fill="#0a1f36" opacity="0.2" />
      <rect x="50" y="190" width="60" height="40" fill="#0a1f36" />
      <rect x="50" y="190" width="60" height="40" fill={GOLD} opacity="0.4" />
      <circle cx="160" cy="220" r="30" fill={GOLD} />
      <circle cx="160" cy="220" r="30" fill="#0a1f36" opacity="0.3" />
      <circle cx="160" cy="220" r="14" fill="#0a1f36" />
      {/* center robotic arm */}
      <g>
        <rect x="270" y="280" width="60" height="40" fill={GOLD} />
        <rect x="280" y="220" width="40" height="60" fill={GOLD} />
        <rect x="280" y="220" width="40" height="60" fill="#0a1f36" opacity="0.2" />
        <rect x="290" y="160" width="20" height="60" fill={GOLD} />
        <circle cx="300" cy="160" r="14" fill={GOLD} />
        <circle cx="300" cy="160" r="14" fill="#0a1f36" opacity="0.3" />
        <rect x="285" y="100" width="30" height="60" fill={GOLD} />
      </g>
      {/* right machinery */}
      <rect x="380" y="180" width="180" height="140" fill={GOLD} />
      <rect x="380" y="180" width="180" height="140" fill="#0a1f36" opacity="0.2" />
      <rect x="400" y="200" width="50" height="50" fill="#0a1f36" />
      <rect x="400" y="200" width="50" height="50" fill={WARM} opacity="0.3" />
      <circle cx="510" cy="240" r="24" fill="#0a1f36" />
      <circle cx="510" cy="240" r="24" fill={WARM} opacity="0.4" />
      {/* overhead light */}
      <ellipse cx="300" cy="60" rx="280" ry="14" fill={WINDOW_GLOW} opacity="0.5" />
    </Frame>
  )
}

function CapexArt() {
  return (
    <Frame viewBox="0 0 600 400">
      <rect width="600" height="400" fill="url(#sky)" />
      <rect y="320" width="600" height="80" fill="#0a1f36" />
      {/* clouds */}
      <ellipse cx="120" cy="80" rx="100" ry="22" fill={WARM} opacity="0.4" />
      <ellipse cx="460" cy="100" rx="120" ry="26" fill={GOLD} opacity="0.3" />
      {/* main tower */}
      <rect x="180" y="100" width="240" height="220" fill="#0a1f36" />
      <rect x="180" y="100" width="240" height="220" fill={GOLD} opacity="0.08" />
      {/* scaffolding on one side */}
      <g stroke={GOLD} strokeWidth="2">
        <line x1="160" y1="100" x2="160" y2="320" />
        <line x1="170" y1="100" x2="170" y2="320" />
        {[140, 170, 200, 230, 260, 290].map((y) => (
          <line key={y} x1="160" y1={y} x2="170" y2={y} />
        ))}
      </g>
      {/* glass facade */}
      {Array.from({ length: 12 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => (
          <rect
            key={`g-${row}-${col}`}
            x={188 + col * 28}
            y={110 + row * 18}
            width="22"
            height="14"
            fill={(row + col) % 4 === 0 ? WINDOW_GLOW : '#0a1f36'}
            opacity={(row + col) % 4 === 0 ? 0.85 : 0.9}
          />
        )),
      )}
      {/* crane */}
      <rect x="450" y="40" width="12" height="280" fill={GOLD} />
      <rect x="450" y="40" width="80" height="8" fill={GOLD} />
      <line x1="530" y1="48" x2="530" y2="240" stroke={GOLD} strokeWidth="2" />
      <rect x="525" y="220" width="14" height="14" fill="#0a1f36" />
      {/* sunset */}
      <ellipse cx="300" cy="220" rx="280" ry="50" fill={GOLD} opacity="0.2" />
    </Frame>
  )
}

function RefinanceArt() {
  return (
    <Frame viewBox="0 0 600 400">
      <rect width="600" height="400" fill="url(#sky)" />
      {/* desk surface */}
      <rect y="280" width="600" height="120" fill={WARM} />
      <rect y="280" width="600" height="120" fill={GOLD} opacity="0.15" />
      {/* document */}
      <rect x="180" y="200" width="240" height="160" fill="#ffffff" />
      <rect x="180" y="200" width="240" height="160" fill={GOLD} opacity="0.04" />
      {/* document lines */}
      {[220, 240, 260, 280, 320, 340].map((y, i) => (
        <rect key={i} x={200 + (i % 2) * 8} y={y} width={i === 4 ? 100 : 160 - i * 8} height="6" fill="#0a1f36" opacity="0.5" />
      ))}
      {/* signature line */}
      <line x1="200" y1="350" x2="280" y2="350" stroke="#0a1f36" strokeWidth="2" />
      <path d="M205 348 Q220 332 240 345 Q260 358 280 340" stroke={GOLD} strokeWidth="2.5" fill="none" />
      {/* left hand + pen */}
      <path d="M120 380 L180 320 L210 330 L210 380 Z" fill="#0a1f36" />
      <rect x="180" y="305" width="20" height="14" fill="#ffffff" />
      <ellipse cx="200" cy="310" rx="14" ry="10" fill="#a87b48" />
      <rect x="208" y="290" width="6" height="20" fill={GOLD} />
      <polygon points="208,290 214,290 211,280" fill="#0a1f36" />
      {/* right hand */}
      <path d="M480 380 L420 320 L390 330 L390 380 Z" fill="#1a2a44" />
      <rect x="400" y="305" width="20" height="14" fill="#ffffff" />
      <ellipse cx="400" cy="310" rx="14" ry="10" fill="#c4a070" />
      {/* warm light */}
      <ellipse cx="300" cy="200" rx="260" ry="80" fill={GOLD} opacity="0.18" />
    </Frame>
  )
}

/* -----------------------------------------------------------------------------
   Other Capital Solutions (wider format — 800x500)
  ----------------------------------------------------------------------------- */

function RealEstateArt() {
  return (
    <Frame viewBox="0 0 800 500">
      <rect width="800" height="500" fill="url(#sky)" />
      <rect y="380" width="800" height="120" fill="#0a1f36" />
      {/* plaza floor */}
      <ellipse cx="400" cy="430" rx="380" ry="40" fill={GOLD} opacity="0.15" />
      {/* back-left tower */}
      <rect x="60" y="200" width="120" height="220" fill="#0a1f36" />
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 4 }).map((_, col) => (
          <rect key={`bl-${row}-${col}`} x={68 + col * 28} y={210 + row * 26} width="20" height="18" fill={(row + col) % 3 === 0 ? WINDOW_GLOW : '#0a1f36'} />
        )),
      )}
      {/* main tower */}
      <rect x="220" y="100" width="220" height="320" fill="#0a1f36" />
      <rect x="220" y="100" width="220" height="320" fill={GOLD} opacity="0.1" />
      {Array.from({ length: 12 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => (
          <rect key={`m-${row}-${col}`} x={230 + col * 26} y={110 + row * 25} width="20" height="18" fill={(row + col) % 4 === 0 ? WINDOW_GLOW : '#0a1f36'} />
        )),
      )}
      {/* right tower */}
      <rect x="480" y="180" width="140" height="240" fill="#0a1f36" />
      {Array.from({ length: 10 }).map((_, row) =>
        Array.from({ length: 5 }).map((_, col) => (
          <rect key={`r-${row}-${col}`} x={490 + col * 26} y={190 + row * 22} width="20" height="16" fill={(row + col) % 3 === 0 ? WINDOW_GLOW : '#0a1f36'} />
        )),
      )}
      {/* construction crane far right */}
      <rect x="640" y="100" width="10" height="280" fill={GOLD} />
      <rect x="640" y="100" width="60" height="6" fill={GOLD} />
      {/* palm trees */}
      <rect x="20" y="380" width="8" height="50" fill="#0a1f36" />
      <ellipse cx="24" cy="375" rx="22" ry="10" fill="#1a3a2a" />
      <rect x="770" y="380" width="8" height="50" fill="#0a1f36" />
      <ellipse cx="774" cy="375" rx="22" ry="10" fill="#1a3a2a" />
      {/* sunset */}
      <ellipse cx="400" cy="240" rx="380" ry="80" fill={GOLD} opacity="0.2" />
    </Frame>
  )
}

function PrivateCreditArt() {
  return (
    <Frame viewBox="0 0 800 500">
      <rect width="800" height="500" fill="url(#sky)" />
      {/* blurred bokeh */}
      {[80, 200, 600, 720].map((x, i) => (
        <circle key={i} cx={x} cy={120 + (i % 2) * 100} r="80" fill={GOLD} opacity="0.2" />
      ))}
      {[150, 400, 650].map((x, i) => (
        <circle key={`b-${i}`} cx={x} cy={300 + (i % 2) * 60} r="60" fill={WARM} opacity="0.18" />
      ))}
      {/* desk */}
      <rect y="380" width="800" height="120" fill={WARM} opacity="0.4" />
      <rect y="380" width="800" height="120" fill={GOLD} opacity="0.1" />
      {/* arms */}
      <path d="M50 460 L300 350 L360 360 L360 460 Z" fill="#0a1f36" />
      <path d="M750 460 L500 350 L440 360 L440 460 Z" fill="#1a2a44" />
      {/* cuffs */}
      <rect x="290" y="335" width="30" height="22" fill="#ffffff" />
      <rect x="480" y="335" width="30" height="22" fill="#ffffff" />
      {/* clasped hands */}
      <ellipse cx="400" cy="345" rx="60" ry="40" fill="#a87b48" />
      <ellipse cx="400" cy="345" rx="60" ry="40" fill={GOLD} opacity="0.15" />
      <path d="M350 335 Q400 300 450 335 Q450 380 400 390 Q350 380 350 335 Z" fill="#a87b48" opacity="0.85" />
      <path d="M360 345 Q400 310 440 345" stroke="#7d5a30" strokeWidth="1.5" fill="none" />
      {/* warm spotlight */}
      <ellipse cx="400" cy="220" rx="320" ry="100" fill={GOLD} opacity="0.22" />
    </Frame>
  )
}

function GrowthCapitalArt() {
  return (
    <Frame viewBox="0 0 800 500">
      <rect width="800" height="500" fill="#1a3a2a" />
      {/* bokeh leaves */}
      {Array.from({ length: 30 }).map((_, i) => {
        const x = (i * 73) % 800
        const y = (i * 47) % 400
        const r = 20 + (i % 4) * 10
        return <circle key={i} cx={x} cy={y} r={r} fill={GOLD} opacity={0.08 + (i % 3) * 0.04} />
      })}
      {/* wooden table */}
      <rect y="350" width="800" height="150" fill="#5a3e1f" />
      <rect y="350" width="800" height="6" fill="#7d5a30" />
      {/* coin stacks ascending */}
      {[
        { x: 100, h: 30 },
        { x: 220, h: 60 },
        { x: 340, h: 90 },
        { x: 460, h: 120 },
        { x: 580, h: 150 },
      ].map((c, i) => (
        <g key={i}>
          {Array.from({ length: Math.floor(c.h / 14) }).map((_, j) => (
            <ellipse key={j} cx={c.x} cy={350 - j * 14} rx="36" ry="10" fill={GOLD} />
          ))}
          <ellipse cx={c.x} cy={350 - c.h} rx="36" ry="10" fill={GOLD_LIGHT} />
        </g>
      ))}
      {/* saplings between stacks */}
      {[160, 280, 400, 520].map((x, i) => (
        <g key={x}>
          <line x1={x} y1="350" x2={x} y2={300 - i * 8} stroke="#1a3a2a" strokeWidth="3" />
          <circle cx={x} cy={290 - i * 8} r="14" fill="#2d5a3a" />
          <circle cx={x - 8} cy={295 - i * 8} r="9" fill="#2d5a3a" />
          <circle cx={x + 8} cy={295 - i * 8} r="9" fill="#2d5a3a" />
        </g>
      ))}
      {/* sunlight rays */}
      <ellipse cx="400" cy="100" rx="280" ry="80" fill={WINDOW_GLOW} opacity="0.4" />
      <line x1="100" y1="0" x2="200" y2="400" stroke={GOLD} strokeWidth="1" opacity="0.4" />
      <line x1="700" y1="0" x2="600" y2="400" stroke={GOLD} strokeWidth="1" opacity="0.4" />
    </Frame>
  )
}

function CapitalConnectArt() {
  return (
    <Frame viewBox="0 0 800 500">
      <rect width="800" height="500" fill="url(#sky)" />
      {/* floor-to-ceiling window panes */}
      <rect width="800" height="380" fill="#0f1f33" />
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={i} x1={i * 140} y1="0" x2={i * 140} y2="380" stroke={GOLD} strokeWidth="1" opacity="0.3" />
      ))}
      {/* city */}
      {[40, 120, 280, 460, 600, 720].map((x, i) => (
        <rect key={x} x={x} y={120 + (i % 3) * 40} width={50} height={260 - (i % 3) * 40} fill="#3a4a5a" opacity="0.5" />
      ))}
      {/* team */}
      {[150, 280, 420, 560, 680].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={220} r={i === 2 ? 30 : 26} fill="#a87b48" />
          <path d={`M${x - 40} 380 Q${x - 40} 270 ${x} 270 Q${x + 40} 270 ${x + 40} 380 Z`} fill={['#0a1f36', '#1a3a6e', '#c9a961', '#0a1f36', '#1a2a44'][i]} />
          {/* tablet / papers */}
          {i % 2 === 0 && <rect x={x - 16} y={310} width="32" height="40" fill={WARM} />}
        </g>
      ))}
      {/* floor */}
      <rect y="380" width="800" height="120" fill="#0a1f36" />
      <rect y="380" width="800" height="6" fill={GOLD} opacity="0.4" />
      {/* warm light */}
      <ellipse cx="400" cy="200" rx="380" ry="80" fill={WINDOW_GLOW} opacity="0.18" />
    </Frame>
  )
}

/* -----------------------------------------------------------------------------
   Registry
   ----------------------------------------------------------------------------- */

const registry: Record<IllustrationKey, () => ReactNode> = {
  homeLoans: HomeLoansArt,
  balanceTransfer: BalanceTransferArt,
  topUp: TopUpArt,
  construction: ConstructionArt,
  renovation: RenovationArt,
  loanAgainst: LoanAgainstArt,
  workingCapital: WorkingCapitalArt,
  businessLoans: BusinessLoansArt,
  secured: SecuredArt,
  expansion: ExpansionArt,
  machinery: MachineryArt,
  capex: CapexArt,
  refinance: RefinanceArt,
  realEstate: RealEstateArt,
  privateCredit: PrivateCreditArt,
  growthCapital: GrowthCapitalArt,
  capitalConnect: CapitalConnectArt,
}

export function Illustration({ art, className }: IllustrationProps) {
  const Cmp = registry[art]
  return (
    <div className={className} aria-hidden="true">
      <Cmp />
    </div>
  )
}