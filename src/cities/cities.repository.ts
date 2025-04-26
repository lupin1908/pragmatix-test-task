import { Injectable } from '@nestjs/common';
import { City } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCityWithLongAndLatDto } from './dto/create-city.dto';

@Injectable()
export class CitiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<City[]> {
    return await this.prisma.city.findMany();
  }

  async create(data: CreateCityWithLongAndLatDto): Promise<City> {
    return await this.prisma.city.create({ data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.city.delete({ where: { id } });
  }
}
