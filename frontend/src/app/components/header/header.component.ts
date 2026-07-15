import { CarrinhoService } from './../../services/carrinho.service';
import { Component } from '@angular/core';
import { ProdutosService } from '../../services/produtos.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  private subscription?: Subscription;
  totalCarrinho: number = 0;
  quantidadeItens: number = 0;

  constructor(private produtosService: ProdutosService, private carrinhoService: CarrinhoService) {}

    // Chamado a cada tecla digitada no input
    onSearch(event: Event): void {
    const termo = (event.target as HTMLInputElement).value;
    this.produtosService.definirBusca(termo);
  }

    ngOnInit(): void {
      this.subscription = this.carrinhoService.itens$.subscribe(itens => {
        this.quantidadeItens = itens.reduce((total, item) => total + item.quantidade, 0);
      });
    }

    ngOnDestroy(): void {
      this.subscription?.unsubscribe();
    }

  }

