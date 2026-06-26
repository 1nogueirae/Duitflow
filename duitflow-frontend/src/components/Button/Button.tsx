import './Button.css';

interface ButtonProps {
    id?: string;
    label?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export const Button = ({
    id,
    label = 'Click me',
    onClick,
    variant = 'primary',
    type = 'button',
    disabled = false,
}: ButtonProps) => {
    return (
        <button
            id={id}
            type={type}
            disabled={disabled}
            className={`btn btn-${variant}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};