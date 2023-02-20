import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthStrategy } from './jwt.strategy';
import { JwtAuthService } from './jwt.service';
import {User} from "../../entities/user.entity";
import {JwtModule} from "@nestjs/jwt";
import {AuthService} from "../auth.service";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtAuthStrategy, JwtAuthService, AuthService],
  exports: [JwtModule, JwtAuthService, AuthService],
})
export class JwtAuthModule {}