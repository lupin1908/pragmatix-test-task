import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WeatherRepository } from './weather.repository';
import { CitiesRepository } from 'src/cities/cities.repository';
import { City } from 'generated/prisma/client';
import { CurrentWeatherResponse } from './types';

@Injectable()
export class WeatherService {
  constructor(
    private readonly repo: WeatherRepository,
    private readonly citiesRepo: CitiesRepository,
  ) {}

  @Cron('*/1 * * * *')
  async handleCron() {
    const cities: City[] = await this.citiesRepo.list();
    const promises: Promise<any>[] = [];

    cities.forEach((city: City) => {
      const promise = fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`,
      )
        .then((res) => res.json())
        .then((weatherData: CurrentWeatherResponse) => {
          const currentWeather = weatherData.current_weather;

          if (currentWeather) {
            return this.repo.create({
              cityId: city.id,
              temperature: currentWeather.temperature,
              windspeed: currentWeather.windspeed,
            });
          }
        })
        .catch((error) => {
          console.error(`Failed to fetch weather for ${city.name}:`, error);
        });

      promises.push(promise);
    });

    await Promise.all(promises);
  }

  list(params: { city: string; from: string; to: string }) {
    try {
      this.checkDates(params.from, params.to);
      return this.repo.list(params);
    } catch (error) {
      throw new HttpException(
        error.message || 'Something went wrong',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async listAverage(params: { city: string; from: string; to: string }) {
    try {
      const { city, from, to } = params;
      this.checkDates(from, to);
      const forecastAggregation = await this.repo.listAverage(params);
      return {
        city,
        to,
        from,
        count: forecastAggregation._count.id,
        averageTemperature: forecastAggregation._avg.temperature,
        averageWindspeed: forecastAggregation._avg.windspeed,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Something went wrong',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  checkDates(from: string, to: string) {
    if (from && to) {
      const fromISO = new Date(from).toISOString();
      const toISO = new Date(to).toISOString();
      if (fromISO > toISO) {
        throw new HttpException(
          'From date cannot be more than to date',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
