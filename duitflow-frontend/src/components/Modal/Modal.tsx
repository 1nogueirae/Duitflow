import { type ReactNode, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import { createPortal } from 'react-dom';
import './Modal.css';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    title: string;
}

export function Modal({
    open,
    onClose,
    children,
    title = 'Modal Title',
}: ModalProps) {

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    if (!open) return null;

    return createPortal(
        <div
            className="modal-overlay"
            onClick={onClose}
        >
            <div
                className="modal-content"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="modal-header">
                    <h2>{title}</h2>
                    <div onClick={onClose} className="modal-close-button">
                        <IoMdClose size={30} />
                    </div>
                </div>
                {children}
            </div>
        </div>,
        document.body
    );
}