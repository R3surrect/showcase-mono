import type BaseProps from '@/interfaces/BaseProps';
import stylesObj from './Button.module.css'
import type { ComponentPropsWithRef } from 'react';
import clsx from 'clsx';

const VARIANT_TYPES = ['accent', 'outline'] as const;
const TYPE_TYPES = ['submit', 'button', 'reset'] as const;

type Type = typeof TYPE_TYPES[number];
type Variant = typeof VARIANT_TYPES[number];

interface ButtonProps extends BaseProps, Omit<ComponentPropsWithRef<'button'>, keyof BaseProps | 'style'> {
  type?: Type;
  variant?: Variant;
  isSubmitting?: boolean;
}

const variants = {
  accent: stylesObj.accent,
  outline: stylesObj.outline,
}

const Button = ({
  type = 'button',
  variant = 'accent',
  ref,
  isSubmitting,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return <button
    ref={ref}
    className={clsx(stylesObj.button, variants[variant], isSubmitting ? stylesObj.isSubmitting : '')}
    disabled={disabled || isSubmitting}
    type={type}
    {...props}
  >{children}</button>
}

export default Button;
