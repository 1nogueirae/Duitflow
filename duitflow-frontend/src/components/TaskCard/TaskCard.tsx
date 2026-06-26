import type { Task, TaskStatus } from '../../types/task';
import { statusLabels } from '../../types/task';

import { Button } from '../Button/Button';

import './TaskCard.css';

interface TaskCardProps {
    task: Task;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}


export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
    const statusClass =
        task.status === 'pending'
            ? 'task-card-status-pending'
            : task.status === 'in_progress'
                ? 'task-card-status-in-progress'
                : 'task-card-status-done';

    return (
        <div className="task-card">
            <div className="task-card-header">

                <div className="task-card-informations">
                    <h3 className="task-card-title">{task.title}</h3>

                    <div className={`task-card-status ${statusClass}`}>
                        {statusLabels[task.status as TaskStatus]}
                    </div>
                </div>

                <div className="task-card-actions">
                    <Button
                        label="Edit"
                        variant="secondary"
                        onClick={() => onEdit(task.id)}
                    />
                    <Button
                        label="Delete"
                        variant="danger"
                        onClick={() => onDelete(task.id)}
                    />
                </div>
            </div>
            {task.description && (
                <p className="task-card-description">{task.description}</p>
            )}
        </div>
    );
};