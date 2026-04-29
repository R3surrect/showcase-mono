import { redirect } from 'react-router-dom';

import { RouteErrorFaLLback } from '@/components/shared/RouteErrorFallback';
import { FAVORITES_ROUTES } from '@/routes/favorites.routing';
import { PREFERENCES_ROUTES } from '@/routes/preferences.routing';
import { getPillIndexLoader } from '@/routes/utils/getPillIndexLoader';

import { type SubRouteConfig } from '@/routes';

export const ROOT_ROUTES: SubRouteConfig = {
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
    { index: true, loader: () => redirect('/analytics') },
    {
      path: '/analytics',
      lazy: () => import('@/pages/Analytics/Analytics.tsx')
    },
    {
      path: '/scheduler',
      lazy: () => import('@/pages/Scheduler/Scheduler.tsx')
    },
    {
      path: '/templates',
      lazy: () => import('@/pages/Templates/Templates.tsx')
    },
    {
      path: '/notes',
      lazy: () => import('@/pages/Notes/Notes.tsx')
    },
    {
      path: '/projects',
      lazy: () => import('@/pages/Projects/Projects.tsx')
    },
    {
      path: '/favorites',
      lazy: () => import('@/pages/Favorites/Favorites.tsx'),
      children: [
        { index: true, loader: getPillIndexLoader('/favorites', FAVORITES_ROUTES) },

        ...FAVORITES_ROUTES.map((route) => ({
          path: route.to,
          lazy: route.lazy,
        })),

        { path: '*', loader: getPillIndexLoader('/favorites', FAVORITES_ROUTES) }
      ]
    },
    {
      path: '/preferences',
      lazy: () => import('@/pages/Preferences/Preferences.tsx'),
      errorElement: <RouteErrorFaLLback />,
      children: [
        { index: true, loader: getPillIndexLoader('/preferences', PREFERENCES_ROUTES) },

        ...PREFERENCES_ROUTES.map((route) => ({
          path: route.to,
          lazy: route.lazy,
        })),

        { path: '*', loader: getPillIndexLoader('/preferences', PREFERENCES_ROUTES) }
      ]
    },
  ]
};
