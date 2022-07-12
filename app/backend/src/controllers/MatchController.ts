import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  private service;
  constructor(service: MatchService) {
    this.service = service;
    this.getAll = this.getAll.bind(this);
  }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this.service.getAll();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}
