import { NextFunction, Request, Response } from 'express';
import CustomError from '../helpers/CustomError';

const errorMiddleware = (error: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  if (!error.status) {
    return res.status(500).json({ message: 'Internal error' });
  }
  return res.status(error.status).json({ message: error.message });
};

export default errorMiddleware;
