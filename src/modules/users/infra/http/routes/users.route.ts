import { Router } from 'express';
import { Segments,Joi,celebrate} from 'celebrate'
import userController from '@modules/users/infra/http/controllers/UsersController'
import ensureAuthenticaated from '@modules/users/infra/http/middlewares/ensureAuthenticate';

const usersRouter = Router();

const UserController= new userController();

 // Create user
 usersRouter.post('/',celebrate({
    [Segments.BODY]: Joi.object().keys({
      name:Joi.string().required(),
      email:Joi.string().email().required(),
      address:Joi.string().allow(null),
      password:Joi.string().required(),
      description:Joi.string().required(),
      dob:Joi.date().required()
      
    }),

  }),UserController.create);

 // List users
 usersRouter.get('/',ensureAuthenticaated, ensureAuthenticaated, celebrate({
  [Segments.QUERY]: Joi.object().keys({
    user_id:Joi.string().optional(),
   
  }),
}),UserController.show);


 // Update Users
 usersRouter.put('/',ensureAuthenticaated, celebrate({
    [Segments.BODY]: Joi.object().keys({
      name:Joi.string(),
      description:Joi.string().allow(null),
      email:Joi.string().email(),
      address:Joi.string().allow(null),
      dob:Joi.date().optional(), 
      old_password:Joi.string(),
      password: Joi.when('old_password', {
        is: Joi.exist(),
        then: Joi.required(),
        
      }),
      password_confirmation: Joi.when('password', {
        is: Joi.exist(),
        then: Joi.valid(Joi.ref('password')).required(),
      }),
    }),
  }),UserController.update);

  // Delete users
 usersRouter.delete('/',ensureAuthenticaated,celebrate({
  [Segments.QUERY]: Joi.object().keys({
    user_id:Joi.string().required(),
   
  }),
}), UserController.delete);

export default usersRouter;
