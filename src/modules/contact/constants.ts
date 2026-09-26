import { IMAGE_BASE_URL } from "@/lib/images";
/**
 * Contact Us module data and copy.
 */

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
    services: [
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
      number: '+91 99869 00144',
      hours: 'Mon – Sat | 9:30 AM – 6:30 PM',
      href: 'tel:+919986900144',
    },
    email: {
      label: 'Email Us',
      address: 'advisory@capitalknob.com',
      note: 'We typically respond within 24 hours',
      href: 'mailto:advisory@capitalknob.com',
    },
    office: {
      label: 'Visit Our Office',
      name: 'CapitalKnob',
      lines: [
        'No. 8, 1st Floor, 24th Main, 5th Phase',
        'JP Nagar, Bengaluru, Karnataka – 560078',
        'India',
      ],
      mapsUrl: 'https://maps.google.com/?q=No.+8,+1st+Floor,+24th+Main,+5th+Phase,+JP+Nagar,+Bengaluru+560078',
    },
  },
  location: {
    eyebrow: 'OUR LOCATION',
    title: 'Find Us',
    description:
      "Prefer a face-to-face conversation? We'd be happy to meet you at our office.",
    buttonText: 'Get Directions',
    directionsUrl:
      'https://maps.google.com/?q=No.+8,+1st+Floor,+24th+Main,+5th+Phase,+JP+Nagar,+Bengaluru+560078',
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