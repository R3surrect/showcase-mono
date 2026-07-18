import { FloatingPortal } from "@floating-ui/react";
import stylesObj from './Toast.module.css';
import Stack from "@components/entities/Stack/Stack";
import Text from "@components/entities/Text/Text";
import Hr from "../Hr/Hr";
// import { useState } from "react";

const Toast = () => {
    // const [] = 
    
    return <FloatingPortal>
        <div className={stylesObj.toastStack}>
            <Stack height="fit" gap="lg">
                <div
                    className={stylesObj.toastWrapper}
                    // data-closed={isClosed}
                    // onClick={() => setIsClosed(true)}
                >
                    <Stack gap="sm">
                        <Text as="h2" weight="bolder">Login successful</Text>
                        <Hr variant="accent" thickness="half-medium" opacity={0.1} />
                        <Text as="span" size={5} weight="regular">You was authorized as UserName</Text>
                    </Stack>
                </div>

                <div
                    className={stylesObj.toastWrapper}
                    // data-closed={isClosed}
                    // onClick={() => setIsClosed(true)}
                >
                    <Stack gap="sm">
                        <Text as="h2" weight="bolder">Login successful</Text>
                        <Hr variant="accent" thickness="half-medium" opacity={0.1} />
                        <Text as="span" size={5} weight="regular">You was authorized as UserName</Text>
                    </Stack>
                </div>
            </Stack>
        </div>
    </FloatingPortal>
}

export default Toast;