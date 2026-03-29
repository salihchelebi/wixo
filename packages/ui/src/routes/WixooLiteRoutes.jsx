import { lazy } from 'react'
import Loadable from '@/ui-component/loading/Loadable'
import AuthLayout from '@/layout/AuthLayout'

const WixooLiteLandingPage = Loadable(lazy(() => import('@/views/wixooLite/LandingPage')))
const WixooLiteAdminLoginPage = Loadable(lazy(() => import('@/views/wixooLite/AdminLoginPage')))
const WixooLiteAdminPage = Loadable(lazy(() => import('@/views/wixooLite/AdminPage')))
const WixooLiteChatPage = Loadable(lazy(() => import('@/views/wixooLite/ChatPage')))
const WixooLiteSectorPage = Loadable(lazy(() => import('@/views/wixooLite/SectorLandingPage')))

// Bu route grubu NISSAI yönetim ve mesaj merkezi sayfalarını mevcut ana mimariyi bozmadan yalın biçimde sunar.
const WixooLiteRoutes = {
    path: '/',
    element: <AuthLayout />,
    children: [
        {
            path: '/wixoo-lite',
            element: <WixooLiteLandingPage />
        },
        {
            path: '/wixoo-lite/login',
            element: <WixooLiteAdminLoginPage />
        },
        {
            path: '/wixoo-lite/admin',
            element: <WixooLiteAdminPage />
        },
        {
            path: '/wixoo-lite/chat',
            element: <WixooLiteChatPage />
        },
        {
            path: '/wixoo-lite/sektor/:sectorKey',
            element: <WixooLiteSectorPage />
        }
    ]
}

export default WixooLiteRoutes
