/**
 * CertificateCardColor — success-story card for the marquee.
 *
 * Mirrors igli's `TestimonialCardColor` (gold border, optional corner
 * badge) but renders the reusable `CertificateSvg` artwork fed by live
 * testimonial API fields — no image files. Renders an anchor when `href`
 * is provided, else a div.
 */

import { cn } from '@/shared/lib/cn'
import { CertificateSvg } from './CertificateSvg'

interface CertificateCardColorProps {
  /** Customer name → cert headline. */
  name: string
  /** Detail line (live `testimonial_description`, truncated in SVG). */
  detail?: string
  /** 1–5 → cert stars row. */
  rating?: number
  /** Cert footer, e.g. "VERIFIED · 22 SEP 2026". */
  footer?: string
  /** Seal color — parent alternates per index for variety. */
  seal?: 'gold' | 'navy' | 'green'
  /** Optional corner badge (API has no course field, so usually omitted). */
  badgeLabel?: string
  badgeClassName?: string
  href?: string
  target?: string
  className?: string
}

export function CertificateCardColor({
  name,
  detail,
  rating,
  footer,
  seal = 'gold',
  badgeLabel,
  badgeClassName,
  href,
  target,
  className,
}: CertificateCardColorProps) {
  const Tag = href ? 'a' : 'div'

  return (
    <Tag
      {...(href
        ? { href, target: target || '_blank', rel: 'noopener noreferrer' }
        : {})}
      aria-label={`${name} — customer success story`}
      className={cn(
        'group relative flex shrink-0 flex-col overflow-hidden rounded-lg border-2 border-gold bg-white',
        className,
      )}
    >
      {badgeLabel ? (
        <div
          className={cn(
            'absolute right-0 top-0 z-10 rounded-md px-3 py-1 text-xs font-semibold backdrop-blur-sm',
            badgeClassName ?? 'bg-gold/15 text-gold-hover',
          )}
        >
          {badgeLabel}
        </div>
      ) : null}
      <div className="flex h-full w-full items-center justify-center overflow-hidden">
        <CertificateSvg
          name={name}
          detail={detail}
          rating={rating}
          footer={footer}
          seal={seal}
        />
      </div>
    </Tag>
  )
}

export default CertificateCardColor
