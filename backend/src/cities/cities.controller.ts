import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  list() {
    return this.citiesService.list();
  }

  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    return this.citiesService.create(createCityDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<object> {
    return this.citiesService.delete(id);
  }
}
