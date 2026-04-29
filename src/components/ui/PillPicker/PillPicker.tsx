import type { LucideIcon } from 'lucide-react';
import stylesObj from './PillPicker.module.css';
import { motion } from 'motion/react';
import { useNavigate, useLocation, type To, type RouteObject } from 'react-router-dom';

export interface PillPickerItem {
  icon: LucideIcon;
  value: string;
  label: string;
  to: string;
  isDefault: boolean;
  lazy: RouteObject['lazy'];
};

interface PillPickerProps {
  items: PillPickerItem[];
}

export const PillPicker = ({ items }: PillPickerProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className={stylesObj.container}>
      {items.map((item) => {
        const isActive = pathname.split('/').pop() === item.to;
        const Icon = item.icon;
        return (
          <div
            key={item.value}
            className={stylesObj.item}
            style={{ position: 'relative' }}
            onClick={() => navigate(item.to)}
          >
            {isActive && (
              <motion.div
                layoutId="underlay"
                className={stylesObj.underlay}
                initial={false}
                transition={{ type: 'spring', duration: 0.5 }}
              ></motion.div>
            )}
            <div className={stylesObj.value}>
              <Icon width={15} height={15} />
              <span>
                {item.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
