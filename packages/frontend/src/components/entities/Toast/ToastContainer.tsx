import { motion, AnimatePresence } from "motion/react";
import { FloatingPortal } from "@floating-ui/react";
import stylesObj from './Toast.module.css';
import Stack from "@components/entities/Stack/Stack";
import type { DivUiComponent } from "@components/entities/_shared/system.types";
import type { ToastVars } from "./Toast.types";
import useToastStore from "./Toast.store";
import Toast from './Toast'

const animateProps = {
    x: "calc(100% + 50px)",
    transition: {
        duration: 1,
    }
};

const ToastContainer = () => {
    const toastList = useToastStore(state => state.toastList);
    const deleteToast = useToastStore(state => state.deleteToast);

    return <FloatingPortal>
        <div className={stylesObj.toastStack} data-no-dismiss>
            <Stack height="fit" gap="lg">
                <AnimatePresence>
                    {
                        toastList.length !== 0 && toastList.map(item => (
                            <motion.div
                                key={item.id}
                                style={{ '--toast-status-color': `var(--status-${item.status})` } as ToastVars}
                                className={stylesObj.toastWrapper}
                                layout
                                initial={animateProps}
                                animate={{ x: "0" }}
                                exit={animateProps}
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
                </AnimatePresence>
            </Stack>
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