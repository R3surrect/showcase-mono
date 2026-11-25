import type { StackProps, StackVars } from '@/components/entities/Stack/Stack.types';
import stylesObj from './Stack.module.css';
import { STACK_WIDTH_TYPES } from './Stack.constants';
import { createUnionGuard } from '@showcase-mono/backend/shared/guards';

const isInStackWidth = createUnionGuard(STACK_WIDTH_TYPES);

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
  const isStackWidth = isInStackWidth(width);

  const style: StackVars = {
    '--stack-gap': `var(--indent-${gap})`,
    '--stack-align': align,
    '--stack-direction': direction,
    '--stack-justify': justify,
    '--stack-overflow': overflow,
    ...(!isStackWidth && { '--stack-width': width })
  };

  const componentProps = {
    ref: ref,
    className: stylesObj.stack,
    ...(width && isStackWidth && { 'data-width': width }),
    'data-wrap': wrap,
    'data-height': height,
    ...(isStackWidth && { 'data-width': width }),
    style,
    ...props
  }

  return <div {...componentProps}>
    {children}
  </div>

}

export default Stack;
