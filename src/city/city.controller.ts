import { Controller, Get, UseGuards } from '@nestjs/common';
import { CityService } from './city.service';
import { City } from '../entities/city.entity';
import { OptionalJwtAuthGuard } from '../auth/jwt/jwt.guards';

@Controller('city')
export class CityController {
  constructor(private readonly appService: CityService) {}
  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  getCities(): Promise<City[]> {
    return this.appService.getCities();
  }
}
