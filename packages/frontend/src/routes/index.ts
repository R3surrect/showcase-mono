import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import { ROOT_ROUTES } from '@/routes/root.routing';
import { AUTH_ROUTES } from '@/routes/auth.routing.tsx';
import { NOT_FOUND_ROUTE } from '@/routes/notFound.routing.tsx';

export type IndexRoute = Omit<RouteObject, 'children' | 'index'> & {
  index: true;
  children?: never;
  HydrateFallback?: () => React.ReactNode;
};

export type NonIndexRoute = Omit<RouteObject, 'children' | 'index'> & {
  index?: false;
  children?: SubRouteConfig[];
  HydrateFallback?: () => React.ReactNode;
};

export type SubRouteConfig = IndexRoute | NonIndexRoute;

export const routerData: SubRouteConfig[] = [
  ROOT_ROUTES,
  AUTH_ROUTES,
  NOT_FOUND_ROUTE,
];

export const router = createBrowserRouter(routerData);
