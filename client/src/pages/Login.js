import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import {useNavigate} from "react-router-dom";

function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userCredentials = {
            email,
            password
        };
        await dispatch(loginUser(userCredentials));
    }

    const handleGoogleLogin = () => window.location.href = 'http://localhost:3001/api/auth/google';
    const navigateToRegister = () => navigate('/register');



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Login</button>
            </form>
            <button onClick={handleGoogleLogin}>Login with Google</button>
            <button onClick={navigateToRegister}>Don't have an account? Create one!</button>
        </div>
    );
}

export default Login;

// https://reactrouter.com/en/main/hooks/use-navigate
