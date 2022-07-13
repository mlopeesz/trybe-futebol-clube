import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const routes = Router();

const controller = new LeaderboardController();

routes.get('/home', controller.getHome);
routes.get('/away', controller.getAway);

export default routes;
