import { Link } from 'react-router-dom'
import { ROUTES } from '@/app/routes'
import { cn } from '@/shared/lib/cn'
import { linkTitleFor } from '@/shared/seo/linkTitles'

interface LogoProps {
  variant?: 'light' | 'dark' // light = on navy bg, dark = on light bg
  className?: string
}

export function Logo({ variant = 'light', className }: LogoProps) {
  const taglineColor = variant === 'light' ? 'text-white/70' : 'text-muted'

  return (
    <Link
      to={ROUTES.home}
      title={linkTitleFor(ROUTES.home)}
      className={cn('inline-flex flex-col leading-none', className)}
    >
      <span className="flex items-baseline gap-0.5">
        <span className="font-display text-2xl font-extrabold text-brand-blue">Capital</span>
        <span className="font-display text-2xl font-extrabold text-gold">Knob</span>
      </span>
      <span className={cn('mt-1 text-[10px] font-medium uppercase tracking-wider', taglineColor)}>
        Unlock Your Capital Potential
      </span>
    </Link>
  )
}