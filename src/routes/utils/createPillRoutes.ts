import type { SubRouteConfig } from '../index.ts';
import { getPillIndexLoader } from './getPillIndexLoader.tsx';
import type { PillPickerItem } from '@components/ui/PillPicker/PillPicker.types.ts';

export const createPillRoutes = (parentPath: string, items: PillPickerItem[]): SubRouteConfig[] => 
   [
    { 
      index: true,
      loader: getPillIndexLoader(parentPath, items)
    },

    ...items.map(
      route => ({
      path: route.to,
      lazy: route.lazy,
    })
  ),

    { path: '*', loader: getPillIndexLoader(parentPath, items) }
  ]
