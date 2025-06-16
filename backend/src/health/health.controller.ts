import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('🔧 Sistema')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health Check da API' })
  @ApiResponse({ status: 200, description: 'API funcionando corretamente' })
  healthCheck() {
    return {
      status: 'OK',
      message: 'E-commerce API está funcionando',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    };
  }

  @Get('info')
  @ApiOperation({ summary: 'Informações da API' })
  @ApiResponse({ status: 200, description: 'Informações do sistema' })
  getInfo() {
    return {
      name: 'E-commerce dos Guri API',
      version: '1.0.0',
      description: 'Backend API para e-commerce desenvolvido com NestJS',
      features: [
        '🔐 Autenticação JWT',
        '🛍️ Gestão de Produtos',
        '🛒 Carrinho de Compras',
        '📍 Integração ViaCEP',
        '💳 Sistema de Pagamentos',
        '📚 Documentação Swagger',
      ],
      status: 'active',
      uptime: process.uptime(),
    };
  }
}
