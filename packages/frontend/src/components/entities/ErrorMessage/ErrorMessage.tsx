import { motion, AnimatePresence } from 'motion/react';
import stylesObj from './ErrorMessage.module.css';
import type { ErrorMessageProps } from '@/components/entities/ui/ErrorMessage/ErrorMessage.types';

const animation = {
  initial: { opacity: 0, y: -5, height: 0 },
  animate: { opacity: 1, y: 0, height: 'auto' },
  transition: { duration: 0.2, ease: 'easeOut'},
} as const;

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <AnimatePresence>
    {message &&
      <motion.span
      
        initial={animation.initial}
        animate={animation.animate}
        exit={animation.initial}
        transition={animation.transition}

        className={stylesObj.ErrorMessage}
        role='alert'
      >
        {message}
      </motion.span>}
  </AnimatePresence>
}

export default ErrorMessage;
