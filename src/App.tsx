import { BrowserRouter } from 'react-router-dom'
import AppRoutes from '@/routes/AppRoutes'
import { DeferredSmoothScroll } from '@/shared/components/DeferredSmoothScroll'

export default function App() {
  return (
    <BrowserRouter>
      <DeferredSmoothScroll>
        <AppRoutes />
      </DeferredSmoothScroll>
    </BrowserRouter>
  )
}
