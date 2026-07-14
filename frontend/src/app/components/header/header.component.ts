import { Component } from '@angular/core';
import { ProdutosService } from '../../services/produtos.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private produtosService: ProdutosService) {}

  // Chamado a cada tecla digitada no input
  onSearch(event: Event): void {
    const termo = (event.target as HTMLInputElement).value;
    this.produtosService.definirBusca(termo);
  }
}
