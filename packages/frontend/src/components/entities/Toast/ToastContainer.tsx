import { motion, AnimatePresence } from "motion/react";
import { FloatingPortal } from "@floating-ui/react";
import stylesObj from './Toast.module.css';
import Stack from "@components/entities/Stack/Stack";
import Text from "@components/entities/Text/Text";
import Hr from "@components/entities/Hr/Hr";
import type { DivUiComponent } from "@components/entities/_shared/system.types";
import type { ToastVars } from "./Toast.types";
import useToastStore from "./Toast.store";
import Toast from './Toast'

const ToastContainer = () => {

    const toastList = useToastStore(state => state.toastList);
    const deleteToast = useToastStore(state => state.deleteToast);

    return <FloatingPortal>
        <div className={stylesObj.toastStack} data-no-dismiss>
            <AnimatePresence>
                <Stack height="fit" gap="lg">
                    {
                        toastList.length !== 0 && toastList.map(item => (
                            <motion.div
                                key={item.id}
                                style={{ '--toast-status-color': `var(--status-${item.status})` } as ToastVars}
                                className={stylesObj.toastWrapper}
                                layout
                                onClick={(e) => {
                                    e.stopPropagation();
                                    item.onClick?.();
                                    deleteToast(item)
                                }}
                            >
                                <Toast item={item} />
                            </motion.div>
                        ))
                    }
                </Stack>
            </AnimatePresence>
        </div>
    </FloatingPortal>
}

const ToastProvider = ({ children }: DivUiComponent) => {
    return <>
        {children}
        <ToastContainer />
    </>
}

export default ToastProvider;