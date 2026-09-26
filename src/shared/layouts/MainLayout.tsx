import { Outlet } from 'react-router-dom'
import { Footer } from '@/shared/components/Footer'
import { Header } from '@/shared/components/Header'
import { SmoothScrollProvider } from '@/shared/components/SmoothScrollProvider'
import { ScrollToTopButton } from '@/shared/components/ScrollToTopButton'

export function MainLayout() {
  return (
    <SmoothScrollProvider>
      <div className="flex min-h-screen flex-col bg-page">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </SmoothScrollProvider>
  )
}
