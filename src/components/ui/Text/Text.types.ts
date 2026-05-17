export const AS_TYPES = ['p', 'span', 'label', 'strong', 'div', 'small', 'strong', 'em', 'time'] as const;
export type As = typeof AS_TYPES[number];

export const weightsMap = {
    thin: 200,
    regular: 350,
    bold: 500,
    bolder: 650,
} as const;

export type Weights = keyof typeof weightsMap;
export const colorsMap = {
    
} as const;

export type Colors = keyof typeof colorsMap;
export const textSizeMap = {
    1: 'var(--title-size)',
    2: 'var(--header-size)',
    3: 'var(--subtitle-size)',
    4: 'var(--label-size)',
    5: 'var(--ui-main-size)',
    6: 'var(--helper-text-size)',
    7: 'var(--footer-text-size)',
} as const;

export type TextSizes = keyof typeof textSizeMap;

export interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style' | 'className'> {
    as?: As;
    weight?: Weights;
    textSize?: TextSizes;
    children: React.ReactNode;
}

export interface FontVariables extends React.CSSProperties {
    '--text-weight': number;
    '--text-size': string;
}