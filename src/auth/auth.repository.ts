import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { Entity, EntityRepository, Repository } from "typeorm";
import { SignUpCrdentialsDto } from "./dto/signUp-credentails.dto";
import  User  from "../users/entities/user.entity";
import { SignInCrdentialsDto } from "./dto/signIn-credentails.dto";

@EntityRepository(User)
export class AuthRepository extends Repository<User>{
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

    async singIn(signInCrdentialsDto: SignInCrdentialsDto){
        const {username} = signInCrdentialsDto;
        const user = await this.findOne({username});
        return user;
    }
}