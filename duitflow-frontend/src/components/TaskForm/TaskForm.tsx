import { useState, useEffect } from 'react';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { Select } from '../Select/Select';

import type { TaskDTO } from '../../types/task';
import { TaskStatus, statusLabels } from '../../types/task';

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
    const [status, setStatus] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [dueTime, setDueTime] = useState('');
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

    const handleSubmit = () => {
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

        onSubmit({
            title,
            description: description || undefined,
            status: status || 'pending',
            dueDate: dueDate || undefined,
            dueTime: dueTime || undefined,
        } as TaskDTO);
    };

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title ?? '');
            setDescription(initialData.description ?? '');
            setStatus(initialData.status ?? 'pending');
            setDueDate(initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '');
            setDueTime(initialData.dueTime ? initialData.dueTime : '');
            setTitleWarningMessage(undefined);
            setDescriptionWarningMessage(undefined);
        }
    }, [initialData]);

    return (
        <>
            <div className="task-form">
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
                <div className="task-form-date-time">
                    <Input
                        id="task-due-date"
                        label="Due Date"
                        placeholder="Select due date..."
                        value={dueDate}
                        onChange={setDueDate}
                        variant="date" />
                    <Input
                        id="task-due-time"
                        label="Due Time"
                        placeholder="Select due time..."
                        value={dueTime}
                        onChange={setDueTime}
                        variant="time"
                        disabled={!dueDate}
                    />
                </div>
                {isEditing && (
                    <Select
                        id="task-status"
                        label="Task Status"
                        value={status}
                        onChange={setStatus}
                        options={Object.values(TaskStatus).map((status) => ({
                            value: status,
                            label: statusLabels[status],
                        }))}
                    />
                )}
                <div className="task-form-actions">
                    <Button
                        id="create-task"
                        label={isEditing ? 'Edit Task' : 'Create Task'}
                        className="btn-primary"
                        onClick={handleSubmit}
                    />
                    <Button
                        id="cancel-task"
                        label="Cancel"
                        className={['btn-outline', 'btn-secondary']}
                        onClick={onCancel}
                    />
                </div>
            </div>
        </>
    );
};