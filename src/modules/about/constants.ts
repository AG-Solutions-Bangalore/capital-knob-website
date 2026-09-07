/**
 * About-page copy and data. Keeps every user-facing string in one place
 * so the sections stay presentational.
 */

import type { IconKey } from '@/modules/solutions/constants'

/* -----------------------------------------------------------------------------
   HERO
   ----------------------------------------------------------------------------- */
export const aboutHero = {
  eyebrow: 'About CapitalKnob',
  titleLead: 'More Than Loans.',
  titleAccent: 'A Stronger Tomorrow.',
  description:
    'At CapitalKnob, we believe that the right capital at the right time can turn aspirations into achievements. We are a capital advisory platform that helps individuals, businesses, investors and developers access the right financing solutions through a transparent, expert-led and technology-enabled process.',
  ctaLabel: 'Our Story',
  ctaHref: '#our-story',
  /* Local high-fidelity visual asset — terrace & skyline overlooking city */
  image: '/images/about/hero-about-skyline.webp',
} as const

/* -----------------------------------------------------------------------------
   STATS STRIP
   ----------------------------------------------------------------------------- */
export const aboutStats = [
  { value: '10,000+', label: 'Happy Customers', icon: 'people' as IconKey },
  { value: '50+', label: 'Lending Partners', icon: 'handshake' as IconKey },
  { value: '₹1,000 Cr+', label: 'Loans Facilitated', icon: 'chart' as IconKey },
  { value: '4.8/5', label: 'Customer Satisfaction', icon: 'trophy' as IconKey },
] as const

export const aboutQuote = {
  line1: 'Built on Trust.',
  line2: 'Driven by Possibilities.',
} as const

/* -----------------------------------------------------------------------------
   OUR STORY
   ----------------------------------------------------------------------------- */
export const ourStory = {
  eyebrow: 'Our Story',
  title: 'A Platform Built for a Bigger Purpose',
  paragraphs: [
    'CapitalKnob was founded with a simple belief — access to capital should be easier, more transparent and more aligned with your goals.',
    'We saw individuals struggling to find the right home loans, businesses facing funding challenges, and developers and investors looking for reliable capital partners. The process was often fragmented, complex and time-consuming.',
    "So, we built CapitalKnob — a unified platform that brings together multiple financing solutions, lender access, expert guidance and end-to-end support, all in one place.",
  ],
  /* Local high-fidelity visual asset — modern reception lobby with 3D logo */
  image: '/images/about/story-reception.webp',
  pillars: [
    {
      title: 'Customer First',
      description: 'Your goals are at the centre of everything we do.',
      icon: 'user' as IconKey,
    },
    {
      title: 'Expert Guidance',
      description: 'Backed by deep industry knowledge.',
      icon: 'gear' as IconKey,
    },
    {
      title: 'Transparent Process',
      description: 'Clear, honest and hassle-free.',
      icon: 'shield' as IconKey,
    },
    {
      title: 'Stronger Together',
      description: 'Connecting the right people and opportunities.',
      icon: 'connect' as IconKey,
    },
  ],
} as const

/* -----------------------------------------------------------------------------
   VISION / MISSION / VALUES
   ----------------------------------------------------------------------------- */
export const visionMissionValues = {
  title: 'Our Vision, Mission & Values',
  subtitle: 'Guided by our purpose. Driven by your progress.',
  vision: {
    title: 'Our Vision',
    icon: 'check' as IconKey,
    description:
      "To be India's most trusted capital advisory platform, empowering individuals and businesses to build a stronger and more prosperous tomorrow.",
  },
  mission: {
    title: 'Our Mission',
    icon: 'check' as IconKey,
    description:
      'To simplify access to capital through expert guidance, trusted partnerships and a seamless, transparent process that helps our customers achieve their financial goals.',
  },
  values: [
    'Integrity in every interaction',
    'Customer-centric approach',
    'Transparency and fairness',
    'Excellence in execution',
    'Building long-term relationships',
  ],
  /* The navy "Brighter Tomorrow" highlight card on the right */
  highlight: {
    eyebrow: 'THE RIGHT CAPITAL TODAY',
    title: 'A BRIGHTER TOMORROW',
    /* Local high-fidelity visual asset — person standing on mountain peak at sunrise */
    image: '/images/about/vision-mountain.webp',
  },
} as const

/* -----------------------------------------------------------------------------
   FOUNDER MESSAGE
   ----------------------------------------------------------------------------- */
export const founder = {
  name: 'Rohan Mehta',
  role: 'Founder & CEO, CapitalKnob',
  /* Local high-fidelity visual asset — executive portrait of Rohan Mehta */
  image: '/images/about/founder-rohan.webp',
  message: [
    'I started CapitalKnob with a clear purpose — to make capital accessible, simple and aligned with people’s real goals.',
    'Whether it’s a family buying their first home, a business planning its next phase of growth, or a developer creating better communities — the right capital can change lives.',
    'At CapitalKnob, we are committed to being a trusted partner on your financial journey, today and for the long term.',
  ],
  signoff: 'Sincerely,',
  highlights: [
    { title: '10+ Years Experience', description: 'in financial services, lending and capital markets', icon: 'chart' as IconKey },
    { title: 'Deep Industry Network', description: 'Strong relationships with leading banks, NBFCs and alternative credit providers', icon: 'connect' as IconKey },
    { title: 'Passion for Financial Inclusion', description: 'Committed to helping more individuals and businesses access the right capital', icon: 'shield' as IconKey },
    { title: 'Vision for a Stronger Tomorrow', description: 'Building CapitalKnob as a trusted, long-term capital advisory platform', icon: 'trophy' as IconKey },
  ],
} as const

/* -----------------------------------------------------------------------------
   OUR COMMITMENT
   ----------------------------------------------------------------------------- */
export const commitments = [
  {
    title: 'Ethical Practices',
    description: 'We do what’s right.',
    icon: 'scale' as IconKey,
  },
  {
    title: 'Client Success',
    description: 'Your success is our success.',
    icon: 'trophy' as IconKey,
  },
  {
    title: 'Sustainable Growth',
    description: 'Creating value for all stakeholders.',
    icon: 'plant' as IconKey,
  },
  {
    title: 'Responsible Advisory',
    description: 'Guiding you with care and clarity.',
    icon: 'shield' as IconKey,
  },
] as const

/* -----------------------------------------------------------------------------
   CTA BAND
   ----------------------------------------------------------------------------- */
export const aboutCta = {
  title: 'Let’s Build a Stronger Tomorrow — Together.',
  description: 'Explore financing solutions with a team that understands your goals.',
  ctaLabel: 'Get in Touch',
  ctaHref: '/contact',
} as const