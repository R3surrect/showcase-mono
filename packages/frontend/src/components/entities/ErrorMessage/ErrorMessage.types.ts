import type { HTMLMotionProps } from "motion/react";

export interface ErrorMessageProps extends HTMLMotionProps<'span'> {
  message?: string;
}