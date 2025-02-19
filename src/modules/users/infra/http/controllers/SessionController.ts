import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/service/AuthenticateUserService';

export default class SessionController{

 public async update(request:Request, response: Response):Promise<Response>{
    const { email, password } = request.body;
    
    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });
    
  
    
    return response.json({ user, token });
  };
}
