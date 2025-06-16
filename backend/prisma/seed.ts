import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Criar usuário admin
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@ecommerce.com',
      password: adminPassword,
      name: 'Administrador',
      phone: '(11) 99999-9999',
      document: '123.456.789-00',
      role: 'ADMIN',
    },
  });

  // Criar usuário cliente
  const userPassword = await bcrypt.hash('user123', 12);
  const user = await prisma.user.create({
    data: {
      email: 'cliente@email.com',
      password: userPassword,
      name: 'João Silva',
      phone: '(11) 88888-8888',
      document: '987.654.321-00',
      role: 'CUSTOMER',
    },
  });

  // Criar carrinho para o usuário
  await prisma.cart.create({
    data: {
      userId: user.id,
    },
  });

  // Criar produtos
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Smartphone Pro Max',
        description: 'Smartphone de última geração com câmera profissional',
        price: 2999.99,
        image:
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        category: 'Eletrônicos',
        brand: 'TechCorp',
        stock: 50,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Notebook Gamer Ultra',
        description: 'Notebook para jogos com placa de vídeo dedicada',
        price: 4599.99,
        image:
          'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400',
        category: 'Eletrônicos',
        brand: 'GameMax',
        stock: 25,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Headset Wireless Premium',
        description: 'Fone de ouvido sem fio com cancelamento de ruído',
        price: 899.99,
        image:
          'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400',
        category: 'Acessórios',
        brand: 'SoundTech',
        stock: 100,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Monitor 4K Ultrawide',
        description: 'Monitor curvo 34" com resolução 4K',
        price: 1899.99,
        image:
          'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
        category: 'Eletrônicos',
        brand: 'ViewMax',
        stock: 30,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Smartwatch Fitness',
        description: 'Relógio inteligente com monitoramento de saúde',
        price: 799.99,
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        category: 'Wearables',
        brand: 'FitTech',
        stock: 75,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Câmera DSLR Profissional',
        description: 'Câmera digital para fotografia profissional',
        price: 3299.99,
        image:
          'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400',
        category: 'Fotografia',
        brand: 'PhotoPro',
        stock: 15,
      },
    }),
  ]);

  // Criar endereço para o usuário
  await prisma.address.create({
    data: {
      userId: user.id,
      zipCode: '01310-100',
      street: 'Avenida Paulista',
      number: '1000',
      complement: 'Apartamento 101',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      isDefault: true,
    },
  });

  console.log('✅ Seed concluído com sucesso!');
  console.log(`👨‍💼 Admin criado: ${admin.email} / admin123`);
  console.log(`👤 Cliente criado: ${user.email} / user123`);
  console.log(`📦 ${products.length} produtos criados`);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(() => {
    return prisma.$disconnect();
  });
