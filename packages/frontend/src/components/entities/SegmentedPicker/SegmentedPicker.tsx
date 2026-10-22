import { AnimatePresence } from 'motion/react';
import Stack from '@components/entities/Stack/Stack';
import Text from '@components/entities/Text/Text';
import type { SegmentedPickerProps } from './SegmentedPicker.types';

const SegmentedPicker = ({
    label,
    children,
    ...props
}: SegmentedPickerProps) => {
    return <>
        <Stack
            {...props}
            direction='row'
            justify='space-between'
            align='center'
            overflow='visible'
        >
            <AnimatePresence>
                {label && <Text
                    truncate={false}
                    size={6}
                    weight='bolder'
                    color='var(--cold-blue-gray-400)'
                >
                    {label}
                </Text>}
                <Stack gap='sm' direction='row' overflow='auto'>
                    {children}
                </Stack>
            </AnimatePresence>
        </Stack>
    </>
}

export default SegmentedPicker;