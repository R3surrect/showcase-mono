import React from "react";
// import stylesObj from './Modal.module.css';

const Modal = ({ children } : {children: React.ReactNode}) => {
    return (
        <div className="modal">
            {children}
        </div>
    )
}

export default Modal;
