import { Router } from 'express';
import Validations from '../middlewares/Validations';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';

const loginRoutes = Router();
const service = new UserService();
const controller = new UserController(service);
const validation = new Validations();

loginRoutes.post('/', validation.validateLogin, controller.login);
loginRoutes.get('/validate', controller.validate);

export default loginRoutes;
