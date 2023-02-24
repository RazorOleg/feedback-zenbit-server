import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './conf/conf';
import {AuthModule} from "./auth/auth.module";
import {CityModule} from "./city/city.module";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CityModule,
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
