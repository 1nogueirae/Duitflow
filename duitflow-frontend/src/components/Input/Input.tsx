import './Input.css';

interface InputProps {
    id?: string;
    label?: string;
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    variant?: 'text' | 'password' | 'email' | 'number' | 'textarea' | 'date' | 'time';
    warningMessage?: string;
    disabled?: boolean;
}

export const Input = ({
    id,
    label = 'Label',
    value,
    placeholder,
    onChange,
    variant = 'text',
    warningMessage,
    disabled = false,
}: InputProps) => {
    const hasWarning = !!warningMessage; // 👈 Deriva do warningMessage
    const textInputClass = `text-input ${hasWarning ? 'warning' : ''}`;

    const commonProps = {
        id,
        placeholder: placeholder || 'Type here...',
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            onChange?.(e.target.value),
        disabled,
    };

    return (
        <div className={textInputClass}>
            <label htmlFor={id}>
                {label}
                {warningMessage && <span className="text-input-warning">{warningMessage}</span>}
            </label>
            {variant === 'textarea' ? (
                <textarea {...commonProps} />
            ) : (
                <input {...commonProps} type={variant} />
            )}
        </div>
    );
};