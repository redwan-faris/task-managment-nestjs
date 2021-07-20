import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCrdentialsDto } from './dto/auth-credentails.dto';
import User from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository){}

    async singUp(authCrdentialsDto: AuthCrdentialsDto){
        const {username, password} = authCrdentialsDto;
        const newUser = new User();
        newUser.username = username;
        newUser.password = password;
        return this.userRepository.singUp(newUser);
    }
}
