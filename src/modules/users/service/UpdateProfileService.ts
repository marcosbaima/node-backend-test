
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/models/Users';
import IUsersRepository from '../Repositories/IUsersRepository';
import { injectable, inject} from 'tsyringe';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface Request {
  user_id:string;
  name: string;
  email: string;
  address: string;
  dob:Date;
  description: string;
  old_password?:string;
  password?:string;
}

@injectable()
class UpdateProfile {
  constructor(
    @inject('UsersRepository')
    private usersRepository:IUsersRepository,

    @inject('HashProvider')
    private hashProvider:IHashProvider,

    ){}
  public async execute({ user_id, name,dob, description,email,address,password,old_password }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdateEmail=  await this.usersRepository.findByEmail(email)

    if (userWithUpdateEmail && userWithUpdateEmail.id != user_id){
      throw new AppError('E-mail already in use')
    }

    user.name= name;
    user.dob=dob;
    user.email= email;
    user.address=address;
    user.description=description;


    if (password && !old_password){
      throw new AppError('You need to inform the old password to set  a new password')
    }

    if (password && old_password){
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if(!checkOldPassword){
        throw new AppError('old_password does not match.')
      }

    }


    return this.usersRepository.save(user);


  }
}

export default UpdateProfile ;
