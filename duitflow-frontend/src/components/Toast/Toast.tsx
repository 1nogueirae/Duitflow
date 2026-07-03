import { type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';

import './Toast.css';

type ToastVariant = 'error' | 'success' | 'warning' | 'info';

interface ToastProps {
    open: boolean;
    message: string;
    variant?: ToastVariant;
    onClose: () => void;
    duration?: number;
    action?: ReactNode;
}

export function Toast({
    open,
    message,
    variant = 'info',
    onClose,
    duration = 5000,
    action,
}: ToastProps) {
    useEffect(() => {
        if (!open) return;

        const timer = window.setTimeout(() => {
            onClose();
        }, duration);

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            window.clearTimeout(timer);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [duration, onClose, open]);

    if (!open) return null;

    return createPortal(
        <div className={`toast toast-${variant}`} role="status" aria-live="polite">
            <div className="toast-content">
                <p className="toast-message">{message}</p>
                {action}
            </div>

            <button
                type="button"
                className="toast-close-button"
                onClick={onClose}
                aria-label="Close toast"
            >
                <IoMdClose size={18} />
            </button>
        </div>,
        document.body
    );
}