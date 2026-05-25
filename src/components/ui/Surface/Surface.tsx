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
    color = 'var(--lite-white)',
    ref,
    children,
    isAnimated = false,
    ...props
}: SurfaceProps) => {

    return (
        <motion.div
            onClick={props.onClick}
            data-clickable={Boolean(props.onClick)}
            className={clsx(stylesObj.surface, variantsObj[variant])}
            ref={ref}
            data-animated={isAnimated}
            data-radius={cornerRadius}
            style={{
                '--surface-color': color
            } as SurfaceVars}
            {...props}
        >
            {children}
        </motion.div >
    )
}

export default Surface;
