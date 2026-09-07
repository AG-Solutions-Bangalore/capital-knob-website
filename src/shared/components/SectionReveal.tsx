/**
 * SectionReveal — viewport-triggered reveal animation.
 *
 * The wrapper element itself is static (no opacity / blur / translate on the
 * section). Instead, every direct child of the section is wrapped in a
 * framer-motion node that starts blurred + nudged downward, then resolves
 * to its final sharp, in-place state the first time the section enters
 * the viewport. Children animate sequentially with a configurable stagger
 * so the page feels like it draws itself in.
 *
 * Why children, not the section:
 *  - The section often carries a background color, image, or full-bleed
 *    shape that should NOT blur away — the reveal needs to live on top of
 *    that surface, not on it.
 *  - Animating children individually lets each block resolve into place
 *    while the rest of the section stays anchored and legible.
 *
 * Defaults are tuned for a calm, premium feel:
 *  - 16px downward translate
 *  - 12px blur
 *  - 0.7s ease-out per child
 *  - 0.1s stagger between children
 *  - Triggers 80px before the section enters the viewport
 *  - Plays once
 *
 * Built with framer-motion so the GPU-friendly `filter` and `transform`
 * properties are interpolated smoothly.
 */

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Children, isValidElement, type ReactNode } from 'react'

type SectionTag = 'section' | 'div' | 'article' | 'aside' | 'main' | 'header' | 'footer' | 'nav'

export interface SectionRevealProps {
  children: ReactNode
  /** Wrapper element. Defaults to <section>. */
  as?: SectionTag
  /** Optional className applied to the wrapper. */
  className?: string
  /** Vertical offset (px) each child starts from. */
  yOffset?: number
  /** Initial blur radius (px). 0 disables the blur reveal. */
  blur?: number
  /** Duration of each child's reveal in seconds. */
  duration?: number
  /** Delay before the first child reveals (seconds). */
  delay?: number
  /** Time between successive children (seconds). */
  staggerDelay?: number
  /** How far before the section enters the viewport the animation triggers. */
  viewportMargin?: string
  /** If true, replays every time the section enters the viewport. */
  once?: boolean
}

export function SectionReveal({
  children,
  as = 'section',
  className,
  yOffset = 16,
  blur = 12,
  duration = 0.7,
  delay = 0,
  staggerDelay = 0.1,
  viewportMargin = '-80px',
  once = true,
}: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion()

  // The container only carries the trigger + the stagger orchestration.
  // It has no visual animation of its own — that's the whole point.
  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: prefersReducedMotion ? 0 : delay,
      },
    },
  }

  // Each child resolves from blurred + nudged to its final sharp, in-place state.
  const itemVariants: Variants = {
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
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  // Pick a typed motion component for the requested wrapper tag.
  // `motion[as]` is the official way to address every HTML element variant.
  const MotionContainer = motion[as] as typeof motion.section

  // Wrap every direct child in a motion node so each one inherits the
  // container's `hidden` / `show` state. Fragment children (multiple
  // siblings) and single-element children both work.
  const items = Children.toArray(children).filter(isValidElement)

  return (
    <MotionContainer
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: viewportMargin }}
      variants={containerVariants}
    >
      {items.map((child, idx) => (
        <motion.div
          key={isValidElement(child) && child.key ? child.key : idx}
          variants={itemVariants}
          className="will-change-[transform,opacity,filter]"
        >
          {child}
        </motion.div>
      ))}
    </MotionContainer>
  )
}
