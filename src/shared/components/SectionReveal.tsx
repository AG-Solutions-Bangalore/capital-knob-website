/**
 * SectionReveal — viewport-triggered reveal animation (zero-JS animation lib).
 *
 * The wrapper element itself is static. Every direct child starts blurred +
 * nudged downward, then resolves to its final state the first time the
 * section enters the viewport. Children animate sequentially with a
 * configurable stagger.
 *
 * Implementation: IntersectionObserver toggles `.section-reveal-visible`
 * on the wrapper; CSS transitions (see index.css `.section-reveal-item`)
 * do the rest — no framer-motion, no GPU-unfriendly JS.
 */

import {
  Children,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

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
  /** Root margin for the IntersectionObserver (e.g. '-80px'). */
  viewportMargin?: string
  /** If true, plays once. If false, replays every time it enters. */
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
  const ref = useRef<HTMLElement | null>(null)
  // Visible immediately when reduced-motion is preferred or IO is missing
  // (computed in the initializer so the effect never calls setState directly).
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
    if (typeof IntersectionObserver === 'undefined') return true
    return false
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (visible) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.disconnect()
          } else if (!once) {
            setVisible(false)
          }
        }
      },
      { rootMargin: viewportMargin, threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [viewportMargin, once, visible])

  const Tag = as as 'section'
  const items = Children.toArray(children).filter(isValidElement)

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`${className ?? ''} ${visible ? 'section-reveal-visible' : ''}`.trim() || undefined}
    >
      {items.map((child, idx) => (
        <div
          key={isValidElement(child) && child.key ? child.key : idx}
          className="section-reveal-item"
          style={
            {
              '--reveal-y': `${yOffset}px`,
              '--reveal-blur': `${blur}px`,
              '--reveal-duration': `${duration}s`,
              '--reveal-delay': `${delay + idx * staggerDelay}s`,
            } as CSSProperties
          }
        >
          {child}
        </div>
      ))}
    </Tag>
  )
}
