import { Router } from 'express';
import SessionController from '@modules/users/infra/http/controllers/AuthenticateController'

const sessionsRouter = Router();
const sessionController = new SessionController()

//Authentication

sessionsRouter.post('/',sessionController.update)

export default sessionsRouter;
