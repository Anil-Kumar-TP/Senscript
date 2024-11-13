import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { login } from '../services/authService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, fetchUserProfile } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            await fetchUserProfile(); 
            alert('Login successful!');
        } catch (error) {
            console.error('Login failed', error);
            alert('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
