import React from "react";
import type { BaseContainerProps } from '@common/components';
import stylesObj from './Modal.module.css';

const Modal: React.FC<BaseContainerProps> = ({ children }) => {
    return (
        <div className="modal">
            {children}
        </div>
    )
}

export default Modal;