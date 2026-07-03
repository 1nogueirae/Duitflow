import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { loginUser, registerUser } from '../services/user';
import { type UserDTO, type UserPublic } from '../types/user';

const TOKEN_STORAGE_KEY = 'token';
const USER_STORAGE_KEY = 'user';

type AuthContextData = {
    token: string | null;
    user: UserPublic | null;
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
    const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_STORAGE_KEY));
    const [user, setUser] = useState<UserPublic | null>(() => {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);

        if (!storedUser) {
            return null;
        }

        try {
            return JSON.parse(storedUser) as UserPublic;
        } catch {
            localStorage.removeItem(USER_STORAGE_KEY);
            return null;
        }
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem(TOKEN_STORAGE_KEY, token);
            return;
        }

        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setUser(null);
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
            return;
        }

        localStorage.removeItem(USER_STORAGE_KEY);
    }, [user]);

    const login = async (email: string, password: string) => {
        const data = await loginUser(email, password);
        setToken(data.token);
        setUser(data.user);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    const register = async (userData: UserDTO) => {
        const data = await registerUser(userData);
        setToken(data.token);
        setUser(data.user);
    };

    const value = useMemo(
        () => ({
            token,
            user,
            isAuthenticated: Boolean(token),
            login,
            register,
            logout,
        }),
        [token, user],
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