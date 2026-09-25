/**
 * CertificateSvg — ONE reusable success-story artwork.
 *
 * Parameterized SVG (680×440) rendered from live testimonial API fields:
 * customer name, detail line, star rating, footer. No mock image files —
 * every card in the marquee is an instance of this component with different
 * prop values.
 */

interface CertificateSvgProps {
  /** Customer name → big serif headline. */
  name: string
  /** Detail line under the name (loan info / short quote). */
  detail?: string
  /** 1–5 → gold stars row. */
  rating?: number
  /** Small-caps footer, e.g. "VERIFIED · 22 SEP 2026". */
  footer?: string
  /** Seal color. Alternates per card for variety. */
  seal?: 'gold' | 'navy' | 'green'
  title?: string
}

function truncate(value: string, limit: number): string {
  const text = value.trim()
  return text.length > limit ? `${text.slice(0, limit).trimEnd()}…` : text
}

const SEAL_FILL = {
  gold: '#C9A961',
  navy: '#0B1D3A',
  green: '#16A34A',
} as const

export function CertificateSvg({
  name,
  detail,
  rating = 5,
  footer = 'VERIFIED CUSTOMER',
  seal = 'gold',
  title,
}: CertificateSvgProps) {
  const stars = Math.min(5, Math.max(1, Math.round(rating) || 5))
  const starRow = '★'.repeat(stars) + '☆'.repeat(5 - stars)
  // React escapes SVG text children automatically, so raw values are safe.
  const displayName = truncate(name, 28)
  const displayDetail = detail ? truncate(detail, 52) : ''
  const displayFooter = truncate(footer, 40).toUpperCase()

  return (
    <svg
      viewBox="0 0 680 440"
      role="img"
      aria-label={title ?? `${name} — customer success story`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect width="680" height="440" fill="#FDFBF5" />
      <rect x="14" y="14" width="652" height="412" fill="none" stroke="#0B1D3A" strokeWidth="3" />
      <rect x="26" y="26" width="628" height="388" fill="none" stroke="#C9A961" strokeWidth="1.5" />
      <text x="340" y="82" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="24" letterSpacing="8" fill="#0B1D3A">
        CAPITALKNOB
      </text>
      <text x="340" y="108" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" letterSpacing="4" fill="#B8964F">
        CUSTOMER SUCCESS STORY
      </text>
      <line x1="170" y1="130" x2="510" y2="130" stroke="#C9A961" strokeWidth="1.5" />
      <text x="340" y="188" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="42" fontWeight="bold" fill="#0B1D3A">
        {displayName}
      </text>
      {displayDetail ? (
        <text x="340" y="230" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="21" fill="#334155">
          {displayDetail}
        </text>
      ) : null}
      <text x="340" y={displayDetail ? 272 : 250} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="30" letterSpacing="6" fill="#C9A961">
        {starRow}
      </text>
      <circle cx="576" cy="330" r="46" fill={SEAL_FILL[seal]} />
      <circle cx="576" cy="330" r="38" fill="none" stroke="#FFFFFF" strokeWidth="2" />
      <polyline points="558,330 571,343 595,317" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <text x="340" y="356" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" letterSpacing="3" fill="#64748B">
        {displayFooter}
      </text>
    </svg>
  )
}

export default CertificateSvg
