import Heading from '@/components/entities/Heading/Heading.tsx';
import Stack from '@components/entities/Stack/Stack';
import stylesObj from './ContentHeader.module.css';
import Text from '../Text/Text';
import type { ContentHeaderProps } from '@/components/entities/ContentHeader/ContentHeader.types';

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
