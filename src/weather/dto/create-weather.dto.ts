import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWeatherDto {
  @IsString()
  @IsNotEmpty()
  cityId: string;

  @IsNumber()
  @IsNotEmpty()
  temperature: number;

  @IsNumber()
  @IsNotEmpty()
  windspeed: number;
}
