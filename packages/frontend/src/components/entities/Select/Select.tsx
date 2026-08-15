import { LucideChevronRight } from 'lucide-react';
import Stack from '../Stack/Stack';
import stylesObj from './Select.module.css';

interface SelectProps<T> {
    value: T;
    setValue: (value: T) => void;
    children: React.ReactNode;
    name?: string;
}

const Select = <T extends string | number | readonly string[]>({ value, name, setValue, children }: SelectProps<T>) => {
    return <select
        value={value}
        onChange={(e) => setValue(e.target.value as T)}
        className={stylesObj.select}
        name={name}
    >
        <button>
            <Stack direction='row' align='center' justify='space-between'>
                <selectedcontent></selectedcontent>
                <LucideChevronRight strokeWidth={2} color='var(--neutral-550)'/>
            </Stack>
        </button>
        {children}
    </select>
}

export default Select;