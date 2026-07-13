import Stack from '@components/entities/Stack/Stack';
import Text from '@components/entities/Text/Text';
import type { SegmentedPickerProps } from './SegmentedPicker.types';

const SegmentedPicker = <T extends string | number>({
    label,
    children,
    value,
    name,
    ...props
}: SegmentedPickerProps<T>) => {
    return <>
        <Stack {...props} direction='row' justify='space-between' align='center'>
            <Text size={4} weight='bold' color='lightgray'>{label}</Text>
            <Stack gap='sm' direction='row'>
                {name && <input value={value} type='hidden' name={name} />}
                {children}
            </Stack>
        </Stack>
    </>
}

export default SegmentedPicker;