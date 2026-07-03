export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}

export type UserDTO = {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
};

export type UserPublic = {
    id: number;
    name: string;
    email: string;
    role: UserRole;
};

export const UserRole = {
    USER: 'user',
    ADMIN: 'admin',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export const roleLabels: Record<UserRole, string> = {
    'user': 'User',
    'admin': 'Admin',
};