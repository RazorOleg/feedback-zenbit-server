import { Controller, Get, UseGuards } from '@nestjs/common';
import { CityService } from './city.service';
import {OptionalJwtAuthGuard} from "../auth/jwt/jwt.guards";
import {City} from "../entities/city.entity";


@Controller('city')
export class CityController {
  constructor(private readonly appService: CityService) {}
  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  getCities(): Promise<City[]> {
    return this.appService.getCities();
  }
}
