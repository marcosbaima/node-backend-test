
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/models/Users';
import IUsersRepository from '../Repositories/IUsersRepository';
import { injectable, inject} from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
interface Request {
  user_id: string;
  avatarfilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository:IUsersRepository,

    @inject('StorageProvider')
    private StorageProvider:IStorageProvider,

    ){}
  public async execute({ user_id, avatarfilename }: Request): Promise<User> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only autenticated can change avatar', 401);
    }
    if (user.avatar) {
      await this.StorageProvider.deleteFile(user.avatar);
    }

    const filename= await this.StorageProvider.saveFile(avatarfilename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
