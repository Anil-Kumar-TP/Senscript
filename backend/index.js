import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import profileRoutes from './routes/profile.route.js'

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to DB');
}).catch((error) => {
    console.log('error connecting to DB', error);
});

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/details', profileRoutes);


app.listen(3000, () => {
    console.log('server running on port 3000');
})



