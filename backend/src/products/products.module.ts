import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MockDataService } from '../common/mock-data.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, MockDataService],
  exports: [ProductService],
})
export class ProductsModule {}
