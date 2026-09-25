import { Link } from 'react-router-dom'
import { ROUTES } from '@/app/routes'
import { cn } from '@/shared/lib/cn'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import { useCompanyQuery } from '@/modules/company/hooks/useCompanyQuery'

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

const LOGO_DIMS = {
  horizontal: { width: 415, height: 100 },
  stacked: { width: 298, height: 230 },
} as const

export function Logo({ variant = 'light', layout = 'horizontal', className }: LogoProps) {
  void variant

  // Dynamic logo: live `company_logo` against the API `Company` base when
  // uploaded, else the bundled static logo. Path always comes from the API.
  const { data } = useCompanyQuery()
  const liveFile = data?.data.company_logo?.trim()
  const liveBase =
    data?.image_url?.find((e) => e.image_for === 'Company')?.image_url ?? ''
  const liveSrc = liveFile ? `${liveBase}${liveFile}` : null

  return (
    <Link
      to={ROUTES.home}
      title={linkTitleFor(ROUTES.home)}
      className={cn('inline-flex leading-none', className)}
    >
      <img
        src={liveSrc ?? LOGO_SRC[layout]}
        width={LOGO_DIMS[layout].width}
        height={LOGO_DIMS[layout].height}
        alt="CapitalKnob – Loan and Investment"
        title="CapitalKnob – Loan and Investment"
        decoding="async"
        fetchPriority="low"
        className={cn(
          'w-auto',
          layout === 'horizontal' ? 'h-10 sm:h-11' : 'h-24',
        )}
      />
    </Link>
  )
}
