import { Injectable } from '@nestjs/common';

export interface MockProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  stock: number;
  isActive: boolean;
}

@Injectable()
export class MockDataService {
  private readonly mockProducts: MockProduct[] = [
    {
      id: 1,
      name: 'Smartphone Pro Max',
      description: 'Smartphone de última geração com câmera profissional',
      price: 2999.99,
      image:
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      category: 'Eletrônicos',
      brand: 'TechCorp',
      stock: 50,
      isActive: true,
    },
    {
      id: 2,
      name: 'Notebook Gamer Ultra',
      description: 'Notebook para jogos com placa de vídeo dedicada',
      price: 4599.99,
      image:
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400',
      category: 'Eletrônicos',
      brand: 'GameMax',
      stock: 25,
      isActive: true,
    },
    {
      id: 3,
      name: 'Headset Wireless Premium',
      description: 'Fone de ouvido sem fio com cancelamento de ruído',
      price: 899.99,
      image:
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400',
      category: 'Acessórios',
      brand: 'SoundTech',
      stock: 100,
      isActive: true,
    },
    {
      id: 4,
      name: 'Monitor 4K Ultrawide',
      description: 'Monitor curvo 34" com resolução 4K',
      price: 1899.99,
      image:
        'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
      category: 'Eletrônicos',
      brand: 'ViewMax',
      stock: 30,
      isActive: true,
    },
    {
      id: 5,
      name: 'Smartwatch Fitness',
      description: 'Relógio inteligente com monitoramento de saúde',
      price: 799.99,
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      category: 'Wearables',
      brand: 'FitTech',
      stock: 75,
      isActive: true,
    },
    {
      id: 6,
      name: 'Câmera DSLR Profissional',
      description: 'Câmera digital para fotografia profissional',
      price: 3299.99,
      image:
        'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400',
      category: 'Fotografia',
      brand: 'PhotoPro',
      stock: 15,
      isActive: true,
    },
  ];

  getMockProducts(): MockProduct[] {
    return this.mockProducts.filter((product) => product.isActive);
  }

  getMockProductById(id: number): MockProduct | undefined {
    return this.mockProducts.find(
      (product) => product.id === id && product.isActive,
    );
  }

  getMockProductsByCategory(category: string): MockProduct[] {
    return this.mockProducts.filter(
      (product) =>
        product.category.toLowerCase() === category.toLowerCase() &&
        product.isActive,
    );
  }

  searchMockProducts(query: string): MockProduct[] {
    const searchTerm = query.toLowerCase();
    return this.mockProducts.filter(
      (product) =>
        product.isActive &&
        (product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm)),
    );
  }
}
