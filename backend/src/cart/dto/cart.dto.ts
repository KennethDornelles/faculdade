import { IsNumber, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AddToCartDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  productId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  quantity: number;
}

export class UpdateCartItemDto {
  @ApiProperty({ example: 3 })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  quantity: number;
}
