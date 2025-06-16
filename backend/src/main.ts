import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configuração de CORS
  app.enableCors({
    origin: configService.get('app.corsOrigin'),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Pipes de validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('🛍️ E-commerce dos Guri API')
    .setDescription('API completa para e-commerce moderno com Angular + NestJS')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('🔐 Autenticação', 'Endpoints para registro e login')
    .addTag('🛍️ Produtos', 'Gerenciamento de produtos')
    .addTag('🛒 Carrinho', 'Operações do carrinho de compras')
    .addTag('📍 Endereços', 'Busca de CEP e endereços')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'E-commerce API Docs',
    customfavIcon: 'https://nestjs.com/img/logo_text.svg',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    ],
  });

  const port = configService.get('app.port') || 3000;
  await app.listen(port);

  console.log(`🚀 Servidor rodando em: http://localhost:${port}`);
  console.log(`📚 Documentação da API: http://localhost:${port}/api/docs`);
}
bootstrap();
