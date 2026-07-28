import type { StackProps, StackVars } from '@/components/entities/Stack/Stack.types';
import stylesObj from './Stack.module.css';

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
  ...props
}: StackProps) => {
  return <div
    ref={ref}
    className={stylesObj.stack}
    data-width={width}
    data-wrap={wrap}
    data-height={height}
    style={{
      '--stack-gap': `var(--indent-${gap})`,
      '--stack-align': align,
      '--stack-direction': direction,
      '--stack-justify': justify,
    } as StackVars}
    {...props}
  >
    {children}
  </div >
}

export default Stack;
