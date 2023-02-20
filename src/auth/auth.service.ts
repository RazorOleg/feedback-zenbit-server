import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtAuthService } from './jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtAuthService: JwtAuthService,
  ) {}
  async signUp(dto: AuthDto): Promise<{ accessToken: string; user: User }> {
    try {
      await this.checkIfUserCreated(dto.email);

      const not_hashed_password = dto.password;
      dto.password = await this.hashPassword(dto.password);
      const newUser = await this.createUser(dto);
      const { accessToken, user } = await this.signIn({
        email: newUser.email,
        password: not_hashed_password,
      });
      return { accessToken, user };
    } catch (e) {
      throw new BadRequestException(e.message, 'SIGN_UP_ERROR_TYPE');
    }
  }

  async checkIfUserCreated(email: string): Promise<void> {
    try {
      const user = await this.userRepository.findOne({
        where: [{ email: email }],
      });
      if (user && user.email === email) {
        throw new UnauthorizedException();
      }
    } catch (e) {
      throw new BadRequestException(e.message, 'SIGN_UP_ERROR_TYPE');
    }
  }

  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, await bcrypt.genSalt());
    } catch (e) {
      throw new InternalServerErrorException(
        e.message,
        'HASH_PASSWORD_ERROR_TYPE',
      );
    }
  }

  async createUser(dto: AuthDto): Promise<User> {
    try {
      const newUser = new User();
      newUser.email = dto.email;
      newUser.password = dto.password;
      return await this.userRepository.save(newUser);
    } catch (e) {
      throw new InternalServerErrorException(e.message, 'SIGN_UP_ERROR_TYPE');
    }
  }
  async signIn(dto: AuthDto): Promise<{ accessToken: string; user: User }> {
    try {
      const user = await this.validateUserPassword(dto);
      const { accessToken } = await this.jwtAuthService.createAccessToken(user);
      return { accessToken, user };
    } catch (e) {
      throw new InternalServerErrorException(e.message, 'SIGN_IN_ERROR_TYPE');
    }
  }

  async validateUserPassword(dto: AuthDto): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ email: dto.email });
      if (user && !(await this.validatePassword(user, dto.password))) {
        throw new BadRequestException(
          'INVALID_CREDENTIALS_ERROR',
          'SIGN_IN_ERROR_TYPE',
        );
      }
      return user;
    } catch (e) {
      throw new BadRequestException(
        e.message,
        'VALIDATION_PASSWORD_ERROR_TYPE',
      );
    }
  }

  async validatePassword(user: User, password: string) {
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      return isMatch;
    } catch (e) {
      throw new BadRequestException(
        e.message,
        'VALIDATION_PASSWORD_ERROR_TYPE',
      );
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
