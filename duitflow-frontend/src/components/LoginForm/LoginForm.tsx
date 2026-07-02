import './LoginForm.css';

import { useState } from 'react';

import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';


export function LoginForm() {

    const [email, setEmail] = useState('');
    const handleEmailChange = (value: string) => {
        setEmail(value);
    }

    const [password, setPassword] = useState('');
    const handlePasswordChange = (value: string) => {
        setPassword(value);
    }

    return (
        <div className="login-form">
            <div className="form-header">
                <h2>Login</h2>
                <p>Sign in to your account</p>
            </div>
            <form>
                <Input
                    id="email"
                    placeholder="Enter your email..."
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <Input
                    id="password"
                    placeholder="Enter your password..."
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Button
                    id="login-button"
                    label="Login"
                    onClick={() => {
                        console.log('Login button clicked');
                        console.log('Email:', email);
                        console.log('Password:', password);
                    }}
                    variant="primary"
                    type="submit"
                />
            </form>
        </div>
    );
}