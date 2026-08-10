import { useId } from 'react';
import type { ColorVariable, TagProps } from '@/components/entities/Tag/Tag.types';
import stylesObj from './Tag.module.css';
import clsx from 'clsx';
import Button from '@components/entities/Button/Button';
import { LucideCircleX, LucidePencil } from 'lucide-react';
import Stack from '@components/entities/Stack/Stack';
import { colord } from 'colord';

const Tag = (props: TagProps) => {
    const genId = useId();
    const {
        color,
        width = 'fit',
        isSystem = false,
        children,
        id,
        isEditable,
        onEditAction,
        onDeleteAction,
        ...rest
    } = props;

    const tagId = isSystem ? genId : `${id}`;

    return <div
        id={tagId}
        className={clsx(stylesObj.tag, stylesObj[props.type.toLowerCase()])}
        data-width={width}
        data-system={isSystem}
        style={{ '--tag-color': colord(color).toHslString() } as ColorVariable}
        {...rest}
    >
        {
            isEditable && (onDeleteAction || onEditAction) &&
            <div className={stylesObj.editOverlay}>
                <Stack
                    direction='row'
                    align='center'
                    justify='center'
                    gap='sm'
                    height='max'
                    width='max'
                >
                    {onEditAction && <Button
                        variant='transparent'
                        size='none'
                        radius='lg'
                        onClick={() => id && onEditAction(id)}
                    >
                        <LucidePencil size={16} color='var(--neutral-400)' />
                    </Button>}
                    {onDeleteAction && <Button
                        variant='transparent'
                        size='none'
                        onClick={() => id && onDeleteAction(id)}
                    >
                        <LucideCircleX size={16} color='var(--status-error)' />
                    </Button>}
                </Stack>
            </div>
        }
        {children}
    </div>
}

export default Tag;