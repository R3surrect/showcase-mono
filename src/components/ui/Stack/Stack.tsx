import stylesObj from './Stack.module.css';

const GAP_TYPES = ['sm', 'md', 'lg'] as const;
const ALIGN_TYPES = ['start', 'stretch'] as const;
const DIRECTION_TYPES = ['row', 'column'] as const;

type Gap = typeof GAP_TYPES[number];
type Align = typeof ALIGN_TYPES[number];
type Direction = typeof DIRECTION_TYPES[number]

interface StackProps {
  children: React.ReactNode;
  gap?: Gap;
  align?: Align;
  direction?: Direction;
}

interface StackVars extends React.CSSProperties {
  '--stack-gap': string,
  '--stack-align': Align;
  '--stack-direction': Direction;
}

const Stack: React.FC<StackProps> = ({ gap = 'md', align = 'stretch', direction = 'column', children }) => {
  return <div
    className={stylesObj.wrapper}
    style={{
      '--stack-gap': `var(--stack-gap-${gap})`,
      '--stack-align': align,
      '--stack-direction': direction,
    } as StackVars
    }>
    {children}
  </div>
}

export default Stack;
