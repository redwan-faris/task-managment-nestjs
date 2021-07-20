import { Entity, EntityRepository, Repository } from "typeorm";
import  User  from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async singUp(user: User): Promise<void>{
        await user.save();
    }
}