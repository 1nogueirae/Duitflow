import './LoginForm.css';

import { type FormEvent, useState } from 'react';

import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';



interface LoginFormProps {
    onLogin: (email: string, password: string) => void;
    onRegister: () => void;
}

export function LoginForm({ onLogin, onRegister }: LoginFormProps) {

    const [email, setEmail] = useState('');
    const [emailWarningMessage, setEmailWarningMessage] = useState<string | undefined>();

    const [password, setPassword] = useState('');
    const [passwordWarningMessage, setPasswordWarningMessage] = useState<string | undefined>();

    const handleEmailChange = (value: string) => {
        setEmailWarningMessage(undefined);
        setEmail(value);
    }
    const handlePasswordChange = (value: string) => {
        setPasswordWarningMessage(undefined);
        setPassword(value);
    }


    const handleLogin = (event: FormEvent) => {
        event.preventDefault();

        let hasErrors = false;
        const emailValue = email.trim();

        if (emailValue === '') {
            setEmailWarningMessage('Email is required');
            hasErrors = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            setEmailWarningMessage('Please enter a valid email');
            hasErrors = true;
        }

        if (password.trim() === '') {
            setPasswordWarningMessage('Password is required');
            hasErrors = true;
        }
        
        if (hasErrors) return;

        onLogin(emailValue, password);
    };

    const handleRegister = () => {
        onRegister();
    }

    return (
        <div className="login-form">
            <div className="form-header">
                <h2>Login</h2>
                <p>Sign in to your account</p>
            </div>
            <form className="login-form-body" onSubmit={handleLogin} noValidate>
                <Input
                    id="email"
                    placeholder="Enter your email..."
                    label="Email"
                    value={email}
                    variant="email"
                    onChange={handleEmailChange}
                    warningMessage={emailWarningMessage}
                />
                <Input
                    id="password"
                    placeholder="Enter your password..."
                    label="Password"
                    value={password}
                    variant="password"
                    onChange={handlePasswordChange}
                    warningMessage={passwordWarningMessage}
                />
                <Button
                    id="login-button"
                    label="Login"
                    type="submit"
                    className="btn-primary"
                />
            </form>

            <Button
                id="register-button"
                label="Register"
                onClick={handleRegister}
                className={['btn-outline', 'btn-secondary']}
                type="button"
            />

        </div>
    );
}