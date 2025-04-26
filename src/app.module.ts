import { Module } from '@nestjs/common';
import { CitiesModule } from './cities/cities.module';
import { WeatherModule } from './weather/weather.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [CitiesModule, WeatherModule, ScheduleModule.forRoot()],
})
export class AppModule {}
