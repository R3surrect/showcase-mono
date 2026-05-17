import stylesObj from './Surface.module.css';
import clsx from 'clsx';
import { motion } from 'motion/react';
import type { SurfaceProps } from './Surface.types';

const variantsObj = {
    glass: stylesObj.glass,
    solid: stylesObj.solid,
}

const radiusesObj = {
    sm: 'var(--border-radius-4)',
    md: 'var(--border-radius-15)',
    lg: 'var(--border-radius-25)',
}

const Surface = ({
    variant = 'solid',
    cornerRadius = 'md',
    height = 'max',
    align = 'start',
    ref,
    children,
    ...props
}: SurfaceProps) => {
    const isFit = height === 'fit-content';
    return (
        <motion.div
            className={clsx(stylesObj.surface, variantsObj[variant])}
            ref={ref}
            style={{
                borderRadius: radiusesObj[cornerRadius],
                height: isFit ? 'fit-content' : '100%',
                alignSelf: align
            }}
            {...props}
        >
            {children}
        </motion.div >
    )
}

export default Surface;
