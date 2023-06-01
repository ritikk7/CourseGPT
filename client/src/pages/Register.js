import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {registerUser} from '../redux/authSlice';
import {useNavigate} from "react-router-dom";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '', firstName: '', lastName: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await dispatch(registerUser(credentials));
        if (response.payload) {
            navigate('/login-success');
        } else {
            // TODO error
        }
    }

    const handleGoogleLogin = () => window.location.href = 'http://localhost:3001/api/auth/google';
    const navigateToLogin = () => navigate('/login');

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='firstName' type='text' placeholder='First Name' onChange={handleChange} />
                <input name='lastName' type='text' placeholder='Last Name' onChange={handleChange} />
                <input name='email' type='text' placeholder='Email' onChange={handleChange} />
                <input name='password' type='password' placeholder='Password' onChange={handleChange} />
                <button type='submit'>Register</button>
            </form>
            <button onClick={handleGoogleLogin}>Register with Google</button>
            <button onClick={navigateToLogin}>Already have an account? Login!</button>
        </div>
    );
}

export default Register;

// https://reactrouter.com/en/main/hooks/use-navigate
