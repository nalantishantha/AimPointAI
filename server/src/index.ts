import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'AimPoint AI Server is running' });
});

// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
