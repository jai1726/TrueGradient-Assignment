import express from 'express'; 
import mongoose from 'mongoose'; 
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;


app.use(express.json());


await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));


app.get('/', (req, res) => {
  res.send('Hello, user');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});