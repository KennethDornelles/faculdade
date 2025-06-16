import {
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
  IsBoolean,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ example: 'Smartphone Pro' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Smartphone com câmera profissional' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1299.99 })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsUrl()
  image: string;

  @ApiProperty({ example: 'Eletrônicos' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ example: 'Apple' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ example: 100 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stock?: number;
}

export class UpdateProductDto {
  @ApiProperty({ example: 'Smartphone Pro Max', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Smartphone com câmera profissional e mais recursos',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1499.99, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price?: number;

  @ApiProperty({
    example: 'https://example.com/new-image.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiProperty({ example: 'Smartphones', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ example: 'Apple', required: false })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ example: 150, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stock?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
