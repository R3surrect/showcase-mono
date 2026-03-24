import stylesObj from './Surface.module.css';
import clsx from 'clsx';
import { motion, type HTMLMotionProps } from 'motion/react';

const VARIANT_TYPES = ['glass'] as const;

type Variants = typeof VARIANT_TYPES[number];

interface SurfaceProps extends HTMLMotionProps<'div'> {
    variant: Variants;
}

const variantsObj = {
    'glass': stylesObj.glass
}

const Surface = ({ variant = 'glass', ref, children, ...props }: SurfaceProps) => {
    return (
        <motion.div
            className={clsx(stylesObj.surface, variantsObj[variant])}
            ref={ref}
            {...props}
        >
            {children}
        </motion.div >
    )
}

export default Surface;
