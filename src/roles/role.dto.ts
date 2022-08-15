import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  roleName: string;
}
