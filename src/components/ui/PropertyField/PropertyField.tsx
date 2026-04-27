import Heading from '@/components/ui/Heading/Heading';
import stylesObj from './PropertyField.module.css';
import { useId } from 'react';

interface PropertyFieldProps {
    title: string;
    subtitle: string;
    children: (id: string) => React.ReactNode;
}

const PropertyField = ({title, subtitle, children }: PropertyFieldProps) => {
    const id = useId();

    return <div className={stylesObj.propertyField}>
        <label htmlFor={id}>
            <Heading
                variant='secondary'
                level={5}
                subtitle={subtitle}
            >
                {title}
            </Heading>
        </label>
        {children(id)}
    </div>

}

export default PropertyField;
