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
    const {
        color,
        width = 'fit',
        variant = 'default',
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
        className={clsx(stylesObj.tag, stylesObj[variant])}
        data-width={width}
        data-system={isSystem}
        style={{ '--tag-color': getHslString(color) } as ColorVariable}
        {...rest}
    >
        {
            isEditable && <div className={stylesObj.editOverlay}>
                <Stack
                    direction='row'
                    align='center'
                    justify='center'
                    gap='sm'
                    height='max'
                    width='max'
                >
                    <Button
                        variant='transparent'
                        size='none'
                        radius='lg'
                        onClick={() => id && onEditAction(id)}
                    >
                        <LucidePencil size={16} color='var(--neutral-400)' />
                    </Button>
                    <Button
                        variant='transparent'
                        size='none'
                        onClick={() => id && onDeleteAction(id)}
                    >
                        <LucideCircleX size={16} color='var(--status-error)' />
                    </Button>
                </Stack>
            </div>
        }
        {children}
    </div>
}

export default Tag;