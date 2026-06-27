export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: string | null;
    dueTime: string | null;
    createdAt: string;
    updatedAt: string;
}

export type TaskDTO = {
    title: string;
    description?: string;
    status?: TaskStatus;
    dueDate?: string | null;
    dueTime?: string | null;
};

export const TaskStatus = {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    DONE: 'done',
} as const;

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];

export const statusLabels: Record<TaskStatus, string> = {
    'pending': 'Pending',
    'in_progress': 'In Progress',
    'done': 'Done',
};