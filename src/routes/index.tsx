import { ROOT_ROUTES } from '@/routes/root.routing';
import { AUTH_ROUTES } from '@/routes/auth.routing.tsx';
import { NOT_FOUND_ROUTE } from '@/routes/notFound.routing.tsx';
import { createBrowserRouter, redirect, type RouteObject } from 'react-router-dom';
import type { PillPickerItem } from '@/components/ui/PillPicker/PillPicker';

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

export const getPillIndexLoader = (parentPath: string, items: PillPickerItem[]) => {
  return () => {
    if (!items || items.length === 0) throw new Error(`Items of ${parentPath} are empty`)

    const defaultItem = items.find(item => item.isDefault)?.to ?? items[0].to;
    return redirect(`${parentPath}/${defaultItem}`)
  }
};

export type SubRouteConfig = IndexRoute | NonIndexRoute;

export const routerData: SubRouteConfig[] = [
  ROOT_ROUTES,
  AUTH_ROUTES,
  NOT_FOUND_ROUTE,
];

export const router = createBrowserRouter(routerData);
