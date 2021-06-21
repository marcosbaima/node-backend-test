
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/models/Users';
import IUsersRepository from '../Repositories/IUsersRepository';
import { injectable, inject} from 'tsyringe';
interface Request {
  user_id:string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository:IUsersRepository,


    ){}
  public async execute({ user_id }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    delete user.password

    return user;


  }
}

export default ShowProfileService ;
