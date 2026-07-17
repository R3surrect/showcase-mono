import { FloatingPortal } from "@floating-ui/react";
import stylesObj from './Toast.module.css';
import Stack from "@components/entities/Stack/Stack";
import Text from "@components/entities/Text/Text";
import Hr from "../Hr/Hr";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useState } from "react";

const Toast = () => {
    const [isClosed, setIsClosed] = useState(false);

    return <FloatingPortal>
        <div
            className={stylesObj.toastWrapper}
            data-closed={isClosed}
            onClick={() => setIsClosed(true)}
        >
            <Stack gap="sm">
                <div>
                    <Text as="h2" weight="bolder">Label</Text>
                    <Hr variant="accent" thickness="half-medium" opacity={0.1} />
                </div>
                <ErrorMessage message="SomeMessage" />
            </Stack>
        </div>
    </FloatingPortal>
}

export default Toast;