import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { JwtAuthService } from '../auth/jwt/jwt.service';
import { City } from '../entities/city.entity';
import { AuthDto } from '../auth/dto/auth.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async getCities(): Promise<City[]> {
    return await this.cityRepository.find();
  }
}
