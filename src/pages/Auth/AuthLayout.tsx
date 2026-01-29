import Surface from "@/components/ui/Surface/Surface";
import type BaseProps from "@/interfaces/BaseProps";
import styles from './AuthLayout.module.css';

const AuthLayout: React.FC<BaseProps> = ({ children }) => {
    return (
        <div className={styles.authWrapper}>
            <Surface className={styles.authCard}>
                {children}
            </Surface>
        </div>
    )
}

export default AuthLayout;