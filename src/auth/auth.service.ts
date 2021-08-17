import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from '../auth/jwt.payloads.interface';
import User from '../users/entities/user.entity';
import { SignInCrdentialsDto } from './dto/signIn-credentails.dto';
import { SignUpCrdentialsDto } from './dto/signUp-credentails.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private userRepository: AuthRepository,
        private jwtService: JwtService,
        ){}

    async singUp(signUpCrdentialsDto: SignUpCrdentialsDto):Promise<void>{
        const {username, password,role} = signUpCrdentialsDto;
        const newUser = new User();
        newUser.role = role;
        newUser.username = username;
        newUser.password = password;
        newUser.hashPassword();
        return this.userRepository.singUp(newUser);
    }

    async signIn(signInCrdentialsDto: SignInCrdentialsDto) : Promise<{accessToken}>{
        const user = await this.userRepository.singIn(signInCrdentialsDto);
        if(!user ||  !user.checkIfUnencryptedPasswordIsValid(signInCrdentialsDto.password))
        throw new UnauthorizedException("Invalid credentails");
       
        const username = user.username;
        const id = user.id;
        const payload: JwtPayload = { username , id};
        const accessToken = await this.jwtService.sign(payload);
        return {accessToken};
    }
}
