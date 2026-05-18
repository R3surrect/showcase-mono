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
    className={stylesObj.stackWrapper}
    {...props}
    style={{
      '--stack-gap': `var(--stack-gap-${gap})`,
      '--stack-align': align,
      '--stack-direction': direction,
      '--stack-wrap': wrap ? `wrap` : `nowrap`,
      '--stack-justify': justify,
      // '--stack-grow': grow ? '1' : '0',
    } as StackVars
    }>
    {children}
  </div >
}

export default Stack;
