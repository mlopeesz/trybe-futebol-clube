import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  private service;
  constructor(service: MatchService) {
    this.service = service;
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.finishMatch = this.finishMatch.bind(this);
    this.updateMatch = this.updateMatch.bind(this);
  }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this.service.getAll();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createdMatch = await this.service.create(req.body);
      return res.status(201).json(createdMatch);
    } catch (error) {
      next(error);
    }
  }

  async finishMatch(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.finishMatch(req.params.id);
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  async updateMatch(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await this.service.updateMatch(id as unknown as number, req.body);
      return res.status(200).json({ message: 'Match updated' });
    } catch (error) {
      next(error);
    }
  }
}
