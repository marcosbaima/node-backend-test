import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../Repositories/FakeUsersRepository';
import CreateUserService from '../service/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fake/FakeHashProvider';

describe('createUser',()=>{
    it('shold be able to create a new user',async()=>{
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
       
        const createUser = new CreateUserService(fakeUsersRepository,fakeHashProvider);

        const user = await fakeUsersRepository.create({
            name:"marcos baima",
            email:"test@test.com.br",
            password:"123456",
            address:"rua da acacias",
            description:"Test Back-end",
            dob:new Date(),
        })
    expect(user).toHaveProperty('id')
    
    })

    it('should not be able to create a new user with same email from another', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
       
        const creatUser = new CreateUserService(fakeUsersRepository,fakeHashProvider);
    
        await creatUser.execute({
            name:"Marcos VC Baima",
            email:"test2@test.com.br",
            password:"123456",
            address:"rua da acacias",
            description:"Test Back-end",
            dob:new Date(),
        });
    
        expect(
          creatUser.execute({
            name:"Marcos VC Baima",
            email:"test2@test.com.br",
            password:"123456",
            address:"rua da acacias",
            description:"Test Back-end",
            dob:new Date(),
          })
        ).rejects.toBeInstanceOf(AppError);
      });
    
})