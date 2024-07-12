import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import albumRoutes from './routes/albums.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000 
};

mongoose.connect(process.env.MONGO_URI, mongooseOptions)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/albums', albumRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
