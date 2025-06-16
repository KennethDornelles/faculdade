import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProductService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';

// Import direto do RolesGuard
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}

@ApiTags('🛍️ Produtos')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos retornada com sucesso',
  })
  findAll() {
    return this.productService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar produtos' })
  @ApiResponse({ status: 200, description: 'Resultados da busca' })
  search(@Query('q') query: string) {
    return this.productService.search(query);
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Listar produtos por categoria' })
  @ApiResponse({ status: 200, description: 'Produtos da categoria' })
  findByCategory(@Param('category') category: string) {
    return this.productService.findByCategory(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar produto por ID' })
  @ApiResponse({ status: 200, description: 'Produto encontrado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar novo produto (Admin)' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar produto (Admin)' })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover produto (Admin)' })
  @ApiResponse({ status: 200, description: 'Produto removido com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
