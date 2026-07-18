import type { DivUiComponent } from "../_shared/system.types"
import Toast from "./Toast"

const ToastProvider = ({ children }: DivUiComponent) => {
    return <>
        {children}
        <Toast />
    </>
}

export default ToastProvider;