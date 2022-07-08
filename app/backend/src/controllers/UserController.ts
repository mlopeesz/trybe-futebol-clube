import { Request, Response, NextFunction } from 'express';
import UserService from '../services/userService';

export default class UserController {
  private service = new UserService();

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const token = await this.service.login({ email, password });
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}
