import './Button.css';

interface ButtonProps {
    id?: string;
    label?: string;
    onClick?: () => void;
    className?: string | string[];
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export const Button = ({
    id,
    label = 'Click me',
    onClick,
    className,
    type = 'button',
    disabled = false,
}: ButtonProps) => {
    const classes = Array.isArray(className)
        ? className
        : className
            ? [className]
            : [];

    return (
        <button
            id={id}
            type={type}
            disabled={disabled}
            className={['btn', ...classes].join(' ')}
            onClick={onClick}
        >
            {label}
        </button>
    );
};