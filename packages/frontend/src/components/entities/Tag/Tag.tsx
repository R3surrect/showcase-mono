import { useId } from 'react';
import { colord } from "@lib/colord"
import { motion } from 'motion/react'
import clsx from 'clsx';
import { LucideCircleX, LucidePencil } from 'lucide-react';
import type { TagVars, TagProps } from '@/components/entities/Tag/Tag.types';
import stylesObj from './Tag.module.css';
import Button from '@components/entities/Button/Button';
import Stack from '@components/entities/Stack/Stack';

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
        hasStroke = false,
        innerJustify = 'center',
        ...rest
    } = props;
    const tagId = isSystem ? genId : `${id}`;

    const style: TagVars = {
        '--tag-color': colord(color).toHslString(),
        '--tag-justify': innerJustify,
    }

    return <motion.div
        id={tagId}
        className={clsx(stylesObj.tag, stylesObj[props.type?.toLowerCase?.()])}
        data-system={isSystem}
        data-stroke={hasStroke}
        data-width={width}
        style={style}
        {...rest}
    >
        {
            isEditable && (onDeleteAction || onEditAction) &&
            <div className={stylesObj.editOverlay}>
                <Stack
                    direction='row'
                    align='center'
                    justify={innerJustify}
                    gap='sm'
                    height='max'
                    width='max'
                >
                    {
                        onEditAction && <Button
                            variant='transparent'
                            size='none'
                            radius='lg'
                            onClick={() => id && onEditAction(id)}
                        >
                            <LucidePencil size={16} color='var(--neutral-400)' />
                        </Button>
                    }
                    {
                        onDeleteAction && <Button
                            variant='transparent'
                            size='none'
                            onClick={() => id && onDeleteAction(id)}
                        >
                            <LucideCircleX size={16} color='var(--status-error)' />
                        </Button>
                    }
                </Stack>
            </div>
        }
        {children}
    </motion.div>
}

export default Tag;