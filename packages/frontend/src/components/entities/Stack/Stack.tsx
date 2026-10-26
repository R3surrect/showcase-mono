import type { StackProps, StackVars, StackWidth } from '@/components/entities/Stack/Stack.types';
import stylesObj from './Stack.module.css';
import { STACK_WIDTH_TYPES } from './Stack.constants';

const isStackWidth = (value: string): value is StackWidth =>
  (STACK_WIDTH_TYPES as readonly string[]).includes(value)

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
    ...(width && isStackWidth(width) && { 'data-width': width }),
    'data-wrap': wrap,
    'data-height': height,
    style: {
      '--stack-gap': `var(--indent-${gap})`,
      '--stack-align': align,
      '--stack-direction': direction,
      '--stack-justify': justify,
      '--stack-overflow': overflow,
      ...(width && !isStackWidth(width) && { '--stack-width': width })
    } as StackVars,
    ...props
  }

  return <div {...componentProps}>
    {children}
  </div>

}

export default Stack;
