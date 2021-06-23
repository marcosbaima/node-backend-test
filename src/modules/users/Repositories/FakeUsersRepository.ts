
import IUsersRepository from '../../users/Repositories/IUsersRepository';
import IcreateUserDTO from '../../users/dtos/ICreateUsersDTO';
import User from '../../users/infra/typeorm/models/Users';
import { uuid } from 'uuidv4';


class FakeUsersRepository implements IUsersRepository {
  
  private user: User[]=[];

  public async findById(id: string): Promise<User | undefined>{
    const userId= this.user.find(
      user=>user.id==id,
    );

    return userId
  }

  public async findByEmail(email: string): Promise<User | undefined>{
    const userId= this.user.find(
      user=>user.email==email,
    );

    return userId
  }

  public async create(userData:IcreateUserDTO):Promise<User>{

    const users= new User();

    Object.assign(users,{id:uuid,userData})
    this.user.push(users);

    return users

  }

  public async exclude(user_id:string):Promise<any>{
    
    //@ts-ignore
    const user=this.user.splice(user_id,1);


    return user;
  }
  public async save(user:User):Promise<User>{

    const findIndex= this.user.findIndex(findUser=>findUser.id==user.id) ;

    this.user[findIndex]=user;

    return user
  }

  public async find(user:User):Promise<User>{

    const userId= this.user.find(
      user=>user.id==user.id,
    );

    return userId
  }
}
export default FakeUsersRepository;
