import type { SurfaceProps, SurfaceVars } from '@/components/entities/Surface/Surface.types';
import stylesObj from './Surface.module.css';
import clsx from 'clsx';
import { motion } from 'motion/react';
import { getHslString } from '../ColorList/ColorList.constants';
import { AXIS_SIZE_TYPES, DEFAULT_HSL_COLOR } from '../_shared/system.constants';

const AXIS_SIZE_SET = new Set<string>(AXIS_SIZE_TYPES);

const Surface = ({
    variant = 'solid',
    cornerRadius = 'md',
    color = 'var(--lite-white)',
    ref,
    children,
    isAnimated = false,
    height = 'fit',
    width = 'max',
    overflow = 'auto',
    ...props
}: SurfaceProps) => {
    const isHeightCustomValue = !AXIS_SIZE_SET.has(height);
    const isWidthCustomValue = !AXIS_SIZE_SET.has(width);

    return (
        <motion.div
            className={clsx(stylesObj.surface, stylesObj[variant])}
            ref={ref}
            data-animated={isAnimated}
            data-radius={cornerRadius}
            data-height={height}
            data-width={width}
            style={{
                '--surface-color': color || getHslString(DEFAULT_HSL_COLOR.color),
                '--surface-overflow': overflow,
                ...(isHeightCustomValue && { '--surface-height': height }),
                ...(isWidthCustomValue && { '--surface-width': width }),
            } as SurfaceVars}
            {...props}
        >
            {children}
        </motion.div >
    )
}

export default Surface;
