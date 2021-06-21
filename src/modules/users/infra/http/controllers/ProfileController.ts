import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/service/UpdateProfileService';
import ShowProfileService from '@modules/users/service/ShowProfileService';

export default class Profilecontroller{

  public async show(request:Request,response:Response): Promise<Response>{
    const user_id = request.user.id;

    const showprofile = container.resolve(ShowProfileService);

    const user = await showprofile.execute({user_id})

    return response.json(user)

  }
  public async update(request: Request, response: Response): Promise<Response>{
    const user_id = request.user.id;
    const { name, email, old_password, password,ownersId,branchsId} = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
      ownersId,
      branchsId
    })

    delete  user.password;

    return response.json(user)
  }
}
