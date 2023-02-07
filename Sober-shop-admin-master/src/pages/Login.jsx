import React from 'react'
import LoginForm from 'features/Auth/LoginForm';
import '../features/Auth/auth.scss'

export default function Login() {
    return (
        <div className="login-container" >
            <LoginForm />
        </div>
    )
}
