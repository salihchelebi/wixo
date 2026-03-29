import { lazy } from 'react'
import Loadable from '@/ui-component/loading/Loadable'
import AuthLayout from '@/layout/AuthLayout'

const AiAsistanLandingPage = Loadable(lazy(() => import('@/views/Ai_Asistan/LandingPage')))

// Ai_Asistan yüzeyinde aktif olarak yalnızca landing tutulur.
const Ai_AsistanRoutes = {
    path: '/',
    element: <AuthLayout />,
    children: [
        {
            path: '/ai-asistan',
            element: <AiAsistanLandingPage />
        }
    ]
}

export default Ai_AsistanRoutes
