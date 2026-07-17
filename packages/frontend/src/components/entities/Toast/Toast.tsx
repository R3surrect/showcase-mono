import { FloatingPortal } from "@floating-ui/react";
import stylesObj from './Toast.module.css';

const Toast = () => {
    return <FloatingPortal>
        <div className={stylesObj.toastWrapper}>
            toast
        </div>
    </FloatingPortal>
}

export default Toast;