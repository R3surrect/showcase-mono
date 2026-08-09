import Heading from '@/components/entities/Heading/Heading.tsx';
import Stack from '@components/entities/Stack/Stack';
// import stylesObj from './ContentHeader.module.css';
import type { ContentHeaderProps } from '@/components/entities/ContentHeader/ContentHeader.types';

export const ContentHeader = ({ title, subElement, children }: ContentHeaderProps) => {
    const heading =
        <Heading
            variant='secondary'
            level={2}
            align='start'
        >
            {title}
        </Heading>;

    return <Stack direction='row' justify='space-between' wrap={true} align='center'>
        {subElement ? <Stack gap='sm' direction='column' width='fit'>
            {heading}
            {subElement}
        </Stack>
            : heading
        }
        <Stack direction='row'>
            {children}
        </Stack>
    </Stack>

}
