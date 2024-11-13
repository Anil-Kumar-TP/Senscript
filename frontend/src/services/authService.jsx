import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', 
    withCredentials: true
});

export const login = async (email, password) => {
    return await api.post('/login', { email, password });
};

export const logout = async () => {
    return await api.post('/logout');
};

export const getProfile = async () => {
    return await api.get('/profile');
};
