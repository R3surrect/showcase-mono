import { motion, AnimatePresence } from "framer-motion";
import { LucideCircleCheck, LucideCircleX } from "lucide-react";
import { FloatingPortal } from "@floating-ui/react";
import stylesObj from './Toast.module.css';
import Stack from "@components/entities/Stack/Stack";
import Text from "@components/entities/Text/Text";
import Hr from "@components/entities/Hr/Hr";
import type { DivUiComponent } from "@components/entities/_shared/system.types";
import type { ToastData, ToastVars } from "./Toast.types";
import useToastStore from "./Toast.store";
import Button from "@components/entities/Button/Button";

const Toast = () => {
    const toastList = useToastStore(state => state.toastList);
    const deleteToast = useToastStore(state => state.deleteToast);

    const getToastItems = (item: ToastData) => {
        switch (item.type) {
            case "dialog":
                return <Stack direction="row" gap="sm">
                    {item.onConfirm &&
                        <Button
                            size="sm"
                            variant="accent"
                            onClick={item.onConfirm}
                        >
                            <Stack direction="row" gap="sm" align="center">
                                <LucideCircleCheck size={18} />
                                <Text color="var(--neutral-0)" weight='bold' size={6}>{item.confirmLabel}</Text>
                            </Stack>
                        </Button>}
                    {item.onDeny &&
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={item.onDeny}
                        >
                            <Stack direction="row" gap="sm" align="center">
                                <LucideCircleX size={18} />
                                <Text color="var(--neutral-400)" weight='bold' size={6}>{item.denyLabel}</Text>
                            </Stack>
                        </Button>}
                </Stack>
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
                                {
                                    item.text
                                        ? <Stack gap="sm">
                                            <Text as="h2" weight="bolder" color="var(--neutral-850)">{item.label}</Text>
                                            <Hr variant="accent" thickness="half-medium" opacity={0.1} />
                                            <Stack direction='column' gap="md">
                                                <Text as="span" size={6} color="var(--neutral-850)" weight="bold">{item.text}</Text>
                                                {
                                                    getToastItems(item)
                                                }
                                            </Stack>
                                        </Stack>
                                        : <Text as="h2" weight="bolder" color="var(--neutral-850)">{item.label}</Text>

                                }
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
        <Toast />
    </>
}

export default ToastProvider;