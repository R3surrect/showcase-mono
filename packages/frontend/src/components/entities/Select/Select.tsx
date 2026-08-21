import { LucideChevronRight } from 'lucide-react';
import Stack from '../Stack/Stack';
import stylesObj from './Select.module.css';
import Text from '../Text/Text';
import { useId } from 'react';

interface SelectProps<T> {
    id?: string;
    value: T;
    setValue: (value: T) => void;
    children: React.ReactNode;
    name?: string;
    labelText?: string;
}

const Select = <T extends string | number | readonly string[]>({ id, value, name, setValue, labelText, children }: SelectProps<T>) => {
    const genId = useId();
    const controlId = id || genId;

    return <Stack gap='sm' justify='space-between'>
        {labelText &&
            <Text
                as='label'
                htmlFor={controlId}
                size={6}
                color='var(--cold-blue-gray-400)'
                weight='bolder'
            >
                {labelText}
            </Text>
        }
        <select
            value={value}
            onChange={(e) => setValue(e.target.value as T)}
            className={stylesObj.select}
            id={controlId}
            name={name}
        >
            <button>
                <Stack direction='row' align='center' justify='space-between'>
                    <selectedcontent></selectedcontent>
                    <LucideChevronRight strokeWidth={2} color='var(--neutral-550)' />
                </Stack>
            </button>
            {children}
        </select>
    </Stack>
}

export default Select;