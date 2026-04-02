import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useConfig } from '@/store/context/ConfigContext'
import { useSelector } from 'react-redux'

/**
 * Returns first reachable route path according to permissions/display flags.
 */
export const resolveDefaultRoute = ({ isAuthenticated, isOpenSource, isGlobal, hasPermission, hasDisplay }) => {
    if (!isAuthenticated) return '/login'
    if (isOpenSource || isGlobal) return '/chatflows'

    const routesToCheck = [
        { path: '/chatflows', permission: 'chatflows:view' },
        { path: '/agentflows', permission: 'agentflows:view' },
        { path: '/executions', permission: 'executions:view' },
        { path: '/assistants', permission: 'assistants:view' },
        { path: '/marketplaces', permission: 'templates:marketplace,templates:custom' },
        { path: '/tools', permission: 'tools:view' },
        { path: '/credentials', permission: 'credentials:view' },
        { path: '/variables', permission: 'variables:view' },
        { path: '/apikey', permission: 'apikeys:view' },
        { path: '/document-stores', permission: 'documentStores:view' },
        { path: '/datasets', permission: 'datasets:view', display: 'feat:datasets' },
        { path: '/evaluators', permission: 'evaluators:view', display: 'feat:evaluators' },
        { path: '/evaluations', permission: 'evaluations:view', display: 'feat:evaluations' },
        { path: '/sso-config', permission: 'sso:manage', display: 'feat:sso-config' },
        { path: '/roles', permission: 'roles:manage', display: 'feat:roles' },
        { path: '/users', permission: 'users:manage', display: 'feat:users' },
        { path: '/workspace', permission: 'workspace:view', display: 'feat:workspaces' },
        { path: '/login-activity', permission: 'loginActivity:view', display: 'feat:login-activity' },
        { path: '/logs', permission: 'logs:view', display: 'feat:logs' },
        { path: '/account', display: 'feat:account' }
    ]

    for (const route of routesToCheck) {
        const hasRequiredPermission = !route.permission || hasPermission(route.permission)
        const hasRequiredDisplay = !route.display || hasDisplay(route.display)
        if (hasRequiredPermission && hasRequiredDisplay) {
            return route.path
        }
    }

    return '/unauthorized'
}

export const DefaultRedirect = () => {
    const { hasPermission, hasDisplay } = useAuth()
    const { isOpenSource } = useConfig()
    const isGlobal = useSelector((state) => state.auth.isGlobal)
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    const destination = resolveDefaultRoute({
        isAuthenticated,
        isOpenSource,
        isGlobal,
        hasPermission,
        hasDisplay
    })

    return <Navigate to={destination} replace />
}
