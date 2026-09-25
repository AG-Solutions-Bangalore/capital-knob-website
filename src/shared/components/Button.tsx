import { forwardRef, type ButtonHTMLAttributes } from 'react'
import {
  buttonClassNames,
  type ButtonSize,
  type ButtonVariant,
} from './buttonClasses'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'gold', size = 'md', className, ...props }, ref) => (
    <button
      ref={ref}
      className={buttonClassNames({ variant, size, className })}
      {...props}
    />
  ),
)
Button.displayName = 'Button'
