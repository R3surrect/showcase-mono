import { FloatingPortal } from "@floating-ui/react";
import stylesObj from './Toast.module.css';
import Stack from "@components/entities/Stack/Stack";
import Text from "@components/entities/Text/Text";
import Hr from "../Hr/Hr";
import type { DivUiComponent } from "../_shared/system.types";
import type { ToastData, ToastVars } from "./Toast.types";
import useToastStore from "./Toast.store";
import Button from "@components/entities/Button/Button";
import { motion, AnimatePresence } from "framer-motion";

const Toast = () => {
    const toastList = useToastStore(state => state.toastList);
    const deleteToast = useToastStore(state => state.deleteToast);

    const getToastItems = (item: ToastData) => {
        switch (item.type) {
            case "dialog":
                return <>
                    {item.onConfirm && <Button variant="accent" onClick={item.onConfirm}>{item.confirmLabel}</Button>}
                    {item.onDeny && <Button variant="accent" onClick={item.onDeny}>{item.denyLabel}</Button>}
                </>
            case "message":
                return <Button onClick={(e) => {
                    e.stopPropagation();
                    item.onClick?.();
                    deleteToast(item)
                }}>Ok</Button>
            default:
                return null;
        }
    }

    return toastList.length !== 0 && <FloatingPortal>
        <div className={stylesObj.toastStack}>
            <Stack height="fit" gap="lg">
                {
                    toastList.map(item => (
                        <AnimatePresence>
                            <motion.div
                                key={item.id}
                                style={{ '--toast-status-color': `var(--status-${item.status})` } as ToastVars}
                                className={stylesObj.toastWrapper}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    item.onClick?.();
                                    deleteToast(item)
                                }}

                                initial={{ opacity: 1, scale: 1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {
                                    item.text
                                        ? <Stack gap="sm">
                                            <Text as="h2" weight="bolder">{item.label}</Text>
                                            <Hr variant="accent" thickness="half-medium" opacity={0.1} />
                                            <Text as="span" size={5} weight="regular">{item.text}</Text>
                                        </Stack>

                                        : <Text as="h2" weight="bolder">{item.label}</Text>
                                }
                                {
                                    getToastItems(item)
                                }
                            </motion.div>
                        </AnimatePresence>
                    ))
                }
            </Stack>
        </div>
    </FloatingPortal>
}

const ToastProvider = ({ children }: DivUiComponent) => {
    return <>
        {children}
        <Toast />
    </>
}

export default ToastProvider;