import { useId } from 'react';
import { LucideChevronRight } from 'lucide-react';
import Stack from '@components/entities/Stack/Stack';
import stylesObj from './Select.module.css';
import Text from '@components/entities/Text/Text';

interface SelectProps {
    id?: string;
    value: string | number;
    setValue: (value: string) => void;
    children: React.ReactNode;
    name?: string;
    labelText?: string;
}

const Select = ({ id, value, name, setValue, labelText, children }: SelectProps) => {
    const genId = useId();
    const controlId = id || genId;

    return (
        <Stack gap='sm' justify='space-between'>
            {labelText && (
                <Text
                    as='label'
                    htmlFor={controlId}
                    size={6}
                    color='var(--cold-blue-gray-400)'
                    weight='bolder'
                >
                    {labelText}
                </Text>
            )}
            <select
                value={String(value)}
                onChange={(e) => setValue(e.target.value)}
                className={stylesObj.select}
                id={controlId}
                name={name}
            >
                <button className={stylesObj.selectButton}>
                    <Stack direction='row' align='center' justify='space-between'>
                        <selectedcontent></selectedcontent>
                        <LucideChevronRight strokeWidth={2} color='var(--neutral-550)' />
                    </Stack>
                </button>
                {children}
            </select>
        </Stack>
    );
};

export default Select;
