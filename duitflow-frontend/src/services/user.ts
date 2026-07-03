import type { UserDTO } from '../types/user';

const API_URL = 'http://localhost:3000/api/users';

type LoginResponse = {
    token: string;
};

type RegisterResponse = {
    message: string;
    token: string;
};

type ApiErrorResponse = {
    message?: string;
    error?: string;
};

async function parseResponse<T>(response: Response): Promise<T | ApiErrorResponse> {
    try {
        return await response.json();
    } catch {
        return {};
    }
}

export async function registerUser(userData: UserDTO): Promise<RegisterResponse> {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    const data = await parseResponse<RegisterResponse>(response);

    if (!response.ok) {
        const errorData = data as ApiErrorResponse;
        throw new Error(errorData.message || errorData.error || 'Failed to create user');
    }

    return data as RegisterResponse;
}

export async function loginUser(
    email: string,
    password: string
): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await parseResponse<LoginResponse>(response);

    if (!response.ok) {
        const errorData = data as ApiErrorResponse;
        throw new Error(errorData.message || errorData.error || 'Login failed');
    }

    return data as LoginResponse;
}