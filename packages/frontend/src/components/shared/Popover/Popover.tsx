import Surface from '@/components/entities/Surface/Surface';
import stylesObj from './Popover.module.css'
import type { HTMLAttributes, Ref } from 'react';
import { FloatingPortal } from '@floating-ui/react';

interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
    style?: React.CSSProperties;
    isOpen: boolean;
}

const Popover = ({ ref, children, style, isOpen, ...props }: PopoverProps) => {
    return isOpen && <FloatingPortal >
        <div
            ref={ref}
            className={stylesObj.popoverWrapper}
            style={style}
            {...props}
        >
            <Surface variant={'solid'}>
                {children}
            </Surface>
        </div>
    </FloatingPortal>
}

export default Popover;
