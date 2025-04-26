import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherQueryDto } from './dto/weather-query.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('raw')
  listRaw(
    @Query('city') city: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.weatherService.list({ city, from, to });
  }

  @Get('average')
  listAverage(
    @Query(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    params: WeatherQueryDto,
  ) {
    return this.weatherService.listAverage(params);
  }
}
