export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export type TaskDTO = Partial<Pick<Task, 'title' | 'description' | 'status'>>;

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