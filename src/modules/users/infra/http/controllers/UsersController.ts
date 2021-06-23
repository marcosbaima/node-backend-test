import { Request, Response } from 'express';
import  moment from 'moment'
import { container } from 'tsyringe';
import { getRepository } from 'typeorm'; 
import CreateUserService from '@modules/users/service/CreateUserService';
import UpdateProfileService from '@modules/users/service/UpdateProfileService';
import ShowProfileService from '@modules/users/service/ShowProfileService';
import DeleteUserService from '@modules/users/service/DeleteUserService';
import users from '@modules/users/infra/typeorm/models/Users';

export default class UsersController{
  public async create(request: Request, response: Response): Promise<Response>{
    const { name,  password, dob, address, description,email} = request.body;

    const dtNasc:any = moment(dob).format('YYYY-MM-DD');

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      password,
      dob:dtNasc,
      address,
      description,
      email,
    })

    // @ts-ignore
    delete  user.password;

    return response.json(user)
  }
  public async show(request:Request,response:Response): Promise<any>{
    
    const user_id = request.query.user_id;
    
    const page =request.query.page;

    if(user_id){
      const showprofile = container.resolve(ShowProfileService);

      // @ts-ignore
      const user = await showprofile.execute({user_id})
  
      return response.json(user)
  

    }


    const user= await getRepository(users).find()

    const pageCount = Math.ceil(user.length / 10);


    // @ts-ignore
    let pages = parseInt(page);

    if (!pages) { pages = 1;}
    if (pages > pageCount) {
      pages = pageCount
    }
    response.json({
    "page": pages,
    "pageCount": pageCount,
    "users": user.slice(pages * 10 - 10, pages * 10)
    });
   

  }

  public async update(request: Request, response: Response): Promise<Response>{
    const user_id = request.user.id;
          
    const {
      name,
      old_password,
      password,
      dob,
      address,
      description,
      email
    } = request.body;

    //console.log(request.body);

    const dtNasc:any = moment(dob).format('YYYY-MM-DD');

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      old_password,
      password,
      dob:dtNasc,
      address,
      description,
      email,
    })

    return response.json(user)
  }
  public async delete(request:Request,response:Response):Promise<Response>{
    
    const user_id:any = request.query.user_id;
    
    const deletaUser = container.resolve(DeleteUserService);

    const destroyUser= await deletaUser.execute({user_id});

    return response.status(201).json({message:"user delete with success"})

  }
}
