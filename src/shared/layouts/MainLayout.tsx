import { Outlet } from 'react-router-dom'
import { Footer } from '@/shared/components/Footer'
import { Header } from '@/shared/components/Header'
import { DeferredSmoothScroll } from '@/shared/components/DeferredSmoothScroll'

export function MainLayout() {
  return (
    <DeferredSmoothScroll>
      <div className="flex min-h-screen flex-col bg-page">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </DeferredSmoothScroll>
  )
}
