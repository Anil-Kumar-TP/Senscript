import jwt from 'jsonwebtoken';
import User from '../models/auth.model.js';

export const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.auth_token;
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error verifying token:', error.message || error);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
