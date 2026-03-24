import { useLocation, useOutlet } from 'react-router-dom';
import { Suspense } from 'react';
import { AnimatePresence, type Variants } from 'motion/react';

import Surface from "@/components/ui/Surface/Surface";
import styles from './AuthLayout.module.css';

export const Component: React.FC = () => {
    const location = useLocation();
    const outlet = useOutlet();

    const variants: Variants = {
        initial: {
            opacity: 0,
        },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.2,
                ease: "circOut",
                opacity: { duration: 0.25, ease: 'linear' }
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.2,
                ease: "circIn",
            }
        }
    };

    return (
        <div className={styles.authWrapper}>
            <AnimatePresence mode='wait'>
                <Surface variant='glass'
                    key={location.pathname}
                    variants={variants}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                >
                    <Suspense fallback={null}>
                        {outlet}
                    </Suspense>
                </Surface>
            </AnimatePresence>
        </div>
    )
}
