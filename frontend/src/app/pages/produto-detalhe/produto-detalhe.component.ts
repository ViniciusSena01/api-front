import { CarrinhoService } from './../../services/carrinho.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProdutosService } from '../../services/produtos.service';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-produto-detalhe',
  standalone: false,
  templateUrl: './produto-detalhe.component.html',
  styleUrl: './produto-detalhe.component.css'
})
export class ProdutoDetalheComponent implements OnInit, OnDestroy {
  produto: Produto | undefined;
  private routeSubscription!: Subscription;

  constructor(
    private produtosService: ProdutosService,
    private route: ActivatedRoute,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    // Captura o ID da URL
    this.routeSubscription = this.route.params.subscribe(params => {
      const id = +params['id']; // + converte para número
      this.produto = this.produtosService.obterProdutoPorId(id);
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  adicionarCarrinho(): void {
    if (this.produto) {
      this.carrinhoService.adicionarItem(this.produto);
    }
  }
}
