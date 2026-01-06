import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (config.nodeEnv === 'development') {
  app.use((req: Request, _res: Response, next) => {
    console.log(`📨 ${req.method} ${req.path}`);
    next();
  });
}

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Neurio API',
    version: config.apiVersion,
    documentation: '/api/v1/health',
  });
});

// API routes
app.use(`/api/${config.apiVersion}`, routes);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
