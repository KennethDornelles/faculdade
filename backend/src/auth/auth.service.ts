import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password, ...userData } = createUserDto;

    // Verificar se usuário já existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // Criar usuário
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        ...userData,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        document: true,
        role: true,
        createdAt: true,
      },
    });

    // Criar carrinho para o usuário
    await this.prisma.cart.create({
      data: {
        userId: user.id,
      },
    });

    // Gerar token
    const token = this.generateToken(user.id, user.email, user.role);

    return {
      user,
      token,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Buscar usuário
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Gerar token
    const token = this.generateToken(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        document: user.document,
        role: user.role,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  async validateUser(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        document: true,
        role: true,
        createdAt: true,
      },
    });
  }

  private generateToken(userId: number, email: string, role: string) {
    const payload = { sub: userId, email, role };
    return this.jwtService.sign(payload);
  }
}
