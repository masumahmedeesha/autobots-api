import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @MinLength(4)
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(5)
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({ required: false })
  profileImage?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  paymentClear?: boolean = false;
}
