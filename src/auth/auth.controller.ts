import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCrdentialsDto } from './dto/auth-credentails.dto';

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
    signIn(@Body(ValidationPipe) AuthCrdentialsDto:AuthCrdentialsDto){
       
        return this.authService.signIn(AuthCrdentialsDto);
    }

}
