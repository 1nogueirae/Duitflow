import { useEffect, useMemo, useState } from 'react';

import type { Task, TaskDTO, TaskStatus } from '../../types/task';

import { createTask, readTasks, updateTask, deleteTask } from '../../services/task';

import { Modal } from '../../components/Modal/Modal';
import { TaskCard } from '../../components/TaskCard/TaskCard';
import { TaskForm } from '../../components/TaskForm/TaskForm';
import { Button } from '../../components/Button/Button';

import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

import './Dashboard.css';

interface DashboardStatProps {
    title: string;
    value: number;
    status: TaskStatus;
    selected: boolean;
    onClick: (status: TaskStatus) => void;
}

function DashboardStat({
    title,
    value,
    status,
    selected,
    onClick
}: DashboardStatProps) {
    return (
        <div
            className={`dashboard-stat ${status} ${selected ? 'selected' : ''}`}
            onClick={() => onClick(status)}
        >
            <p className={`secondary-text ${selected ? 'inverse' : ''}`}>
                {title}
            </p>
            <h3>{value}</h3>
        </div>
    );
}

function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
    const [statusFilter, setStatusFilter] = useState<
        TaskStatus | 'all'
    >('all');

    const [isLoading, setIsLoading] = useState(false);

    const [editingTaskId, setEditingTaskId] =
        useState<number | null>(null);

    const editingTask = tasks.find(
        t => t.id === editingTaskId
    );

    async function handleCreateTask(taskDTO: TaskDTO) {
        try {
            await createTask(taskDTO);
            await handleLoadTasks();
            setShowForm(false);
        } catch (err) {
            console.error('Failed to create task', err);
        }
    }

    async function handleLoadTasks() {
        setIsLoading(true);
        try {
            const data = await readTasks();
            setTasks(data);
        } catch (err) {
            console.error('Failed to load tasks', err);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleEditTask(taskId: number, taskData: TaskDTO) {
        try {
            await updateTask(taskId, taskData);
            await handleLoadTasks();
            setShowForm(false);
            setEditingTaskId(null);
        } catch (err) {
            console.error('Failed to edit task', err);
        }
    }

    async function handleDeleteTask(taskId: number) {
        try {
            await deleteTask(taskId);
            await handleLoadTasks();
        } catch (err) {
            console.error('Failed to delete task', err);
        }
    }

    const openCreateForm = () => {
        setEditingTaskId(null);
        setShowForm(true);
    };

    const openEditForm = (taskId: number) => {
        setEditingTaskId(taskId);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingTaskId(null);
    };

    const handleFilterChange = (filter: TaskStatus) => {
        setStatusFilter(prev =>
            prev === filter ? 'all' : filter
        );
    };

    const stats = useMemo(() => {
        return {
            pending: tasks.filter(t => t.status === 'pending').length,
            in_progress: tasks.filter(t => t.status === 'in_progress').length,
            done: tasks.filter(t => t.status === 'done').length
        };
    }, [tasks]);

    const filteredTasks = useMemo(() => {
        if (statusFilter === 'all') return tasks;
        return tasks.filter(task => task.status === statusFilter);
    }, [tasks, statusFilter]);

    useEffect(() => {
        handleLoadTasks();
    }, []);

    if (isLoading) {
        return <p>Loading tasks...</p>;
    }

    return (
        <>
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <p className="secondary-text">You have {tasks.length} tasks to do.</p>
            </header>

            <div className="dashboard-stats">
                <DashboardStat
                    title="Pending"
                    value={stats.pending}
                    status="pending"
                    selected={statusFilter === 'pending'}
                    onClick={handleFilterChange}
                />

                <DashboardStat
                    title="In progress"
                    value={stats.in_progress}
                    status="in_progress"
                    selected={statusFilter === 'in_progress'}
                    onClick={handleFilterChange}
                />

                <DashboardStat
                    title="Done"
                    value={stats.done}
                    status="done"
                    selected={statusFilter === 'done'}
                    onClick={handleFilterChange}
                />
            </div>

            <div className="tasks-header">
                <h1>Your Tasks</h1>
            </div>

            {tasks.length === 0 && (
                <p className="secondary-text">You have no tasks. Click the button belowto create one.</p>
            )}

            <div>
                {filteredTasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={openEditForm}
                        onDelete={setTaskToDelete}
                    />
                ))}
            </div>

            <button
                className="fab-extended"
                onClick={openCreateForm}
            >
                <FaPlus />
                <span>Add Task</span>
            </button>

            <Modal
                open={showForm}
                onClose={closeForm}
                title={editingTaskId ?
                    'Edit Task'
                    : 'Create Task'
                }
            >
                <TaskForm
                    initialData={
                        editingTask ? {
                            title: editingTask.title,
                            description: editingTask.description,
                            status: editingTask.status,
                            dueDate: editingTask.dueDate,
                            dueTime: editingTask.dueTime
                        } : undefined
                    }
                    isEditing={!!editingTaskId}
                    onSubmit={(data) =>
                        editingTaskId ?
                            handleEditTask(editingTaskId, data)
                            : handleCreateTask(data)
                    }
                    onCancel={closeForm}
                />
            </Modal>

            <Modal
                open={taskToDelete !== null}
                onClose={() => setTaskToDelete(null)}
                title="Confirm Delete"
                size="sm"
            >
                <div className="delete-confirmation-modal">
                    <p>Are you sure you want to delete this task?</p>
                    <FaTrash size={50} color="var(--color-danger)" />
                    <Button
                        id="confirm-delete-button"
                        label="Confirm Delete"
                        variant="danger"
                        type="button"
                        onClick={() => {
                            if (taskToDelete !== null) {
                                handleDeleteTask(taskToDelete);
                                setTaskToDelete(null);
                            }
                        }}
                    />
                </div>
            </Modal>
        </>
    );
}

export default Dashboard;