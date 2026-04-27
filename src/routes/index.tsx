import { FAVORITES_ROUTES } from '@/routes/favorites.routing';
import { PREFERENCES_ROUTES } from '@/routes/preferences.routing';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/auth',
    lazy: () => import('@/components/auth/AuthLayout/AuthLayout'),
    children: [
      { path: 'login', lazy: () => import('@/pages/Auth/Login/Login.tsx') },
      { path: 'register', lazy: () => import('@/pages/Auth/Register/Register.tsx') },
    ],
    HydrateFallback: () => <div>...loading</div>
  },
  {
    path: '/',
    HydrateFallback: () => <div>...loading</div>,
    lazy: async () => {

      const [loaderModule, componentModule] = await Promise.all([
        import('@/components/layout/RootLayout/RootLayout.loader.ts'),
        import('@/components/layout/RootLayout/RootLayout.tsx'),
      ]);

      return {
        loader: loaderModule.loader,
        Component: componentModule.Component
      };

    },
    children: [
      { index: true, element: <Navigate to='/analytics' replace /> },
      {
        path: 'analytics',
        lazy: () => import('@/pages/Analytics/Analytics.tsx')
      },
      {
        path: 'Scheduler',
        lazy: () => import('@/pages/Scheduler/Scheduler.tsx')
      },
      {
        path: 'Notes',
        lazy: () => import('@/pages/Notes/Notes.tsx')
      },
      {
        path: 'Projects',
        lazy: () => import('@/pages/Projects/Projects.tsx')
      },
      {
        path: 'Favorites',
        lazy: () => import('@/pages/Favorites/Favorites.tsx'),
        children: [
          {index: true, element: <Navigate to={FAVORITES_ROUTES[0].to}/>},

          ...FAVORITES_ROUTES.map((route) => ({
            path: route.to,
            lazy: route.lazy,
          })),
          // {path: 'tasks', lazy: () => import('@/components/page/Favorites/Tasks/Tasks.tsx')},
          // {path: 'notes', lazy: () => import('@/components/page/Favorites/Notes/Notes.tsx')},
          // {path: 'projects', lazy: () => import('@/components/page/Favorites/Projects/Projects.tsx')},
        ]
      },
      {
        path: 'Templates',
        lazy: () => import('@/pages/Templates/Templates.tsx')
      },
      {
        path: 'Preferences',
        lazy: () => import('@/pages/Preferences/Preferences.tsx'),
        children: [
          {index: true, element: <Navigate to={PREFERENCES_ROUTES[0].to} />},
          ...PREFERENCES_ROUTES.map((route) => ({
            path: route.to,
            lazy: route.lazy,
          })),
        ]
      },
    ]
  },
  { path: '*', element: <div>404: Page not found</div> }
])
