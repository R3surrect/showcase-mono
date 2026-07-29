import { LucideChevronRight } from 'lucide-react';
import Stack from '../Stack/Stack';
import stylesObj from './Select.module.css';

interface SelectProps {
    value: string;
    setValue: (value: string) => void;
    children: React.ReactNode;
    name: string;
}

const Select = ({ value, name, setValue, children }: SelectProps) => {
    return <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
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