import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { User } from '../entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'signIn' })
  @Post('sign-in')
  signIn(
    @Body() payload: AuthDto,
  ): Promise<{ accessToken: string; user: User }> {
    return this.authService.signIn(payload);
  }

  @ApiOperation({ summary: 'signUp' })
  @Post('sign-up')
  signUp(
    @Body() payload: AuthDto,
  ): Promise<{ accessToken: string; user: User }> {
    return this.authService.signUp(payload);
  }
}
