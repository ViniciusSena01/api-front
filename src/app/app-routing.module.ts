import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ProdutoDetalheComponent } from './pages/produto-detalhe/produto-detalhe.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { ContatoComponent } from './pages/contato/contato.component';

const routes: Routes = [
  { path: 'produtos', component: ProdutosComponent},
  { path: 'produtos/:id', component: ProdutoDetalheComponent},
  { path: 'contato', component: ContatoComponent},
  { path: 'carrinho', component: CarrinhoComponent},
  { path: '', redirectTo: 'produtos', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



