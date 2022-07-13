import { Router } from 'express';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const route = Router();
const service = new MatchService();
const controller = new MatchController(service);
const validation = new Validations();

route.get('/', controller.getAll);
route.post('/', validation.validateToken, controller.create);
route.patch('/:id/finish', controller.finishMatch);
route.patch('/:id', controller.updateMatch);

export default route;
