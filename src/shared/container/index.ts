import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/Repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/users';


import IUsersTokensRepository from '@modules/users/Repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import '@modules/users/providers';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UserTokensRepository',UserTokensRepository,
);


