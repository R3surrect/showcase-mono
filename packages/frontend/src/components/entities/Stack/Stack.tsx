import type { StackProps, StackVars } from '@/components/entities/Stack/Stack.types';
import stylesObj from './Stack.module.css';

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

  return <div {...componentProps}>
    {children}
  </div>

}

export default Stack;
