import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Container } from '@/shared/components/Container'
import { useClientsQuery } from '@/modules/client/hooks/useClientQuery'

function clientName(c: { client_name?: string | null; clients_name?: string | null }): string {
  return c.clients_name?.trim() || c.client_name?.trim() || 'Lending Partner'
}

function clientImage(
  c: { client_image?: string | null; clients_image?: string | null },
  base: string,
  noImage: string | null,
): string | null {
  const file = (c.clients_image || c.client_image)?.trim()
  if (file) return `${base}${file}`
  return noImage
}

/** Static bank marks — loading / error / empty fallback so the strip never looks broken. */
function StaticBankMark({ name }: { name: string }) {
  switch (name) {
    case 'HDFC Bank':
      return (
        <div className="flex h-6 items-center bg-[#004c8f] px-2 py-0.5 text-[11px] font-black tracking-tighter text-white">
          <span className="mr-1 inline-block h-3 w-3 bg-[#ed232a]" />
          HDFC BANK
        </div>
      )
    case 'ICICI Bank':
      return (
        <div className="flex items-center">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f37021] text-[10px] font-black text-white">
            i
          </span>
          <span className="ml-1 text-xs font-black tracking-tight text-[#a61d24]">
            ICICI Bank
          </span>
        </div>
      )
    case 'State Bank of India':
      return (
        <div className="flex items-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#280071]" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="#00a5ec" />
            <circle cx="12" cy="10" r="3.5" fill="white" />
            <rect x="10.5" y="10" width="3" height="8" fill="white" />
          </svg>
          <span className="ml-1 text-xs font-black tracking-wide text-[#280071]">
            SBI
          </span>
        </div>
      )
    case 'Axis Bank':
      return (
        <div className="flex items-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#97144d" aria-hidden="true">
            <polygon points="12,2 22,22 14,22 10,14 14,14 10,6" />
          </svg>
          <span className="ml-1 text-xs font-black tracking-tight text-[#97144d]">
            AXIS BANK
          </span>
        </div>
      )
    case 'Kotak Mahindra Bank':
      return (
        <div className="flex items-center">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ed1c24] text-[10px] font-black text-white">
            cc
          </span>
          <span className="ml-1 text-xs font-black tracking-tight text-[#003366]">
            kotak
          </span>
        </div>
      )
    case 'IndusInd Bank':
      return (
        <span className="text-xs font-black tracking-tight text-[#982229]">
          IndusInd Bank
        </span>
      )
    default:
      return (
        <div className="flex items-center">
          <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-[#f26522] text-[9px] font-black text-white">
            BOB
          </span>
          <span className="ml-1 text-[11px] font-black tracking-tight text-[#333333]">
            BANK OF BARODA
          </span>
        </div>
      )
  }
}

const STATIC_BANKS = [
  'Axis Bank',
  'Bank of Baroda',
  'HDFC Bank',
  'ICICI Bank',
  'IndusInd Bank',
  'Kotak Mahindra Bank',
  'State Bank of India',
]

/** Minimum tiles per track so the loop always looks full and seamless. */
const MIN_TILES = 10

export function LendingPartnersBanner() {
  // Live lending partners (GET /getClient) with fully dynamic paths.
  // Logos scroll in an infinite marquee; the static bank set scrolls
  // the same way as the loading / error / empty fallback.
  const { data, isPending, isError } = useClientsQuery()
  const clients = data?.data ?? []
  const base =
    data?.image_url?.find((e) => e.image_for === 'Client')?.image_url ?? ''
  const noImage =
    data?.image_url?.find((e) => e.image_for === 'No Image')?.image_url ?? null
  const showLive = !isPending && !isError && clients.length > 0

  // Build the tile list, cycling to MIN_TILES so narrow sets still loop.
  const tiles: ReactNode[] = []
  if (showLive) {
    const liveTiles = clients.map((c, idx) => {
      const name = clientName(c)
      const src = clientImage(c, base, noImage)
      return (
        <div key={`live-${name}-${idx}`} title={name} className="flex shrink-0 items-center px-4 md:px-8">
          {src ? (
            <img
              src={src}
              alt={name}
              title={name}
              className="h-8 w-auto max-w-[120px] object-contain md:h-10 md:max-w-32"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="whitespace-nowrap text-xs font-black tracking-tight text-navy">
              {name}
            </span>
          )}
        </div>
      )
    })
    for (let i = 0; tiles.length < MIN_TILES; i++) {
      tiles.push(liveTiles[i % liveTiles.length])
    }
  } else {
    const staticTiles = STATIC_BANKS.map((name) => (
      <div
        key={`static-${name}`}
        title={name}
        className="flex shrink-0 items-center px-4 transition-opacity hover:opacity-85 md:px-8"
      >
        <StaticBankMark name={name} />
      </div>
    ))
    for (let i = 0; tiles.length < MIN_TILES; i++) {
      tiles.push(staticTiles[i % staticTiles.length])
    }
  }
  // Marquee pacing: measured track width / px-per-second (slower than the
  // testimonial strip so logos stay readable). Recomputed when tiles change.
  const trackRef = useRef<HTMLDivElement>(null)
  const [duration, setDuration] = useState(30)
  useEffect(() => {
    const width = trackRef.current?.scrollWidth ?? 0
    if (width > 0) setDuration(Math.max(15, width / 80))
  }, [showLive, clients.length])

  return (
    <section className="overflow-hidden border-b border-line bg-white py-4 md:py-5 shadow-xs">
      <Container size="4xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
          {/* Label + Mobile 'And Many More' in one top row */}
          <div className="flex items-center justify-between shrink-0 md:justify-start">
            <span className="whitespace-nowrap text-xs font-bold uppercase tracking-wider text-muted md:text-sm">
              Our Lending Partners
            </span>
            <span className="shrink-0 whitespace-nowrap text-xs font-medium text-muted md:hidden">
              And Many More...
            </span>
          </div>

          {/* Logo marquee — full width on mobile, middle flex-1 on desktop */}
          <div className="relative min-w-0 w-full flex-1 overflow-hidden">
            <div
              className="ck-marquee-group flex gap-4"
              style={{ ['--ck-duration' as string]: `${duration}s` }}
            >
              <div ref={trackRef} className="ck-marquee-track flex shrink-0 items-center gap-4">
                {tiles.map((t, i) => (
                  <span key={`first-${i}`} className="flex shrink-0 items-center">
                    {t}
                  </span>
                ))}
              </div>
              <div className="ck-marquee-track flex shrink-0 items-center gap-4" aria-hidden="true">
                {tiles.map((t, i) => (
                  <span key={`second-${i}`} className="flex shrink-0 items-center">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Fade edges */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent sm:w-16"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent sm:w-16"
            />
          </div>

          {/* Desktop trailing label */}
          <span className="hidden md:inline-block shrink-0 whitespace-nowrap text-xs font-medium text-muted">
            And Many More...
          </span>
        </div>
      </Container>
    </section>
  )
}
