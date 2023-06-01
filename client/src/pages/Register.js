import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/authSlice';
import {useNavigate} from "react-router-dom";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userCredentials = {
            email,
            password,
            firstName,
            lastName,
        };
        await dispatch(registerUser(userCredentials));
    }

    const handleGoogleLogin = () => window.location.href = 'http://localhost:3001/api/auth/google';
    const navigateToLogin = () => navigate('/login');

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} />
                <input type='text' placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
                <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Register</button>
            </form>
            <button onClick={handleGoogleLogin}>Register with Google</button>
            <button onClick={navigateToLogin}>Already have an account? Login!</button>
        </div>
    );
}

export default Register;

// https://reactrouter.com/en/main/hooks/use-navigate
