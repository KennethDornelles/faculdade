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

  // Criar produtos - Baseado no frontend
  const products = [
    {
      name: 'Smartphone Premium',
      description: 'Smartphone com câmera de 108MP e tela AMOLED de 6.7 polegadas',
      price: 2499.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      category: 'Eletrônicos',
      brand: 'TechBrand',
      stock: 50,
    },
    {
      name: 'Notebook Gamer',
      description: 'Notebook para gaming com placa RTX 4060 e 16GB RAM',
      price: 4299.99,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
      category: 'Informática',
      brand: 'GamePro',
      stock: 25,
    },
    {
      name: 'Fone Bluetooth',
      description: 'Fone de ouvido wireless com cancelamento de ruído',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      category: 'Áudio',
      brand: 'SoundTech',
      stock: 100,
    },
    {
      name: 'Smart TV 55"',
      description: 'Smart TV 4K com HDR e sistema Android TV',
      price: 1899.99,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
      category: 'Eletrônicos',
      brand: 'VisionTech',
      stock: 30,
    },
    {
      name: 'Relógio Smartwatch',
      description: 'Smartwatch com GPS, monitor cardíaco e 7 dias de bateria',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      category: 'Wearables',
      brand: 'FitTech',
      stock: 75,
    },
    {
      name: 'Camera Digital',
      description: 'Câmera DSLR profissional com lente 18-55mm',
      price: 3299.99,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500',
      category: 'Fotografia',
      brand: 'PhotoPro',
      stock: 15,
    },
  ];

  for (const productData of products) {
    await prisma.product.create({
      data: productData,
    });
  }

  // Criar endereço para o usuário
  await prisma.address.create({
    data: {
      userId: user.id,
      zipCode: '01310-100',
      street: 'Avenida Paulista',
      number: '1000',
      complement: 'Apto 101',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      isDefault: true,
    },
  });

  // Criar configurações do sistema
  const settings = [
    { key: 'shipping_price', value: '15.00', type: 'NUMBER' },
    { key: 'free_shipping_minimum', value: '200.00', type: 'NUMBER' },
    { key: 'site_name', value: 'E-commerce dos Guri', type: 'STRING' },
    { key: 'contact_email', value: 'contato@ecommerce.com', type: 'STRING' },
    { key: 'contact_phone', value: '(11) 9999-9999', type: 'STRING' },
  ];

  for (const setting of settings) {
    await prisma.setting.create({
      data: setting,
    });
  }

  console.log('✅ Seed concluído com sucesso!');
  console.log('👤 Admin criado:', admin.email, '| Senha: admin123');
  console.log('👤 Cliente criado:', user.email, '| Senha: user123');
  console.log('🛍️ Produtos criados:', products.length);
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
