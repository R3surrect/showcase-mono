import type { SurfaceProps, SurfaceVars } from '@/components/entities/ui/Surface/Surface.types';
import stylesObj from './Surface.module.css';
import clsx from 'clsx';
import { motion } from 'motion/react';

const Surface = ({
    variant = 'solid',
    cornerRadius = 'md',
    color = 'var(--lite-white)',
    ref,
    children,
    isAnimated = false,
    height = 'fit',
    ...props
}: SurfaceProps) => {
    return (
        <motion.div
            onClick={props.onClick}
            data-clickable={Boolean(props.onClick)}
            className={clsx(stylesObj.surface, stylesObj[variant])}
            ref={ref}
            data-animated={isAnimated}
            data-radius={cornerRadius}
            style={{
                '--surface-color': color,
                '--surface-height': height === 'fit' ? 'fit-content' : '100%',
            } as SurfaceVars}
            {...props}
        >
            {children}
        </motion.div >
    )
}

export default Surface;
