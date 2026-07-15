import { CarrinhoService } from '../../services/carrinho.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarrinhoItem } from '../../models/carrinho-item';

@Component({
  selector: 'app-carrinho',
  standalone: false,
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit, OnDestroy {
  itens: CarrinhoItem[] = [];
  totalCarrinho: number = 0;
  quantidadeItens: number = 0;
  carrinhoVazio: boolean = true;
  private subscription?: Subscription;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
  // Guardamos a assinatura principal direto na variável
  this.subscription = this.carrinhoService.itens$.subscribe(itens => {
    this.itens = itens;
    this.carrinhoVazio = itens.length === 0;
    this.quantidadeItens = itens.reduce((total, item) => total + item.quantidade, 0);
    this.totalCarrinho = itens.reduce((total, item) => total + (item.produto.preco * item.quantidade), 0);
  });
}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  removerItem(id: number){
    this.carrinhoService.removerItem(id);
  }

  alterarQuantidade(id: number, quantidade: number){
    this.carrinhoService.alterarQuantidade(id, quantidade);
  }

  obterTotal(): number {
    return this.carrinhoService.obterPrecoTotal();
  }





}

