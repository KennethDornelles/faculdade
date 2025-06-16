import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto, CarrinhoItem } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private produtos: Produto[] = [
    {
      id: 1,
      nome: "Smartphone Pro",
      preco: "R$ 1.299,00",
      imagem: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300",
      descricao: "Smartphone com câmera profissional"
    },
    {
      id: 2,
      nome: "Laptop Gaming",
      preco: "R$ 2.499,00",
      imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300",
      descricao: "Laptop para jogos e trabalho"
    },
    {
      id: 3,
      nome: "Fone Bluetooth",
      preco: "R$ 299,00",
      imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
      descricao: "Fone sem fio com cancelamento de ruído"
    },
    {
      id: 4,
      nome: "Smartwatch",
      preco: "R$ 599,00",
      imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
      descricao: "Relógio inteligente com GPS"
    },
    {
      id: 5,
      nome: "Tablet Pro",
      preco: "R$ 1.899,00",
      imagem: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300",
      descricao: "Tablet profissional para criatividade"
    },
    {
      id: 6,
      nome: "Camera DSLR",
      preco: "R$ 3.299,00",
      imagem: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300",
      descricao: "Câmera profissional para fotografia"
    }
  ];

  getProdutos(): Observable<Produto[]> {
    return new BehaviorSubject(this.produtos).asObservable();
  }

  getProdutoPorId(id: number): Observable<Produto | undefined> {
    const produto = this.produtos.find(p => p.id === id);
    return new BehaviorSubject(produto).asObservable();
  }
}
