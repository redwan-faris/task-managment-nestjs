import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCrdentialsDto } from './dto/auth-credentails.dto';
import { GetUser } from './get-user.decorator';
import User from './user.entity';
@UseGuards(AuthGuard())
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCrdentialsDto: AuthCrdentialsDto):Promise<void>{
        return this.authService.singUp(authCrdentialsDto);
    }

    @Post("/signin")
    signIn(@Body(ValidationPipe) AuthCrdentialsDto:AuthCrdentialsDto) : Promise<{accessToken}>{
       
        return this.authService.signIn(AuthCrdentialsDto);
    }



}
