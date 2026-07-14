import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Produto } from '../../models/produto';
import { ProdutosService } from '../../services/produtos.service';

@Component({
  selector: 'app-produtos',
  standalone: false,
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent implements OnInit, OnDestroy {
  produtos: Produto[] = [];
  private buscaSubscription!: Subscription;

  constructor(private produtosService: ProdutosService) {}

  ngOnInit(): void {
    // Escuta o canal de busca e filtra os produtos automaticamente
    this.buscaSubscription = this.produtosService.termoBusca$.subscribe(termo => {
      this.produtos = this.produtosService.filtrarProdutos(termo);
    });
  }

  // Boa prática: cancelar a inscrição quando o componente for destruído
  ngOnDestroy(): void {
    this.buscaSubscription.unsubscribe();
  }
}
