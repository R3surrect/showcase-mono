import stylesObj from './Surface.module.css';
import clsx from 'clsx';
import { motion } from 'motion/react';
import type { SurfaceProps, SurfaceVars } from './Surface.types';

const variantsObj = {
    glass: stylesObj.glass,
    solid: stylesObj.solid,
    outline: stylesObj.outline,
}

const Surface = ({
    variant = 'solid',
    cornerRadius = 'md',
    height = 'max',
    align = 'start',
    color = 'var(--lite-white)',
    ref,
    children,
    isAnimated = false,
    onClick,
    ...props
}: SurfaceProps) => {
    const isFit = height === 'fit-content';

    return (
        <motion.div
            onClick={onClick}
            data-clickable={Boolean(onClick)}
            className={clsx(stylesObj.surface, variantsObj[variant])}
            ref={ref}
            data-animated={isAnimated}
            data-radius={cornerRadius}
            style={{
                height: isFit ? 'fit-content' : '100%',
                alignSelf: align,
                '--surface-color': color
            } as SurfaceVars}
            {...props}
        >
            {children}
        </motion.div >
    )
}

export default Surface;
