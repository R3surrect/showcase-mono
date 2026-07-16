import { useId } from 'react';
import type { ColorVariable, TagProps } from '@/components/entities/Tag/Tag.types';
import stylesObj from './Tag.module.css';
import { getHslString } from '@components/entities/ColorList/ColorList.constants';
import clsx from 'clsx';
import Button from '@components/entities/Button/Button';
import { LucideCircleX, LucidePencil } from 'lucide-react';
import Stack from '@components/entities/Stack/Stack';

const Tag = (props: TagProps) => {
    const genId = useId();

    const { label, color, id, width = 'fit', variant = 'default', ...rest } = props;

    return <div
        id={id ? id.toString() : genId}
        className={clsx(stylesObj.tag, stylesObj[variant])}
        data-width={width}
        style={{ '--tag-color': getHslString(color) } as ColorVariable}
        {...rest}
    >

        {props.isEditable && <div className={stylesObj.editOverlay}>
            <Stack
                direction='row'
                align='center'
                justify='center'
                gap='sm'
                height='max'
                width='max'
            >
                <Button variant='transparent' radius='lg' onClick={() => id !== undefined && props.onEditAction(id.toString())}>
                    <LucidePencil size={16} color='var(--neutral-400)' />
                </Button>
                <Button variant='transparent' onClick={() => id !== undefined && props.onDeleteAction(id.toString())}>
                    <LucideCircleX size={16} color='var(--status-error)' />
                </Button>
            </Stack>
        </div>}

        <span>{label}</span>
    </div>
}

export default Tag;