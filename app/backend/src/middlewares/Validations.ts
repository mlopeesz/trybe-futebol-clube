import { Request, Response, NextFunction } from 'express';
import JWT from '../auth/jwt';
import loginSchema from '../schemas/loginSchema';

export default class Validations {
  public validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  };

  public validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const jwt = new JWT();
    if (!jwt.validateToken(req.headers.authorization as string)) {
      return next({ status: 401, message: 'Token must be a valid token' });
    }
    next();
  };
}
