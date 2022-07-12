import { Router } from 'express';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';

const route = Router();
const service = new MatchService();
const controller = new MatchController(service);

route.get('/', controller.getAll);

export default route;
