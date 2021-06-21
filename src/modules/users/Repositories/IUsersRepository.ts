import User from '../infra/typeorm/models/Users'
import ICreateUserDTO from '../dtos/ICreateUsersDTO'
export default interface IUsersRepository{
  findById(id:string): Promise<User | undefined>
  findByEmail(email:string): Promise<User | undefined>
  find(date:ICreateUserDTO):Promise<User>;
  create(date:ICreateUserDTO): Promise<User>;
  save(user:User):Promise<User>
}
