import { Router } from 'express';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';

const route = Router();
const service = new TeamService();
const controller = new TeamController(service);

route.get('/', controller.getAll);
route.get('/:id', controller.getById);

export default route;
