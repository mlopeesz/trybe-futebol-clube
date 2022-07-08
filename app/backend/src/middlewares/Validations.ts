import { Request, Response, NextFunction } from 'express';
import loginSchema from '../schemas/loginSchema';

export default class Validations {
  public validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  };
}
