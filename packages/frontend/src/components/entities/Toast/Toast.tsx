import { FloatingPortal } from "@floating-ui/react";
import stylesObj from './Toast.module.css';
import Stack from "@components/entities/Stack/Stack";
import Text from "@components/entities/Text/Text";
import Hr from "../Hr/Hr";
import type { DivUiComponent } from "../_shared/system.types";
import type { ToastVars } from "./Toast.types";
import useToastStore from "./Toast.store";

const Toast = () => {
    const toastList = useToastStore(state => state.toastList);

    return <FloatingPortal>
        <div className={stylesObj.toastStack}>
            <Stack height="fit" gap="lg">
                {
                    toastList.length !== 0 && toastList.map(item => (
                        <div
                            key={item.id}
                            style={{ '--toast-status-color': `var(--status-${item.status})` } as ToastVars}
                            className={stylesObj.toastWrapper}
                        >
                            {
                                item.text ? <Stack gap="sm">
                                    <Text as="h2" weight="bolder">{item.label}</Text>
                                    <Hr variant="accent" thickness="half-medium" opacity={0.1} />
                                    <Text as="span" size={5} weight="regular">{item.text}</Text>
                                </Stack>
                                    : <Text as="h2" weight="bolder">{item.label}</Text>
                            }
                        </div>
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