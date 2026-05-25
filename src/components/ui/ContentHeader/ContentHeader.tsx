import Heading from '@/components/ui/Heading/Heading.tsx';
import Stack from '@components/ui/Stack/Stack';
import stylesObj from './ContentHeader.module.css';
import type { HTMLAttributes } from 'react';
import Text from '../Text/Text';

interface ContentHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style' | 'className'> {
    title: string;
    subtitle: string;
    children?: React.ReactNode;
}

export const ContentHeader = ({ title, subtitle, children }: ContentHeaderProps) => {
    return <Stack direction='row' justify='space-between' wrap={true}>
        <Stack gap='sm' direction='column' width='fit'>
            <Heading
                variant='secondary'
                level={2}
            >
                {title}
            </Heading>
            <Text color='darkgray' size={6} weight='regular'>{subtitle}</Text>
        </Stack>
        <div className={stylesObj.content}>
            {children}
        </div>
    </Stack>

}
