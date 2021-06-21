import { Router } from 'express';
import userController from '@modules/users/infra/http/controllers/UsersController'
import ensureAuthenticaated from '@modules/users/infra/http/middlewares/ensureAuthenticate';

const usersRouter = Router();

const UserController= new userController();

  // Create user
  usersRouter.post('/',UserController.create);

  // List users
  usersRouter.get('/',ensureAuthenticaated, UserController.show);


  // Update Users
  usersRouter.get('/',ensureAuthenticaated, UserController.update);



export default usersRouter;
