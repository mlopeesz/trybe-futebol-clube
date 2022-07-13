import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  getHome = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await LeaderboardService.getHome();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };

  getAway = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await LeaderboardService.getAway();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };
}
