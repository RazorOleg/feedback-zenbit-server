import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {User} from "../../entities/user.entity";

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  createAccessToken(user: User): { accessToken: string } {
    return {
      accessToken: this.jwtService.sign({
        email: user.email,
        id: user.id,
      }),
    };
  }

  async verifyUser(accessToken: string): Promise<User> {
    try {
      const result = this.jwtService.verify(accessToken);
      return result;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
