import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateWeatherDto } from './dto/create-weather.dto';

@Injectable()
export class WeatherRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list(params: { city: string; from: string; to: string }) {
    return await this.prisma.forecast.findMany({
      select: {
        fetchedAt: true,
        temperature: true,
        windspeed: true,
        city: {
          select: {
            name: true,
          },
        },
      },
      where: {
        fetchedAt: {
          gte: params.from ? new Date(params.from).toISOString() : undefined,
          lte: params.to ? new Date(params.to).toISOString() : undefined,
        },
        city: {
          is: {
            name: params.city,
          },
        },
      },
    });
  }

  async listAverage(params: { city: string; from: string; to: string }) {
    return await this.prisma.forecast.aggregate({
      _count: {
        id: true,
      },
      _avg: {
        temperature: true,
        windspeed: true,
      },
      where: {
        fetchedAt: {
          gte: params.from ? new Date(params.from).toISOString() : undefined,
          lte: params.to ? new Date(params.to).toISOString() : undefined,
        },
        city: {
          is: {
            name: params.city,
          },
        },
      },
    });
  }

  async create(data: CreateWeatherDto) {
    return await this.prisma.forecast.create({ data });
  }
}
