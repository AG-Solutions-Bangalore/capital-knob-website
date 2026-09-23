import { cn } from '@/shared/lib/cn'

export interface TestimonialCardProps {
  name: string
  detail?: string
  rating?: number
  footer?: string
  href?: string
  target?: string
  className?: string
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase() || 'CK'
}

export function TestimonialCard({
  name,
  detail,
  rating = 5,
  footer,
  href,
  target,
  className,
}: TestimonialCardProps) {
  const stars = Math.min(5, Math.max(1, Math.round(rating) || 5))
  const initials = getInitials(name)
  const Tag = href ? 'a' : 'div'

  return (
    <Tag
      {...(href ? { href, target: target || '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label={`${name} — customer review`}
      className={cn(
        'group relative flex shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-soft transition-all duration-300 hover:border-gold/50 hover:shadow-card md:p-6',
        className,
      )}
    >
      {/* Top row: Star Rating + Quote Icon */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1" aria-label={`${stars} out of 5 stars`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={cn(
                'h-4 w-4 shrink-0 transition-colors',
                star <= stars ? 'fill-gold text-gold' : 'fill-slate-200 text-slate-200',
              )}
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Decorative Quote Icon */}
        <span className="text-gold/30 transition-colors duration-200 group-hover:text-gold/60" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </span>
      </div>

      {/* Middle: Review Quote Body */}
      <p className="my-3 line-clamp-3 text-sm leading-relaxed text-slate-600 md:text-[15px]">
        {detail ? `“${detail}”` : '“CapitalKnob provided outstanding advisory and made securing our capital seamless.”'}
      </p>

      {/* Bottom: Client Profile & Verified Tag */}
      <div className="flex items-center gap-3 border-t border-slate-100 pt-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold tracking-wider text-gold ring-2 ring-gold/20"
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="truncate font-display text-sm font-bold text-navy">
              {name}
            </h4>
            <span
              className="inline-flex shrink-0 items-center text-emerald-600"
              title="Verified Customer"
              aria-label="Verified Customer"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          {footer && (
            <p className="truncate text-[11px] font-medium text-slate-400">
              {footer}
            </p>
          )}
        </div>
      </div>
    </Tag>
  )
}

export default TestimonialCard
