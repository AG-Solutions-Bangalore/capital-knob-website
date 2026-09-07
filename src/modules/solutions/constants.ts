/**
 * Home-page copy and data. Keep all user-facing strings here, not
 * inside the components, so translations and copy review stay easy.
 */

/* -----------------------------------------------------------------------------
   HERO
   ----------------------------------------------------------------------------- */
export const solutionsCopy = {
  hero: {
    eyebrow: 'Our Solutions',
    titleLead: 'Solutions for',
    titleAccent: 'Every Capital Need',
    description:
      'From buying your first home to growing your business, CapitalKnob helps you explore the right financing options based on your goals.',
    quote: 'The right capital today builds a brighter tomorrow.',
    verticalTagline: 'Capital Advisory for a Brighter Tomorrow',
  },
  pillars: [
    { title: 'Multiple Lenders', icon: 'lenders' },
    { title: 'Expert Guidance', icon: 'guidance' },
    { title: 'Transparent Process', icon: 'transparent' },
    { title: 'End-to-End Support', icon: 'support' },
  ],
} as const

export const homeCopy = solutionsCopy

/* -----------------------------------------------------------------------------
   SOLUTIONS TABS
   ----------------------------------------------------------------------------- */
export type AudienceTab = 'individuals' | 'businesses' | 'investors' | 'developers'

export const audienceTabs: { id: AudienceTab; label: string }[] = [
  { id: 'individuals', label: 'Individuals' },
  { id: 'businesses', label: 'Businesses' },
  { id: 'investors', label: 'Investors' },
  { id: 'developers', label: 'Developers' },
]

/* -----------------------------------------------------------------------------
   INDIVIDUALS — Financing Solutions
   ----------------------------------------------------------------------------- */
export interface ServiceCard {
  /** Unique DOM id used for in-page anchoring and highlight detection. */
  id: string
  title: string
  description: string
  iconKey: IconKey
  art: IllustrationKey
  imageSrc?: string
  href: string
}

export const individualsCards: ServiceCard[] = [
  {
    id: 'home-loans',
    title: 'Home Loans',
    description: 'Turn your dream home into reality with flexible financing options.',
    iconKey: 'home',
    art: 'homeLoans',
    imageSrc: '/images/solutions/card_home_loans.webp',
    href: '/home-finance#home-loans',
  },
  {
    id: 'balance-transfer',
    title: 'Home Loan Balance Transfer',
    description: 'Lower your interest rate. Save more on your existing home loan.',
    iconKey: 'refresh',
    art: 'balanceTransfer',
    imageSrc: '/images/solutions/card_balance_transfer.webp',
    href: '/home-finance#balance-transfer',
  },
  {
    id: 'top-up',
    title: 'Home Loan Top-Up',
    description: 'Extra funds for bigger horizons — education, renovation or personal needs.',
    iconKey: 'stack',
    art: 'topUp',
    imageSrc: '/images/solutions/card_top_up.webp',
    href: '/home-finance#top-up',
  },
  {
    id: 'construction',
    title: 'Construction Finance',
    description: 'Build your vision, with the right support at every stage.',
    iconKey: 'crane',
    art: 'construction',
    imageSrc: '/images/solutions/card_construction.webp',
    href: '/real-estate-finance#construction',
  },
  {
    id: 'loan-against-property',
    title: 'Loan Against Property',
    description: 'Unlock the value in your property for business or personal needs.',
    iconKey: 'document',
    art: 'loanAgainst',
    imageSrc: '/images/solutions/card_loan_against.webp',
    href: '/home-finance#loan-against-property',
  },
]

/* -----------------------------------------------------------------------------
   BUSINESSES & MSMEs — Financing Solutions (4 cards max)
   ----------------------------------------------------------------------------- */
export const businessesCards: ServiceCard[] = [
  {
    id: 'working-capital',
    title: 'Working Capital Finance',
    description: 'Support your day-to-day operations and business growth.',
    iconKey: 'chart',
    art: 'workingCapital',
    imageSrc: '/images/solutions/card_working_capital.webp',
    href: '/business-finance#working-capital',
  },
  {
    id: 'business-loans',
    title: 'Business Loans',
    description: 'Flexible funding based on your business profile and goals.',
    iconKey: 'briefcase',
    art: 'businessLoans',
    imageSrc: '/images/solutions/card_business_loans.webp',
    href: '/business-finance#business-loans',
  },
  {
    id: 'secured-business-loans',
    title: 'Secured Business Loans',
    description: 'Access larger funding with eligible collateral.',
    iconKey: 'shield',
    art: 'secured',
    imageSrc: '/images/solutions/card_secured_loans.webp',
    href: '/business-finance#secured-business-loans',
  },
  {
    id: 'expansion',
    title: 'Business Expansion Funding',
    description: 'Fuel your next phase of growth.',
    iconKey: 'trendUp',
    art: 'expansion',
    imageSrc: '/images/solutions/card_expansion.webp',
    href: '/business-finance#expansion',
  },
]

/* -----------------------------------------------------------------------------
   OTHER CAPITAL SOLUTIONS — wide cards
   ----------------------------------------------------------------------------- */
export const otherCapitalCards: ServiceCard[] = [
  {
    id: 'real-estate',
    title: 'Real Estate Finance',
    description: 'Land acquisition, project finance, construction and development funding.',
    iconKey: 'building',
    art: 'realEstate',
    imageSrc: '/images/solutions/card_real_estate.webp',
    href: '/real-estate-finance',
  },
  {
    id: 'private-credit',
    title: 'Private Credit',
    description: 'Flexible, structured capital for tailored requirements.',
    iconKey: 'handshake',
    art: 'privateCredit',
    imageSrc: '/images/solutions/card_private_credit.webp',
    href: '/private-credit',
  },
  {
    id: 'growth-capital',
    title: 'Growth Capital',
    description: 'Capital for scaling businesses and new opportunities.',
    iconKey: 'plant',
    art: 'growthCapital',
    imageSrc: '/images/solutions/card_growth_capital.webp',
    href: '/business-finance',
  },
  {
    id: 'capital-connect',
    title: 'Capital Connect',
    description: 'Connect with the right lenders, investors and financial institutions.',
    iconKey: 'network',
    art: 'capitalConnect',
    imageSrc: '/images/solutions/card_capital_connect.webp',
    href: '/contact',
  },
]

/* -----------------------------------------------------------------------------
   WHY CHOOSE CAPITALKNOB
   ----------------------------------------------------------------------------- */
export const whyChooseFeatures = [
  { title: 'Wide Network of Lenders', icon: 'trophy' },
  { title: 'Expert Advisory', icon: 'people' },
  { title: 'Tailored Solutions', icon: 'scissors' },
  { title: 'Transparent & Fair Process', icon: 'scale' },
  { title: 'End-to-End Support', icon: 'clock' },
  { title: 'Long-Term Partnership', icon: 'handshake' },
] as const

/* -----------------------------------------------------------------------------
   5-STEP APPROACH
   ----------------------------------------------------------------------------- */
export const steps = [
  { number: 1, title: 'Understand', subtitle: 'Your Goals', icon: 'document' },
  { number: 2, title: 'Assess', subtitle: 'Your Profile', icon: 'user' },
  { number: 3, title: 'Identify', subtitle: 'Right Options', icon: 'shield' },
  { number: 4, title: 'Connect', subtitle: 'With Lenders', icon: 'connect' },
  { number: 5, title: 'Coordinate', subtitle: 'Till Closure', icon: 'check' },
] as const

/* -----------------------------------------------------------------------------
   ICON KEYS — used by ServiceIcon + illustrations
   ----------------------------------------------------------------------------- */
export type IconKey =
  | 'home'
  | 'refresh'
  | 'stack'
  | 'crane'
  | 'tools'
  | 'document'
  | 'chart'
  | 'briefcase'
  | 'shield'
  | 'trendUp'
  | 'gear'
  | 'building'
  | 'cycle'
  | 'handshake'
  | 'plant'
  | 'network'
  | 'trophy'
  | 'people'
  | 'scissors'
  | 'scale'
  | 'clock'
  | 'user'
  | 'connect'
  | 'check'
  | 'arrowRight'
  | 'arrowDown'
  | 'phone'
  | 'lenders'
  | 'guidance'
  | 'transparent'
  | 'support'
  | 'percent'

export type IllustrationKey =
  | 'homeLoans'
  | 'balanceTransfer'
  | 'topUp'
  | 'construction'
  | 'renovation'
  | 'loanAgainst'
  | 'workingCapital'
  | 'businessLoans'
  | 'secured'
  | 'expansion'
  | 'machinery'
  | 'capex'
  | 'refinance'
  | 'realEstate'
  | 'privateCredit'
  | 'growthCapital'
  | 'capitalConnect'