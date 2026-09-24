/**
 * ScrollToTopButton — floating back-to-top button.
 *
 * Hidden at the top of the page; fades/slides in once the user scrolls
 * past `showAfter` px. Tapping scrolls smoothly to the very top.
 * Rendered once in MainLayout so it works on every route.
 */

import { useEffect, useState } from 'react'

export function ScrollToTopButton({ showAfter = 600 }: { showAfter?: number }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > showAfter)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [showAfter])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy text-gold shadow-card transition-all duration-300 hover:bg-gold hover:text-white ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  )
}

export default ScrollToTopButton
