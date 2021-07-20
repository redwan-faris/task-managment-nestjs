import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCrdentialsDto } from './dto/auth-credentails.dto';
import User from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository){}

    async singUp(authCrdentialsDto: AuthCrdentialsDto):Promise<void>{
        const {username, password} = authCrdentialsDto;
        const newUser = new User();
        newUser.username = username;
        newUser.password = password;
        newUser.hashPassword();
        return this.userRepository.singUp(newUser);
    }

    async signIn(authCrdentialsDto: AuthCrdentialsDto){
        const user = await this.userRepository.singIn(authCrdentialsDto);
        
        if(user && user.checkIfUnencryptedPasswordIsValid(authCrdentialsDto.password))
        return user.username;
        else throw new UnauthorizedException("Invalid credentails");
    }
}
