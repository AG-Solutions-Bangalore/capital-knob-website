/**
 * PrivacyPolicyPage — all six CapitalKnob legal policies on one page.
 * Content mirrors the master policy document approved by the company:
 * Privacy Policy, Terms & Conditions, Cookie Policy, Grievance Redressal
 * Policy, Refund & Cancellation Policy, and Data Consent & Communication
 * Policy. Same layout language as DisclaimerPage.
 */

import { PageHero } from '@/shared/components/PageHero'
import { Container } from '@/shared/components/Container'

const LAST_UPDATED = 'September 2026'
const CONTACT_EMAIL = 'capitalknobil@gmail.com'
const GRIEVANCE_OFFICER = 'R Gautam'
// TODO: replace with the registered-office address if different.
const REGISTERED_OFFICE_ADDRESS =
  'Prestige Tech Park, 5th Floor, Outer Ring Road, Marathahalli, Bengaluru, Karnataka 560037'

/** Smooth-scrolls to an in-page anchor (Lenis owns wheel scroll; anchors jump by default). */
function scrollToAnchor(hash: string) {
  const el = document.querySelector(hash)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const EMAIL_RE = /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g

/** Renders plain policy text, auto-linking emails as tappable mailto: links. */
function renderRichText(text: string, keyPrefix: string) {
  // split() with a capture group alternates [text, email, text, email…]
  // so odd indices are always the matched emails — no stateful regex test.
  const parts = text.split(EMAIL_RE)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <a
        key={`${keyPrefix}-${i}`}
        href={`mailto:${part}`}
        title={`Email ${part}`}
        className="font-semibold text-navy underline decoration-gold/70 decoration-2 underline-offset-2 transition-colors duration-200 hover:text-gold-hover hover:decoration-gold"
      >
        {part}
      </a>
    ) : (
      <span key={`${keyPrefix}-${i}`}>{part}</span>
    ),
  )
}

interface Block {
  sub?: string
  paras?: string[]
  list?: string[]
}

interface Policy {
  id: string
  nav: string
  title: string
  intro?: string[]
  blocks: Block[]
}

const policies: Policy[] = [
  {
    id: 'privacy-policy',
    nav: 'Privacy Policy',
    title: 'Privacy Policy',
    intro: [
      'CapitalKnob Investment & Financial Advisors Private Limited ("CapitalKnob", "we", "us", or "our") respects the privacy of individuals and businesses who visit our website, submit enquiries, communicate with us, or use our services.',
      'This Privacy Policy explains how we collect, use, store, process, share, and protect personal and business information obtained through our website, forms, applications, communications, and business interactions.',
      'By accessing our website or voluntarily providing information to us, you acknowledge that you have read and understood this Privacy Policy.',
    ],
    blocks: [
      {
        sub: '1. About CapitalKnob',
        paras: [
          'CapitalKnob operates as a capital advisory, financial facilitation, business consulting, and introduction platform.',
          'Depending on the requirement, CapitalKnob may facilitate communication or introductions between customers and banks, NBFCs, financial institutions, investors, funds, developers, lenders, private capital providers, strategic partners, and other relevant parties.',
          'CapitalKnob does not represent itself as a bank, NBFC, regulated lender, or SEBI-registered intermediary unless expressly stated for a specific service through an appropriately authorised entity.',
        ],
      },
      {
        sub: '2. Information We May Collect',
        paras: ['Depending on the service requested, we may collect:'],
        list: [
          'Name; age or date of birth, gender, residential or correspondence address, mobile number, and email address, where relevant',
          'PAN or other identification information, and professional or employment information, where required',
          'Business information: business name, constitution/type of entity, industry, business vintage, annual turnover, profitability, existing borrowing, working capital and funding requirements, project details, property/collateral information, business financial information, and bank account and transaction information where voluntarily provided for assessment',
          'Documents voluntarily provided: financial statements, income-tax-related documents, GST information, bank statements, property documents, business registration documents, identity/address documents, existing loan documents, project reports, and other documents required for evaluation or facilitation',
        ],
      },
      {
        sub: '3. How We Collect Information',
        paras: ['Information may be collected through:'],
        list: [
          'Website, contact, and loan/funding enquiry forms',
          'Telephone conversations, email, WhatsApp or other messaging platforms, and meetings',
          'Referral and business partners, documents voluntarily submitted by users, cookies and website technologies, and other lawful business interactions',
        ],
      },
      {
        sub: '4. Purpose of Collection',
        paras: ['We may use information for purposes including:'],
        list: [
          'Responding to enquiries, understanding funding requirements, and assessing preliminary eligibility',
          'Preparing or coordinating proposals and facilitating introductions to relevant lenders or capital providers',
          'Providing requested advisory or consulting services, communicating regarding enquiries and transactions, and processing service-related documentation',
          'Customer relationship management, internal record keeping, fraud prevention and security, improving our services and website, marketing and communication where permitted and consented to, and complying with applicable legal and regulatory requirements',
        ],
      },
      {
        sub: '5. Sharing of Information',
        paras: [
          'Where necessary for the requested service, information may be shared with relevant third parties such as banks, NBFCs, financial institutions, lenders, investors, funds, developers, strategic partners, professional service providers, technology/service providers, authorised representatives, and legal, accounting, or compliance professionals.',
          'Information will be shared only where reasonably necessary for the relevant purpose, subject to applicable law and appropriate safeguards.',
          'CapitalKnob does not intend to sell personal information to unrelated third parties for their independent marketing purposes.',
        ],
      },
      {
        sub: '6. Financial Information',
        paras: [
          'Where financial or business information is submitted for a funding requirement, such information may be used to understand the requirement and facilitate evaluation by appropriate financial or capital providers.',
          'Submission of information does not guarantee loan approval, funding, investment, or transaction completion.',
          'Final decisions regarding lending, investment, underwriting, sanction, pricing, security, and transaction terms remain with the respective financial institution, lender, investor, fund, or capital provider.',
        ],
      },
      {
        sub: '7. Communication',
        paras: [
          'If you submit an enquiry, you may be contacted by CapitalKnob through telephone, SMS, email, WhatsApp, or other communication channels provided by you.',
          'Communications may relate to your enquiry, requested services, documentation, transaction updates, or relevant CapitalKnob services.',
          'Marketing communications will be handled in accordance with applicable law and available consent/preferences.',
        ],
      },
      {
        sub: '8. Data Security',
        paras: [
          'CapitalKnob takes reasonable measures to protect information against unauthorised access, disclosure, alteration, misuse, or loss.',
          'However, no internet transmission or electronic storage system can be guaranteed to be completely secure.',
          'Users should avoid sending sensitive information through unsecured or unauthorised channels.',
        ],
      },
      {
        sub: '9. Data Retention',
        paras: [
          'We may retain information for as long as reasonably necessary for providing services, maintaining business records, completing transactions, resolving disputes, meeting contractual obligations, complying with applicable laws, and protecting legitimate business interests.',
          'Retention periods may vary depending on the nature of the information and transaction.',
        ],
      },
      {
        sub: '10. Third-Party Websites',
        paras: [
          'Our website may contain links to websites operated by third parties.',
          'CapitalKnob is not responsible for the privacy practices, content, security, or policies of third-party websites.',
          'Users should review the privacy policies of those websites before providing information.',
        ],
      },
      {
        sub: "11. Children's Information",
        paras: [
          'Our services are intended primarily for adults and businesses.',
          'We do not knowingly seek personal information from children where such collection is prohibited by applicable law.',
        ],
      },
      {
        sub: '12. User Responsibilities',
        paras: [
          'Users are responsible for ensuring that information submitted to CapitalKnob is accurate, complete, and lawfully provided.',
          'Where information concerning another individual or entity is submitted, the user should have the appropriate authority or permission to provide such information.',
        ],
      },
      {
        sub: '13. Changes to this Policy',
        paras: [
          'CapitalKnob may update this Privacy Policy from time to time.',
          'The revised version will be published on this website with the updated date.',
        ],
      },
      {
        sub: '14. Contact',
        paras: [
          'For privacy-related questions or requests, please contact CapitalKnob Investment & Financial Advisors Private Limited.',
        ],
        list: [`Email: ${CONTACT_EMAIL}`],
      },
    ],
  },
  {
    id: 'terms-conditions',
    nav: 'Terms & Conditions',
    title: 'Terms & Conditions',
    intro: [
      'These Terms & Conditions ("Terms") govern your access to and use of the CapitalKnob website and the services, information, content, and facilities made available through it.',
      'By accessing or using this website, you agree to these Terms.',
    ],
    blocks: [
      {
        sub: '1. About CapitalKnob',
        paras: [
          'CapitalKnob Investment & Financial Advisors Private Limited ("CapitalKnob") operates as a capital advisory, financial facilitation, business consulting, and introduction platform.',
          'CapitalKnob may assist users in understanding and exploring potential financing, capital, business, and investment-related opportunities and may facilitate introductions to relevant third parties.',
          'CapitalKnob is not a bank, NBFC, regulated lender, or financial institution.',
          'CapitalKnob is not registered with SEBI as an Investment Adviser, Research Analyst, Portfolio Manager, Alternative Investment Fund, Merchant Banker, or other SEBI-regulated intermediary unless specifically stated through an appropriately authorised entity.',
          'CapitalKnob is not registered with RBI as a bank, NBFC, or regulated lender.',
        ],
      },
      {
        sub: '2. Nature of Services',
        paras: [
          'CapitalKnob may provide or facilitate services relating to areas including business finance, working capital, term finance, Loan Against Property, home finance, project finance, real estate funding, structured finance, debt advisory, business consulting, debt restructuring, capital introductions, investor introductions, private capital opportunities, and other business and capital advisory services.',
          'The availability of any service depends on the user\u2019s requirement, eligibility, applicable law, and the availability of suitable third-party institutions or capital providers.',
        ],
      },
      {
        sub: '3. No Guarantee of Funding',
        paras: [
          'Submission of an enquiry, application, proposal, document, or financial information does not guarantee loan approval, sanction, funding, investment, specific interest rates, specific tenure, specific loan amount, specific processing time, or transaction completion.',
          'Final decisions are made by the relevant lender, financial institution, investor, fund, or capital provider.',
        ],
      },
      {
        sub: '4. Information on the Website',
        paras: [
          'Website information is provided for general informational and educational purposes.',
          'While reasonable efforts may be made to maintain accurate information, CapitalKnob does not guarantee that all information will always be complete, current, accurate, or suitable for every individual situation.',
          'Users should independently verify important information before making financial, legal, tax, investment, borrowing, or business decisions.',
        ],
      },
      {
        sub: '5. Investment-Related Information',
        paras: [
          'Information relating to investments, securities, mutual funds, AIFs, private equity, private credit, unlisted securities, real estate, or other investments should not automatically be interpreted as investment advice, recommendation, solicitation, or assurance.',
          'Investments may involve substantial risk, including loss of capital and liquidity risk.',
          'Users should undertake independent due diligence and consult appropriately qualified professionals and, where applicable, SEBI-registered professionals.',
        ],
      },
      {
        sub: '6. Third-Party Providers',
        paras: [
          'CapitalKnob may introduce or connect users with third-party service providers.',
          'Such parties may have their own eligibility requirements, agreements, fees, policies, risk assessments, and regulatory obligations.',
          'CapitalKnob does not control the independent decisions, services, products, policies, or actions of such third parties.',
        ],
      },
      {
        sub: '7. Fees and Charges',
        paras: [
          'Any advisory, consulting, facilitation, referral, documentation, or other applicable fees will be communicated separately where applicable.',
          'Users should review the relevant engagement terms before paying any fee.',
          'No employee, representative, referral partner, or third party is authorised to collect cash on behalf of CapitalKnob unless specifically authorised in writing.',
        ],
      },
      {
        sub: '8. User Information',
        paras: [
          'Users agree to provide accurate and lawful information.',
          'Providing false, misleading, incomplete, forged, or unauthorised information may result in termination of the enquiry or service.',
        ],
      },
      {
        sub: '9. Intellectual Property',
        paras: [
          'Unless otherwise stated, website content including text, graphics, logos, designs, documents, reports, photographs, trademarks, and other materials belongs to CapitalKnob or its respective licensors.',
          'Unauthorised copying, reproduction, modification, distribution, or commercial use is prohibited.',
        ],
      },
      {
        sub: '10. Prohibited Use',
        paras: ['Users shall not:'],
        list: [
          'Use the website for unlawful purposes or submit fraudulent information',
          'Attempt unauthorised access or introduce malicious software',
          'Misuse website forms or impersonate another person or entity',
          'Use CapitalKnob\u2019s name without authorisation',
        ],
      },
      {
        sub: '11. Limitation of Liability',
        paras: [
          'To the extent permitted by applicable law, CapitalKnob shall not be liable for losses arising solely from decisions made by third-party lenders or investors, rejection of applications, changes in interest rates or market conditions, investment losses, delays caused by third parties, third-party service failures, incorrect information supplied by users, or events beyond reasonable control.',
          'Nothing in these Terms excludes liability that cannot legally be excluded.',
        ],
      },
      {
        sub: '12. Changes',
        paras: [
          'CapitalKnob may modify these Terms from time to time.',
          'Continued use of the website after changes are published constitutes acceptance of the revised Terms.',
        ],
      },
      {
        sub: '13. Governing Law',
        paras: [
          'These Terms shall be governed by the laws applicable in India.',
          'Subject to applicable law, disputes shall be subject to the jurisdiction of the appropriate courts having jurisdiction over the registered office of CapitalKnob.',
        ],
      },
      {
        sub: '14. Contact',
        paras: ['CapitalKnob Investment & Financial Advisors Private Limited.'],
        list: [`Email: ${CONTACT_EMAIL}`],
      },
    ],
  },
  {
    id: 'cookie-policy',
    nav: 'Cookie Policy',
    title: 'Cookie Policy',
    intro: [
      'This Cookie Policy explains how CapitalKnob Investment & Financial Advisors Private Limited ("CapitalKnob", "we", "us", or "our") uses cookies and similar technologies on its website.',
    ],
    blocks: [
      {
        sub: '1. What Are Cookies?',
        paras: [
          'Cookies are small text files stored on a user\u2019s device when visiting a website.',
          'They help websites remember preferences, understand usage patterns, improve functionality, and measure website performance.',
        ],
      },
      {
        sub: '2. Types of Cookies',
        paras: [
          'Depending on the technologies implemented on the website, CapitalKnob may use essential cookies necessary for the website to function properly; analytics cookies that help us understand website traffic, page visits, visitor behaviour, and website performance; functional cookies that remember user preferences and improve the user experience; and, where implemented and permitted, marketing cookies that help measure marketing campaigns and understand interactions with advertisements.',
        ],
      },
      {
        sub: '3. Third-Party Technologies',
        paras: [
          'CapitalKnob may use third-party services such as website analytics providers, advertising platforms, social media tools, CRM systems, lead management systems, and communication platforms.',
          'These providers may use cookies or similar technologies subject to their respective privacy policies.',
        ],
      },
      {
        sub: '4. Cookie Management',
        paras: [
          'Users may control or delete cookies through their browser settings.',
          'Disabling certain cookies may affect website functionality.',
          'Where legally required, CapitalKnob may provide appropriate cookie consent mechanisms.',
        ],
      },
      {
        sub: '5. Changes',
        paras: [
          'CapitalKnob may update this Cookie Policy when website technologies or applicable requirements change.',
        ],
      },
      {
        sub: '6. Contact',
        paras: ['For questions regarding cookies or website privacy:'],
        list: [`Email: ${CONTACT_EMAIL}`],
      },
    ],
  },
  {
    id: 'grievance-redressal',
    nav: 'Grievance Redressal',
    title: 'Grievance Redressal Policy',
    intro: [
      'CapitalKnob Investment & Financial Advisors Private Limited is committed to addressing customer concerns, service-related complaints, privacy concerns, and communication-related grievances in a transparent and timely manner.',
    ],
    blocks: [
      {
        sub: '1. Scope',
        paras: ['This mechanism may be used for complaints relating to:'],
        list: [
          'Services provided by CapitalKnob and communication from CapitalKnob',
          'Website-related concerns and privacy and data handling',
          'Unauthorised use of CapitalKnob\u2019s name and fee-related concerns',
          'Referral or partner-related concerns and misrepresentation by persons claiming to represent CapitalKnob',
        ],
      },
      {
        sub: '2. How to Raise a Complaint',
        paras: [
          'A complaint may be submitted through the email or postal address below. The complaint should preferably include your name, contact details, relevant transaction/enquiry reference, a description of the complaint, and supporting documents where applicable.',
        ],
        list: [`Email: ${CONTACT_EMAIL}`, `Postal Address: ${REGISTERED_OFFICE_ADDRESS}`],
      },
      {
        sub: '3. Acknowledgement',
        paras: [
          'CapitalKnob will endeavour to acknowledge a complaint within a reasonable period after receiving the complaint.',
        ],
      },
      {
        sub: '4. Investigation',
        paras: [
          'The complaint may be reviewed internally and, where appropriate, relevant documents or information may be requested from the complainant.',
          'Where the matter involves an independent third-party lender, investor, financial institution, or service provider, the complainant may also be required to approach that entity under its applicable grievance mechanism.',
        ],
      },
      {
        sub: '5. Resolution',
        paras: [
          'CapitalKnob will endeavour to communicate an appropriate response within a reasonable period depending on the nature and complexity of the complaint.',
          'Certain matters may require additional time where investigation, documentation, or third-party information is required.',
        ],
      },
      {
        sub: '6. Unauthorised Representatives',
        paras: [
          'Customers should immediately notify CapitalKnob if any person demands cash in the name of CapitalKnob, promises guaranteed funding or guaranteed investment returns, claims guaranteed loan approval, requests payment into a personal bank account, or misuses CapitalKnob\u2019s name or logo.',
          'CapitalKnob does not guarantee funding or investment returns.',
        ],
      },
      {
        sub: '7. Escalation',
        paras: [
          'If a complainant is dissatisfied with the response, the matter may be escalated to the Grievance Officer.',
          'Subject to applicable law, complaints involving independent regulated entities should also be addressed through the relevant entity\u2019s prescribed grievance mechanism.',
        ],
        list: [`Grievance Officer: ${GRIEVANCE_OFFICER}`, `Email: ${CONTACT_EMAIL}`],
      },
      {
        sub: '8. Important Clarification',
        paras: [
          'This grievance mechanism is an internal customer-service mechanism and should not be interpreted as evidence that CapitalKnob is a regulated entity under RBI, SEBI, or any other financial regulator.',
        ],
      },
    ],
  },
  {
    id: 'refund-cancellation',
    nav: 'Refund & Cancellation',
    title: 'Refund & Cancellation Policy',
    intro: [
      'This Refund & Cancellation Policy applies to fees, charges, consulting engagements, advisory assignments, documentation services, facilitation services, or other paid services offered by CapitalKnob Investment & Financial Advisors Private Limited ("CapitalKnob").',
    ],
    blocks: [
      {
        sub: '1. Nature of Fees',
        paras: [
          'Depending on the engagement, CapitalKnob may receive fees, commissions, referral fees, advisory fees, consulting fees, facilitation charges, or other commercially agreed consideration.',
          'The applicable fee structure will be communicated to the customer before any charge becomes payable.',
        ],
      },
      {
        sub: '2. No Unauthorised Payments',
        paras: [
          'Customers should make payments only against official invoices, engagement documents, or authorised payment instructions issued by CapitalKnob.',
          'Customers should not make payments to personal bank accounts or individuals claiming to represent CapitalKnob without verification.',
        ],
      },
      {
        sub: '3. Success-Based / Third-Party Commissions',
        paras: [
          'Where CapitalKnob receives a commission or fee from a lender, financial institution, investor, or other partner based on successful completion of a transaction, such arrangement may not involve a direct fee payable by the customer.',
          'The applicable commercial arrangement will depend on the specific transaction.',
        ],
      },
      {
        sub: '4. Advance Fees',
        paras: [
          'Where an advance or upfront fee is applicable, the applicable scope of work, fee, taxes, payment terms, cancellation terms, and refund conditions should be specified in the relevant engagement letter, proposal, invoice, or service agreement.',
        ],
      },
      {
        sub: '5. Refund Eligibility',
        paras: [
          'Refunds, where applicable, will be considered according to the specific engagement terms.',
          'Fees may be non-refundable where CapitalKnob has already performed the agreed services, incurred third-party costs, commenced the assignment, or completed the applicable stage of work, subject to applicable law and the relevant agreement.',
        ],
      },
      {
        sub: '6. Loan Rejection',
        paras: [
          'Unless expressly agreed otherwise in writing, rejection of a loan or funding application by a third-party lender does not automatically create an obligation for CapitalKnob to refund fees for services already performed.',
          'CapitalKnob does not guarantee loan approval or funding.',
        ],
      },
      {
        sub: '7. Cancellation',
        paras: [
          'Customers wishing to cancel a paid service should submit a written request to the email below, including the relevant invoice, engagement reference, and reason for cancellation.',
        ],
        list: [`Email: ${CONTACT_EMAIL}`],
      },
      {
        sub: '8. Processing of Approved Refunds',
        paras: [
          'Where a refund is approved, CapitalKnob will endeavour to process it through the original payment method or another appropriate method.',
          'Applicable taxes, transaction charges, or non-recoverable third-party costs may be treated according to the applicable agreement and law.',
        ],
      },
      {
        sub: '9. Disputes',
        paras: [
          'Any fee or refund dispute should first be raised through CapitalKnob\u2019s grievance mechanism.',
        ],
      },
      {
        sub: '10. Changes',
        paras: ['CapitalKnob may update this policy from time to time.'],
      },
    ],
  },
  {
    id: 'data-consent',
    nav: 'Data Consent',
    title: 'Data Consent & Communication Policy',
    intro: [
      'This Data Consent & Communication Policy explains how CapitalKnob Investment & Financial Advisors Private Limited ("CapitalKnob") obtains and uses consent when individuals or businesses submit information through its website, forms, applications, enquiries, or other communication channels.',
    ],
    blocks: [
      {
        sub: '1. Consent',
        paras: [
          'By voluntarily submitting information to CapitalKnob, the user acknowledges that the information may be processed for the purpose for which it was submitted and for reasonably related service requirements, subject to applicable law.',
        ],
      },
      {
        sub: '2. Purpose of Data Use',
        paras: ['Information may be used to respond to enquiries, understand funding requirements, conduct preliminary assessment, prepare proposals, coordinate documentation, facilitate introductions, communicate with relevant lenders or capital providers, provide requested consulting or advisory services, manage customer relationships, and comply with legal requirements.'],
      },
      {
        sub: '3. Sharing for Funding Facilitation',
        paras: [
          'Where a user specifically seeks funding, financing, investment, or capital assistance, the information provided by the user may be shared with relevant banks, NBFCs, financial institutions, lenders, investors, funds, developers, or other potential capital providers where reasonably necessary to evaluate or facilitate the requested opportunity.',
          'The extent of information shared will depend on the requirement and applicable legal obligations.',
        ],
      },
      {
        sub: '4. Communication Consent',
        paras: [
          'By submitting an enquiry, the user may be contacted through telephone, email, SMS, WhatsApp, or other communication channels provided by the user.',
          'Such communication may relate to the enquiry, documentation, transaction status, services, or relevant information.',
        ],
      },
      {
        sub: '5. Marketing Communication',
        paras: [
          'Where required, marketing or promotional communications will be subject to applicable consent requirements.',
          'Users may request cessation of promotional communications through available unsubscribe or opt-out mechanisms.',
        ],
      },
      {
        sub: '6. Withdrawal of Consent',
        paras: [
          'Where applicable, a user may request withdrawal of consent for future processing by contacting CapitalKnob.',
          'Withdrawal of consent may not affect processing that has already occurred lawfully, is required to complete an existing transaction, is required to comply with law, or is necessary for legitimate contractual or legal purposes.',
        ],
      },
      {
        sub: '7. Accuracy of Information',
        paras: [
          'Users are responsible for ensuring that information supplied to CapitalKnob is accurate, complete, and lawfully provided.',
        ],
      },
      {
        sub: '8. Third-Party Communication',
        paras: [
          'Where CapitalKnob facilitates an introduction to a third party, that third party may separately collect and process information under its own privacy policy and applicable legal requirements.',
          'Users should review the privacy terms of such third parties.',
        ],
      },
      {
        sub: '9. Consent Record',
        paras: [
          'CapitalKnob may maintain records of consent, enquiries, communication preferences, and related interactions for reasonable business, compliance, security, and record-keeping purposes.',
        ],
      },
      {
        sub: '10. Contact',
        paras: ['For data-related requests or communication preferences:'],
        list: [`Email: ${CONTACT_EMAIL}`],
      },
    ],
  },
]

export function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy & Terms"
        subtitle="How CapitalKnob Investment & Financial Advisors Private Limited collects, uses, and protects your information — plus the terms, cookies, grievance, refund, and consent policies that govern this website."
      />

      {/*
        Plain <section> on purpose: SectionReveal observes ONE wrapper with
        threshold 0.1, which a ~15000px legal page can never cross — the
        whole body would stay opacity-0 forever. Legal content must also
        paint with JS disabled / for crawlers, so no scroll animation here.
      */}
      <section>
        <Container size="md" className="pt-14 md:pt-20">
          {/* In-page policy navigator */}
          <nav aria-label="Policies" className="flex flex-wrap gap-2">
            {policies.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToAnchor(`#${p.id}`)
                }}
                className="inline-flex min-h-[36px] items-center rounded-full border border-line bg-white px-4 py-1.5 text-xs font-bold text-navy transition-all duration-200 hover:-translate-y-px hover:border-gold/60 hover:text-gold-hover hover:shadow-soft active:translate-y-0 active:scale-95"
              >
                {p.nav}
              </a>
            ))}
          </nav>
        </Container>

        {policies.map((policy) => (
          <Container key={policy.id} size="md" className="py-8 md:py-10">
            <article id={policy.id} className="scroll-mt-24">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                CapitalKnob Legal
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-navy md:text-3xl">
                {policy.title}
              </h2>
              <p className="mt-2 text-xs font-semibold text-muted">
                Last Updated: {LAST_UPDATED}
              </p>
                {policy.intro && (
                  <div className="mt-4 space-y-3">
                    {policy.intro.map((para, i) => (
                      <p key={i} className="text-sm leading-relaxed text-muted md:text-base">
                        {renderRichText(para, `${policy.id}-intro-${i}`)}
                      </p>
                    ))}
                  </div>
                )}
                <div className="mt-8 space-y-8">
                  {policy.blocks.map((b, bi) => (
                    <div key={b.sub}>
                      {b.sub && (
                        <h3 className="font-display text-lg font-bold text-navy md:text-xl">
                          {b.sub}
                        </h3>
                      )}
                      {b.paras && (
                        <div className="mt-3 space-y-3">
                          {b.paras.map((para, i) => (
                            <p key={i} className="text-sm leading-relaxed text-muted md:text-base">
                              {renderRichText(para, `${policy.id}-p-${bi}-${i}`)}
                            </p>
                          ))}
                        </div>
                      )}
                      {b.list && (
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted md:text-base">
                          {b.list.map((item, i) => (
                            <li key={i}>{renderRichText(item, `${policy.id}-li-${bi}-${i}`)}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
            </article>
          </Container>
        ))}

        <Container size="md" className="pb-14 md:pb-20">
          {/* Effective date note */}
          <p className="border-t border-line pt-6 text-xs text-muted">
            These policies were last reviewed and updated in {LAST_UPDATED}. CapitalKnob Investment
            &amp; Financial Advisors Private Limited reserves the right to amend these policies at
            any time without prior notice.
          </p>
        </Container>
      </section>
    </>
  )
}

export default PrivacyPolicyPage
