import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCrdentialsDto } from './dto/auth-credentails.dto';
import { JwtPayload } from './jwt.payloads.interface';
import User from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        ){}

    async singUp(authCrdentialsDto: AuthCrdentialsDto):Promise<void>{
        const {username, password} = authCrdentialsDto;
        const newUser = new User();
        newUser.username = username;
        newUser.password = password;
        newUser.hashPassword();
        return this.userRepository.singUp(newUser);
    }

    async signIn(authCrdentialsDto: AuthCrdentialsDto) : Promise<{accessToken}>{
        const user = await this.userRepository.singIn(authCrdentialsDto);
        if(!user ||  !user.checkIfUnencryptedPasswordIsValid(authCrdentialsDto.password))
        throw new UnauthorizedException("Invalid credentails");
       
        const username = user.username;
        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return {accessToken};
    }
}
