
export default interface IcreateUserDTO{
    user_id?:string;
    name: string;
    email: string;
    address: string;
    dob:Date;
    old_password?:string;
    password?: string;
    description: string;
}
