import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Header } from '@/shared/components/Header'
import { Footer } from '@/shared/components/Footer'

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}