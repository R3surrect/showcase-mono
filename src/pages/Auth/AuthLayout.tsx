import Surface from "@/components/ui/Surface/Surface";
import styles from './AuthLayout.module.css';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

export const Component: React.FC = () => {
    return (
        <Suspense fallback={null}>
            <div className={styles.authWrapper}>
                <Surface className={styles.authCard}>
                    <Outlet />
                </Surface>
            </div>
        </Suspense>
    )
}
