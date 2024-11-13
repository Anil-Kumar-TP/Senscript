import React, { createContext, useState, useEffect } from 'react';
import { getProfile } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUserProfile = async () => {
        try {
            const { data } = await getProfile();
            setUser(data);
        } catch (error) {
            console.error('User not authenticated', error);
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUserProfile(); 
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, fetchUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
