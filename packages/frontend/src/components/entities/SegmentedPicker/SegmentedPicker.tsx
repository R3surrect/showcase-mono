import { AnimatePresence } from 'motion/react';
import Stack from '@components/entities/Stack/Stack';
import Text from '@components/entities/Text/Text';
import type { SegmentedPickerProps } from './SegmentedPicker.types';

const SegmentedPicker = ({
    label,
    children,
    overflow = 'visible',
    wrap = false,
    ...props
}: SegmentedPickerProps) => {
    return <>
        <Stack
            {...props}
            direction='row'
            justify='space-between'
            align='center'
            overflow={overflow}
        >
            <AnimatePresence>
                {label && <Text
                    truncate={false}
                    size={6}
                    weight='bolder'
                    color='var(--cold-blue-gray-400)'
                    wrap
                >
                    {label}
                </Text>}
                <Stack gap='sm' direction='row' overflow='auto' wrap={wrap}>
                    {children}
                </Stack>
            </AnimatePresence>
        </Stack>
    </>
}

export default SegmentedPicker;