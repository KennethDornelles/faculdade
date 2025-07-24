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
        name: 'Ração Premium para Cães Adultos',
        description:
          'Ração de alta qualidade para cães adultos de todos os portes',
        price: 159.9,
        image:
          'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400',
        productCategory: 'FOOD',
        petType: ['DOG'],
        brand: 'DogNutri',
        stock: 100,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Arranhador para Gatos com Torre',
        description: 'Arranhador com torre e brinquedos para gatos',
        price: 249.99,
        image:
          'https://images.unsplash.com/photo-1518715308788-3005759c61d4?w=400',
        productCategory: 'ACCESSORIES',
        petType: ['CAT'],
        brand: 'CatFun',
        stock: 40,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Brinquedo Interativo para Cães',
        description:
          'Brinquedo resistente e divertido para cães de todos os tamanhos',
        price: 49.9,
        image:
          'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400',
        productCategory: 'TOYS',
        petType: ['DOG'],
        brand: 'PetPlay',
        stock: 200,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Areia Higiênica Super Absorvente para Gatos',
        description:
          'Areia higiênica com alto poder de absorção e controle de odores',
        price: 35.5,
        image:
          'https://images.unsplash.com/photo-1518715308788-3005759c61d4?w=400',
        productCategory: 'HYGIENE',
        petType: ['CAT'],
        brand: 'CatClean',
        stock: 120,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Gaiola para Hamster com Acessórios',
        description:
          'Gaiola completa para hamster com roda, bebedouro e comedouro',
        price: 129.99,
        image:
          'https://images.unsplash.com/photo-1518715308788-3005759c61d4?w=400',
        productCategory: 'CAGES',
        petType: ['RODENT'],
        brand: 'RodentHome',
        stock: 60,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Aquário Completo 20L com Filtro e Iluminação',
        description: 'Aquário de vidro 20 litros com filtro e iluminação LED',
        price: 399.99,
        image:
          'https://images.unsplash.com/photo-1518715308788-3005759c61d4?w=400',
        productCategory: 'AQUARIUM',
        petType: ['FISH'],
        brand: 'AquaWorld',
        stock: 20,
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
    void prisma.$disconnect();
  });
