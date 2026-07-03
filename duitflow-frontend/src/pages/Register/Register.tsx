import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import { Toast } from '../../components/Toast/Toast';

import { useAuth } from "../../contexts/AuthContext";

import { type UserDTO } from "../../types/user";

import './Register.css';

function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleRegister = async (userData: UserDTO) => {
        setErrorMessage(null);

        try {
            await register(userData);
            navigate('/dashboard');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Register failed';
            setErrorMessage(message);
            console.error('Register failed:', error);
        }
    };

    return (
        <div className="register-page">
            <Toast
                open={Boolean(errorMessage)}
                message={errorMessage ?? ''}
                variant="error"
                onClose={() => setErrorMessage(null)}
            />
            <RegisterForm
                onRegister={handleRegister}
            />
        </div>
    );
}

export default Register;