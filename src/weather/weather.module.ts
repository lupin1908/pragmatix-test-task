import { CitiesRepository } from './../cities/cities.repository';
import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { WeatherRepository } from './weather.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WeatherController],
  providers: [CitiesRepository, WeatherService, WeatherRepository],
})
export class WeatherModule {}
