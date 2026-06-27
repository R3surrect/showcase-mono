import React from "react";
import stylesObj from './Modal.module.css';
import type { DivUiRefComponent } from "@/components/entities/_shared/system.types";
import {
    FloatingFocusManager,
    FloatingOverlay,
    FloatingPortal,
    useDismiss,
    useFloating,
    useInteractions,
    useRole
} from "@floating-ui/react";

export interface ModalProps extends DivUiRefComponent {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    hasBackground?: boolean;
};

const Modal = ({ isOpen, onClose, hasBackground = true, children, ...props }: ModalProps) => {
    const { refs, context } = useFloating({
        open: isOpen,
        onOpenChange: onClose,
    });

    const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
    const role = useRole(context, { role: 'dialog' });

    const { getFloatingProps } = useInteractions([dismiss, role]);

    if (!isOpen) return null;
    return (
        <FloatingPortal>
            <FloatingOverlay
                lockScroll
                className={stylesObj.modalWrapper}
                data-has-background={hasBackground}
            >
                <FloatingFocusManager context={context}>
                    <div
                        ref={refs.setFloating}
                        {...getFloatingProps()}
                        {...props}
                    >
                        {children}
                    </div>
                </FloatingFocusManager>
            </FloatingOverlay>
        </FloatingPortal>
    )
}

export default Modal;