import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { logout } from '../services/authService';

const Logout = () => {
    const { setUser } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null); 
            alert('Logged out successfully');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
