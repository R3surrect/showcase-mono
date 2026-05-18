export const AS_TYPES = ['p', 'span', 'label', 'strong', 'div', 'small', 'strong', 'em', 'time'] as const;
export type As = typeof AS_TYPES[number];

export const weightsMap = {
    thin: 200,
    regular: 350,
    bold: 500,
    bolder: 650,
} as const;
export type Weights = keyof typeof weightsMap;

export const sizeMap = {
    1: 'var(--title-size)',
    2: 'var(--header-size)',
    3: 'var(--subtitle-size)',
    4: 'var(--label-size)',
    5: 'var(--ui-main-size)',
    6: 'var(--helper-text-size)',
    7: 'var(--footer-text-size)',
} as const;
export type Sizes = keyof typeof sizeMap;

export const colorsMap = {
    lightgray: 'var(--monochrome-500)',
    darkgray: 'var(--monochrome-700)',
    yellow: 'color-mix(in srgb, var(--warm-orange-400), transparent var(--opacity-low))',
    orange: 'var(--warm-orange-400)',
} as const;
export type Colors = keyof typeof colorsMap;

export interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style' | 'className'> {
    as?: As;
    weight?: Weights;
    size?: Sizes;
    color?: Colors;
    children: React.ReactNode;
}

export interface FontVariables extends React.CSSProperties {
    '--text-weight': number;
    '--text-size': string;
    '--text-color': string;
}