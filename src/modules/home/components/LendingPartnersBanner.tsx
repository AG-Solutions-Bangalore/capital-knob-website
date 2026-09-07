import { Container } from '@/shared/components/Container'

export function LendingPartnersBanner() {
  return (
    <section className="border-b border-line bg-white py-5 shadow-xs">
      <Container size="4xl">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
          {/* Label */}
          <div className="shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-muted md:text-sm">
              Our Lending Partners
            </span>
          </div>

          {/* Bank Logos Strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3.5 sm:gap-8 md:justify-between lg:flex-1">
            {/* HDFC Bank */}
            <div className="flex items-center gap-1.5 transition-opacity hover:opacity-85" title="HDFC Bank">
              <div className="flex h-6 items-center bg-[#004c8f] px-2 py-0.5 text-[11px] font-black tracking-tighter text-white">
                <span className="mr-1 inline-block h-3 w-3 bg-[#ed232a]" />
                HDFC BANK
              </div>
            </div>

            {/* ICICI Bank */}
            <div className="flex items-center gap-1.5 transition-opacity hover:opacity-85" title="ICICI Bank">
              <div className="flex items-center">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f37021] text-[10px] font-black text-white">
                  i
                </span>
                <span className="ml-1 text-xs font-black tracking-tight text-[#a61d24]">
                  ICICI Bank
                </span>
              </div>
            </div>

            {/* State Bank of India (SBI) */}
            <div className="flex items-center gap-1.5 transition-opacity hover:opacity-85" title="State Bank of India">
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
            </div>

            {/* Axis Bank */}
            <div className="flex items-center gap-1.5 transition-opacity hover:opacity-85" title="Axis Bank">
              <div className="flex items-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#97144d" aria-hidden="true">
                  <polygon points="12,2 22,22 14,22 10,14 14,14 10,6" />
                </svg>
                <span className="ml-1 text-xs font-black tracking-tight text-[#97144d]">
                  AXIS BANK
                </span>
              </div>
            </div>

            {/* Kotak Mahindra Bank */}
            <div className="flex items-center gap-1.5 transition-opacity hover:opacity-85" title="Kotak Mahindra Bank">
              <div className="flex items-center">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ed1c24] text-[10px] font-black text-white">
                  cc
                </span>
                <span className="ml-1 text-xs font-black tracking-tight text-[#003366]">
                  kotak
                </span>
              </div>
            </div>

            {/* IndusInd Bank */}
            <div className="flex items-center gap-1.5 transition-opacity hover:opacity-85" title="IndusInd Bank">
              <span className="text-xs font-black tracking-tight text-[#982229]">
                IndusInd Bank
              </span>
            </div>

            {/* Bank of Baroda */}
            <div className="flex items-center gap-1.5 transition-opacity hover:opacity-85" title="Bank of Baroda">
              <div className="flex items-center">
                <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-[#f26522] text-[9px] font-black text-white">
                  BOB
                </span>
                <span className="ml-1 text-[11px] font-black tracking-tight text-[#333333]">
                  BANK OF BARODA
                </span>
              </div>
            </div>

            {/* And Many More */}
            <span className="text-xs font-medium text-muted">
              And Many More...
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}
