import './Input.css'

interface InputProps {
    id?: string;
    label?: string;
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    variant?: 'text' | 'password' | 'email' | 'number' | 'textarea';
}
export const Input = ({
    id,
    label = 'Text Input',
    value,
    placeholder,
    onChange,
    variant = 'text',
}: InputProps) => {
    const commonProps = {
        id,
        placeholder,
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            onChange?.(e.target.value),
    };

    return (
        <div className="text-input">
            <label htmlFor={id}>{label}</label>
            {variant === 'textarea' ?
                (
                    <textarea {...commonProps} />
                ) :
                (
                    <input
                        {...commonProps}
                        type={variant}
                    />
                )}
        </div>
    );
};