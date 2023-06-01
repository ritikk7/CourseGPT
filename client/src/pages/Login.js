import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import {useNavigate} from "react-router-dom";

function Login() {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await dispatch(loginUser(credentials));
        if (response.payload) {
            navigate('/login-success');
        } else {
            // TODO error
        }
    }

    const handleGoogleLogin = () => window.location.href = 'http://localhost:3001/api/auth/google';
    const navigateToRegister = () => navigate('/register');



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='email' type='text' placeholder='Email' onChange={handleChange} />
                <input name='password' type='password' placeholder='Password' onChange={handleChange} />
                <button type='submit'>Login</button>
            </form>
            <button onClick={handleGoogleLogin}>Login with Google</button>
            <button onClick={navigateToRegister}>Don't have an account? Create one!</button>
        </div>
    );
}

export default Login;

// https://reactrouter.com/en/main/hooks/use-navigate
