import { Request, Response, NextFunction } from 'express';
import UserService from '../services/userService';

export default class UserController {
  private service = new UserService();

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await this.service.login({ email, password });
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      const validate = await this.service.validate(token as string);
      return res.status(200).json(validate);
    } catch (error) {
      next(error);
    }
  }
}
