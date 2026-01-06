import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

export interface ValidationSchema {
  body?: Record<string, unknown>;
  params?: Record<string, unknown>;
  query?: Record<string, unknown>;
}

export const validate = (schema: ValidationSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        for (const [key, value] of Object.entries(schema.body)) {
          if (value === 'required' && !req.body[key]) {
            throw new AppError(`${key} is required in request body`, 400);
          }
        }
      }

      if (schema.params) {
        for (const [key, value] of Object.entries(schema.params)) {
          if (value === 'required' && !req.params[key]) {
            throw new AppError(`${key} is required in request params`, 400);
          }
        }
      }

      if (schema.query) {
        for (const [key, value] of Object.entries(schema.query)) {
          if (value === 'required' && !req.query[key]) {
            throw new AppError(`${key} is required in request query`, 400);
          }
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
