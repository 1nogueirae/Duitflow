import './Select.css';

interface SelectProps {
    id?: string;
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    warningMessage?: string;
    disabled?: boolean;
    options?: { value: string; label: string }[];
}

export const Select = ({
    id,
    label = 'Label',
    value,
    onChange,
    warningMessage,
    disabled = false,
    options = [],
}: SelectProps) => {
    const hasWarning = !!warningMessage;
    const selectClass = `select-input ${hasWarning ? 'warning' : ''}`;

    const commonProps = {
        id,
        value,
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value),
        disabled,
    };

    return (
        <div className={selectClass}>
            <label htmlFor={id}>
                {label}
                {warningMessage && <span className="text-select-warning">{warningMessage}</span>}
            </label>
            <select {...commonProps}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}