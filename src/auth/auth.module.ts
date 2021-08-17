import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import {PassportModule} from "@nestjs/passport";
import { JwtStrategy } from './guards/jwt.strategy';
import { JwtAtuhGuard } from './guards/jwt-guard';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { RolesGuard } from './guards/role.guard';
import { AuthRepository } from './auth.repository';

@Module({

  imports:[
    
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: "strong secret",
      signOptions:{
        expiresIn:3600
      }
    }),
    TypeOrmModule.forFeature([AuthRepository])
  ],
  controllers:[AuthController],
  
  providers: [
    AuthService,
    JwtStrategy,
    RolesGuard,
    JwtAtuhGuard
  ],
  exports:[
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
