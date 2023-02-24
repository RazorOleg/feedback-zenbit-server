import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthModule } from './jwt/jwt.module';
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {User} from "../entities/user.entity";

@Module({
  imports: [
    JwtModule.register({}),
    JwtAuthModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
