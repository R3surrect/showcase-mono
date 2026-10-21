import { LucideCircleCheck, LucideCircleX } from "lucide-react";
import Button from "../Button/Button";
import Stack from "../Stack/Stack";
import type { ToastData } from "./Toast.types";
import Text from "../Text/Text";
import useToastStore from "./Toast.store";
import { useEffect, useRef } from "react";
import Hr from "../Hr/Hr";

const Toast = ({ item }: { item: ToastData }) => {
    const hold = 3000;
    const timerRef = useRef<number | null>(null);
    const deleteToast = useToastStore(store => store.deleteToast);

    useEffect(() => {
        const timer = setTimeout(() => { deleteToast(item) }, hold);
        return () => { clearTimeout(timer) };
    }, [deleteToast])

    const renderActions = () => {
        switch (item.type) {
            case "dialog":
                return <Stack direction="row" gap="sm">
                    {
                        item.onConfirm &&
                        <Button
                            size="sm"
                            variant="accent"
                            onClick={item.onConfirm}
                        >
                            <Stack direction="row" gap="sm" align="center">
                                <LucideCircleCheck size={18} />
                                <Text color="var(--neutral-0)" weight='bold' size={6}>{item.confirmLabel}</Text>
                            </Stack>
                        </Button>
                    }
                    {
                        item.onDeny &&
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={item.onDeny}
                        >
                            <Stack direction="row" gap="sm" align="center">
                                <LucideCircleX size={18} />
                                <Text color="var(--neutral-400)" weight='bold' size={6}>{item.denyLabel}</Text>
                            </Stack>
                        </Button>
                    }
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

    return item.text
        ? <Stack gap="sm">
            <Text as="h2" weight="bolder" color="var(--neutral-850)">{item.label}</Text>
            <Hr variant="accent" thickness="half-medium" opacity={0.1} />
            <Stack direction='column' gap="md">
                <Text as="span" size={6} color="var(--neutral-850)" weight="bold">{item.text}</Text>
                {renderActions()}
            </Stack>
        </Stack>
        : <Text as="h2" weight="bolder" color="var(--neutral-850)">{item.label}</Text>

}

export default Toast;