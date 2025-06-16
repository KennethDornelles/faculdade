import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: number) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }

    return cart;
  }

  async addToCart(userId: number, addToCartDto: AddToCartDto) {
    const { productId, quantity } = addToCartDto;

    // Verificar se produto existe e está ativo
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || !product.isActive) {
      throw new NotFoundException('Produto não encontrado');
    }

    // Verificar estoque
    if (product.stock < quantity) {
      throw new BadRequestException('Estoque insuficiente');
    }

    // Obter ou criar carrinho
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
      });
    }

    // Verificar se item já existe no carrinho
    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (existingItem) {
      // Atualizar quantidade
      const newQuantity = existingItem.quantity + quantity;

      if (product.stock < newQuantity) {
        throw new BadRequestException('Estoque insuficiente');
      }

      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
        include: { product: true },
      });
    } else {
      // Criar novo item
      return this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
        include: { product: true },
      });
    }
  }

  async updateCartItem(
    userId: number,
    productId: number,
    updateCartItemDto: UpdateCartItemDto,
  ) {
    const { quantity } = updateCartItemDto;

    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      include: { product: true },
    });

    if (!cartItem) {
      throw new NotFoundException('Item não encontrado no carrinho');
    }

    // Verificar estoque
    if (cartItem.product.stock < quantity) {
      throw new BadRequestException('Estoque insuficiente');
    }

    return this.prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity },
      include: { product: true },
    });
  }

  async removeFromCart(userId: number, productId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Item não encontrado no carrinho');
    }

    await this.prisma.cartItem.delete({
      where: { id: cartItem.id },
    });

    return { message: 'Item removido do carrinho' };
  }

  async clearCart(userId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return { message: 'Carrinho limpo com sucesso' };
  }

  async getCartSummary(userId: number) {
    const cart = await this.getCart(userId);

    const summary = cart.items.reduce(
      (acc, item) => {
        const itemTotal = Number(item.product.price) * item.quantity;
        acc.subtotal += itemTotal;
        acc.totalItems += item.quantity;
        return acc;
      },
      { subtotal: 0, totalItems: 0, shipping: 15.0 },
    );

    summary.total = summary.subtotal + summary.shipping;

    return {
      ...summary,
      items: cart.items,
    };
  }
}
