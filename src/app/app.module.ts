import { FormsModule } from '@angular/forms'; // <-- adicione este import no topo
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ProdutoDetalheComponent } from './pages/produto-detalhe/produto-detalhe.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { ContatoComponent } from './pages/contato/contato.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProdutosComponent,
    ProdutoDetalheComponent,
    CarrinhoComponent,
    ContatoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
