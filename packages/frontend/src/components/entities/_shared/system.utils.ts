import type { IconName } from "lucide-react/dynamic";

export const isValidLucideIcon = (iconName: string): iconName is IconName =>
    typeof iconName === 'string' && iconName.length > 0;