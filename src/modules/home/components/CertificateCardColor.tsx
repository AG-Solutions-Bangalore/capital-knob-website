import { TestimonialCard, type TestimonialCardProps } from './TestimonialCard'

export interface CertificateCardColorProps extends TestimonialCardProps {
  seal?: 'gold' | 'navy' | 'green'
  badgeLabel?: string
  badgeClassName?: string
}

export function CertificateCardColor(props: CertificateCardColorProps) {
  return <TestimonialCard {...props} />
}

export default CertificateCardColor
