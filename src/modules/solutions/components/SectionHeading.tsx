/**
 * SectionHeading — left-aligned title with an optional right-aligned
 * description. Used by the Individuals + Businesses sections.
 */

import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

interface SectionHeadingProps {
  title: ReactNode
  subtitle?: ReactNode
  description?: ReactNode
  align?: 'left' | 'between'
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  description,
  align = 'between',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 pb-8 lg:flex-row lg:items-end lg:gap-12',
        align === 'left' && 'lg:flex-col lg:items-start lg:gap-3',
        className,
      )}
    >
      <div className="lg:max-w-xl">
        <h2 className="font-display text-3xl font-extrabold leading-tight text-ink md:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
            {subtitle}
          </p>
        )}
      </div>
      {description && (
        <p
          className={cn(
            'max-w-lg text-sm leading-relaxed text-muted md:text-base',
            align === 'between' && 'lg:ml-auto',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}