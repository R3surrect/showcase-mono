import {
    FloatingFocusManager,
    FloatingOverlay,
    FloatingPortal,
    useDismiss,
    useFloating,
    useInteractions,
    useRole,
    useTransitionStatus,
} from "@floating-ui/react";
import stylesObj from './Modal.module.css';
import type { ModalProps, ModalVars } from './Modal.types';

const Modal = ({ isOpen, onClose, hasBackground = true, children, ...props }: ModalProps) => {
    const animationDuration = 150;
    const { refs, context } = useFloating({
        open: isOpen,
        onOpenChange: (nextOpen) => {
            if (!nextOpen) onClose();
        },
    });

    const { isMounted, status } = useTransitionStatus(context, {
        duration: animationDuration,
    });

    const dismiss = useDismiss(context, {
        outsidePressEvent: 'mousedown',
        outsidePress: (event) => {
            const target = event.target as HTMLElement;
            if (target.closest('[data-no-dismiss]')) {
                return false;
            }
            return true;
        },
    });
    const role = useRole(context, { role: 'dialog' });

    const { getFloatingProps } = useInteractions([dismiss, role]);

    if (!isMounted) return null;
    return (
        <FloatingPortal>
            <FloatingOverlay
                lockScroll
                style={{
                    '--modal-animation-duration': `${animationDuration}ms`
                } as ModalVars}
                className={stylesObj.modalWrapper}
                data-has-background={hasBackground}
                data-status={status}
            >
                <FloatingFocusManager context={context}>
                    <div
                        className={stylesObj.focusManagerWrapper}
                        ref={refs.setFloating}
                        data-status={status}
                        style={{
                            '--modal-animation-duration': `${animationDuration}ms`
                        } as ModalVars}
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