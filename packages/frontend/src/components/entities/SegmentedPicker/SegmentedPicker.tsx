import Stack from '@components/entities/Stack/Stack';
import Text from '@components/entities/Text/Text';
import type { SegmentedPickerProps } from './SegmentedPicker.types';

const SegmentedPicker = ({ label, children, ...props }: SegmentedPickerProps) => {
    return <>
        <Stack {...props} direction='row' justify='space-between'>
            <Text size={4} weight='bold' color='lightgray'>{label}</Text>
            <Stack gap='sm' direction='row'>
                {children}
            </Stack>
        </Stack>
    </>
}

export default SegmentedPicker;