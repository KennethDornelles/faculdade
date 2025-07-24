import { Injectable } from '@nestjs/common';

export interface MockProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  productCategory:
    | 'FOOD'
    | 'TOYS'
    | 'HYGIENE'
    | 'ACCESSORIES'
    | 'MEDICINE'
    | 'AQUARIUM'
    | 'CAGES';
  petType: Array<
    'DOG' | 'CAT' | 'BIRD' | 'FISH' | 'RODENT' | 'REPTILE' | 'OTHER'
  >;
  brand: string;
  stock: number;
  isActive: boolean;
}

@Injectable()
export class MockDataService {
  private readonly mockProducts: MockProduct[] = [
    {
      id: 1,
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
      isActive: true,
    },
    {
      id: 2,
      name: 'Arranhador para Gatos com Torre',
      description: 'Arranhador com torre e brinquedos para gatos',
      price: 249.99,
      image:
        'https://images.unsplash.com/photo-1518715308788-3005759c61d4?w=400',
      productCategory: 'ACCESSORIES',
      petType: ['CAT'],
      brand: 'CatFun',
      stock: 40,
      isActive: true,
    },
    {
      id: 3,
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
      isActive: true,
    },
    {
      id: 4,
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
      isActive: true,
    },
    {
      id: 5,
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
      isActive: true,
    },
    {
      id: 6,
      name: 'Aquário Completo 20L com Filtro e Iluminação',
      description: 'Aquário de vidro 20 litros com filtro e iluminação LED',
      price: 399.99,
      image:
        'https://images.unsplash.com/photo-1518715308788-3005759c61d4?w=400',
      productCategory: 'AQUARIUM',
      petType: ['FISH'],
      brand: 'AquaWorld',
      stock: 20,
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

  getMockProductsByCategory(productCategory: string): MockProduct[] {
    return this.mockProducts.filter(
      (product) =>
        product.productCategory === productCategory && product.isActive,
    );
  }

  searchMockProducts(query: string): MockProduct[] {
    const searchTerm = query.toLowerCase();
    return this.mockProducts.filter(
      (product) =>
        product.isActive &&
        (product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.productCategory.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm)),
    );
  }
}
