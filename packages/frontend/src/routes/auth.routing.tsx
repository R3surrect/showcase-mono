import { RouteErrorFallback } from '@/components/shared/RouteErrorFallback';

export const AUTH_ROUTES = {
    path: '/auth',
    lazy: () => import('@/components/entities/auth/AuthLayout/AuthLayout'),
    errorElement: <RouteErrorFallback />,

    children: [
        { path: 'login', lazy: () => import('@/pages/Auth/Login/Login.tsx') },
        { path: 'register', lazy: () => import('@/pages/Auth/Register/Register.tsx') },
    ],
    HydrateFallback: () => <div>...loading</div>
}
