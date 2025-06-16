import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('🛒 Carrinho')
@Controller('cart')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Obter carrinho do usuário' })
  @ApiResponse({ status: 200, description: 'Carrinho retornado com sucesso' })
  getCart(@GetUser() user: any) {
    return this.cartService.getCart(user.id);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Obter resumo do carrinho' })
  @ApiResponse({ status: 200, description: 'Resumo do carrinho' })
  getCartSummary(@GetUser() user: any) {
    return this.cartService.getCartSummary(user.id);
  }

  @Post('add')
  @ApiOperation({ summary: 'Adicionar produto ao carrinho' })
  @ApiResponse({ status: 201, description: 'Produto adicionado ao carrinho' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiResponse({ status: 400, description: 'Estoque insuficiente' })
  addToCart(@GetUser() user: any, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(user.id, addToCartDto);
  }

  @Patch('item/:productId')
  @ApiOperation({ summary: 'Atualizar quantidade do item no carrinho' })
  @ApiResponse({
    status: 200,
    description: 'Quantidade atualizada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Item não encontrado' })
  @ApiResponse({ status: 400, description: 'Estoque insuficiente' })
  updateCartItem(
    @GetUser() user: any,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItem(
      user.id,
      productId,
      updateCartItemDto,
    );
  }

  @Delete('item/:productId')
  @ApiOperation({ summary: 'Remover item do carrinho' })
  @ApiResponse({ status: 200, description: 'Item removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Item não encontrado' })
  removeFromCart(
    @GetUser() user: any,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.cartService.removeFromCart(user.id, productId);
  }

  @Delete('clear')
  @ApiOperation({ summary: 'Limpar carrinho' })
  @ApiResponse({ status: 200, description: 'Carrinho limpo com sucesso' })
  clearCart(@GetUser() user: any) {
    return this.cartService.clearCart(user.id);
  }
}
