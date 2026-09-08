import { IMAGE_BASE_URL } from "@/lib/images";
/**
 * Contact Us module data and copy.
 */

/**
 * Product label sent as `enquiryProduct` to the enquiry API. Keeps the
 * wire value in one place so it can be tweaked without hunting through
 * the form component.
 */
export const ENQUIRY_PRODUCT = 'Website Enquiry'

/**
 * Static UTM defaults. In a real campaign we'd read these from the URL
 * (`?utm_source=...`) or from a global analytics helper; for now they
 * mirror the payload shape the API expects.
 */
export const ENQUIRY_UTM = {
  utm_medium: 'website',
  utm_source: 'google',
  utm_campaign: 'test',
} as const

export const contactCopy = {
  hero: {
    eyebrow: 'CONTACT US',
    titleLead: "We're Here",
    titleAccent: 'to Help',
    description:
      'Have a question or need guidance? Our team is ready to assist you with the right financing solutions.',
    receptionImage: `${IMAGE_BASE_URL}/contact/hero-reception.webp`,
  },
  form: {
    title: 'Send Us a Message',
    description: 'Fill in the details below and our team will get back to you shortly.',
    subjects: [
      'Home Loans & Financing',
      'Home Loan Balance Transfer',
      'Working Capital & Business Loans',
      'Real Estate Finance',
      'Private Credit',
      'General Inquiry',
    ],
  },
  touch: {
    title: 'Get in Touch',
    description: 'You can also reach us through the following channels.',
    phone: {
      label: 'Call Us',
      number: '+91 98765 43210',
      hours: 'Mon – Sat | 9:30 AM – 6:30 PM',
      href: 'tel:+919876543210',
    },
    email: {
      label: 'Email Us',
      address: 'hello@capitalknob.com',
      note: 'We typically respond within 24 hours',
      href: 'mailto:hello@capitalknob.com',
    },
    office: {
      label: 'Visit Our Office',
      name: 'CapitalKnob',
      lines: [
        'Prestige Tech Park, 5th Floor',
        'Outer Ring Road, Marathahalli',
        'Bengaluru, Karnataka – 560037',
        'India',
      ],
      mapsUrl: 'https://maps.google.com/?q=Prestige+Tech+Park,+Marathahalli,+Bengaluru',
    },
  },
  location: {
    eyebrow: 'OUR LOCATION',
    title: 'Find Us',
    description:
      "Prefer a face-to-face conversation? We'd be happy to meet you at our office.",
    buttonText: 'Get Directions',
    directionsUrl:
      'https://maps.google.com/?q=Prestige+Tech+Park,+Marathahalli,+Bengaluru',
  },
  faq: {
    eyebrow: 'STILL HAVE QUESTIONS?',
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'How soon will I get a response?',
        answer:
          'Our team typically reviews and responds to all inquiries within 24 hours during business days. For urgent assistance, you can also reach us directly via phone at +91 98765 43210.',
      },
      {
        question: 'Can I speak to an advisor directly?',
        answer:
          'Yes, absolutely. Once you submit your query or call our office, we pair you with a dedicated capital advisory specialist who understands your specific financing goals.',
      },
      {
        question: 'Do you provide loans directly?',
        answer:
          'CapitalKnob acts as your strategic capital advisor. We work closely with an extensive network of verified banks, NBFCs, and institutional lenders to structure and secure the most competitive financing tailored to your needs.',
      },
    ],
  },
} as const