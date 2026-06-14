import stylesObj from './Button.module.css'
import clsx from 'clsx';
import type { ButtonProps, ButtonVars } from '@/components/entities/Button/Button.types';

const Button = ({
  type = 'button',
  variant = 'accent',
  ref,
  isSubmitting,
  disabled,
  children,
  width = 'fit',
  ...props
}: ButtonProps) => {
  return <button
    ref={ref}
    className={clsx(stylesObj.button, stylesObj[variant], isSubmitting ? stylesObj.isSubmitting : '')}
    style={{ '--button-width': width === 'fit' ? 'fit-content' : '100%' } as ButtonVars}
    disabled={disabled || isSubmitting}
    type={type}
    {...props}
  >{children}</button>
}

export default Button;
