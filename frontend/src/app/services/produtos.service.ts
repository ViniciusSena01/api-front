import { Injectable } from '@angular/core';
import { Produto } from '../models/produto'; //Importa o modelo que eu criei
import produtosData from '../../../public/produtos.json'; //Importa os dados de produtos





@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  produtos: Produto[] = produtosData;

  constructor() {}

  obterProdutos(): Produto[] {
    return this.produtos;
  }
}
