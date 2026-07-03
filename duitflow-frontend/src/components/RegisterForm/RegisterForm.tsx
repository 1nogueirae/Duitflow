import './RegisterForm.css';

import { type FormEvent, useState } from 'react';

import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';

import { type UserDTO } from '../../types/user';

import { IoArrowBackOutline } from "react-icons/io5";

interface RegisterFormProps {
    onRegister: (userData: UserDTO) => void;
}

export function RegisterForm({ onRegister }: RegisterFormProps) {

    const [name, setName] = useState('');
    const [nameWarningMessage, setNameWarningMessage] = useState<string | undefined>();

    const [email, setEmail] = useState('');
    const [emailWarningMessage, setEmailWarningMessage] = useState<string | undefined>();

    const [password, setPassword] = useState('');
    const [passwordWarningMessage, setPasswordWarningMessage] = useState<string | undefined>();


    const handleNameChange = (value: string) => {
        setNameWarningMessage(undefined);
        setName(value);
    }
    const handleEmailChange = (value: string) => {
        setEmailWarningMessage(undefined);
        setEmail(value);
    }
    const handlePasswordChange = (value: string) => {
        setPasswordWarningMessage(undefined);
        setPassword(value);
    }


    const handleRegister = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let hasErrors = false;

        const nameValue = name.trim();
        if (nameValue === '') {
            setNameWarningMessage('Name is required');
            hasErrors = true;
        } else if (nameValue.split(' ').length < 2) {
            setNameWarningMessage('Please at least enter your first and last name');
            hasErrors = true;
        }

        const emailValue = email.trim();
        if (emailValue === '') {
            setEmailWarningMessage('Email is required');
            hasErrors = true;
        }

        const passwordValue = password.trim();
        if (passwordValue === '') {
            setPasswordWarningMessage('Password is required');
            hasErrors = true;
        } else if (passwordValue.length < 6) {
            setPasswordWarningMessage('Password must be at least 6 characters long');
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        onRegister({ name: nameValue, email: emailValue, password: passwordValue });
    }

    return (
        <div className="register-form">
            <div className="register-form-header">
                <div className="back">
                    <span
                        onClick={() => window.history.back()}
                    >
                        <IoArrowBackOutline />
                        Back to login
                    </span>
                </div>

                <h2>Register</h2>
                <p>Create a new account</p>
            </div>
            <form className="register-form-body" onSubmit={handleRegister} noValidate>
                <Input
                    id="name"
                    placeholder="Enter your name..."
                    label="Name *"
                    value={name}
                    variant="text"
                    onChange={handleNameChange}
                    warningMessage={nameWarningMessage}
                />
                <Input
                    id="email"
                    placeholder="Enter your email..."
                    label="Email *"
                    value={email}
                    variant="email"
                    onChange={handleEmailChange}
                    warningMessage={emailWarningMessage}
                />
                <Input
                    id="password"
                    placeholder="Enter your password..."
                    label="Password *"
                    value={password}
                    variant="password"
                    onChange={handlePasswordChange}
                    warningMessage={passwordWarningMessage}
                />
                <Button
                    id="register-button"
                    label="Register"
                    className="btn-primary"
                    type="submit"
                />
            </form>
        </div>
    );
}