import { lazy } from 'react'
import Loadable from '@/ui-component/loading/Loadable'
import AuthLayout from '@/layout/AuthLayout'

const NetlifyLiteLandingPage = Loadable(lazy(() => import('@/views/netlifyLite/LandingPage')))
const NetlifyLiteAdminLoginPage = Loadable(lazy(() => import('@/views/netlifyLite/AdminLoginPage')))
const NetlifyLiteAdminPage = Loadable(lazy(() => import('@/views/netlifyLite/AdminPage')))
const NetlifyLiteChatPage = Loadable(lazy(() => import('@/views/netlifyLite/ChatPage')))
const NetlifyLiteSectorPage = Loadable(lazy(() => import('@/views/netlifyLite/SectorLandingPage')))

// Bu route grubu prototip admin ve chat sayfalarını mevcut ana mimariyi bozmadan yalın biçimde sunar.
const NetlifyLiteRoutes = {
    path: '/',
    element: <AuthLayout />,
    children: [
        {
            path: '/netlify-lite',
            element: <NetlifyLiteLandingPage />
        },
        {
            path: '/netlify-lite/login',
            element: <NetlifyLiteAdminLoginPage />
        },
        {
            path: '/netlify-lite/admin',
            element: <NetlifyLiteAdminPage />
        },
        {
            path: '/netlify-lite/chat',
            element: <NetlifyLiteChatPage />
        },
        {
            path: '/netlify-lite/sektor/:sectorKey',
            element: <NetlifyLiteSectorPage />
        }
    ]
}

export default NetlifyLiteRoutes
