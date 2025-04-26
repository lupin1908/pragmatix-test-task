import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { CitiesRepository } from './cities.repository';
import { City } from 'generated/prisma/client';
import { GeocodingResponse } from './types';

@Injectable()
export class CitiesService {
  constructor(private readonly citiesRepository: CitiesRepository) {}

  list(): Promise<City[]> {
    return this.citiesRepository.list();
  }

  async delete(id: string): Promise<object> {
    try {
      await this.citiesRepository.delete(id);
      return { message: 'Item successfully deleted' };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('City not found', HttpStatus.NOT_FOUND);
      } else {
        return { message: error.message };
      }
    }
  }

  async create(data: CreateCityDto): Promise<City | object | undefined> {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${data.name}`,
      );
      const responseData = (await response.json()) as GeocodingResponse;
      const cityInfo = responseData.results[0];
      return await this.citiesRepository.create({
        ...data,
        latitude: cityInfo.latitude,
        longitude: cityInfo.longitude,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        return { message: `City with name ${data.name} is already in DB.` };
      } else {
        return { message: error.message };
      }
    }
  }
}
