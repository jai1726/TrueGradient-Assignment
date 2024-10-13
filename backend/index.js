import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './Routes/user.js';
import authRoutes from './Routes/auth.js';
import adminRoutes from './Routes/admin.js';
import cors from 'cors';

const app = express();

dotenv.config();


const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
  
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
  .then(() => app.listen(PORT, () => console.log(`MongoDb Connected ,Server running on http://localhost:${PORT}`)))
  .catch((error) => console.error('MongoDB connection error:', error));
