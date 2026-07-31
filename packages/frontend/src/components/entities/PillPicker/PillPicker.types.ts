import type { LucideIcon } from 'lucide-react';
import type { RouteObject } from 'react-router-dom';

export interface PillPickerItem {
  icon?: LucideIcon;
  value: string;
  label: string;
  to: string;
  isDefault: boolean;
  lazy: RouteObject['lazy'];
};

export interface PillPickerProps {
  items: PillPickerItem[];
}