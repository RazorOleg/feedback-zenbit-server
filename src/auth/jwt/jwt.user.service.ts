import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {User} from "../../entities/user.entity";

@Injectable()
export class JwtUserService {
  constructor(private jwtService: JwtService) {}
  public login(payload: any) {
    return this.jwtService.sign({
      email: payload.email,
      password: payload.password,
      role: payload.role,
      is_active: payload.is_active,
    });
  }

  async verifyUser(accessToken: string): Promise<User> {
    try {
      return this.jwtService.verify(accessToken);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
