import stylesObj from './Surface.module.css';
import clsx from 'clsx';
import { motion, type HTMLMotionProps } from 'motion/react';

const VARIANT_TYPES = ['glass', 'solid'] as const;
const RADIUS_TYPES = ['sm', 'md', 'lg'] as const;
const HEIGHT_TYPES = ['fit-content', 'max'] as const;
const ALIGN_TYPES = ['start', 'center', 'end'] as const;

type Radiuses = typeof RADIUS_TYPES[number];
type Variants = typeof VARIANT_TYPES[number];
type Heights = typeof HEIGHT_TYPES[number];
type Aligns = typeof ALIGN_TYPES[number];

interface SurfaceProps extends Omit<HTMLMotionProps<'div'>, 'className' | 'style'> {
    variant?: Variants;
    cornerRadius?: Radiuses;
    height?: Heights;
    align?: Aligns;
}

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
