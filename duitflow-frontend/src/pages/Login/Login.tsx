import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { LoginForm } from '../../components/LoginForm/LoginForm';
import { Toast } from '../../components/Toast/Toast';

import { useAuth } from '../../contexts/AuthContext';

import './Login.css';

function Login() {
    const { login } = useAuth();

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleLogin = async (email: string, password: string) => {
        setErrorMessage(null);

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Login failed';
            setErrorMessage(message);
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-page">
            <Toast
                open={Boolean(errorMessage)}
                message={errorMessage ?? ''}
                variant="error"
                onClose={() => setErrorMessage(null)}
            />
            <LoginForm
                onLogin={handleLogin}
                onRegister={() => navigate('/register')}
            />
        </div>
    );
}

export default Login;