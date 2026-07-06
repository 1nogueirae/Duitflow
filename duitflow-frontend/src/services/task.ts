import type { Task, TaskDTO } from '../types/task';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/tasks';

type tasksResponse = {
    message: string;
    tasks: Task[];
}

export async function createTask(taskData: TaskDTO, token: string): Promise<Task> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(taskData)
    });

    if (!response.ok) {
        throw new Error('Failed to create task');
    }

    const data: Task = await response.json();
    return data;
}

export async function readTasks(token: string): Promise<tasksResponse> {
    const response = await fetch(`${API_URL}/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) throw new Error('Failed to fetch tasks');

    const data: tasksResponse = await response.json();

    return data;
}

export async function updateTask(taskId: number, taskData: TaskDTO, token: string): Promise<Task> {
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(taskData)
    });

    if (!response.ok) {
        throw new Error('Failed to update task');
    }

    const data: Task = await response.json();
    return data;
}

export async function deleteTask(taskId: number, token: string): Promise<void> {
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to delete task');
    }
}