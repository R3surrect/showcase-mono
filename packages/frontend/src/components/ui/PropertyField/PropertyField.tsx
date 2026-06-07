import Heading from '@components/ui/Heading/Heading';
import stylesObj from './PropertyField.module.css';
import { useId } from 'react';
import Text from '@components/ui/Text/Text';
import type { PropertyFieldProps } from '@/components/entities/PropertyField/PropertyField.types';

const PropertyField = ({ title, subtitle, children }: PropertyFieldProps) => {
    const id = useId();

    return <div className={stylesObj.propertyField}>
        <label htmlFor={id}>
            <Heading
                variant='secondary'
                level={5}
            >
                {title}
            </Heading>
            <Text size={7}>{subtitle}</Text>
        </label>
        {children(id)}
    </div>

}

export default PropertyField;
