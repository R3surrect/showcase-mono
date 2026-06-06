import stylesObj from './Button.module.css'
import clsx from 'clsx';
import type { ButtonProps } from './Button.types';

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
    className={clsx(stylesObj.button, stylesObj[variant], isSubmitting ? stylesObj.isSubmitting : '')}
    disabled={disabled || isSubmitting}
    type={type}
    {...props}
  >{children}</button>
}

export default Button;
