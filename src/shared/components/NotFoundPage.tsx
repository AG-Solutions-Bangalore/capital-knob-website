import { Link } from 'react-router-dom'
import { ROUTES } from '@/app/routes'
import { Container } from './Container'
import { Button } from './Button'

export function NotFoundPage() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-page py-20">
      <Container size="sm" className="text-center">
        <p className="font-display text-7xl font-extrabold text-gold">404</p>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-ink">Page not found</h1>
        <p className="mt-3 text-muted">The page you're looking for doesn't exist.</p>
        <Link to={ROUTES.home} className="mt-8 inline-block">
          <Button variant="gold">Back to Home</Button>
        </Link>
      </Container>
    </section>
  )
}