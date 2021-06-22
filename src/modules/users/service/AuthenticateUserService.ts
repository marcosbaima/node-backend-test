import { sign } from 'jsonwebtoken';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../Repositories/IUsersRepository'

import User from '@modules/users/infra/typeorm/models/Users';
import authConfig from '@config/auth';
import { injectable, inject} from 'tsyringe';
import { getRepository } from 'typeorm';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: any;

  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository:IUsersRepository,

    @inject('HashProvider')
    private hashProvider:IHashProvider,

    ){}

  public async execute({ email, password }: Request): Promise<Response> {
    
    
    const user = await getRepository(User).find({where: {email:email}});
    
    
    if(user.length){
        
        const Users = JSON.parse(JSON.stringify(user[0]));

        if (!Users.id) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(password, Users.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401);
        }
        delete Users.password;

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: Users.id,
            expiresIn,
        });
        return {
            user,
            token,
        };

    }else{
      throw new AppError('Incorrect email/password combination.', 401);
    }
    
    
  }
}

export default AuthenticateUserService;
