import stylesObj from './Button.module.css'
import clsx from 'clsx';
import type { ButtonProps } from '@/components/entities/Button/Button.types';

const Button = ({
  type = 'button',
  variant = 'accent',
  ref,
  isSubmitting,
  disabled,
  children,
  width = 'fit',
  radius = 'sm',
  size = 'lg',
  isHoverAnimated = true,
  ...props
}: ButtonProps) => {
  return <button
    ref={ref}
    className={clsx(stylesObj.button, stylesObj[variant], { [stylesObj.isSubmitting]: isSubmitting })}
    disabled={disabled || isSubmitting}
    type={type}
    data-width={width}
    data-radius={radius}
    data-size={size}
    data-hover-animated={isHoverAnimated}
    {...props}
  >{children}</button>
}

export default Button;
