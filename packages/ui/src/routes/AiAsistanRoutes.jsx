import { lazy } from 'react'
import Loadable from '@/ui-component/loading/Loadable'
import AuthLayout from '@/layout/AuthLayout'

const AiAsistanLandingPage = Loadable(lazy(() => import('@/views/Ai_Asistan/LandingPage')))
const AiAsistanAdminLoginPage = Loadable(lazy(() => import('@/views/Ai_Asistan/AdminLoginPage')))
const AiAsistanAdminPage = Loadable(lazy(() => import('@/views/Ai_Asistan/AdminPage')))
const AiAsistanChatPage = Loadable(lazy(() => import('@/views/Ai_Asistan/ChatPage')))
const AiAsistanSectorPage = Loadable(lazy(() => import('@/views/Ai_Asistan/SectorLandingPage')))

// Bu route grubu NISSAI yönetim ve mesaj merkezi sayfalarını mevcut ana mimariyi bozmadan yalın biçimde sunar.
const AiAsistanRoutes = {
    path: '/',
    element: <AuthLayout />,
    children: [
        {
            path: '/Ai_Asistan',
            element: <AiAsistanLandingPage />
        },
        {
            path: '/Ai_Asistan/login',
            element: <AiAsistanAdminLoginPage />
        },
        {
            path: '/Ai_Asistan/admin',
            element: <AiAsistanAdminPage />
        },
        {
            path: '/Ai_Asistan/chat',
            element: <AiAsistanChatPage />
        },
        {
            path: '/Ai_Asistan/sektor/:sectorKey',
            element: <AiAsistanSectorPage />
        }
    ]
}

export default AiAsistanRoutes
