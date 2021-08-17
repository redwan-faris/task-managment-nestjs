import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignUpCrdentialsDto } from './dto/signUp-credentails.dto';
import {SignInCrdentialsDto} from "./dto/signIn-credentails.dto"
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) signUpCrdentialsDto: SignUpCrdentialsDto):Promise<void>{
        return this.authService.singUp(signUpCrdentialsDto);
    }

    @Post("/signin")
    signIn(@Body(ValidationPipe) signInCrdentialsDto:SignInCrdentialsDto) : Promise<{accessToken}>{
        
        return this.authService.signIn(signInCrdentialsDto);
    }



}
