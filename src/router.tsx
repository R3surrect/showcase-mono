import { createBrowserRouter, Navigate } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/auth',
    lazy: () => import('@/components/auth/AuthLayout/AuthLayout'),
    children: [
      { path: 'login', lazy: () => import('@/pages/Auth/Login/Login.tsx') },
      { path: 'register', lazy: () => import('@/pages/Auth/Register/Register.tsx') },
    ]
  },
  {
    path: '/',
    lazy: async () => {

      const [loaderModule, componentModule] = await Promise.all([
        import('@/components/layout/RootLayout/RootLayout.loader'),
        import('@/components/layout/RootLayout/RootLayout'),
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
        lazy: () => import('@/pages/Favorites/Favorites.tsx')
      },
      {
        path: 'Templates',
        lazy: () => import('@/pages/Templates/Templates.tsx')
      },
      {
        path: 'Preferences',
        lazy: () => import('@/pages/Preferences/Preferences.tsx')
      },
      { index: true, element: <Navigate to='/analytics' replace /> },
    ]
  },
  { path: '*', element: <div>404: Page not found</div> }
])
