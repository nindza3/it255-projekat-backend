import { IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MovieDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  imdbRating: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  year: number;
}

export class AddToWatched {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;
}

export class RemoveFromWatched {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;
}
