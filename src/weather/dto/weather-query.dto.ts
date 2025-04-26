import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class WeatherQueryDto {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  from: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  to: string;
}
