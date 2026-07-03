import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { loginUser, registerUser } from '../services/user';

import { type UserDTO } from '../types/user';

type AuthContextData = {
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: UserDTO) => Promise<void>;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            return;
        }

        localStorage.removeItem('token');
    }, [token]);

    const login = async (email: string, password: string) => {
        const data = await loginUser(email, password);
        setToken(data.token);
    };

    const logout = () => {
        setToken(null);
    };

    const register = async (userData: UserDTO) => {
        const data = await registerUser(userData);
        setToken(data.token);
    };

    const value = useMemo(
        () => ({
            token,
            isAuthenticated: Boolean(token),
            login,
            register,
            logout,
        }),
        [token],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}