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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            alert('Por favor, insira um título.');
            return;
        }

        onSubmit({ title, description })
    };

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title ?? '');
            setDescription(initialData.description ?? '');
        }
    }, [initialData]);

    return (

        <form className="task-form" onSubmit={handleSubmit}>
            <Input
                id="task-title"
                label="Task Title"
                placeholder="Enter task title"
                value={title}
                onChange={setTitle}
            />
            <Input
                id="task-description"
                label="Task Description"
                placeholder="Enter task description"
                variant={'textarea'}
                value={description}
                onChange={setDescription}
            />

            <div className="task-form-actions">
                <Button
                    id="create-task"
                    label={isEditing ? 'Update Task' : 'Create Task'}
                    type="submit" />
                <Button
                    id="cancel-task"
                    label="Cancel"
                    variant={'secondary'}
                    onClick={onCancel}
                />
            </div>
        </form>
    );
};
