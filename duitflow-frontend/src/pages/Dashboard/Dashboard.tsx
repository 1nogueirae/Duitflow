import { useEffect, useState } from 'react';

import type { Task, TaskDTO } from '../../types/task';

import { createTask, readTasks, updateTask, deleteTask } from '../../services/task';

import { Modal } from '../../components/Modal/Modal';
import { TaskCard } from '../../components/TaskCard/TaskCard';
import { TaskForm } from '../../components/TaskForm/TaskForm'

import { FaPlus } from "react-icons/fa";

import './Dashboard.css';

function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showForm, setShowForm] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const editingTask = tasks.find(t => t.id === editingTaskId);

    async function handleCreateTask(TaskDTO: TaskDTO) {
        try {
            await createTask(TaskDTO);

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
    }

    const closeForm = () => {
        setShowForm(false);
        setEditingTaskId(null);
    };

    useEffect(() => {
        handleLoadTasks();
    }, []);

    if (isLoading) {
        return <p>Loading tasks...</p>;
    } else {
        return (
            <>
                <div>
                    <header className="dashboard-header">
                        <h1>Dashboard</h1>
                        <p className="secondary-text">You have {tasks.length} tasks to do.</p>
                    </header>

                    <div className="dashboard-stats">
                        <div className="dashboard-stat">
                            <p className="secondary-text">Pending</p>
                            <h3>{tasks.filter((t) => t.status === 'pending').length}</h3>
                        </div>

                        <div className="dashboard-stat">
                            <p className="secondary-text">In progress</p>
                            <h3>{tasks.filter((t) => t.status === 'in_progress').length}</h3>
                        </div>

                        <div className="dashboard-stat">
                            <p className="secondary-text">Done</p>
                            <h3>{tasks.filter((t) => t.status === 'done').length}</h3>
                        </div>
                    </div>

                    <div className="tasks-header">
                        <h1>Your Tasks</h1>
                    </div>

                    {tasks.length === 0 && (
                        <p className="secondary-text">You have no tasks. Click the button below to create one.</p>
                    )}

                    <div>
                        {tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onEdit={openEditForm}
                                onDelete={handleDeleteTask} />
                        ))}
                    </div>

                    <button className="fab-extended"
                        onClick={openCreateForm}>
                        <FaPlus />
                        <span>Add Task</span>
                    </button>

                    <Modal
                        open={showForm}
                        onClose={closeForm}
                        title={editingTaskId ? "Edit Task" : "Create Task"}
                    >
                        <TaskForm
                            initialData={editingTask ? {
                                title: editingTask.title,
                                description: editingTask.description,
                                status: editingTask.status,
                                dueDate: editingTask.dueDate,
                                dueTime: editingTask.dueTime
                            } : undefined}
                            isEditing={editingTaskId ? true : false}
                            onSubmit={(data) => {
                                editingTaskId ? handleEditTask(editingTaskId, data) : handleCreateTask(data)
                            }}
                            onCancel={() => setShowForm(false)} />
                    </Modal>
                </div>
            </>
        )
    }
}

export default Dashboard;