import { lazy } from 'react'
import Loadable from '@/ui-component/loading/Loadable'
import AuthLayout from '@/layout/AuthLayout'

const NetlifyLiteLandingPage = Loadable(lazy(() => import('@/views/netlifyLite/LandingPage')))
const NetlifyLiteAdminPage = Loadable(lazy(() => import('@/views/netlifyLite/AdminPage')))
const NetlifyLiteChatPage = Loadable(lazy(() => import('@/views/netlifyLite/ChatPage')))

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
            path: '/netlify-lite/admin',
            element: <NetlifyLiteAdminPage />
        },
        {
            path: '/netlify-lite/chat',
            element: <NetlifyLiteChatPage />
        }
    ]
}

export default NetlifyLiteRoutes
