import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { CitiesRepository } from './cities.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CitiesController],
  providers: [CitiesService, CitiesRepository],
})
export class CitiesModule {}
