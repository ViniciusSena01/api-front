
import { Injectable } from '@angular/core';
import { Produto } from '../models/produto'; //Importa o modelo que eu criei
import produtosData from '../../../public/produtos.json'; //Importa os dados de produtos
import { BehaviorSubject } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  produtos: Produto[] = produtosData;

  //O canal que transmite o termo de busca atual começa vazio
  private termoBuscaSubject = new BehaviorSubject<string>('');
  //A versão pública somente leitura do canal para os componentes escutarem
  termoBusca$ = this.termoBuscaSubject.asObservable();

  constructor() {}

  obterProdutos(): Produto[] {
    return this.produtos;
  }

  definirBusca(termo: string): void{
    this.termoBuscaSubject.next(termo);
  }

  filtrarProdutos(termo: string): Produto[] {
    //Se o termo estiver vazio, retorna todos
    if (!termo.trim()) {
      return this.produtos;
    }
    //Se não, filtra os produtos
    return this.produtos.filter(produto =>
      produto.nome.toLowerCase().includes(termo.toLowerCase()) ||
      produto.descricao.toLowerCase().includes(termo.toLowerCase()) ||
      produto.categoria.toLowerCase().includes(termo.toLowerCase()));
  }
}
