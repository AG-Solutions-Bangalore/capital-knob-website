/**
 * SectionReveal — viewport-triggered reveal animation.
 *
 * Each section starts blurred + nudged downward, then resolves to its
 * final sharp, in-place state the first time it enters the viewport.
 * Built with framer-motion so the GPU-friendly `filter` and `transform`
 * properties are interpolated smoothly.
 *
 * Defaults are tuned for a calm, premium feel:
 *   - 16px downward translate
 *   - 12px blur
 *   - 0.7s ease-out
 *   - Triggers 80px before the section enters the viewport
 *   - Plays once
 */

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'

export interface SectionRevealProps {
  children: ReactNode
  /** Wrapper element. Defaults to <div>. */
  as?: ElementType
  /** Optional className applied to the wrapper. */
  className?: string
  /** Vertical offset (px) the element starts from. */
  yOffset?: number
  /** Initial blur radius (px). 0 disables the blur reveal. */
  blur?: number
  /** Duration of the reveal in seconds. */
  duration?: number
  /** Delay before the reveal starts (seconds). */
  delay?: number
  /** How far before the section enters the viewport the animation triggers. */
  viewportMargin?: string
  /** Force a fixed delay regardless of in-view order. */
  staggerIndex?: number
}

export function SectionReveal({
  children,
  as: Component = 'div',
  className,
  yOffset = 16,
  blur = 12,
  duration = 0.7,
  delay = 0,
  viewportMargin = '-80px',
  staggerIndex,
}: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion()

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : yOffset,
      filter: prefersReducedMotion ? 'blur(0px)' : `blur(${blur}px)`,
    },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay + (staggerIndex ?? 0) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  // motion(Component) is a runtime call; we type the rendered node via `as any`
  // to avoid the heavy generic gymnastics framer-motion ships for SSR.
  const MotionTag = motion(Component as ElementType)

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: viewportMargin }}
      variants={variants}
    >
      {children}
    </MotionTag>
  )
}
