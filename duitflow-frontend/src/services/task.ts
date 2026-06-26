import type { Task, TaskDTO } from '../types/task';

const API_URL = 'http://localhost:3000/api/tasks';

export async function createTask(taskData: TaskDTO): Promise<Task> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    });

    if (!response.ok) {
        throw new Error('Failed to create task');
    }

    const data: Task = await response.json();
    return data;
}

export async function readTasks(): Promise<Task[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }

    const data: Task[] = await response.json();

    return data;
}

export async function updateTask(taskId: number, taskData: TaskDTO): Promise<Task> {
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    });

    if (!response.ok) {
        throw new Error('Failed to update task');
    }

    const data: Task = await response.json();
    return data;
}

export async function deleteTask(taskId: number): Promise<void> {
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Failed to delete task');
    }
}