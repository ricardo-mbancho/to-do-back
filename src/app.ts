import express, { Request, Response, NextFunction } from 'express';

import cors from 'cors';
import taskRoutes from './routes/taskRoutes';

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the API! Server is running.');
});
app.use('/tasks', taskRoutes);

// Global error handler
app.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Internal server error:', err);
    res.status(500).json({ error: err.message || 'Something went wrong' });
  }
);

export default app;