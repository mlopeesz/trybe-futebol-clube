import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  private service;
  constructor(service: TeamService) {
    this.service = service;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
  }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.service.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const team = await this.service.getById(req.params.id);
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}
