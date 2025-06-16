import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '(11) 99999-9999', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: '123.456.789-00', required: false })
  @IsOptional()
  @IsString()
  document?: string;
}

export class LoginDto {
  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  password: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'João Silva Santos', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: '(11) 88888-8888', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: '987.654.321-00', required: false })
  @IsOptional()
  @IsString()
  document?: string;
}
