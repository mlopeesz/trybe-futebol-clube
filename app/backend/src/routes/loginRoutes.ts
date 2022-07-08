import { Router } from 'express';
import Validations from '../middlewares/Validations';
import UserController from '../controllers/UserController';

const loginRoutes = Router();
const controller = new UserController();
const validation = new Validations();

loginRoutes.post('/', validation.validateLogin, controller.login);
loginRoutes.get('/validate', controller.validate);

export default loginRoutes;
