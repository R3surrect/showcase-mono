import type { StackProps, StackVars } from '@/components/entities/Stack/Stack.types';
import stylesObj from './Stack.module.css';
import { motion } from 'motion/react';

// TODO Мапить типы в сторибуке
// TODO Добавить адаптив

const Stack = ({
  gap = 'md',
  align = 'stretch',
  direction = 'column',
  wrap = false,
  justify = 'start',
  children,
  ref,
  height = 'fit',
  width = 'auto',
  overflow = 'visible',
  ...props
}: StackProps) => {

  const isDraggable = overflow === 'scroll' || overflow === 'auto';

  const motionProps = isDraggable ? {
    drag: 'x' as const,
    dragConstraints: { right: 0 },
    dragElastic: 0.05,
    whileTap: { cursor: 'grabbing' },
  } : {};

  const componentProps = {
    ref: ref,
    className: stylesObj.stack,
    'data-width': width,
    'data-wrap': wrap,
    'data-height': height,
    style: {
      '--stack-gap': `var(--indent-${gap})`,
      '--stack-align': align,
      '--stack-direction': direction,
      '--stack-justify': justify,
      '--stack-overflow': overflow,
    } as StackVars,
    ...props
  }

  if (isDraggable) return <motion.div
    {...motionProps}
    {...componentProps}
  >
    {children}
  </motion.div >
  else return <div {...componentProps}>
    {children}
  </div>
}

export default Stack;
