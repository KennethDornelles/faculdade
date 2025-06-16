import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CarrinhoItem, Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private carrinhoSubject = new BehaviorSubject<CarrinhoItem[]>([]);
  public carrinho$ = this.carrinhoSubject.asObservable();

  private itens: CarrinhoItem[] = [];

  constructor() {
    // Carregar carrinho do localStorage se existir
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      this.itens = JSON.parse(carrinhoSalvo);
      this.carrinhoSubject.next(this.itens);
    }
  }

  adicionarProduto(produto: Produto): void {
    const itemExistente = this.itens.find(item => item.id === produto.id);
    
    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      this.itens.push({ ...produto, quantidade: 1 });
    }
    
    this.atualizarCarrinho();
  }

  removerProduto(produtoId: number): void {
    this.itens = this.itens.filter(item => item.id !== produtoId);
    this.atualizarCarrinho();
  }

  alterarQuantidade(produtoId: number, quantidade: number): void {
    const item = this.itens.find(item => item.id === produtoId);
    if (item) {
      item.quantidade = Math.max(1, quantidade);
      if (item.quantidade <= 0) {
        this.removerProduto(produtoId);
      } else {
        this.atualizarCarrinho();
      }
    }
  }

  obterItens(): CarrinhoItem[] {
    return this.itens;
  }

  obterQuantidadeTotal(): number {
    return this.itens.reduce((total, item) => total + item.quantidade, 0);
  }

  calcularTotal(): number {
    return this.itens.reduce((total, item) => {
      const preco = this.converterPrecoParaNumero(item.preco);
      return total + (preco * item.quantidade);
    }, 0);
  }

  limparCarrinho(): void {
    this.itens = [];
    this.atualizarCarrinho();
  }

  private atualizarCarrinho(): void {
    this.carrinhoSubject.next(this.itens);
    localStorage.setItem('carrinho', JSON.stringify(this.itens));
  }

  private converterPrecoParaNumero(preco: string): number {
    return parseFloat(preco.replace('R$ ', '').replace('.', '').replace(',', '.'));
  }
}
