import {inject,injectable} from 'tsyringe';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/models/Users';
import IUsersRepository from '../Repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  name: string;
  email: string;
  address: string;
  dob:Date;
  password: string;
  description: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository:IUsersRepository,

    @inject('HashProvider')
    private hashProvider:IHashProvider,

     ){}
  public async execute({
    name,
    email,
    address,
    dob,
    password,
    description,
  }: Request): Promise<User> {

    const checkUserExists = await this.usersRepository.findByEmail(
      email ,
    );
    const hashedPassword = await this.hashProvider.generateHash(password);

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const user = this.usersRepository.create({
      name,
      email,
      address,
      dob,
      password:hashedPassword,
      description,
    });

    

    return user;
  }
}

export default CreateUserService;
