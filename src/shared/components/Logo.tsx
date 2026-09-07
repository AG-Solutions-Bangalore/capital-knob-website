import { Link } from 'react-router-dom'
import { ROUTES } from '@/app/routes'
import { cn } from '@/shared/lib/cn'
import { linkTitleFor } from '@/shared/seo/linkTitles'

interface LogoProps {
  /**
   * Kept for API compatibility (header/footer pass it). Both logo assets
   * ship on a light background, so they render on light surfaces; a
   * separate dark-surface asset will be needed if a navy footer returns.
   */
  variant?: 'light' | 'dark'
  /** `horizontal` for the header, `stacked` for roomier slots like the footer. */
  layout?: 'horizontal' | 'stacked'
  className?: string
}

const LOGO_SRC = {
  horizontal: '/logo-horizontal.webp',
  stacked: '/logo-stacked.webp',
} as const

export function Logo({ variant = 'light', layout = 'horizontal', className }: LogoProps) {
  void variant

  return (
    <Link
      to={ROUTES.home}
      title={linkTitleFor(ROUTES.home)}
      className={cn('inline-flex leading-none', className)}
    >
      <img
        src={LOGO_SRC[layout]}
        alt="CapitalKnob – Loan and Investment"
        decoding="async"
        className={cn(
          'w-auto',
          layout === 'horizontal' ? 'h-10 sm:h-11' : 'h-24',
        )}
      />
    </Link>
  )
}
