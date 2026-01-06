import { Router, Request, Response } from 'express';
import voiceRoutes from './voice.routes';

const router = Router();

// Health check endpoint
router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

router.use('/voice', voiceRoutes);

router.use('*', (_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: 'The requested endpoint does not exist',
  });
});

export default router;
