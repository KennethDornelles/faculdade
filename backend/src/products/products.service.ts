import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { MockDataService } from '../common/mock-data.service';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private mockDataService: MockDataService,
  ) {}

  async findAll() {
    try {
      // Tenta usar o banco de dados
      return await this.prisma.product.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
      });
    } catch {
      // Se falhar, usa dados mock
      return this.mockDataService.getMockProducts();
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException('Produto não encontrado');
      }

      return product;
    } catch {
      // Se falhar, usa dados mock
      const mockProduct = this.mockDataService.getMockProductById(id);
      if (!mockProduct) {
        throw new NotFoundException('Produto não encontrado');
      }
      return mockProduct;
    }
  }

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id); // Verifica se existe

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica se existe

    return this.prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async findByCategory(productCategory: string) {
    try {
      return await this.prisma.product.findMany({
        where: {
          productCategory: productCategory as any, // enum do Prisma
          isActive: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    } catch {
      return this.mockDataService.getMockProductsByCategory(productCategory);
    }
  }

  async search(query: string) {
    try {
      return await this.prisma.product.findMany({
        where: {
          isActive: true,
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { brand: { contains: query, mode: 'insensitive' } },
            // Busca por categoria exata se for um valor válido do enum
            { productCategory: query.toUpperCase() as any },
          ],
        },
        orderBy: { createdAt: 'desc' },
      });
    } catch {
      return this.mockDataService.searchMockProducts(query);
    }
  }
}
