import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /**
   * Maximum width bucket. Mobile-first: anything from `sm` to `4xl` sets an
   * upper bound; the container is always fluid below that bound so a 320px
   * phone and a 1920px desktop both render correctly.
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  /**
   * Horizontal padding preset. Defaults to `responsive` so a child never
   * bleeds to the viewport edge on phones.
   */
  pad?: 'none' | 'responsive' | 'tight' | 'flush'
}

/**
 * Tailwind v4 ships `max-w-3xl` (48rem), `max-w-5xl` (64rem), `max-w-6xl`
 * (72rem), and `max-w-7xl` (80rem) by default. For wider layouts we lean on
 * the arbitrary-value `max-w-[1720px]` so the visual width matches the
 * reference design at ultra-wide breakpoints.
 */
const sizeClasses = {
  sm: 'max-w-3xl',                 // 48rem  · 768px
  md: 'max-w-5xl',                 // 64rem  · 1024px
  lg: 'max-w-6xl',                 // 72rem  · 1152px
  xl: 'max-w-7xl',                 // 80rem  · 1280px
  '2xl': 'max-w-[1440px]',         // 90rem  · 1440px
  '3xl': 'max-w-[1600px]',         // 100rem · 1600px
  '4xl': 'max-w-[1720px]',         // 107.5rem · 1720px — the design's outer bound
} as const

const padClasses = {
  none: '',
  // Generous, luxurious horizontal breathing room on every screen size:
  // 24px on phones, 32px on small tablets, 40px on tablets, 48px on laptops, 64px on desktops, 80px on ultrawide.
  responsive: 'px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20',
  // For dense UI where a hair less padding is desired.
  tight: 'px-4 sm:px-6 md:px-8 lg:px-10',
  // No gutter at all — caller is responsible for inner spacing.
  flush: '',
} as const

export function Container({
  size = '2xl',
  pad = 'responsive',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto box-border w-full',
        padClasses[pad],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
