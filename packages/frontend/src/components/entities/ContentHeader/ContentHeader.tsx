import Heading from '@/components/entities/Heading/Heading.tsx';
import Stack from '@components/entities/Stack/Stack';
// import stylesObj from './ContentHeader.module.css';
import Text from '../Text/Text';
import type { ContentHeaderProps } from '@/components/entities/ContentHeader/ContentHeader.types';

export const ContentHeader = ({ title, subtitle, children }: ContentHeaderProps) => {
    const heading = <Heading
        variant='secondary'
        level={2}
        align='start'
    >
        {title}
    </Heading>

    return <Stack direction='row' justify='space-between' wrap={true} align='center'>
        {subtitle ? <Stack gap='sm' direction='column' width='fit'>
            {heading}
            <Text color='darkgray' size={6} weight='regular'>{subtitle}</Text>
        </Stack>
            : heading
        }
        <Stack direction='row' id="content-header-slot">
            {children}
        </Stack>
    </Stack>

}
