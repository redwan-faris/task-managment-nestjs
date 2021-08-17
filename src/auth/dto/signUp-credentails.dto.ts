import { IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Roles } from "src/users/roles.enum";


export class SignUpCrdentialsDto{
    
    
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;


    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string;

    @IsString()
    role:Roles

}