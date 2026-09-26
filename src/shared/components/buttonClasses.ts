import { cn } from '@/shared/lib/cn'

export type ButtonVariant = 'gold' | 'outline' | 'ghost' | 'navy'
export type ButtonSize = 'sm' | 'md' | 'lg'

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  // Gold with dark ink text for 4.5:1 contrast (white on gold is ~2.3:1, fails WCAG).
  gold: 'bg-gold text-ink hover:bg-gold-hover shadow-gold',
  navy: 'bg-navy text-white hover:bg-navy-soft shadow-card',
  outline: 'border border-line text-ink hover:border-gold hover:text-gold',
  ghost: 'text-ink hover:text-gold',
}

export const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

/**
 * Shared button visual language, usable on any element.
 * Lets navigation links (`<a>`) look exactly like buttons without ever
 * nesting a `<button>` inside an `<a>` (invalid HTML).
 */
export const buttonClassNames = ({
  variant = 'gold',
  size = 'md',
  className,
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
} = {}) =>
  cn(
    'inline-flex items-center cursor-pointer justify-center gap-2 rounded-button font-semibold',
    'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold/40',
    'disabled:cursor-not-allowed disabled:opacity-50',
    buttonVariantClasses[variant],
    buttonSizeClasses[size],
    className,
  )
