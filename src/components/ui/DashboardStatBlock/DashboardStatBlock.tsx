import type { LucideIcon } from "lucide-react"
import Heading from "../Heading/Heading";
import Stack from "../Stack/Stack";

import stylesObj from './DashboardStatBlock.module.css';
import DashboardSurface from "../DashboardSurface/DashboardSurface";

export interface DashboardStatBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className' | 'children'> {
    iconObj: {
        icon: LucideIcon;
        color: string;
    };
    label: string;
    value: string | number;
    subtitle: string;
}

interface IconColor extends React.CSSProperties {
    '--icon-color': string;
}

const DashboardStatBlock = ({ iconObj, label, value, subtitle, ...props }: DashboardStatBlockProps) => {
    const Icon = iconObj.icon;

    return <DashboardSurface {...props}>
            <Stack direction="column" gap="sm" align="start">
                <Stack direction="row" align="center" justify="space-between">
                    <Heading level={6} variant="secondary">{label.toString().toUpperCase()}</Heading>
                    <div className={stylesObj.iconWrapper} style={{ '--icon-color': iconObj.color } as IconColor}>
                        <Icon width={24} strokeWidth={1.25} height={24} stroke={iconObj.color} />
                    </div>
                </Stack>

                <Heading level={1} variant="secondary" subtitle={subtitle}>{value}</Heading>
            </Stack>
    </DashboardSurface>
}

export default DashboardStatBlock;