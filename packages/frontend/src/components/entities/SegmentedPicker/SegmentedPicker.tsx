import { AnimatePresence } from 'motion/react';
import Stack from '@components/entities/Stack/Stack';
import Text from '@components/entities/Text/Text';
import type { SegmentedPickerProps } from './SegmentedPicker.types';

const SegmentedPicker = ({
    label,
    children,
    overflow = 'visible',
    wrap = false,
    justify = 'space-between',
    ...props
}: SegmentedPickerProps) => {
    return <>
        <Stack
            {...props}
            direction='row'
            justify={justify}
            align='center'
            overflow={overflow}
        >
            <AnimatePresence>
                {label && <Text
                    truncate={false}
                    size={6}
                    weight='bolder'
                    color='var(--monochrome-600)'
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