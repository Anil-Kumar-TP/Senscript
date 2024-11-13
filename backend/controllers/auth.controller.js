import { validationResult, check } from 'express-validator';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../models/auth.model.js';

export const register = [
    check("firstName", "First Name is required").notEmpty().isString(),
    check("lastName", "Last Name is required").notEmpty().isString(),
    check("email", "A valid email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6 }),
    check("dob", "Date of Birth is required").notEmpty().isString(),
    check("gender", "Gender is required").notEmpty().isString(),
    check("phonenumber", "A valid phone number is required").notEmpty().isMobilePhone(),
    check("address", "Address is required").notEmpty().isString(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName, email, password, dob, gender, phonenumber, address } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = bcryptjs.hashSync(password, 10);

            const newUser = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                dob,
                gender,
                phonenumber,
                address
            });

            await newUser.save();

            res.status(201).json({ message: 'Sign Up successful' });
        } catch (error) {
            console.error('Error during registration:', error.message || error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
];


export const login = [
    check("email", "A valid email is required").isEmail(),
    check("password", "Password is required").notEmpty(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const isMatch = bcryptjs.compareSync(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1d'  
            });

            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 86400000 
            });
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error('Error during login:', error.message || error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
]

export const logout = (req, res) => {
    res.clearCookie("auth_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    });
    res.status(200).json({ message: 'Logout successful' });
};
