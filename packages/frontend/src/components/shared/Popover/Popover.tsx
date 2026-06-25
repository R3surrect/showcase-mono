import stylesObj from './Popover.module.css';
import { type Dispatch, type ReactNode, type SetStateAction } from 'react';
import {
    FloatingPortal,
    useFloating,
    offset,
    flip,
    shift,
    autoUpdate,
    useInteractions,
    useClick,
    useDismiss,
    type Placement
} from '@floating-ui/react';

interface PopoverProps {
    triggerElement: ReactNode;
    children: ReactNode;
    defaultOpen?: boolean;
    placement?: Placement;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Popover = ({
    triggerElement,
    children,
    placement = 'bottom',
    isOpen,
    setIsOpen,
}: PopoverProps) => {
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: placement,
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(16),
            flip(),
            shift(),
        ],
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
    ]);

    return (
        <>
            <div
                ref={refs.setReference}
                {...getReferenceProps()}
                style={{ display: 'inline-block' }}
            >
                {triggerElement}
            </div>
            {isOpen && (
                <FloatingPortal>
                    <div
                        ref={refs.setFloating}
                        className={stylesObj.popoverWrapper}
                        {...getFloatingProps()}
                        style={floatingStyles}
                    >
                        {children}
                    </div>
                </FloatingPortal>
            )}
        </>
    );
};

export default Popover;
