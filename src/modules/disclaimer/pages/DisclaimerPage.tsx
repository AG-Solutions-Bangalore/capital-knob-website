/**
 * DisclaimerPage — renders the full CapitalKnob legal disclaimer.
 * Content mirrors the master disclaimer document approved by the company.
 */

import { PageHero } from '@/shared/components/PageHero'
import { Container } from '@/shared/components/Container'

const sections = [
  {
    heading: 'Nature of Services',
    body: 'CapitalKnob is a capital advisory, financial facilitation, and business consulting platform. CapitalKnob acts as an intermediary, introducer, coordinator, and advisory service provider connecting eligible individuals, businesses, promoters, developers, investors, lenders, financial institutions, NBFCs, banks, private credit funds, family offices, strategic investors, and other market participants, subject to applicable laws and commercial arrangements.',
  },
  {
    heading: 'Regulatory Status',
    body: 'CapitalKnob is not a bank, NBFC, financial institution, housing finance company, stock exchange, portfolio manager, mutual fund, alternative investment fund, credit rating agency, trustee, depository participant, investment adviser, research analyst, or securities intermediary, unless specifically stated for any particular activity through appropriately authorised third-party entities.\n\nCapitalKnob is not registered with the Securities and Exchange Board of India (SEBI) as an Investment Adviser, Research Analyst, Portfolio Manager, Alternative Investment Fund, Merchant Banker, or any other SEBI-regulated intermediary, and is not registered with the Reserve Bank of India (RBI) as a bank, NBFC, housing finance company, or regulated lender.',
  },
  {
    heading: 'No Guarantees or Binding Commitments',
    body: 'CapitalKnob does not accept public deposits, lend funds from its own balance sheet, issue financial products, provide regulated investment advice, undertake discretionary portfolio management, guarantee returns, guarantee funding, guarantee loan approvals, guarantee investment performance, or make binding commitments on behalf of any bank, lender, investor, fund, or financial institution.',
  },
  {
    heading: 'Indicative Nature of Proposals',
    body: 'All loan products, funding proposals, structured finance transactions, project finance arrangements, debt solutions, investment opportunities, capital raising assignments, private placements, real estate funding proposals, family office interactions, investor introductions, and financial solutions presented on this website are indicative in nature and remain subject to detailed due diligence, eligibility criteria, legal review, commercial negotiations, risk assessment, documentation, internal policies, regulatory requirements, and final approval by the respective banks, NBFCs, financial institutions, investors, funds, family offices, developers, strategic partners, or other participating entities.',
  },
  {
    heading: 'No Offer or Solicitation',
    body: 'Any references to loans, funding, investments, capital raising, project finance, structured debt, private credit, unlisted securities, mutual funds, AIFs, PMS, real estate investments, private placements, family office opportunities, or alternative investments are intended solely to describe market opportunities, facilitation services, or educational information and should not be construed as an offer, solicitation, recommendation, assurance, invitation, or regulated investment advice.',
  },
  {
    heading: 'Investment Risks',
    body: 'Investments in securities, mutual funds, unlisted shares, alternative investments, private equity, venture capital, private credit, real estate, structured products, or any other financial instruments are subject to market risks, liquidity risks, valuation risks, regulatory risks, business risks, and other associated risks. Past performance, illustrative returns, projected outcomes, or market examples are not indicative of future results. Users should undertake independent due diligence and seek advice from qualified legal, tax, accounting, and SEBI-registered professionals before making any investment or financial decisions.',
  },
  {
    heading: 'Lender Determination of Terms',
    body: 'Loan approvals, sanction amounts, interest rates, tenure, collateral requirements, processing timelines, security structures, and other financing terms are determined solely by the respective lenders, banks, NBFCs, financial institutions, investors, or capital providers based on their internal policies and applicable regulations. Submission of enquiries, discussions, or documents through this website does not create any obligation or guarantee of approval, funding, transaction completion, or investment outcome.',
  },
  {
    heading: 'No Cash Payments',
    body: 'CapitalKnob does not collect cash payments through field representatives or marketing personnel. Users are advised not to transfer funds to any individual claiming association with CapitalKnob unless specifically instructed through official company communication channels and supported by valid documentation.',
  },
  {
    heading: 'Content Accuracy',
    body: 'The content published on this website, including articles, blogs, reports, market insights, case studies, examples, calculators, presentations, and illustrations, is intended for informational purposes only and may not be complete, current, or applicable to every situation. Users should independently verify all information before relying upon it for business, financial, legal, investment, or borrowing decisions.',
  },
  {
    heading: 'User Consent & Communication',
    body: 'By submitting enquiries, forms, or contact details through this website, users consent to being contacted by CapitalKnob and its authorised associates through telephone, SMS, email, WhatsApp, or other communication channels for the purpose of responding to enquiries, providing information, or facilitating services, subject to the Privacy Policy and applicable laws.',
  },
  {
    heading: 'Right to Modify',
    body: 'CapitalKnob reserves the right to modify, update, discontinue, or revise any information, services, products, or content on this website without prior notice.',
  },
  {
    heading: 'Acceptance of Terms',
    body: 'Use of this website constitutes acceptance of this Disclaimer, the Privacy Policy, Terms of Use, and all applicable laws and regulations.',
  },
]

export function DisclaimerPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Disclaimer"
        subtitle="The information, materials, products, services, articles, reports, calculators, illustrations, and content available on this website are provided by CapitalKnob Investment & Financial Advisors Private Limited for general informational, educational, business facilitation, and capital advisory purposes only."
      />

      
        <Container size="md" className="py-14 md:py-20">
          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.heading} className="disclaimer-section">
                <h2 className="font-display text-lg font-bold text-navy md:text-xl">
                  {s.heading}
                </h2>
                <div className="mt-3 space-y-3">
                  {s.body.split('\n\n').map((para, i) => (
                    <p key={i} className="text-sm leading-relaxed text-muted md:text-base">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Effective date note */}
          <p className="mt-14 border-t border-line pt-6 text-xs text-muted">
            This disclaimer was last reviewed and updated in September 2026. CapitalKnob Investment &amp;
            Financial Advisors Private Limited reserves the right to amend this disclaimer at any time
            without prior notice.
          </p>
        </Container>
      
    </>
  )
}
