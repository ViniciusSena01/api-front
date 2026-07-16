import { Injectable } from '@angular/core';
import { CarrinhoItem } from '../models/carrinho-item';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private itensCarrinho: CarrinhoItem[] = [];

  private itensSubject: BehaviorSubject<CarrinhoItem[]> = new BehaviorSubject(this.itensCarrinho);
  itens$: Observable<CarrinhoItem[]> = this.itensSubject.asObservable();

  private totalCarrinhoSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  totalCarrinho$: Observable<number> = this.totalCarrinhoSubject.asObservable();

  private quantidadeItensSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  quantidadeItens$: Observable<number> = this.quantidadeItensSubject.asObservable();

  private quantidadeItens: number = 0;

  constructor() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      this.itensCarrinho = JSON.parse(carrinhoSalvo);
      this.atualizarCarrinho();
    }
  }

  adicionarItem(produto: Produto): void {
    const itemExistente = this.itensCarrinho.find(item => item.produto.id === produto.id);


    //Se um item já existe, adiciona apenas +1 na quantidade
    if (itemExistente) {
      itemExistente.quantidade++;
      //Caso contrário, adicionamos um novo objeto no carrinho
    } else {
      this.itensCarrinho.push({ produto, quantidade: 1 });
    }
    this.atualizarCarrinho();
  }

  removerItem(id: number): void {
    this.itensCarrinho = this.itensCarrinho.filter(item => item.produto.id !== id);
    this.atualizarCarrinho();
  }

  atualizarCarrinho(): void {
    this.itensSubject.next(this.itensCarrinho);
    const total = this.obterPrecoTotal();
    this.totalCarrinhoSubject.next(total);
    this.quantidadeItens = this.itensCarrinho.reduce((total, item) => total + item.quantidade, 0);
    this.quantidadeItensSubject.next(this.quantidadeItens);
    localStorage.setItem('carrinho', JSON.stringify(this.itensCarrinho));
    localStorage.setItem('totalCarrinho', total.toString());
    localStorage.setItem('quantidadeItens', this.quantidadeItens.toString());
  }

  alterarQuantidade(id:number, quantidade:number): void {
    if(quantidade <= 0) {
      this.removerItem(id);
      return;
    }

    const itemCarrinho = this.itensCarrinho.find(item => item.produto.id === id);
    if(itemCarrinho) {
      itemCarrinho.quantidade = quantidade;
      this.atualizarCarrinho();
    }

  }

  obterPrecoTotal(): number {
    return this.itensCarrinho.reduce((total, item) => total + item.produto.preco * item.quantidade, 0);
  }



}
