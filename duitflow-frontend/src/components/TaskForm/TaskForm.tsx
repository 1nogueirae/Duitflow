import { useState, useEffect } from 'react';
import { Input } from '../TextInput/Input';
import { Button } from '../Button/Button';
import type { TaskDTO } from '../../types/task';
import './TaskForm.css';

interface TaskFormProps {
    initialData?: TaskDTO;
    isEditing?: boolean;
    onSubmit: (taskData: TaskDTO) => void;
    onCancel: () => void;
}

export const TaskForm = ({ initialData, isEditing, onSubmit, onCancel }: TaskFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [titleWarningMessage, setTitleWarningMessage] = useState<string | undefined>();
    const [descriptionWarningMessage, setDescriptionWarningMessage] = useState<string | undefined>();

    const handleTitleChange = (value: string) => {
        setTitle(value);
        setTitleWarningMessage(undefined);
    };

    const handleDescriptionChange = (value: string) => {
        setDescription(value);
        setDescriptionWarningMessage(undefined);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let hasErrors = false;

        if (title.trim() === '') {
            setTitleWarningMessage("Task title is required");
            hasErrors = true;
        }

        if (description.trim().length > 0 && description.trim().length < 10) {
            setDescriptionWarningMessage("If you provide a description, it must be at least 10 characters long");
            hasErrors = true;
        }

        if (hasErrors) return;

        onSubmit({ title, description });
    };

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title ?? '');
            setDescription(initialData.description ?? '');
            setTitleWarningMessage(undefined);
            setDescriptionWarningMessage(undefined);
        }
    }, [initialData]);

    return (
        <>
            {console.log(isEditing)}
            <form className="task-form" onSubmit={handleSubmit}>
                <Input
                    id="task-title"
                    placeholder="Enter task title..."
                    label="Task Title *"
                    value={title}
                    onChange={handleTitleChange}
                    warningMessage={titleWarningMessage}
                />
                <Input
                    id="task-description"
                    label="Task Description"
                    placeholder="Enter task description..."
                    variant={'textarea'}
                    value={description}
                    onChange={handleDescriptionChange}
                    warningMessage={descriptionWarningMessage}
                />
                <div className="task-form-actions">
                    <Button
                        id="create-task"
                        label={isEditing ? 'Edit Task' : 'Create Task'}
                        type="submit"
                    />
                    <Button
                        id="cancel-task"
                        label="Cancel"
                        variant={'secondary'}
                        onClick={onCancel}
                    />
                </div>
            </form>
        </>
    );
};