export interface HomeCard {
  id: string
  title: string
  description: string
  imageSrc: string
  imageTitle: string
  icon: 'home' | 'refresh' | 'stack' | 'crane' | 'tools' | 'document'
  href: string
}

export interface LendingPartner {
  name: string
  badgeText?: string
  logoType: 'hdfc' | 'icici' | 'sbi' | 'axis' | 'kotak' | 'indusind' | 'bob'
}

export interface BenefitItem {
  id: string
  title: string
  icon: 'assessment' | 'rate' | 'eligibility' | 'comparison' | 'financial' | 'connect' | 'coordination' | 'closure'
}

export interface ProcessStep {
  stepNumber: number
  action: string
  target: string
  icon: 'target' | 'profile' | 'options' | 'lenders' | 'closure'
}

export interface HomeStat {
  value: string
  label: string
}

export interface HeroSlide {
  id: string
  eyebrow: string
  handwrittenScript: string
  titleLine1: string
  titleLine2: string
  tagline: string
  description: string
  imageSrc: string
  imageAlt: string
  imageTitle: string
  primaryCta: {
    label: string
    href: string
  }
  secondaryCta: {
    label: string
    href: string
  }
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'home-loans',
    eyebrow: 'HOMES BUILD BIGGER TOMORROWS',
    handwrittenScript: 'A Home A Brighter You',
    titleLine1: 'Home Loans',
    titleLine2: 'Made Simple',
    tagline: 'Compare. Plan. Save. Own.',
    description:
      'Explore the right home finance solution with expert guidance and access to multiple lenders — all in one place.',
    imageSrc: '/images/home/hero_villa.jpg',
    imageAlt: 'Luxury modern villa at dusk',
    imageTitle: 'Luxury Modern Villa – CapitalKnob',
    primaryCta: {
      label: 'Check Your Eligibility',
      href: '/contact',
    },
    secondaryCta: {
      label: 'Talk to an Expert',
      href: 'tel:+919876543210',
    },
  },
  {
    id: 'business-finance',
    eyebrow: 'EMPOWERING ENTERPRISE GROWTH',
    handwrittenScript: 'Capital That Powers Vision',
    titleLine1: 'Business Loans &',
    titleLine2: 'Working Capital',
    tagline: 'Fast. Flexible. Custom-Built.',
    description:
      'Unlock working capital, machinery financing, and customized credit lines tailored to accelerate your business growth.',
    imageSrc: '/images/solutions/hero_skyline.jpg',
    imageAlt: 'Modern city financial towers and business hub',
    imageTitle: 'Modern City Financial Hub – CapitalKnob',
    primaryCta: {
      label: 'Explore Business Loans',
      href: '/business-finance',
    },
    secondaryCta: {
      label: 'Speak with an Advisor',
      href: 'tel:+919876543210',
    },
  },
  {
    id: 'loan-against-property',
    eyebrow: 'MAXIMIZE ASSET VALUE',
    handwrittenScript: 'Unlock Hidden Equity',
    titleLine1: 'Loan Against Property',
    titleLine2: 'At Best Rates',
    tagline: 'Higher Value. Lower EMI.',
    description:
      'Leverage your residential or commercial property to unlock high-value liquidity with competitive interest rates and extended tenures.',
    imageSrc: '/images/home/card_loan_property.jpg',
    imageAlt: 'Premium architectural real estate building',
    imageTitle: 'Premium Real Estate Loan Property – CapitalKnob',
    primaryCta: {
      label: 'Calculate Your LAP',
      href: '/contact',
    },
    secondaryCta: {
      label: 'Get Free Assessment',
      href: 'tel:+919876543210',
    },
  },
  {
    id: 'real-estate-finance',
    eyebrow: 'DEVELOPMENT & PROJECT FUNDING',
    handwrittenScript: 'Build Tomorrow, Today',
    titleLine1: 'Real Estate Finance',
    titleLine2: 'From Land to Completion',
    tagline: 'Structured. Scalable. Certain.',
    description:
      'End-to-end capital solutions for land acquisition, builder construction finance, and commercial property development.',
    imageSrc: '/images/home/cta_skyline.jpg',
    imageAlt: 'Metropolitan skyline at twilight with modern architecture',
    imageTitle: 'Metropolitan Skyline – CapitalKnob',
    primaryCta: {
      label: 'Explore Project Finance',
      href: '/real-estate-finance',
    },
    secondaryCta: {
      label: 'Consult Our Team',
      href: 'tel:+919876543210',
    },
  },
]

export const homeHeroData = {
  eyebrow: 'HOMES BUILD BIGGER TOMORROWS',
  title: 'Home Loans Made Simple',
  tagline: 'Compare. Plan. Save. Own.',
  description:
    'Explore the right home finance solution with expert guidance and access to multiple lenders — all in one place.',
  handwrittenScript: 'A Home A Brighter You',
  primaryCta: {
    label: 'Check Your Eligibility',
    href: '/contact',
  },
  secondaryCta: {
    label: 'Talk to an Expert',
    href: 'tel:+919876543210',
  },
  trustBadges: [
    { label: 'Best Interest Rates', icon: 'percent' },
    { label: 'Multiple Lenders', icon: 'lenders' },
    { label: 'Expert Guidance', icon: 'guidance' },
    { label: 'Hassle-Free Process', icon: 'process' },
  ],
} as const

export const lendingPartners: LendingPartner[] = [
  { name: 'HDFC Bank', logoType: 'hdfc' },
  { name: 'ICICI Bank', logoType: 'icici' },
  { name: 'State Bank of India', logoType: 'sbi' },
  { name: 'Axis Bank', logoType: 'axis' },
  { name: 'Kotak Mahindra Bank', logoType: 'kotak' },
  { name: 'IndusInd Bank', logoType: 'indusind' },
  { name: 'Bank of Baroda', logoType: 'bob' },
]

export const homeSolutionsTabs = [
  { id: 'individuals', label: 'Individuals' },
  { id: 'businesses', label: 'Businesses' },
  { id: 'investors', label: 'Investors' },
  { id: 'developers', label: 'Developers' },
] as const

export const individualSolutions: HomeCard[] = [
  {
    id: 'home-loans',
    title: 'Home Loans',
    description: 'Turn your dream home into reality.',
    imageSrc: '/images/home/card_home_loans.jpg',
    imageTitle: 'Home Loans – CapitalKnob',
    icon: 'home',
    href: '/home-finance#home-loans',
  },
  {
    id: 'balance-transfer',
    title: 'Home Loan Balance Transfer',
    description: 'Lower your interest rate. Save more.',
    imageSrc: '/images/home/card_balance_transfer.jpg',
    imageTitle: 'Home Loan Balance Transfer – CapitalKnob',
    icon: 'refresh',
    href: '/home-finance#balance-transfer',
  },
  {
    id: 'top-up',
    title: 'Home Loan Top-Up',
    description: 'Extra funds for bigger horizons.',
    imageSrc: '/images/home/card_home_top_up.jpg',
    imageTitle: 'Home Loan Top-Up – CapitalKnob',
    icon: 'stack',
    href: '/home-finance#top-up',
  },
  {
    id: 'construction',
    title: 'Construction Finance',
    description: 'Build your vision, with the right support.',
    imageSrc: '/images/home/card_construction.jpg',
    imageTitle: 'Construction Finance – CapitalKnob',
    icon: 'crane',
    href: '/real-estate-finance#construction',
  },
  {
    id: 'renovation',
    title: 'Home Renovation Finance',
    description: 'Upgrade to a better tomorrow.',
    imageSrc: '/images/home/card_renovation.jpg',
    imageTitle: 'Home Renovation Finance – CapitalKnob',
    icon: 'tools',
    href: '/home-finance#renovation',
  },
  {
    id: 'loan-against-property',
    title: 'Loan Against Property',
    description: 'Unlock the value in your property.',
    imageSrc: '/images/home/card_loan_property.jpg',
    imageTitle: 'Loan Against Property – CapitalKnob',
    icon: 'document',
    href: '/business-finance#loan-against-property',
  },
]

export const whyChooseBenefits: BenefitItem[] = [
  {
    id: 'b1',
    title: 'Requirement-based financing assessment',
    icon: 'assessment',
  },
  {
    id: 'b2',
    title: 'Best competitive rate of interest',
    icon: 'rate',
  },
  {
    id: 'b3',
    title: 'Financial & eligibility evaluation',
    icon: 'eligibility',
  },
  {
    id: 'b4',
    title: 'Comparison of potential financing pathways',
    icon: 'comparison',
  },
  {
    id: 'b5',
    title: 'Support in preparing financial information',
    icon: 'financial',
  },
  {
    id: 'b6',
    title: 'Lender and financing-source connect',
    icon: 'connect',
  },
  {
    id: 'b7',
    title: 'Transaction coordination support',
    icon: 'coordination',
  },
  {
    id: 'b8',
    title: 'End-to-end guidance till closure',
    icon: 'closure',
  },
]

export const processSteps: ProcessStep[] = [
  {
    stepNumber: 1,
    action: 'Understand',
    target: 'Your Goals',
    icon: 'target',
  },
  {
    stepNumber: 2,
    action: 'Assess',
    target: 'Your Profile',
    icon: 'profile',
  },
  {
    stepNumber: 3,
    action: 'Identify',
    target: 'Right Options',
    icon: 'options',
  },
  {
    stepNumber: 4,
    action: 'Connect',
    target: 'With Lenders',
    icon: 'lenders',
  },
  {
    stepNumber: 5,
    action: 'Coordinate',
    target: 'Till Closure',
    icon: 'closure',
  },
]

export const homeStats: HomeStat[] = [
  { value: '10,000+', label: 'Happy Customers' },
  { value: '50+', label: 'Lending Partners' },
  { value: '₹1,000 Cr+', label: 'Loans Facilitated' },
  { value: '4.8/5', label: 'Customer Satisfaction' },
]

export const homeTestimonial = {
  quote:
    'CapitalKnob made our home loan journey so smooth. Great guidance, transparent process and genuine support throughout!',
  name: 'Rohan & Priya Mehta',
  role: 'Home Loan Customer',
  avatar: '/images/home/testimonial_couple.jpg',
  avatarTitle: 'Rohan and Priya Mehta – CapitalKnob Testimonial',
}
