import stylesObj from './Stack.module.css';

const GAP_TYPES = ['sm', 'md', 'lg'] as const;
const ALIGN_TYPES = ['start', 'stretch'] as const;
const DIRECTION_TYPES = ['row', 'column'] as const;
const JUSTIFY_TYPES = ['start', 'center', 'end', 'space-around', 'space-between', 'space-evenly'] as const;

type Gap = typeof GAP_TYPES[number];
type Align = typeof ALIGN_TYPES[number];
type Direction = typeof DIRECTION_TYPES[number]
type Justify = typeof JUSTIFY_TYPES[number]

interface StackProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className'> {
  children: React.ReactNode;
  gap?: Gap;
  align?: Align;
  direction?: Direction;
  wrap?: boolean;
  justify?: Justify;
}

interface StackVars extends React.CSSProperties {
  '--stack-gap': string,
  '--stack-align': Align;
  '--stack-direction': Direction;
  '--stack-justify': Justify;
}

const Stack = ({
  gap = 'md',
  align = 'stretch',
  direction = 'column',
  wrap = false,
  justify = 'start',
  children,
  ...rest
}: StackProps) => {
  return <div
    {...rest}
    className={stylesObj.stackWrapper}
    style={{
      '--stack-gap': `var(--stack-gap-${gap})`,
      '--stack-align': align,
      '--stack-direction': direction,
      '--stack-wrap': wrap ? `wrap` : `nowrap`,
      '--stack-justify': justify
    } as StackVars
    }>
    {children}
  </div>
}

export default Stack;
