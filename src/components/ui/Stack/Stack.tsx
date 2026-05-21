import stylesObj from './Stack.module.css';
import type { StackProps, StackVars } from './Stack.types';

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
  // grow = true,
  ...props
}: StackProps) => {
  return <div
    ref={ref}
    className={stylesObj.stack}
    data-gap={gap}
    data-align={align}
    style={{
      '--stack-gap': `var(--indent-${gap})`,
      '--stack-align': align,
      '--stack-direction': direction,
      '--stack-wrap': wrap ? `wrap` : `nowrap`,
      '--stack-justify': justify,
    } as StackVars}
    {...props}
  >
    {children}
  </div >
}

export default Stack;
