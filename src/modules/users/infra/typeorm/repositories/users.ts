import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '@modules/users/Repositories/IUsersRepository';
import  IcreateUserDTO from '@modules/users/dtos/ICreateUsersDTO';
import User from '@modules/users/infra/typeorm/models/Users';


class UserRepository implements IUsersRepository {
  private ormRepository:Repository<User>;
  constructor(){
    this.ormRepository=getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined>{
    const findUsers = await this.ormRepository.findOne({
      where: { id },
    });

    return findUsers;
  }

  public async findByEmail(email: string): Promise<User | undefined>{
    const findUsers = await this.ormRepository.findOne({
      where: { email },
    });
    //console.log(findUsers)
    return findUsers;
  }

  public async create({ name,email,password,address,description,dob}:IcreateUserDTO):Promise<User>{
    const user=this.ormRepository.create({name,email,password,address,description,dob});

    await this.ormRepository.save(user);

    return user;
  }
  public async exclude(user_id:string):Promise<any>{
    
    const user=this.ormRepository.delete(user_id);

    //await this.ormRepository.save(user);

    return user;
  }
  public async save(user:User):Promise<User>{
    await this.ormRepository.save(user)
    return user;
  }

  public async find(user:User):Promise<User>{

    await this.ormRepository.find(user);

    return user;


  }
}

export default UserRepository;
