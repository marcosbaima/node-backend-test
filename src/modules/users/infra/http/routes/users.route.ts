import { Router, Request, Response } from 'express';
import multer from 'multer';
import userController from '@modules/users/infra/http/controllers/UsersController'
import ensureAuthenticaated from '@modules/users/infra/http/middlewares/ensureAuthenticate';

const usersRouter = Router();

const UserController= new userController();

 // Create user
 usersRouter.post('/',UserController.create);

 // List users
 usersRouter.get('/',ensureAuthenticaated, UserController.show);


 // Update Users
 usersRouter.put('/',ensureAuthenticaated, UserController.update);

export default usersRouter;
