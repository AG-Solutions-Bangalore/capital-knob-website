import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'

type Variant = 'gold' | 'outline' | 'ghost' | 'navy'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variantClasses: Record<Variant, string> = {
  // Gold with dark ink text for 4.5:1 contrast (white on gold is ~2.3:1, fails WCAG).
  gold: 'bg-gold text-ink hover:bg-gold-hover shadow-gold',
  navy: 'bg-navy text-white hover:bg-navy-soft shadow-card',
  outline: 'border border-line text-ink hover:border-gold hover:text-gold',
  ghost: 'text-ink hover:text-gold',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'gold', size = 'md', className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center cursor-pointer justify-center gap-2 rounded-button font-semibold',
        'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold/40',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  ),
)
Button.displayName = 'Button'