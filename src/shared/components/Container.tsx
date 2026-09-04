import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | "2xl" | "3xl" | "4xl"
}

const sizeClasses = {
  "sm": 'max-w-3xl',
  "md": 'max-w-5xl',
  "lg": 'max-w-6xl',
  "xl": 'max-w-7xl',
  "2xl": 'max-w-8xl',
  "3xl": 'max-w-9xl',
  "4xl": 'max-w-10xl'
} as const

export function Container({ size = '2xl', className, children, ...props }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-4 sm:px-8 lg:px-16', sizeClasses[size], className)} {...props}>
      {children}
    </div>
  )
}