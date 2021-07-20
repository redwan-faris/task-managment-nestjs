import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { Entity, EntityRepository, Repository } from "typeorm";
import { AuthCrdentialsDto } from "./dto/auth-credentails.dto";
import  User  from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async singUp(user: User): Promise<void>{
        try{
            await user.save();
        }catch(error){
            if(error.code === "ER_DUP_ENTRY") throw new ConflictException('Username already exists');
        else{
            throw new InternalServerErrorException();
        }
    }
    }

    async singIn(authCrdentialsDto: AuthCrdentialsDto){
        const {username} = authCrdentialsDto;
        const user = await this.findOne({username});
        return user;
    }
}